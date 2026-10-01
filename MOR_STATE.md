# MOR_STATE.md — Rolling System Context
> Every agent reads this at session start. Every agent appends before ending session.
> Last updated: 2026-08-16 19:42 UTC (Edge — Cursor Cloud)

---

## ⚠️ STANDING SYSTEM RULE — CONNECTOR INTEGRITY (Pete / CEO Order — 2026-05-05)

**ALL connectors are expected to be LIVE and WORKING at ALL times.**
This is not optional. Connectors that have been working include:
- Notion MCP
- GitHub MCP
- Slack MCP
- TradingView / Bridge
- Any broker API (Tradier, Coinbase, etc.)

**If ANY connector fails to respond, is unavailable, or returns errors:**
1. 🔴 FLAG IT IMMEDIATELY — do not proceed as if it is normal
2. LOG IT in Slack (C0AC8UQJT54) with timestamp and what failed
3. STOP any dependent tasks until it is resolved or workaround is confirmed by Michael
4. Do NOT silently skip Notion reads, memory checks, or context loads because a connector is down — that degrades system integrity

> "Any connector not working is a problem. They are all supposed to be working and have been working." — Michael O'Regan, CEO, 2026-05-05

---

## 🔴 ACTIVE ISSUES (2026-08-16)

| Issue | Status | Impact |
|-------|--------|--------|
| Cloudflare Worker (memory-os-worker.morelectric.workers.dev) | 🔴 DOWN — error 1042 | Dashboard has no live data, Tradier pipeline broken, Slack alerts dead |
| GitHub Secrets (TRADIER_TOKEN, TRADIER_ACCOUNT_ID) | ⚠️ NOT SET | 15-min pipeline can't pull fills independently of Worker |
| Session logs | ⚠️ Empty templates | Pipeline creates files but no data populates |

**Worker error 1042** = "Worker tried to fetch from another Worker on the same zone." Needs Cloudflare dashboard investigation — either redeploy with `global_fetch_strictly_public` flag, or check for recent config changes.

---

## 1. Current Regime
**Status:** Unknown — Worker down, no live data feed since early June 2026.
**Last known (Jun 3):** Tradier account $52.56 equity. Positions: NVDA $235C x2 (Jun 3 expiry), SPY $741P x1 (Jun 5 expiry). Both likely expired by now.
**Brokers:** Tradier (options/stocks), Coinbase (crypto). Alpaca deprecated.

---

## 2. Active Positions
**Unknown** — Worker is down. Last confirmed positions (Jun 3 2026):
- NVDA 06/03 $235C x2 — likely expired
- SPY 06/05 $741P x1 — likely expired

Tradier account: 6YB77278. Need Worker or direct API access to check current state.

---

## 3. Infrastructure Status

| Component | Status | Notes |
|-----------|--------|-------|
| GitHub repo | ✅ LIVE | 15-min pipeline running (empty templates) |
| Dashboard code | ✅ On main | Worker-integrated (PR #4 merged Jun 15) |
| Cloudflare Worker v4.21 | 🔴 DOWN | Error 1042 since unknown date |
| Tradier API (direct) | ❓ Unknown | Keys in Worker KV, not in GitHub Secrets |
| Coinbase API | ❓ Unknown | Keys never configured |
| Notion MCP | ❓ Unknown | Was "verified" per Worker /diag Jun 3 |
| Slack (C0AC8UQJT54) | ❓ Unknown | Depends on Worker for bot delivery |
| GitHub Actions | ✅ Running | Creates empty session log templates |

---

## 4. Agent Queue

| Agent | Platform | Status | Last Active |
|-------|----------|--------|-------------|
| Edge | Cursor Cloud | ACTIVE | This session (Aug 16) |
| Pete | Perplexity | Unknown | Last referenced in April docs |
| Chat | Claude Chat | Unknown | Never confirmed active |
| Vera | Claude Coworker | Unknown | Never confirmed active |

---

## 5. Last Session Summary (2026-08-16 — Edge Cleanup)
Edge (Cursor Cloud) session start. Found Worker DOWN (error 1042). Cleaned up stale documentation — MOR_STATE.md and CONTEXT_LIVE.md were referencing April 2026 positions and thesis (4 months stale). Updated to reflect current reality.

**Completed:**
- Updated MOR_STATE.md to current state
- Updated CONTEXT_LIVE.md to current state
- Flagged Worker 1042 issue
- Merged dependabot PR #5

**Blocking items (need Michael):**
- Cloudflare Worker needs investigation/redeploy from CF dashboard
- Add TRADIER_TOKEN + TRADIER_ACCOUNT_ID to GitHub Secrets as backup
- Confirm current trading positions and thesis

---

## 6. Older Sessions (Compressed)
- 2026-06-03: Edge (Cursor Cloud) wired dashboard to Worker. Live data confirmed ($52.56 equity, NVDA/SPY positions). PR #4 merged Jun 15.
- 2026-05-31: Edge (Cursor Cloud) broker migration Alpaca → Tradier + Coinbase. PR #3 merged.
- 2026-05-02: Edge (Cursor Cloud) initial dev env setup. Dashboard v1. PR #1 merged.
- 2026-04-19: Pete + Edge full build day. Worker v4.15→v4.16, all 7 secrets green.
- 2026-04-16: Alpaca paper setup, early pipeline work.

---

## Update Rules
- Session start: READ this file before any other action
- Session end: APPEND your summary to section 5, compress prior to section 6
- Pete owns: Section 1 (Regime) + Section 3 (Thesis) — when active
- Edge owns: Section 3 (Infrastructure) + Section 4 (Agent Queue)
- All agents own: their own Agent Queue row
- Conflict rule: second writer posts Slack alert, Michael breaks tie
