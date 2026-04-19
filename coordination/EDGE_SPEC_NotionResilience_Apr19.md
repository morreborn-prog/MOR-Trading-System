# SPEC: Notion Resilience — Prevent Silent Token Failures
**Author:** Pete | **Date:** 2026-04-19 | **Priority:** HIGH  
**For:** Edge (Claude Code / VS Code)  
**Approved by:** Michael O'Regan, MOR INC

---

## Problem

The Notion token (`ntn_380...`) currently lives in 3 independent places:
- Cloudflare Worker: `NOTION_TOKEN` (wrangler secret)
- GitHub Actions: `NOTION_API_KEY` (gh secret)
- Pete's Perplexity connector (OAuth UI)

When any one breaks, the others don't know. Today:
- GitHub Secrets were NEVER set → pipeline silently skipped Notion for 3 days
- Worker token expired → silent 401s
- No alert fired on either failure

---

## Deliverables (3 items, in order)

---

### #1 — Fail Loud on Notion Auth (GitHub Actions)
**Time estimate:** 30 min  
**File:** `.github/workflows/mor_15min_loop.yml`

Change the Notion write step from silent skip to hard fail + Slack alert.

**Current behavior (bad):**
```python
if not NOTION_API_KEY:
    print("Notion keys not set — skipping push")
    exit(0)  # silent success — nobody knows
```

**Target behavior:**
```python
if not NOTION_API_KEY:
    # Send Slack alert
    requests.post(SLACK_WEBHOOK, json={
        "text": ":red_circle: *MOR SYSTEM ALERT* — NOTION_API_KEY missing from GitHub Secrets. Pipeline skipping Notion write. Fix required. <@U0AD4UP12Q0>"
    })
    exit(1)  # hard fail — shows red in GitHub Actions

# Also test the token before writing
test = requests.get("https://api.notion.com/v1/users/me",
    headers={"Authorization": f"Bearer {NOTION_API_KEY}", "Notion-Version": "2022-06-28"})
if test.status_code == 401:
    requests.post(SLACK_WEBHOOK, json={
        "text": ":red_circle: *MOR SYSTEM ALERT* — NOTION_API_KEY returns 401. Token expired or invalid. Fix required. <@U0AD4UP12Q0>"
    })
    exit(1)
```

**Notes:**
- Add `SLACK_WEBHOOK` as a GitHub Secret (use same webhook as other Slack alerts, or the existing Slack connector)
- The Slack user ID for Michael is `U0AD4UP12Q0`

---

### #2 — Worker Health Alert on Degraded State
**Time estimate:** 1 hour  
**File:** `src/worker.js` (or wherever the Cloudflare Worker cron lives)

Add a health check to the existing 15-min cron that fires a Slack DM to Michael if `/diag` is not fully green.

**Current cron behavior:** Runs every 15 min, does Notion sync, Alpaca pull, etc.

**Add at top of cron handler:**
```javascript
async function cronHealthAlert(env) {
  const diag = await runDiagnostics(env); // the existing /diag logic
  
  if (diag.overall !== 'HEALTHY') {
    const failedChecks = diag.checks
      .filter(c => c.status !== 'ok')
      .map(c => `• ${c.name}: ${c.status} — ${c.detail || 'no detail'}`)
      .join('\n');
    
    await sendSlackDM(env, 'U0AD4UP12Q0', 
      `:red_circle: *MOR WORKER ALERT* — Worker is \`${diag.overall}\`\n${failedChecks}\n\nCheck: https://memory-os-worker.morelectric.workers.dev/diag`
    );
  }
}
```

**Rules:**
- Only alert if status changes from HEALTHY to degraded (don't spam on every cron if already broken)
- Store last known status in KV: `KV.put('worker_health_last', diag.overall)`
- Only fire Slack alert if `last !== 'HEALTHY' && current !== 'HEALTHY'` — no, actually: fire if `last === 'HEALTHY' && current !== 'HEALTHY'` (state transition alert)
- Throttle: max 1 alert per hour (store `worker_health_alerted_at` in KV)

---

### #3 — Worker as Token Vault (Single Source of Truth)
**Time estimate:** 2-3 hours  
**Files:** `src/worker.js`, `.github/workflows/mor_15min_loop.yml`, and any other scripts using NOTION_API_KEY

This eliminates the 3-places problem permanently.

**New Worker endpoint:**
```javascript
// GET /token?key=<PX_SECRET>
// Returns current secrets for authorized callers
// Only accessible with valid PX_SECRET
async function handleTokenRequest(request, env) {
  const key = new URL(request.url).searchParams.get('key');
  if (key !== env.PX_SECRET) {
    return new Response(JSON.stringify({error: 'unauthorized'}), {status: 401});
  }
  
  return new Response(JSON.stringify({
    notion_token: env.NOTION_TOKEN,
    // Add others as needed
  }), {
    headers: {'Content-Type': 'application/json'}
  });
}
```

**GitHub Actions — use Worker token instead of static secret:**
```python
import requests, os

PX_SECRET = os.environ['PX_SECRET']  # This is the only secret needed now
WORKER_URL = 'https://memory-os-worker.morelectric.workers.dev'

# Get current Notion token from Worker at runtime
token_resp = requests.get(f'{WORKER_URL}/token?key={PX_SECRET}')
if token_resp.status_code != 200:
    print(f"ALERT: Could not fetch token from Worker: {token_resp.status_code}")
    exit(1)

NOTION_API_KEY = token_resp.json()['notion_token']
```

**GitHub Secrets after this change:**
- Remove: `NOTION_API_KEY` (no longer needed as static secret)
- Keep: `PX_SECRET` (already set, used for Worker auth)
- Keep: `ALPACA_API_KEY`, `ALPACA_SECRET_KEY`, `NOTION_DATABASE_ID`

**Result:** Rotate the Worker token once (`wrangler secret put NOTION_TOKEN`) → everything updates automatically. GitHub Actions, ClawBot, any future script — all read from the Worker at runtime.

---

## Pete Skill Update (Pete will handle)

Adding to `pete-mor-intel` skill Session Start Protocol:

> Rule: First action every session is to call `/diag`. If any check returns anything other than `ok`, STOP all other work and report the failure to Michael immediately. Do not proceed with market intel, reports, or any other tasks until infrastructure is green.

---

## Token Rotation Runbook (add to Notion RUNBOOK page)

When rotating the Notion integration token:

1. Go to notion.so/my-integrations → regenerate token
2. Copy new `ntn_xxx` value
3. Run: `cd C:/temp-worker && npx wrangler secret put NOTION_TOKEN` → paste token
4. Verify: `GET /diag` → confirm `NOTION_TOKEN: ok`
5. Run: `GET /sync` → force resync
6. If using Token Vault (spec #3 above): DONE — all other systems update automatically
7. If NOT yet on Token Vault: also update `NOTION_API_KEY` in GitHub Secrets manually

After spec #3 is deployed, steps 6-7 are eliminated. One command = done.

---

## Priority Order

1. **#1 (Fail Loud)** — do this first, today if possible. Prevents the 3-day silent failure situation immediately.
2. **#2 (Worker Health Alert)** — do this second. Prevents the 401-goes-undetected situation.
3. **#3 (Token Vault)** — do this when you have 2-3 hours of clean build time. This is the permanent fix.

---

## Questions for Edge

1. Is there already a Slack webhook configured in the Worker for alerts? Or should we wire the Slack Direct connector?
2. Is `push_notion_log.py` the only place in the pipeline that uses `NOTION_API_KEY`, or are there others?
3. After spec #3 is deployed, do you want Pete to test the token fetch endpoint before removing the static GitHub Secret?

Pete | MOR INC | 2026-04-19
