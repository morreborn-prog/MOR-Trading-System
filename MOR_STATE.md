# MOR_STATE.md — Rolling System Context
> Every agent reads this at session start. Every agent appends before ending session.
> Older entries get compressed to one line. Last updated: 2026-04-19 20:32 CT (Pete)

---

## ⚠️ STANDING SYSTEM RULE — CONNECTOR INTEGRITY (Pete / CEO Order — 2026-05-05)

**ALL connectors are expected to be LIVE and WORKING at ALL times.**
This is not optional. Connectors that have been working include:
- Notion MCP
- GitHub MCP
- Slack MCP
- TradingView / Bridge
- Any broker API (TradeStation, Coinbase, etc.)

**If ANY connector fails to respond, is unavailable, or returns errors:**
1. 🔴 FLAG IT IMMEDIATELY — do not proceed as if it is normal
2. LOG IT in Slack (C0AC8UQJT54) with timestamp and what failed
3. STOP any dependent tasks until it is resolved or workaround is confirmed by Michael
4. Do NOT silently skip Notion reads, memory checks, or context loads because a connector is down — that degrades system integrity

> "Any connector not working is a problem. They are all supposed to be working and have been working." — Michael O'Regan, CEO, 2026-05-05

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

## 5. Last Session Summary (2026-05-31 — Edge Infrastructure Build)
Edge (Cursor Cloud) completed broker migration. Dashboard now runs from this repo with Tradier (options/stocks) + Coinbase (crypto). Alpaca deprecated. PR #3 merged. CEO inbox summary delivered.

**Completed:**
- Dashboard rewritten: 7 panels, Tradier + Coinbase integration
- `pull_tradier_fills.py` replaces Alpaca in 15-min GitHub Actions loop
- AGENTS.md updated with new broker docs

**Open items:**
- Michael adds `TRADIER_TOKEN` + `TRADIER_ACCOUNT_ID` to GitHub secrets
- Michael adds Coinbase API keys for dashboard crypto panel
- Dashboard Vercel deployment (not yet done)
- Scalp Watch worker → dashboard panel connection
- Session-end ritual automation (Worker endpoint)

---

## 6. Older Sessions (Compressed)
- 2026-05-02: Edge (Cursor Cloud) initial dev environment setup. Dashboard v1 built (Alpaca). PR #1 merged.
- 2026-04-19: Pete + Edge full build day. Worker v4.15→v4.16, all 7 secrets green, GitHub repo public, Slack comms live, Pine Scripts written, Notion audit done.
- 2026-04-16: Session log in logs/2026-04-16_session_log.md. Alpaca paper setup, early pipeline work.

---

## Update Rules
- Session start: READ this file before any other action
- Session end: APPEND your summary to section 5, compress prior to section 6
- Pete owns: Section 1 (Regime) + Section 3 (Thesis)
- Edge owns: Section 4 (Agent Queue infra rows) + pipeline health
- All agents own: their own Agent Queue row
- Conflict rule: second writer posts Slack alert, Michael breaks tie
