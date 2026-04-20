# CAPABILITY HEATMAP — 2026-04-20

**CEO demand 12:58 CT: stop re-discovering tools every session. This doc is baked into `mor-session-start` step 0.**

## 🟢 PROVEN THIS WEEK
**TV MCP:** layout_switch, pane_list/focus/set_symbol, chart_set_symbol, chart_set_timeframe, chart_get_state, quote_get, **data_get_study_values (the Data Window)**, data_get_ohlcv, tv_health_check, tab_list, capture_screenshot, ui_find_element.

**Worker:** /read, /health, /diag, /monitor, /options, /tradier, /scan, /positions/alpaca, /alert (v4.18 LIVE via Pete Slack bot), /px-write, /px-append.

**Blueprint:** tabs, navigate, evaluate (JS), interact (click only — type blocked by debugger conflict), RH bearer-auth.

**GitHub/Slack/Gmail MCPs:** all read+write live.

## 🟡 FLAKY
- `alert_create` — price field bug, use Alt+A manual
- `watchlist_add` — fails on custom lists, use paste-in string
- `chart_manage_indicator` — user Pine scripts can't be added via MCP
- Blueprint `type` — extension conflict on GitHub/Slack pages; use JS eval workaround

## ⚪ UNTESTED — exercise one per session
- data_get_strategy_results, data_get_trades, data_get_equity
- replay_start / replay_trade (practice orders)
- batch_run (parallel multi-symbol)
- pine_analyze
- morning_brief
- **/auto-trade Worker endpoint** ← this session's pick
- /auto-trade/journal

## 🚫 CAPABILITIES I'M NOT USING
1. Pine auto-entries: `pine_new` + `pine_set_source` + `pine_save` + `alert_create` + `/auto-trade` = hands-free paper firing
2. Bar replay drills
3. batch_run for morning scans
4. TV alert_list pruning

## THE RULE
CEO asks "do we have X" → check this doc first. Never answer from memory.

Regenerate daily via `mor-session-start` step 0. File named `CAPABILITY_HEATMAP_YYMMDD.md`.

— Edge · 2026-04-20 13:05 CT
