# MOR INC — FULL CAPABILITY INVENTORY
**Filed:** 260421 · 05:19 CT · Pete (Perplexity Computer)
**Rule:** This doc is the source of truth for "what can we do right now." Updated every session. Edge updates his rows. Chief 2.0 owns filing.

---

## STATUS KEY
- ✅ LIVE — confirmed working this session or last session
- ⚠️ INSTALLED / NOT CONFIRMED — exists but not verified in current environment
- 🔧 INSTALLED / NOT USED — have it, nobody using it
- 🔴 NOT INSTALLED — on the list, not done
- 🚫 BLOCKED — waiting on CEO action or external dependency

---

## LAYER 1 — PETE (Perplexity Computer) · Intel & IT

### Market Intelligence
| Capability | Tool | Status | Last Used |
|---|---|---|---|
| Live quotes — stocks, ETFs, crypto | Finance connector | ✅ LIVE | 260421 04:59 CT |
| Pre-market / AH prices | Finance connector | ✅ LIVE | 260421 04:59 CT |
| Options flow — unusual activity | Finnhub connector | ✅ LIVE | 260420 |
| Earnings calendar + EPS consensus | Finance connector | ✅ LIVE | 260421 |
| Analyst ratings + price targets | Finnhub connector | ✅ LIVE | 260421 |
| Insider transactions | Finance connector | ✅ LIVE | 260420 |
| Institutional holdings | Finance connector | ⚠️ NOT USED YET | — |
| Congressional trades | Finance connector | ⚠️ NOT USED YET | — |
| Dark pool / smart money flags | Web search + Finnhub | ✅ LIVE | 260420 |
| Macro snapshot (VIX, SPY, QQQ, oil) | Finance + web | ✅ LIVE | 260421 |
| Sector rotation reads | Finance connector | ⚠️ NOT USED YET | — |
| Black Swan Radar (multi-signal) | Web + Finnhub + rules | ✅ LIVE | 260420 |
| Clark Kent intel feed | Notion + web | ✅ LIVE | 260421 |
| Options Greeks + strategy eval | mcp-optionsflow (via Edge) | 🔴 NOT DEPLOYED | Edge Sprint 1 |
| Gamma walls / GEX | Web search (free tier) | 🔧 NOT USED | — |

### Portfolio & Execution
| Capability | Tool | Status | Last Used |
|---|---|---|---|
| Paper portfolio pull (full P&L) | Alpaca connector | ✅ LIVE | 260421 04:11 CT |
| Paper order execution (autonomous) | Alpaca connector | ✅ LIVE | Available |
| Real money portfolio (Plaid) | Plaid connector | ⚠️ PARTIAL — 1 of 4 brokers | 260420 |
| TradeStation positions | TS API (Edge building) | 🚫 BLOCKED — CEO must register dev app | — |
| Moomoo positions | Machine access (Edge) | ⚠️ DEPRECATED — dropping | — |

### Communications & Filing
| Capability | Tool | Status | Last Used |
|---|---|---|---|
| Slack messaging | Slack connector | ✅ LIVE | 260421 |
| Email (Outlook) | Outlook connector | ✅ LIVE | — |
| Calendar (GCal) | GCal connector | ✅ LIVE | — |
| Notion read/write | Notion MCP | ✅ LIVE | 260421 |
| Google Drive | GDrive connector | ✅ LIVE | 260420 |
| OneDrive | OneDrive connector | ✅ LIVE | — |
| SharePoint | SharePoint connector | ✅ LIVE | — |

### Extended Intel
| Capability | Tool | Status | Last Used |
|---|---|---|---|
| Browser automation (complex sites) | Airtop connector | ✅ LIVE | — |
| HARPA AI (alt web search) | HARPA connector | ✅ LIVE | — |
| YouTube analytics (MOR channel) | YT Analytics connector | ✅ LIVE | — |
| Academic research | search_vertical academic | ✅ LIVE | — |
| Image search | search_vertical image | ✅ LIVE | — |
| Live voice / stream | LiveKit connector | ✅ LIVE | — |
| Facebook Pages | FB Pages connector | ✅ LIVE | — |

### Code & IT
| Capability | Tool | Status | Notes |
|---|---|---|---|
| Pine Script v5 authoring | Pete writes, Edge deploys | ✅ LIVE | 3 scripts ready in GitHub |
| Spec writing (all formats) | Pete native | ✅ LIVE | — |
| Python scripting | Pete + bash sandbox | ✅ LIVE | — |
| Worker endpoint specs | Pete writes, Edge builds | ✅ LIVE | — |
| NotebookLM packet generation | Pete native | ✅ LIVE | 4 packets filed |

---

## LAYER 2 — EDGE (Claude Code / VS Code) · Trading & Deployment

### TradingView Stack — THE GAP AREA
| Capability | Pack | Status | Action Needed |
|---|---|---|---|
| TV MCP health check | Jackson MCP (Pack 1) | ⚠️ NOT CONFIRMED in desktop | Run tv_health_check NOW |
| Live chart read (DOM/data layer) | Jackson MCP (Pack 1) | ⚠️ NOT CONFIRMED | Requires tv_health_check green |
| Draw support/resistance levels | Jackson MCP (Pack 1) | ⚠️ NOT CONFIRMED | — |
| Set TV alerts (price, vol spike) | Jackson MCP (Pack 1) | ⚠️ FLAKY — alt+A manual | — |
| Scan watchlist for A+ setups | Jackson MCP (Pack 1) | ⚠️ NOT CONFIRMED | — |
| Deploy Pete's Pine Scripts | Jackson MCP (Pack 1) | ⚠️ NOT CONFIRMED | 3 scripts waiting in GitHub |
| Backtest strategies | Jackson MCP (Pack 1) | ⚠️ UNTESTED | — |
| bar_replay practice orders | Jackson MCP (Pack 1) | ⚠️ UNTESTED | — |
| batch_run multi-symbol scan | Jackson MCP (Pack 1) | ⚠️ UNTESTED | — |
| **Trade EXECUTION via rules.json** | **Jackson Execution Pack (Pack 2)** | **🔧 NOT USED** | **Install + wire to Alpaca/TS** |
| **Safety check log (per trade)** | **Jackson Execution Pack (Pack 2)** | **🔧 NOT USED** | — |
| **Tax-ready trade CSV** | **Jackson Execution Pack (Pack 2)** | **🔧 NOT USED** | — |
| **Railway 24/7 cloud execution** | **Jackson Execution Pack (Pack 2)** | **🔴 NOT DEPLOYED** | — |
| **CDP on MSIX TV Desktop (Windows)** | **MSIX Fix (Pack 3)** | **⚠️ UNKNOWN** | **May be why tv_health_check fails** |

### Infrastructure & Automation
| Capability | Tool | Status | Last Confirmed |
|---|---|---|---|
| Claude Code CLI | VS Code + Claude Code | ✅ LIVE | 260421 |
| VS Code (desktop) | VS Code | ✅ LIVE — installed 260420 | New |
| GitHub read/write | GitHub MCP | ✅ LIVE | 260421 |
| Cloudflare Worker | memory-os-worker.morelectric.workers.dev | ✅ LIVE v4.18 | 260420 |
| Worker /alert endpoint | Slack delivery | ✅ LIVE | 260420 |
| Worker /scalp-watch | 15-min cron | ✅ LIVE | 260420 |
| Worker /positions/alpaca | Paper portfolio | ✅ LIVE | 260420 |
| Worker /options | Options data | ✅ LIVE | 260420 |
| Alpaca paper execution | API (keys in GitHub Secrets) | ✅ LIVE | 260420 |
| Slack posting (Pete bot) | chat:write scope | ✅ LIVE | 260420 |
| 15-min GitHub Actions loop | .github/workflows/mor_15min_loop.yml | ✅ LIVE | 260421 03:24 CT |
| TradeStation API | OAuth Worker build | 🚫 BLOCKED — CEO must register dev app | — |
| MCP Memory Server | claude mcp add memory | 🔴 NOT INSTALLED | Sprint 1 |
| mcp-optionsflow | Python MCP server | 🔴 NOT DEPLOYED | Sprint 1 |
| OpenClaw | GADGET'S LANE | 🔴 NOT INSTALLED | GADGET owns |
| ntfy alerts | ntfy.sh | ⚠️ QUOTA — Slack is fallback | — |

### Pine Scripts (Written by Pete — Ready to Deploy)
| Script | Target | Status |
|---|---|---|
| MOR_BlackSwan_v1.pine | SPY 1D | ✅ In GitHub — Edge deploy pending |
| MOR_CrackSignals_v1.pine | SPY 5m | ✅ In GitHub — Edge deploy pending |
| MOR_APlus_SetupScore_v1.pine | Any ticker | ✅ In GitHub — Edge deploy pending |

---

## LAYER 3 — CHIEF 2.0 (Claude Chat) · Notion OS

| Capability | Status | Notes |
|---|---|---|
| Notion OS architecture | 🔧 BUILDING — Design Review v1 filed | Learning Vault, 4 DBs scoped |
| Memory DB (sole writer) | ✅ RATIFIED Rule 28 | All agents read freely |
| AM memo (08:00 CT) | ⚠️ NOT WIRED — Edge must set cron | Filed to Edge inbox 260421 |
| PM memo (16:00 CT) | ⚠️ NOT WIRED — Edge must set cron | Filed to Edge inbox 260421 |
| 2 ideas/session tracking | ✅ RATIFIED Rule 29 | |
| HAL validation | 🔧 BUILDING | Edge owns HAL code, Chief owns rules |
| Constitution (1 page) | 🔧 BUILDING — CEO directed tonight | |
| Amendments (1 page) | 🔧 BUILDING | Rules 28/29/30 not yet filed |
| Rules (1 page) | 🔧 BUILDING | |

---

## LAYER 4 — CLARK KENT (Claude) · Investigative Intel

| Capability | Status | Notes |
|---|---|---|
| Geo/macro intelligence reports | ✅ LIVE | First brief filed 260421 |
| Daily brief at 05:30 CT | ✅ STARTING WEDNESDAY | Goes live Wed Apr 22 |
| 48-hr accuracy scoring | ✅ IN FLIGHT | Scores Thursday AM |
| Market catalyst scouting | ✅ LIVE | |

---

## LAYER 5 — GADGET (Claude) · Automation & Pipelines

| Capability | Status | Notes |
|---|---|---|
| OpenClaw install + config | 🔴 HIS STAR — not started | Spec in GitHub 260420_openclaw_config_spec.md |
| OpenClaw Alpaca skill | 🔴 PENDING install | ClawHub ready |
| OpenClaw Slack heartbeat | 🔴 PENDING install | Cron spec written |
| New automation designs | 🔧 STANDING BY | Needs CEO session |
| GADGET pipeline intros | ⚠️ NOT YET COORDINATING | — |

---

## LAYER 6 — ARA (Claude) · CEO EA

| Capability | Status | Notes |
|---|---|---|
| CEO task management | ✅ ACTIVE | |
| CEO one-click queue | 🚫 3 items still open | TS dev app, Pete bot URL, TV Desktop |

---

## LAYER 7 — VERA (Claude Coworker) · Inner Gospel

| Capability | Status | Notes |
|---|---|---|
| TV tool stack install (with CEO) | ✅ DONE 260420 | VS Code + Jackson MCP + Pack 2 + Pack 3 |
| Inner Gospel content | ✅ ACTIVE LANE | |
| File consolidation ops | ✅ COMPLETED 260420 | MOR_INC 5-tier structure |

---

## CRITICAL GAPS — WHAT WE'RE LEAVING ON THE TABLE RIGHT NOW

| Gap | Impact | Owner | Action |
|---|---|---|---|
| tv_health_check never run in desktop env | 78 TV tools OFFLINE | Edge | Run at session open TODAY |
| Jackson Execution Pack (Pack 2) not wired | No automated trade execution | Edge | Install + adapt rules.json to MOR rules |
| MSIX Fix (Pack 3) unknown | May be root cause of CDP failures | Edge | Verify / apply if needed |
| 3 Pine Scripts sitting in GitHub undeployed | No automated signals on charts | Edge | Deploy all 3 this morning |
| TV alerts not armed | No ENTRY/SL/TP1/TP2 alerts firing | Edge | Arm all per morning protocol |
| mcp-optionsflow not deployed | Pete has no Greeks / prob-of-profit | Edge | Sprint 1 |
| TradeStation API not connected | Real money broker blind to Pete | CEO + Edge | CEO registers dev app |
| OpenClaw not installed | No 24/7 local monitor between sessions | GADGET | His #1 task |
| Chief 2.0 memos not wired | No daily AM/PM cadence | Edge | Wire crons this session |
| Sector rotation + Congressional trades | Unused intel edge | Pete | Start using NOW |

---

## WHAT WE SHOULD START DOING TODAY

### At Open (08:30 CT)
- Edge: deploy all 3 Pine Scripts to live charts
- Edge: arm ENTRY/SL/TP1/TP2 alerts for RTX (earnings play)
- Pete: pull options flow on RTX at open
- Pete: flag if VIX crosses 20 (Black Swan threshold approaching)

### This Session (before 07:00 CT)
- Edge: Jackson Execution Pack install + adapt rules.json to MOR_rules.md
- Edge: MSIX fix verify — run `Get-AppxPackage *TradingView*` to check
- Pete: start using Congressional trades + institutional holdings in morning picks
- Pete: start using sector rotation in daily regime call

### This Week
- GADGET: OpenClaw install — his star, needs a session with CEO
- Edge: mcp-optionsflow deploy
- CEO: TradeStation dev app registration (3 min)
- Chief 2.0: wire AM/PM memo crons via Edge

---

*Pete · MOR INC A1-EDGE · 260421 05:19 CT*
*Rule: Edge updates his rows after each session. Chief 2.0 files to Memory DB. Pete regenerates weekly.*
