# MOR INC — A1-EDGE CONTEXT FILE
# READ THIS FIRST — Every session, every agent, no exceptions.
# Pete writes this. Edge reads this on startup.
# Last updated: 2026-04-20 10:47 AM CDT

---

## SYSTEM STATUS
| Item | Status |
|------|--------|
| Pete (Perplexity) | ACTIVE |
| Edge (Claude Code) | ACTIVE — GitHub write pending invite accept |
| Slack coms | LIVE — C0AC8UQJT54 |
| GitHub repo | morreborn-prog/MOR-Trading-System (public) |
| Worker | HEALTHY — https://memory-os-worker.morelectric.workers.dev |
| TV MCP (Jackson) | OFFLINE — Edge installs after 3 PM CT |
| TV CDP | OFFLINE — launch TradingView Desktop w/ --remote-debugging-port=9222 |
| ntfy.sh | QUOTA EXHAUSTED (429) — upgrade before Tuesday open |
| Notion (Pete bot) | DISCONNECTED — Michael must share pages with Pete's Notion MCP bot |

---

## ACTIVE PORTFOLIO (as of 2026-04-20 market open)
| Position | Qty | Entry | Status | Rules |
|----------|-----|-------|--------|-------|
| SPY $700P Apr 24 | 2 | SPY ~$709 (9:15 AM CDT) | HOLD — in Moomoo | Trim 1 if SPY <$703 / Sell both if SPY <$695 / Stop if SPY >$715 |
| SPY $703P Apr 21 | 1 | $173 cost | LET EXPIRE or sell if bid >$0.10 | OTM $6+, dead |
| UVIX $8C May 15 | 2 | $156 cost | HOLD — ceasefire lotto | Needs UVIX +36% |
| UVIX $8.5C May 8 | 2 | $192 cost | HOLD — ceasefire lotto | Needs UVIX +45% |
| SPY $640P Apr 24 | 3* | $360 cost | DEAD — let expire | Zero (*Edge RH scrape shows 6 — Michael to confirm) |
| GLD | 1 share | $427 | HOLD — only winner +$19 | |

---

## ACTIVE MARKET THESIS (2026-04-20)
- Iran/Hormuz: CLOSED Day 4. USS Spruance seized Iranian vessel Touska Apr 19.
- Ceasefire expires WEDNESDAY APR 22 — binary event T-2 days.
- VIX 19.44 (+11.2%). UVIX $5.88 (+4.2%). USO $121.61 (+4.8%). Oil bid.
- SPY holding $706–$710 range. $700P Apr 24 thesis intact.
- UVIX May 8 $6C recommended (18 DTE, ~$0.65 ask) — awaiting Michael confirmation.

## TODAY'S ANOMALIES (Barchart — confirmed live 9:31 AM CDT)
- USAR: Double sweep ($22.50C + $23.50C Apr 24) — Wedbush initiation, DOC $1.6B funding
- Psychedelics (CMPS +38%, ATAI +29%) — Trump EO FDA fast-track signed Apr 20
- NKE $46P Apr 24 — 16,145 contracts, macro bear
- FIG $17.50P Sep 18 — 43.84x Vol/OI highest on page, Figma bear

---

## BUYING POWER (confirmed 10:14 AM CDT)
| Platform | BP |
|----------|----|
| TradeStation | $500 |
| Moo Moo | $370 |
| Robinhood | $400 |

---

## EDGE — YOUR TASKS (updated 10:47 AM CDT)
| # | Task | Status |
|---|------|--------|
| 1 | Accept GitHub invite 315554598 (morelectric-max) | BLOCKING — Michael clicking when back |
| 2 | TV MCP install (Jackson repo) | After 3 PM CT |
| 3 | Launch TV Desktop: `tradingview.exe --remote-debugging-port=9222` | After 3 PM CT |
| 4 | ntfy.sh paid plan upgrade | URGENT — before Tuesday open |
| 5 | Draft Pete Slack bot manifest (chat:write, channels:history, app_mentions:read) | In progress — paste in Slack or coordination/ |
| 6 | Push staged commits once GitHub write live | Waiting on invite |
| 7 | Commit A1_EDGE_LIVE_LOG.md to repo once write live | Waiting on invite |
| 8 | DOCX fix | DONE BY PETE — crossed off |

## PETE — ACTIVE TASKS (updated 10:47 AM CDT)
| # | Task | Status |
|---|------|--------|
| 1 | SPY $700P x2 watch — hold zone $705–$712 | ACTIVE during hours |
| 2 | Hourly anomaly + VIX scan | Active |
| 3 | UVIX May 8 $6C entry confirmation | Awaiting Michael |
| 4 | DOCX syntax fix + Google Drive upload | DONE — https://docs.google.com/document/d/1UO_QosHDVUaIY-7ra7qZsBwNmkNj-7_L/edit |
| 5 | Update CONTEXT_LIVE.md EOD | Ongoing |

---

## COMMS ARCHITECTURE
- Slack C0AC8UQJT54 = primary real-time channel
- Pete posts as morelectric (Perplexity Computer tag)
- Edge posts as @Claude (U0AG2HZLBEZ)
- Pete Slack bot = Edge drafting manifest — needs Michael as workspace admin to activate
- GitHub repo = shared memory for code + specs
- CONTEXT_LIVE.md = Pete writes daily (this file). Edge reads on every session start.
- A1_EDGE_LIVE_LOG.md = Edge writes locally, commits to logs/ (Layer 1 local memory)
- Worker /px-append pete-edge page = async drops (secret: px-mor-trading-2026)

---

## NOTION STATUS (blocking — needs Michael action)
- Pete's Notion MCP bot IS in workspace df98dea4-ee37-814e-9e8b-0003cd54f7f6
- Pete bot ID: 347fb64c-5097-8119-9a0c-0027a67fdd60
- BLOCKER: Michael must share Trading Command Center pages with the Notion MCP integration
- Edge GitHub Actions secret NOTION_API_KEY: NEVER SET — Edge to add once GitHub write live
- Worker NOTION_TOKEN: expired — Michael to rotate

---

## KEY IDs
| Item | Value |
|------|-------|
| Slack channel | C0AC8UQJT54 |
| Michael Slack ID | U0AD4UP12Q0 |
| Edge Slack ID | U0AG2HZLBEZ |
| GitHub repo | morreborn-prog/MOR-Trading-System |
| GitHub invite ID | 315554598 (morelectric-max — PENDING) |
| Worker base | https://memory-os-worker.morelectric.workers.dev |
| Worker secret | px-mor-trading-2026 |
| Notion workspace | df98dea4-ee37-814e-9e8b-0003cd54f7f6 |
| Pete Notion bot ID | 347fb64c-5097-8119-9a0c-0027a67fdd60 |
| Prompts v2 Drive | https://docs.google.com/document/d/1UO_QosHDVUaIY-7ra7qZsBwNmkNj-7_L/edit |
