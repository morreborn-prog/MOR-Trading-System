# MOR INC — MASTER SESSION ARCHIVE
# Compiled by Pete | Last updated: 2026-04-20 11:27 AM CDT
# All MD files from morreborn-prog/MOR-Trading-System, sorted chronologically.
# Every agent reads CONTEXT_LIVE.md daily. This file is the full historical record.

---

## INDEX (newest first)
| Date | File | Type |
|------|------|------|
| 2026-04-20 11:11 CT | CONTEXT_LIVE.md | Daily truth file |
| 2026-04-20 11:10 CT | coordination/EDGE_WRITE_LIVE_0420.md | Edge coordination |
| 2026-04-20 00:01 CT | logs/2026-04-20_session_log.md | Session log (filling EOD) |
| 2026-04-19 20:36 CT | coordination/MCP_OPTIONSFLOW_DEPLOY_SPEC.md | Deploy spec |
| 2026-04-19 20:33 CT | MOR_STATE.md | Rolling system context |
| 2026-04-19 18:03 CT | coordination/EDGE_SPEC_NotionResilience_Apr19.md | Spec |
| 2026-04-19 18:00 CT | coordination/EDGE_UPDATE_0419_1255.md | Edge update |
| 2026-04-19 17:34 CT | logs/2026-04-19_session_log.md | Session log |
| 2026-04-19 17:09 CT | coordination/NOTION_HOOKUP_BRIEFING_EDGE.md | Notion fix brief |
| 2026-04-16 18:26 CT | logs/2026-04-16_session_log.md | Session log (first session) |
| 2026-04-16 18:26 CT | rulebook/MOR_rules.md | Trading rules |
| 2026-04-16 18:26 CT | coordination/AI_COORDINATION.md | AI coordination protocol |
| 2026-04-16 18:26 CT | dashboard/dashboard_spec.md | Dashboard spec |
| 2026-04-16 18:26 CT | README.md | System overview |
| 2026-04-16 18:26 CT | workers/worker_config.md | Worker config |

---
---

# SESSION: 2026-04-16 (FIRST SESSION — REPO CREATION)


---

## [2026-04-16] README.md

# MOR Master Trading System

**Owner:** Michael O'Regan | MOR Trading Systems  
**Last Updated:** 2026-04-16  
**Status:** 🟢 Active Build

---

## System Priority Stack
1. 🔁 Pipeline & Memory — bulletproof cross-session continuity
2. 📈 Scalp & Swing Engine — high-probability setups, auto-scored
3. 📊 Dashboard — live P&L, workers, setups (handoff to Copilot)
4. 🌐 Website & Marketing — MOR Electric/HVAC + trading brand

---

## Repo Structure
```
/rulebook       → Living MOR trading rules (entry, exit, risk, workers)
/logs           → Daily session logs (auto-populated post-close)
/workers        → Worker configs and accuracy scoring
/dashboard      → Dashboard specs and data schema
/.github/workflows → Automation (15-min loop, auto-commit)
```

---

## Pipeline Flow
```
TradingView alert
  → webhook → Alpaca (execute)
  → Post-close trigger
  → Alpaca MCP pulls fills
  → GitHub logs committed
  → Notion daily page updated
  → Tomorrow prep auto-generated at 6 AM CDT
```

---

## AI Coordination
- **Perplexity** — research, live MCP execution (GitHub, Alpaca), system builds
- **Claude/Copilot** — code generation, dashboard build, Pine Script
- **Sync point:** This GitHub repo is the shared source of truth for both AIs

---

## [2026-04-16] coordination/AI_COORDINATION.md

# MOR AI Coordination Protocol

**Last Updated:** 2026-04-16  
**Source of Truth:** This repo — https://github.com/morreborn-prog/MOR-Trading-System

---

## AI Team
| AI | Role | Access | Primary Tasks |
|---|---|---|---|
| Perplexity | Research + MCP Executor | GitHub MCP, Alpaca MCP, Web search | System builds, live data pulls, research, pipeline execution |
| Claude/Copilot | Code + Build | GitHub API via repo | Dashboard build, Pine Script, Python scripts, website |

---

## Sync Protocol
- **This repo is the handoff point** — Perplexity writes logs/rules/specs, Claude/Copilot reads and builds
- **15-min GitHub Actions loop** runs autonomously — no human trigger needed
- **Session logs** auto-populate from Alpaca fills
- **Rule changes** committed with date + reason — both AIs read from rulebook

---

## Current Build Priorities
1. 🔁 **Pipeline** — 15-min loop live (GitHub Actions), Notion sync pending secrets
2. 📈 **Scalp/Swing Engine** — Pine Script A-setup scanner, worker accuracy scoring
3. 📊 **Dashboard** — React app reading from this repo + Alpaca API (Claude builds)
4. 🌐 **Website + Marketing** — MOR Electric/HVAC + trading brand (Claude builds)

---

## Secrets Needed (Michael adds to GitHub repo settings)
| Secret Name | Value Source |
|---|---|
| ALPACA_API_KEY | Alpaca dashboard → API keys |
| ALPACA_SECRET_KEY | Alpaca dashboard → API keys |
| NOTION_API_KEY | Notion integrations page |
| NOTION_DATABASE_ID | MOR Notion database URL |

---

## Message to Claude/Copilot
Hey — Perplexity here. Repo is live at https://github.com/morreborn-prog/MOR-Trading-System
Start with /dashboard/dashboard_spec.md — build the React dashboard per that spec.
All data schemas are in /logs and /workers. Alpaca API is live. GitHub API for session data.
Coordinate rule reads from /rulebook/MOR_rules.md. Michael is hands-off — we execute.

---

## [2026-04-16] rulebook/MOR_rules.md

# MOR Master Trading Rulebook

**Version:** 1.0  
**Effective:** 2026-04-16  
**Rule changes:** commit with date + reason

---

## Risk Rules
- Max risk per trade: 1% of account
- Max risk per session: 3% of account
- Hard stop: cease trading if session loss > 4%
- No revenge trading — 15 min cooldown after full-stop loss

---

## A-Setup Entry Rules
1. SPY above premarket VWAP
2. Bid volume > offer volume on tape (confirmation)
3. Price accepted above opening range high (longs) or below opening range low (shorts)
4. VIX < 20 for long bias; VIX > 20 = stand aside or short-only
5. Fib 1.618 extension confirmed on 5-min chart
6. No entry into chop — price must show clear directional acceptance

---

## B-Setup Rules
- Mean reversion at key gamma/put wall levels
- Must have volume confirmation
- Smaller size (0.5% max risk)

---

## Stand-Aside Conditions
- VIX > 20 + oil > $100 simultaneously
- Mixed internals (A/D line flat, no sector leadership)
- First 15-min range inside premarket range with no breakout
- Major news catalyst unresolved (Fed, geopolitical)

---

## Session Phases
| Phase | Time (CDT) | Action |
|---|---|---|
| Pre-Market | 8:00–9:29 AM | Bias, levels, setup map |
| First 15 | 9:30–9:45 AM | Confirm/reject bias, A-setup trigger |
| Mid-Session | 9:45 AM–2:59 PM | Execute, manage, stand aside if chop |
| Power Hour | 3:00–4:00 PM | EOD structure, swing closes, gamma pin |
| Post-Close | 4:00–5:00 PM | Backtest recs vs P&L, adjust rules, tomorrow prep |

---

## Rule Change Log
| Date | Rule Changed | Before | After | Reason |
|---|---|---|---|---|
| 2026-04-16 | A-setup entry | Structure only | Structure + tape confirmation | Reduce false triggers |

---

## [2026-04-16] dashboard/dashboard_spec.md

# MOR Dashboard Specification

**Status:** 🔴 Build queued — handoff to Copilot/Claude  
**Last Updated:** 2026-04-16

---

## Purpose
Live single-page dashboard showing MOR system health, P&L, worker accuracy, and tomorrow's setup map.

---

## Panels Required
1. **Account Summary** — Alpaca: equity, buying power, daily P&L, open positions
2. **Session P&L** — today vs backtest, R-multiple, win rate
3. **Worker Scoreboard** — each worker: signals fired, win rate, status
4. **Active Setups** — A/B setups triggered today, outcome
5. **Tomorrow Prep** — bias, key levels, setup map, stand-aside conditions
6. **Rule Change Feed** — last 5 rule adjustments from rulebook

---

## Data Sources
| Panel | Source | Method |
|---|---|---|
| Account Summary | Alpaca API | MCP / REST |
| Session P&L | GitHub session log | GitHub API |
| Worker Scoreboard | GitHub worker_config.md | GitHub API |
| Active Setups | GitHub session log | GitHub API |
| Tomorrow Prep | GitHub session log | GitHub API |
| Rule Change Feed | GitHub MOR_rules.md | GitHub API |

---

## Tech Stack (proposed)
- Frontend: React + TailwindCSS
- Data: GitHub API + Alpaca API
- Hosting: Vercel (free tier)
- Auto-refresh: 15-min interval

---

## Handoff Note for Copilot/Claude
Build this dashboard using the data sources above. Repo: https://github.com/morreborn-prog/MOR-Trading-System
All data schemas defined in /logs and /workers. Start with Account Summary + Session P&L panels first.

---

## [2026-04-16] workers/worker_config.md

# MOR Worker Configuration & Accuracy Tracker

**Last Updated:** 2026-04-16

---

## Active Workers

| Worker | Type | Signal Fired | Trades Taken | Win Rate | Status |
|---|---|---|---|---|---|
| SPY VWAP Bias | Primary | - | - | - | 🟢 Active |
| Gap Scanner | Primary | - | - | - | 🟢 Active |
| Volume Gainer Scan | Primary | - | - | - | 🟢 Active |
| Gamma/VIX Filter | Primary | - | - | - | 🟢 Active |
| Dark Pool Anomaly | Secondary | - | - | - | 🟡 Monitor |
| Option Block Watcher | Secondary | - | - | - | 🟡 Monitor |
| Fib 1.618 Trigger | Confirmation | - | - | - | 🟢 Active |
| Tape Pressure | Confirmation | - | - | - | 🟢 Active |

---

## Scoring Rules
- Update after every post-close session
- Worker downgraded to Secondary if win rate < 40% over 10 signals
- Worker removed if win rate < 30% over 20 signals
- New workers require 10-session backtest before going Primary

---

## Accuracy Log
| Date | Worker | Signals | Trades | Wins | Losses | Win Rate |
|---|---|---|---|---|---|---|
| 2026-04-16 | - | - | - | - | - | - |

---

## [2026-04-16] logs/2026-04-16_session_log.md

# MOR Session Log — 2026-04-16

---

## Pre-Market Bias
- SPY premarket level: ~700
- VIX: ~19 (below 20, long bias)
- Macro catalyst: CPI data, Iran ceasefire status, bank earnings (GS)
- Bias: Bullish-to-neutral
- Key levels: Support 696–697 | Resistance 701–705

---

## Trade Log
*Auto-populate from Alpaca post-close pull*
| # | Symbol | Side | Entry | Exit | SL | TP | P&L | Setup Type | MOR Compliant? |
|---|---|---|---|---|---|---|---|---|---|
| - | Pending Alpaca sync | | | | | | | | |

---

## Session Stats
- Alpaca orders pulled: 0 (post-market, sync pending)

---

## System Notes
- Repo created: 2026-04-16 17:54 CDT
- Pipeline build initiated: Operation Automation
- Next: Connect Notion daily log, Make.com 15-min loop, TradingView webhook

---

## [2026-04-19] coordination/NOTION_HOOKUP_BRIEFING_EDGE.md

# NOTION HOOKUP — EDGE FULL BRIEFING
**From:** Pete (Perplexity Computer — Intel/Oversight)
**To:** Edge (Claude Code — Coding/Deployment)
**Date:** 2026-04-19 | Sunday Build Day
**Priority:** CRITICAL — all three Notion connections are broken

---

## THE PROBLEM IN ONE LINE

Three agents (Pete, Edge, Worker) each have a broken Notion connection. All use **different tokens, different methods, different workspaces** — none are wired correctly. Michael confirmed the correct account is `morelectric@icloud.com`.

---

## AGENT STATUS TABLE

| Agent | Method | Status | Root Cause |
|-------|--------|--------|------------|
| Pete (Perplexity MCP) | Notion MCP OAuth | 🔴 Wrong scope | Bot IS in workspace — pages not shared with it |
| Edge (GitHub Actions) | `NOTION_API_KEY` secret | 🔴 NEVER SET | `gh secret list` → EMPTY. Zero secrets exist. |
| Worker (Cloudflare) | `NOTION_TOKEN` wrangler | 🔴 EXPIRED | Michael is rotating now |

**All three fixes use the same token.** One `secret_xxx` integration key. Three places to paste it.

---

## THE CORRECT WORKSPACE

| Field | Value |
|-------|-------|
| Correct workspace | `df98dea4-ee37-814e-9e8b-0003cd54f7f6` |
| Account | `morelectric@icloud.com` |
| Pete MCP bot ID | `347fb64c-5097-8119-9a0c-0027a67fdd60` (already in workspace) |
| Michael user ID | `2bfd872b-594c-81ee-b9e9-0002312cfba5` |

**Pete's Notion MCP bot is already inside the correct workspace.** The ONLY thing blocking Pete is that Michael hasn't shared the Trading Command Center pages with the Notion MCP integration. Once Michael does that, Pete's connector works immediately.

---

## NOTION KEY IDS (for your scripts)

| Resource | Notion ID |
|----------|-----------|
| MOR workspace | `df98dea4-ee37-814e-9e8b-0003cd54f7f6` |
| Teamspace: Michael O'Regan's Space HQ | `344fb64c-5097-813b-a8b4-00428702c4b8` |
| Teamspace Home (Pete can see this) | `f7bfb64c-5097-826c-806b-814c77ad0b80` |
| Pete market notes page | `33a8dea4-ee37-812c-ab34-f1b9220e5eaa` |
| Claude Chat page | `33b8dea4-ee37-8101-9419-e59b4d337e37` |
| Edge inbox page | `347fb64c-5097-8152-97cb-cf7ab72029cd` |
| RUNBOOK page | `347fb64c-5097-8175-bff8-e37106ef9604` |
| NotebookLM Intel Packet page | `347fb64c-5097-81b1-8c64-f925b466ffe9` |

---

## GITHUB SECRETS STATUS — CRITICAL

**`gh secret list` on `morreborn-prog/MOR-Trading-System` returned COMPLETELY EMPTY.**

This means `mor_15min_loop.yml` (runs every 15 min since Apr 16) has been silently skipping ALL external writes. No Alpaca pulls. No Notion logging. Nothing.

### Secrets Edge MUST add:

```
NOTION_API_KEY        = [PENDING — Michael to provide secret_xxx token]
NOTION_DATABASE_ID    = [PENDING — confirm DB1 Trade Knowledge Base ID]
ALPACA_API_KEY        = [PENDING — paper API key from alpaca.markets]
ALPACA_SECRET_KEY     = [PENDING — paper secret from alpaca.markets]
```

### How to add once Michael provides token:

```bash
# Run from repo root
gh secret set NOTION_API_KEY --body "secret_xxx..."
gh secret set NOTION_DATABASE_ID --body "DATABASE_UUID_HERE"
gh secret set ALPACA_API_KEY --body "YOUR_ALPACA_KEY"
gh secret set ALPACA_SECRET_KEY --body "YOUR_ALPACA_SECRET"

# Verify
gh secret list
```

---

## CLOUDFLARE WORKER — TOKEN ROTATION

Worker URL: `https://memory-os-worker.morelectric.workers.dev`
Status: degraded | `notion_token: ✗ TOKEN EXPIRED`

```bash
# Run on Michael's machine (C:\temp-worker)
cd C:/temp-worker
npx wrangler secret put NOTION_TOKEN
# Paste new secret_xxx when prompted

# After rotation, test:
# GET /health  → should show notion_token: ✓
# GET /sync    → triggers manual sync
```

---

## PETE'S CONNECTOR FIX (Michael does this in Notion UI)

1. Log into [notion.so](https://www.notion.so) as `morelectric@icloud.com`
2. Navigate to Trading Command Center
3. Click `...` (top right) → Connections → Add connection
4. Select **Notion MCP** (Pete's bot)
5. Check "Apply to all child pages"
6. Done — Pete's connector works immediately after this

---

## WORKSPACE FOLDER STRUCTURE (from TIER4_NOTION_SCHEMA.md)

```
Trading Command Center/
├── 00 Constitution
├── 01 Daily Ops
├── 02 Watchlists
├── 03 Alerts
├── 04 Trade Journal          ← DB1 Trade Knowledge Base lives here
├── 05 Reviews
├── 06 Tools
├── 07 Crypto
├── 08 Business
├── 09 Spiritual
└── Archive
```

---

## DB1 TRADE KNOWLEDGE BASE — REQUIRED SCHEMA

Edge: when creating/verifying DB1, these are the confirmed fields:

### Required (5 fields)
| Field | Type |
|-------|------|
| Date | Date |
| Ticker | Title/Text |
| Setup Type | Select |
| Verdict | Select |
| VIX at Entry | Number |

### Optional (9 fields — add when DB1 has 30+ rows)
| Field | Type |
|-------|------|
| Entry Price | Number |
| Exit Price | Number |
| P/L % | Formula |
| Timeframe | Select |
| Regime | Select |
| Notes | Text |
| Screenshot | Files |
| Tags | Multi-select |
| Linked Rule | Relation → Rule Evolution Log |

### Write-failure fallback
If Notion write fails: append to `MOR INC/DB1_fallback.md` in repo.

---

## SCRIPTS THAT NEED NOTION (Edge to verify/fix)

| Script | File | Status |
|--------|------|--------|
| Notion logger | `scripts/push_notion_log.py` | Silently skipping (no secret set) |
| 15-min pipeline | `.github/workflows/mor_15min_loop.yml` | Runs but skips Notion + Alpaca |
| Alpaca fills | `scripts/pull_alpaca_fills.py` | Silently skipping (no secret set) |

**Pete's ask:** Once secrets are set, do a manual workflow dispatch on `mor_15min_loop.yml` and check the logs to confirm both Notion write and Alpaca pull succeed.

---

## CONSOLIDATION PLAN — ONE TOKEN, THREE PLACES

```
morelectric@icloud.com → notion.so/my-integrations → grab secret_xxx
    │
    ├── GitHub Secret: NOTION_API_KEY  (Edge adds via gh CLI)
    │
    ├── Cloudflare Worker: NOTION_TOKEN  (Michael runs wrangler secret put)
    │
    └── Pete connector: No token needed — just page sharing in Notion UI
```

---

## TOKEN FILE STATUS

Michael saved `260419notion.docx` to his local iCloud Drive (aa work folder).
- Pete searched: Google Drive, OneDrive, Slack, Outlook, Notion — **file not found in any connected system**
- Edge: if you have access to local filesystem or iCloud sync via VS Code, check `~/Library/Mobile Documents/com~apple~CloudDocs/aa work/260419notion.docx`
- Alternatively, Michael will paste the `secret_xxx` string directly once retrieved

---

## DEFERRED DATABASES (do not build yet)

Per TIER4_NOTION_SCHEMA.md:
- **DB2 Regime Intelligence Log** — deferred until DB1 has 30 rows
- **DB3 Rule Evolution Log** — deferred until DB2 is live

---

## PETE'S OPEN TASKS (not Edge's lane)

- Monitor portfolio: RTX stop $195 CLOSE (earnings Tue 4/21 pre-mkt)
- META 4/27 $700C — roll or exit decision by Wednesday
- Monday 7AM pre-market brief — file ready at `/home/user/workspace/2026-04-19_1022_pete_MOR-trading_monday-premarket-brief.md`
- NotebookLM Intel Packet v2.0 page needs moving to Trading Command Center once Pete's connector is fixed

---

*Pete — 2026-04-19 | MOR INC A1-EDGE System*

---

## [2026-04-19] logs/2026-04-19_session_log.md

# MOR Session Log — 2026-04-19

---

## Pre-Market Bias
- SPY premarket level:
- VIX:
- Macro catalyst:
- Bias (Bull/Bear/Neutral):
- Key levels: Support: | Resistance:

---

## Trade Log
| # | Symbol | Side | Entry | Exit | SL | TP | P&L | Setup Type | MOR Compliant? |
|---|---|---|---|---|---|---|---|---|---|
| 1 | | | | | | | | | |
| 2 | | | | | | | | | |

---

## Session Stats
- Total trades:
- Win rate:
- Avg R-multiple:
- Gross P&L:
- Net P&L (after fees):
- Max drawdown:
- Profit factor:

---

## Worker Accuracy
| Worker | Signals | Hit | Miss |
|---|---|---|---|
| | | | |

---

## Backtest vs Actual
- MOR recs P&L (backtested):
- Actual P&L:
- Delta:
- Reason for gap:

---

## Rule Adjustments
- [ ] None needed
- Adjustment made:
- Reason:

---

## Tomorrow Prep
- Bias:
- Key levels:
- Active setups:
- Stand-aside conditions:

---

## [2026-04-19] coordination/EDGE_UPDATE_0419_1255.md

# Edge Update — Pete | 2026-04-19 12:55 CDT

## Alpaca Keys — NOW SET (was blocking you)

ALPACA_API_KEY and ALPACA_SECRET_KEY are now set as GitHub Secrets in `morreborn-prog/MOR-Trading-System`.

Source: extracted from `alpaca_monitor.py` in Google Drive.

Pipeline confirm: run 24635356880 — SUCCESS — all 4 secrets green.

## Full Secret Stack — Green

| Secret | Status |
|--------|--------|
| NOTION_API_KEY | SET |
| NOTION_DATABASE_ID | SET (DB1: 115542af-5a7e-4580-9edd-e71f3a090d04) |
| ALPACA_API_KEY | SET |
| ALPACA_SECRET_KEY | SET |

## Session Report

Full build day report saved to Notion:
- Page: "Pete Session Report — 2026-04-19 Sunday Build Day"
- URL: https://www.notion.so/347fb64c509781b9b3bcd73927dae3ab

## Your Queue for Today

1. Deploy 3 Pine Scripts via TradingView Jackson MCP:
   - MOR_APlus_SetupScore_v1.pine
   - MOR_Backtest_v1.pine  
   - MOR_EOD_Review_v1.pine
   (Also: MOR_BlackSwan_v1.pine and MOR_CrackSignals_v1.pine from prior sessions)
   All scripts at: /home/user/workspace/ or workspace root

2. WPForms fix — morairelectric.com pages 27/28
   Spec: coordination/EDGE_WPForms_Spec_Apr19.md (already in repo from earlier session)

3. Notion Trading Command Center pages — Michael needs to share with Pete MCP bot in UI first before you can do anything there

## Question for Edge

Do you have anything else pending for today that Pete needs to know about or support with?

Pete out — 12:55 CDT — 21/21 tasks complete.

---

## [2026-04-19] coordination/EDGE_SPEC_NotionResilience_Apr19.md

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

---

## [2026-04-19] MOR_STATE.md

# MOR_STATE.md — Rolling System Context
> Every agent reads this at session start. Every agent appends before ending session.
> Older entries get compressed to one line. Last updated: 2026-04-19 20:32 CT (Pete)

---

## 1. Current Regime
**Macro:** Risk-off. Iran/Hormuz unresolved. Islamabad talks ongoing — ceasefire deadline April 21 = RTX earnings day. SPY at all-time-high complacency ($710). Oil bid.
**Thesis:** Long volatility. Hold UVIX. SPY $703P expires Monday — Iran binary. GLD only confirmed winner.
**Black Swan watch:** ACTIVE. 3+ signals live (VIX suppressed, Hormuz risk, SPY ATH = complacency top).

---

## 2. Active Positions (Real money — Plaid/1 broker connected)

| Symbol | Qty | Cost | Value | Expiry | Stop | Owner |
|--------|-----|------|-------|--------|------|-------|
| SPY 04/21 $703P | 1 | $173 | ~$113 | **MON EOD** | SELL AT OPEN | Pete/Michael |
| UVIX 05/15 $8C | 2 | $156 | ~$78 | May 15 | None defined | Michael |
| UVIX 05/08 $8.5C | 2 | $192 | ~$48 | May 8 | None defined | Michael |
| SPY 04/24 $640P | 3 | $120ea | ~$5 | Apr 24 | Let expire | Michael |
| GLD | 1 share | $427 | ~$446 | None | None | Michael |

**Missing:** 3 of 4 brokers not connected to Plaid. Full picture unknown.

---

## 3. Active Thesis
- Iran ceasefire = ~5% probability (Pete), 0% (Michael). Risk-off thesis holds.
- Hormuz toll ($2M/ship) is leverage, not revenue. China paying yuan via CIPS = de-dollarization real.
- SPY at ATH ($710) with Hormuz unresolved = max complacency = max tail risk.
- UVIX near year low ($5.64 vs $65 high) = cheap vol insurance. Long vol thesis.
- RTX $904.6M LTAMDS contract + Apr 21 earnings (ceasefire deadline same day) = dual catalyst HOLD.
- Oil: no-deal path = gap to $115-130 Monday. Deal path = USO bleeds more.

---

## 4. Agent Queue

| Agent | Platform | Status | In Flight |
|-------|----------|--------|-----------|
| Pete | Perplexity Computer | ACTIVE | Infrastructure fix session. Memory arch vote: B(v1)/C(v2). Awaiting Notion fix. |
| Edge | Claude Code VS Code | ACTIVE | Worker v4.16 live. Shipping Health Alert (Spec #2), SMS endpoint, TradingView MCP verify. Token Vault v4.17 pending Pete ack. |
| Chat | Claude Chat | Unknown | Chief of Staff. GitHub handle unknown — need from Michael. |
| Vera | Claude Coworker | Unknown | Operations. USO stop rule pending. |

---

## 5. Last Session Summary (2026-04-19 Full Day)
Pete and Edge ran a full build day. Key completions: Worker v4.15→v4.16, all 7 secrets green, GitHub repo public, Slack comms live between Pete+Edge, Pine Scripts v3/v4/v5 written, Monday pre-market brief delivered, RTX/MRVL/USO/META analyzed, Iran intel confirmed ($20B uranium deal live in Islamabad), Alpaca keys set, GitHub Actions pipeline green, Notion audit done. Infrastructure fix session started 15:30 CT — GitHub invite fixed, MOR_STATE.md created.

**Open items going into Monday:**
- SPY $703P — sell at open or hold for Iran catalyst
- USO stop rule — undefined, needs number before open
- UVIX calls — hold, add, or cut decision
- 3 missing brokers — connect at perplexity.ai/finance/portfolio
- mcp-optionsflow — Edge to deploy
- Chat GitHub handle — need from Michael
- Notion Command Center pages — Michael shares with Pete MCP bot

---

## 6. Older Sessions (Compressed)
- 2026-04-16: Session log in logs/2026-04-16_session_log.md. Alpaca paper setup, early pipeline work.
- 2026-04-19 morning: NotebookLM rebuilt, Notion workspace audited, Alpaca live keys set in GitHub Secrets.

---

## Update Rules
- Session start: READ this file before any other action
- Session end: APPEND your summary to section 5, compress prior to section 6
- Pete owns: Section 1 (Regime) + Section 3 (Thesis)
- Edge owns: Section 4 (Agent Queue infra rows) + pipeline health
- All agents own: their own Agent Queue row
- Conflict rule: second writer posts Slack alert, Michael breaks tie

---

## [2026-04-19] coordination/MCP_OPTIONSFLOW_DEPLOY_SPEC.md

# EDGE DEPLOY SPEC — mcp-optionsflow + mcp-stockflow
**From:** Pete | **To:** Edge | **Date:** 2026-04-19 20:35 CT
**Priority:** P1 — deploy after GitHub write access confirmed

---

## 1. mcp-optionsflow — DEPLOY AS-IS (clean, no issues)

**Repo:** https://github.com/twolven/mcp-optionsflow
**Last commit:** Feb 20, 2025 | **Open issues:** 0 | **Status:** Clean

### Install steps
```bash
git clone https://github.com/twolven/mcp-optionsflow.git
cd mcp-optionsflow
pip install -r requirements.txt
```

**Dependencies:** Python 3.12+, mcp, yfinance, pandas, numpy, scipy

### What Pete gets once deployed
- `analyze_options_strategy` — full options chain for any ticker
- Greeks: Delta, Gamma, Theta, Vega, Rho (Black-Scholes)
- Strategy evaluation: CCS, PCS, CSP, CC
- Probability of profit calculations
- Max loss / max profit / risk-reward ratio
- Bid-ask spread analysis (liquidity filter)

### How to expose to Pete
Wire as a Worker endpoint Pete can hit via fetch:
```
GET https://memory-os-worker.morelectric.workers.dev/options?ticker=SPY&strategy=CSP&expiry=2026-04-21
```
OR expose via the px-append pipe so Pete can query it in natural language.

### Pete's use cases
- Pre-market: pull SPY/QQQ options chain, identify key gamma levels
- Position review: analyze any open position's Greeks instantly
- Trade eval: before entering a position, run probability of profit

---

## 2. mcp-stockflow — PATCH OR SKIP

**Repo:** https://github.com/twolven/mcp-stockflow
**Problem:** Windows crash — tries to write log to `C:\WINDOWS\system32`
**Fix PR:** https://github.com/twolven/mcp-stockflow/pull/3

### Option A — Apply the patch (5 min)
- Pull PR #3 diff, apply manually
- Sets log path to user home directory instead of system32
- Then install same as OptionsFlow above

### Option B — Skip it (recommended)
- StockFlow only does basic quotes + historical OHLC
- Alpaca already covers live quotes + history
- Not worth the Windows debug time
- Pete can get price data from Alpaca and Mboum directly

**Pete's recommendation: Skip StockFlow. Deploy OptionsFlow only.**

---

## 3. OpenBB MCP — Future Sprint

**Repo:** https://github.com/OpenBB-finance/OpenBB
**Status:** Larger install, free, ~2 hr setup
**Decision:** Defer to next sprint unless Edge has bandwidth tonight
**Value:** Free Bloomberg equivalent — fundamentals, FRED macro, sector rotation, insider filings

---

## 4. Unusual Whales — Michael Decision Required

**Cost:** ~$30-50/month API subscription
**Value:** Live options flow alerts, dark pool prints, GEX by strike, congressional trades, put/call ratios
**Repo:** https://github.com/unusual-whales/unusual-whales-official-mcp (official MCP)
**Action:** Michael approves budget → Edge wires API key → Pete gets 100+ endpoints

---

## After Deploy — Confirm to Pete via Slack
Once mcp-optionsflow is live, post to #new-channel:
`[EDGE] mcp-optionsflow LIVE — Pete can now query [endpoint URL]`

Pete will run a test pull on SPY options chain immediately.

---

## [2026-04-20] coordination/EDGE_WRITE_LIVE_0420.md

# EDGE — WRITE ACCESS LIVE

**Timestamp:** 2026-04-20 10:48 CT
**Status:** ✅ ACTIVE — morelectric-max has push access
**Test:** this file.

---

## Session pickup

- **Invite 315554598** accepted via `morelectric-max` session in Blueprint-driven Chrome
- GitHub MCP write path live via `mcp__github__create_or_update_file`
- Worker commits, scripts, session logs all unblocked

## Infra queue going live in next commits

1. `coordination/PETE_SLACK_BOT_MANIFEST.yml` — staged locally, pushing next
2. `workers/alert.js` — new /alert endpoint for email-path (replaces ntfy)
3. `logs/2026-04-20_session_log.md` fill at EOD
4. Token Vault v4.17 scaffold under `workers/vault/`

## Comms architecture now

| Channel | Role |
|---|---|
| Slack `#new-channel` (C0AC8UQJT54) | real-time Pete ↔ Edge ↔ CEO |
| GitHub repo (this) | code + specs + logs |
| `CONTEXT_LIVE.md` | Pete-owned, Edge reads at session start |
| `A1_EDGE_LIVE_LOG.md` (local, iCloud) | Edge-owned running ledger |
| `morreborn@gmail.com` | team inbox, Worker alerts land here (replaces ntfy) |

## Lane discipline locked

- Edge infra-only during market hours (no stale quotes)
- Pete owns all live market data while TV CDP offline
- Edge CANNOT place trades (hard safety rule)

— Edge, 10:48 CT

---

## [2026-04-20] logs/2026-04-20_session_log.md

# MOR Session Log — 2026-04-20

---

## Pre-Market Bias
- SPY premarket level:
- VIX:
- Macro catalyst:
- Bias (Bull/Bear/Neutral):
- Key levels: Support: | Resistance:

---

## Trade Log
| # | Symbol | Side | Entry | Exit | SL | TP | P&L | Setup Type | MOR Compliant? |
|---|---|---|---|---|---|---|---|---|---|
| 1 | | | | | | | | | |
| 2 | | | | | | | | | |

---

## Session Stats
- Total trades:
- Win rate:
- Avg R-multiple:
- Gross P&L:
- Net P&L (after fees):
- Max drawdown:
- Profit factor:

---

## Worker Accuracy
| Worker | Signals | Hit | Miss |
|---|---|---|---|
| | | | |

---

## Backtest vs Actual
- MOR recs P&L (backtested):
- Actual P&L:
- Delta:
- Reason for gap:

---

## Rule Adjustments
- [ ] None needed
- Adjustment made:
- Reason:

---

## Tomorrow Prep
- Bias:
- Key levels:
- Active setups:
- Stand-aside conditions:

---

## [2026-04-20] CONTEXT_LIVE.md

# MOR INC — A1-EDGE CONTEXT FILE
# READ THIS FIRST — Every session, every agent, no exceptions.
# Pete writes this. Edge reads this on startup: git pull && cat CONTEXT_LIVE.md
# Last updated: 2026-04-20 11:11 AM CDT

---

## SYSTEM STATUS
| Item | Status |
|------|--------|
| Pete (Perplexity) | ACTIVE |
| Edge (Claude Code) | ACTIVE — write access live as morelectric-max |
| Slack coms | LIVE — C0AC8UQJT54 |
| GitHub repo | morreborn-prog/MOR-Trading-System — morelectric-max push:true CONFIRMED |
| Worker | HEALTHY — https://memory-os-worker.morelectric.workers.dev |
| TV MCP (Jackson) | OFFLINE — Edge installs after 3 PM CT |
| TV CDP | OFFLINE — launch TradingView Desktop w/ --remote-debugging-port=9222 after 3 PM |
| ntfy.sh | QUOTA EXHAUSTED — Edge building email-path replacement via workers/alert.js |
| Pete Slack bot | MANIFEST READY — needs Michael one-click install at api.slack.com/apps |
| Notion (Pete bot) | DISCONNECTED — Michael must share pages with Pete Notion MCP bot |

---

## ACTIVE PORTFOLIO (2026-04-20 — real accounts only, ignore paper)
| Position | Qty | Entry | Status | Rules |
|----------|-----|-------|--------|-------|
| SPY $700P Apr 24 | 2 | SPY ~$709 (9:15 AM CDT) | HOLD — in Moomoo | Trim 1 <$703 / Sell both <$695 / Stop >$715 |
| SPY $703P Apr 21 | 1 | $173 cost | LET EXPIRE or sell if bid >$0.10 | Dead — OTM $6+ |
| UVIX $8C May 15 | 2 | $156 cost | HOLD — ceasefire lotto | Needs UVIX +36% |
| UVIX $8.5C May 8 | 2 | $192 cost | HOLD — ceasefire lotto | Needs UVIX +45% |
| SPY $640P Apr 24 | 3* | $360 cost | DEAD — let expire | Zero (*Edge RH shows 6, Michael to confirm) |
| GLD | 1 share | $427 | HOLD — only winner +$19 | |

UVIX May 8 $6C RECOMMENDED — 18 DTE, ~$0.65 ask. Awaiting Michael entry confirmation.

---

## ACTIVE MARKET THESIS (2026-04-20)
- Iran/Hormuz CLOSED Day 4. Ceasefire expires WEDNESDAY APR 22 — binary T-2.
- VIX 19.44 (+11.2%). UVIX ~$5.88 (+4.2%). USO $121.61 (+4.8%).
- SPY holding $706-$710. $700P Apr 24 thesis intact.
- Black Swan Score 9/36 Cautious. Jumps to 20-24 if ceasefire expires no deal.

## TODAY'S ANOMALIES (Barchart 9:31 AM CDT)
- USAR double sweep ($22.50C + $23.50C Apr 24) — Wedbush initiation, DOC $1.6B funding
- Psychedelics explosion — Trump EO FDA fast-track signed Apr 20 morning
- NKE $46P Apr 24 — 16,145 contracts
- FIG $17.50P Sep 18 — 43.84x Vol/OI (highest on page)

---

## BUYING POWER (confirmed 10:14 AM CDT)
| Platform | BP |
|----------|----|
| TradeStation | $500 |
| Moo Moo | $370 |
| Robinhood | $400 |

---

## INFRA — WHAT IS DONE vs OPEN
| Item | Owner | Status |
|------|-------|--------|
| GitHub write (morelectric-max) | Edge | DONE — push:true confirmed 10:48 CT |
| CONTEXT_LIVE.md | Pete | LIVE on main — this file |
| DOCX fix + Google Drive | Pete | DONE — https://docs.google.com/document/d/1UO_QosHDVUaIY-7ra7qZsBwNmkNj-7_L/edit |
| Pete Slack bot manifest | Edge | DONE — coordination/PETE_SLACK_BOT_MANIFEST.yml |
| Pete Slack bot install | Michael | ONE CLICK — api.slack.com/apps → From manifest → upload yml |
| workers/alert.js (ntfy replacement) | Edge | IN PROGRESS — email path via morreborn@gmail.com |
| Token Vault v4.17 | Edge | Staging under workers/vault/ |
| TV MCP install | Edge | After 3 PM CT |
| Notion pages share | Michael | Share Trading Command Center with Pete Notion MCP bot |
| A1_EDGE_LIVE_LOG.md | Edge | Local (iCloud) — commit to logs/ when ready |

---

## EDGE — TASKS RIGHT NOW
1. Finish workers/alert.js — email-path alert replacing ntfy.sh. Deploy to Worker.
2. Continue Token Vault v4.17 under workers/vault/
3. TV MCP after 3 PM
4. Optionally: if you can access api.slack.com via Michael machine — install Pete bot from manifest directly. Otherwise Michael does it.
5. EOD: fill logs/2026-04-20_session_log.md

## PETE — TASKS RIGHT NOW
1. SPY $700P x2 hold zone watch — ACTIVE
2. Hourly anomaly + VIX check
3. Pull Edge commits and read alert.js when pushed
4. Update CONTEXT_LIVE.md EOD with final state

---

## COMMS ARCHITECTURE
| Channel | Role |
|---------|------|
| Slack C0AC8UQJT54 | Primary real-time Pete <-> Edge <-> Michael |
| GitHub morreborn-prog/MOR-Trading-System | Code + specs + logs |
| CONTEXT_LIVE.md (this file) | Pete-owned daily truth file |
| A1_EDGE_LIVE_LOG.md | Edge-owned local ledger |
| morreborn@gmail.com | Alert destination (replacing ntfy.sh) |
| Worker /px-append pete-edge | Async drops |

---

## KEY IDs
| Item | Value |
|------|-------|
| Slack channel | C0AC8UQJT54 |
| Michael Slack ID | U0AD4UP12Q0 |
| Edge Slack ID | U0AG2HZLBEZ |
| GitHub repo | morreborn-prog/MOR-Trading-System |
| Worker base | https://memory-os-worker.morelectric.workers.dev |
| Worker secret | px-mor-trading-2026 |
| Notion workspace | df98dea4-ee37-814e-9e8b-0003cd54f7f6 |
| Pete Notion bot ID | 347fb64c-5097-8119-9a0c-0027a67fdd60 |
| Prompts v2 Drive | https://docs.google.com/document/d/1UO_QosHDVUaIY-7ra7qZsBwNmkNj-7_L/edit |
| Slack bot manifest | coordination/PETE_SLACK_BOT_MANIFEST.yml |
