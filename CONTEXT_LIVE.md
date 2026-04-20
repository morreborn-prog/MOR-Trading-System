# MOR INC — A1-EDGE CONTEXT FILE
# READ THIS FIRST — Every session, every agent, no exceptions.
# Pete writes this. Edge reads this on startup.
# Last updated: 2026-04-20 10:31 AM CDT

---

## SYSTEM STATUS
| Item | Status |
|------|--------|
| Pete (Perplexity) | ACTIVE |
| Edge (Claude Code) | ACTIVE — awaiting GitHub invite accept + TV MCP install |
| Slack coms | LIVE — C0AC8UQJT54 |
| GitHub repo | morreborn-prog/MOR-Trading-System |
| Worker | HEALTHY — https://memory-os-worker.morelectric.workers.dev |
| TV MCP (Jackson) | OFFLINE — Edge action pending |
| TV CDP | OFFLINE — needs Desktop launch w/ port 9222 |

---

## ACTIVE PORTFOLIO (as of 2026-04-20 market open)
| Position | Qty | Entry | Status | Rules |
|----------|-----|-------|--------|-------|
| SPY $700P Apr 24 | 2 | SPY ~$709 (9:15 AM CDT) | HOLD | Trim 1 if SPY < $703 / Sell both if SPY < $695 / Stop if SPY > $715 |
| SPY $703P Apr 21 | 1 | $173 cost | LET EXPIRE or sell if bid > $0.10 | OTM $6+, essentially dead |
| UVIX $8C May 15 | 2 | $156 cost | HOLD — ceasefire lotto | Needs UVIX +36% |
| UVIX $8.5C May 8 | 2 | $192 cost | HOLD — ceasefire lotto | Needs UVIX +45% |
| SPY $640P Apr 24 | 3 | $360 cost | DEAD — let expire | Basically zero |
| GLD | 1 share | $427 | HOLD — only winner +$19 | |

---

## ACTIVE MARKET THESIS (2026-04-20)
- Iran/Hormuz: CLOSED. USS Spruance seized Iranian vessel Touska Apr 19.
- Ceasefire expires WEDNESDAY APR 22 — this is the binary event.
- VIX creeping up. UVIX at $5.89 (+4.5%). Oil bid. GLD bid.
- SPY $700P Apr 24 thesis: SPY breaks $703 on no-deal Wednesday.
- UVIX May 8 $6C recommended (18 DTE, $0.65 ask) — longer theta buffer.

## TODAY'S ANOMALIES (Barchart — confirmed live 9:31 AM CDT)
- USAR: Double sweep ($22.50C + $23.50C Apr 24) — Wedbush initiation, DOC funding
- Psychedelics (CMPS +38%, ATAI +29%, GHRS +25%) — Trump EO fast-track FDA
- TSLA put sellers at $390-400 — smart money bullish below $400
- FIG $17.50P Sep 18 — 43.84x Vol/OI, highest anomaly on page. Figma bear play.
- NKE $46P Apr 24 — 16,145 contracts, macro bear

---

## BUYING POWER (confirmed 10:14 AM CDT)
| Platform | BP |
|----------|----|
| TradeStation | $500 |
| Moo Moo | $370 |
| Robinhood | $400 |

---

## EDGE — YOUR TASKS TODAY
1. Accept GitHub invite: https://github.com/morreborn-prog/MOR-Trading-System/invitations (morelectric-max account)
2. Confirm: Claude Code CLI or browser-based? This determines TV MCP path.
3. If CLI: run TV MCP one-shot install (see Slack 10:14 AM CDT)
4. Launch TradingView Desktop with: tradingview.exe --remote-debugging-port=9222
5. Run tv_health_check → confirm cdp_connected: true → post result to Slack
6. Build Pete Slack bot user (Pete has no dedicated Slack identity — needs one)
7. Fix DOCX syntax error at /home/user/workspace/build_prompts_doc.js line ~206
8. Create stub CONTEXT_LIVE.md in repo (Pete fills daily)

## PETE — ACTIVE TASKS
1. Market monitoring — SPY $700P x2 watch levels during market hours
2. Anomaly/smart money scans — running hourly
3. UVIX May 8 $6C entry recommendation — awaiting Michael confirmation
4. DOCX fix post-market
5. Write CONTEXT_LIVE.md EOD

---

## COMMS ARCHITECTURE
- Slack C0AC8UQJT54 = primary real-time channel
- Pete posts as morelectric (Perplexity Computer tag at bottom)
- Edge posts as @Claude (U0AG2HZLBEZ)
- Pete Slack bot = PENDING Edge build
- GitHub repo = shared memory for code + specs
- Worker /px-append pete-edge page = async drops

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
