# MOR INC — CONTEXT FILE
# READ THIS FIRST — Every session, every agent, no exceptions.
# Last updated: 2026-08-16 19:42 UTC (Edge — Cursor Cloud)

---

## SYSTEM STATUS

| Item | Status |
|------|--------|
| Edge (Cursor Cloud) | ACTIVE — this session |
| Pete (Perplexity) | UNKNOWN — last referenced April 2026 |
| GitHub repo | ✅ LIVE — morreborn-prog/MOR-Trading-System |
| GitHub Actions | ✅ RUNNING — 15-min loop (empty templates) |
| Cloudflare Worker | 🔴 DOWN — error 1042 on all endpoints |
| Dashboard | ✅ CODE ON MAIN — no live data (Worker down) |
| Tradier account | ❓ UNKNOWN — Worker down, no direct access |
| Coinbase | ❓ UNKNOWN — never configured |
| Slack (C0AC8UQJT54) | ❓ UNKNOWN — Worker-dependent |
| Notion | ❓ UNKNOWN — Worker-dependent |
| TradingView MCP | OFFLINE — requires local Windows desktop |

---

## ACTIVE PORTFOLIO (UNKNOWN — Worker down)

Last confirmed (2026-06-03 via Worker /tradier):
- Tradier account 6YB77278: $52.56 equity, $1.56 cash
- NVDA 06/03 $235C x2 ($72 cost) — EXPIRED
- SPY 06/05 $741P x1 ($27 cost) — EXPIRED

Current positions unknown until Worker is restored or Tradier is accessed directly.

---

## INFRASTRUCTURE — WHAT WORKS vs BROKEN

| Item | Status | Fix |
|------|--------|-----|
| Dashboard code | ✅ On main | `cd dashboard && npm run dev` |
| `pull_tradier_fills.py` | ✅ On main | Needs TRADIER_TOKEN in GitHub Secrets |
| Worker (all endpoints) | 🔴 Error 1042 | Check CF dashboard — likely needs `global_fetch_strictly_public` flag or redeploy |
| GitHub Secrets (Tradier) | ⚠️ NOT SET | Michael adds TRADIER_TOKEN + TRADIER_ACCOUNT_ID |
| Dependabot PR #5 | 🟡 Open since Jun 14 | Trivial merge |

---

## KEY IDs

| Item | Value |
|------|-------|
| Slack channel | C0AC8UQJT54 |
| Michael Slack ID | U0AD4UP12Q0 |
| GitHub repo | morreborn-prog/MOR-Trading-System |
| Worker base | https://memory-os-worker.morelectric.workers.dev (DOWN) |
| Worker secret | px-mor-trading-2026 |
| Tradier account | 6YB77278 |
| Notion workspace | df98dea4-ee37-814e-9e8b-0003cd54f7f6 |

---

## PRIORITY ACTIONS (for Michael)

1. **Fix Worker** — Go to Cloudflare dashboard → Workers & Pages → memory-os-worker → check recent deploys or add `global_fetch_strictly_public` compatibility flag
2. **Add GitHub Secrets** — TRADIER_TOKEN + TRADIER_ACCOUNT_ID so pipeline works independently
3. **Confirm positions** — What's currently open in Tradier/Coinbase?
