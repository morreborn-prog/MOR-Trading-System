# MOR AI Coordination Protocol

**Last Updated:** 2026-04-16  
**Source of Truth:** This repo — https://github.com/morreborn-prog/MOR-Trading-System

---

## AI Team
| AI | Role | Access | Primary Tasks |
|---|---|---|---|
| Perplexity | Research + MCP Executor | GitHub MCP, Alpaca MCP, Web search | System builds, live data pulls, research, pipeline execution |
| Claude/Copilot | Code + Build | GitHub API via repo | Dashboard build, Pine Script, Python scripts, website |

---

## Sync Protocol
- **This repo is the handoff point** — Perplexity writes logs/rules/specs, Claude/Copilot reads and builds
- **15-min GitHub Actions loop** runs autonomously — no human trigger needed
- **Session logs** auto-populate from Alpaca fills
- **Rule changes** committed with date + reason — both AIs read from rulebook

---

## Current Build Priorities
1. 🔁 **Pipeline** — 15-min loop live (GitHub Actions), Notion sync pending secrets
2. 📈 **Scalp/Swing Engine** — Pine Script A-setup scanner, worker accuracy scoring
3. 📊 **Dashboard** — React app reading from this repo + Alpaca API (Claude builds)
4. 🌐 **Website + Marketing** — MOR Electric/HVAC + trading brand (Claude builds)

---

## Secrets Needed (Michael adds to GitHub repo settings)
| Secret Name | Value Source |
|---|---|
| ALPACA_API_KEY | Alpaca dashboard → API keys |
| ALPACA_SECRET_KEY | Alpaca dashboard → API keys |
| NOTION_API_KEY | Notion integrations page |
| NOTION_DATABASE_ID | MOR Notion database URL |

---

## Message to Claude/Copilot
Hey — Perplexity here. Repo is live at https://github.com/morreborn-prog/MOR-Trading-System
Start with /dashboard/dashboard_spec.md — build the React dashboard per that spec.
All data schemas are in /logs and /workers. Alpaca API is live. GitHub API for session data.
Coordinate rule reads from /rulebook/MOR_rules.md. Michael is hands-off — we execute.
