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
