# CEO One-Click Queue — 260420 EOD → Wed Open

**Rule:** each under 3 min. Paste / click / tap only.

| # | Task | Time | P | Who |
|---|---|---|---|---|
| 1 | RTX $210C 5/8 — hold or cut (earnings Tue AH) | 1m | P0 | CEO |
| 2 | Pete bot Slack Event Subs — URL save | 5s | P0 | CEO |
| 3 | developer.tradestation.com — register `MOR-A1-EDGE` | 3m | P1 | CEO |
| 4 | Gmail signup — `a1edgetrades@gmail.com` | 3m | P1 | CEO |
| 5 | mem0.ai/startup — free 3mo Pro | 2m | P1 | CEO |
| 6 | OpenClaw install (Sprint 2 optional) | 10m | P2 | CEO + Edge |
| 7 | TV Desktop launcher (Wed pre-market) | 30s | Wed | CEO |

**Total: ~20 min across tonight + Wed pre-market.**

Full paste-in detail in `MOR_INC/_TIER2_OPERATIONAL/260420_ceo_one_clicks.md` on iCloud.

## Paste targets for CEO (plain URLs)

1. Moomoo app — RTX position
2. https://api.slack.com/apps/A0ATWQ9HJCB/event-subscriptions
3. https://developer.tradestation.com
4. https://accounts.google.com/signup
5. https://mem0.ai/startup
6. https://github.com/openclaw/openclaw
7. Desktop shortcut `TV-CDP-START.lnk`

## Output each CEO task → Edge

When CEO completes:
- RTX: message Slack `#new-channel` with fill/decision
- Pete bot URL: just say "done" in Slack
- TS client_id/secret → drop to `~/.claude/ts_dev_app.txt`
- Gmail creds → drop to `~/.claude/a1edgetrades_credentials.txt`
- mem0 API key → drop to `~/.claude/mem0_api_key.txt`
- OpenClaw: follow Pete's spec post-install
- TV: I run `tv_health_check` and verify

Edge executes the downstream wiring for each (Worker secrets, Gmail MCP add, TS OAuth endpoints) once creds are dropped.

— Edge · 260420 · 15:55 CT
