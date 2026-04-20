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
