# MOR Dashboard Specification

**Status:** 🔴 Build queued — handoff to Copilot/Claude  
**Last Updated:** 2026-04-16

---

## Purpose
Live single-page dashboard showing MOR system health, P&L, worker accuracy, and tomorrow's setup map.

---

## Panels Required
1. **Account Summary** — Alpaca: equity, buying power, daily P&L, open positions
2. **Session P&L** — today vs backtest, R-multiple, win rate
3. **Worker Scoreboard** — each worker: signals fired, win rate, status
4. **Active Setups** — A/B setups triggered today, outcome
5. **Tomorrow Prep** — bias, key levels, setup map, stand-aside conditions
6. **Rule Change Feed** — last 5 rule adjustments from rulebook

---

## Data Sources
| Panel | Source | Method |
|---|---|---|
| Account Summary | Alpaca API | MCP / REST |
| Session P&L | GitHub session log | GitHub API |
| Worker Scoreboard | GitHub worker_config.md | GitHub API |
| Active Setups | GitHub session log | GitHub API |
| Tomorrow Prep | GitHub session log | GitHub API |
| Rule Change Feed | GitHub MOR_rules.md | GitHub API |

---

## Tech Stack (proposed)
- Frontend: React + TailwindCSS
- Data: GitHub API + Alpaca API
- Hosting: Vercel (free tier)
- Auto-refresh: 15-min interval

---

## Handoff Note for Copilot/Claude
Build this dashboard using the data sources above. Repo: https://github.com/morreborn-prog/MOR-Trading-System
All data schemas defined in /logs and /workers. Start with Account Summary + Session P&L panels first.
