# MOR Master Trading System

**Owner:** Michael O'Regan | MOR Trading Systems  
**Last Updated:** 2026-04-16  
**Status:** 🟢 Active Build

---

## System Priority Stack
1. 🔁 Pipeline & Memory — bulletproof cross-session continuity
2. 📈 Scalp & Swing Engine — high-probability setups, auto-scored
3. 📊 Dashboard — live P&L, workers, setups (handoff to Copilot)
4. 🌐 Website & Marketing — MOR Electric/HVAC + trading brand

---

## Repo Structure
```
/rulebook       → Living MOR trading rules (entry, exit, risk, workers)
/logs           → Daily session logs (auto-populated post-close)
/workers        → Worker configs and accuracy scoring
/dashboard      → Dashboard specs and data schema
/.github/workflows → Automation (15-min loop, auto-commit)
```

---

## Pipeline Flow
```
TradingView alert
  → webhook → Alpaca (execute)
  → Post-close trigger
  → Alpaca MCP pulls fills
  → GitHub logs committed
  → Notion daily page updated
  → Tomorrow prep auto-generated at 6 AM CDT
```

---

## AI Coordination
- **Perplexity** — research, live MCP execution (GitHub, Alpaca), system builds
- **Claude/Copilot** — code generation, dashboard build, Pine Script
- **Sync point:** This GitHub repo is the shared source of truth for both AIs
