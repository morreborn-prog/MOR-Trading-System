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
