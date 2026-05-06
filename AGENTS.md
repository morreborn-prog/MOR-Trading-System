# AGENTS.md

## Cursor Cloud specific instructions

### Overview
This repo is the **MOR Master Trading System** — a coordination hub for an AI-orchestrated stock/options trading pipeline. It contains:
- **Python automation scripts** (`scripts/`) — the 15-minute pipeline
- **React dashboard** (`dashboard/`) — live trading dashboard (Vite + React + TailwindCSS v4)
- **Markdown documentation** — specs, logs, coordination, rulebook

### Dashboard (React app)
```bash
cd dashboard && npm run dev    # Starts Vite dev server on http://localhost:5173
cd dashboard && npm run build  # Production build to dashboard/dist/
cd dashboard && npm run lint   # ESLint
```
To connect to Alpaca, create `dashboard/.env`:
```
VITE_ALPACA_API_KEY=your_key
VITE_ALPACA_SECRET_KEY=your_secret
VITE_ALPACA_BASE_URL=https://paper-api.alpaca.markets
```
Without these env vars the dashboard still loads — panels show placeholder/empty state.

### Running the pipeline scripts
The three Python scripts in `scripts/` form the 15-minute automation pipeline (mirroring `.github/workflows/mor_15min_loop.yml`):

```
python3 scripts/pull_alpaca_fills.py   # Pulls filled orders from Alpaca API
python3 scripts/score_workers.py       # Scores worker accuracy (placeholder)
python3 scripts/push_notion_log.py     # Pushes session summary to Notion
```

- `score_workers.py` runs standalone with no secrets.
- `pull_alpaca_fills.py` requires `ALPACA_API_KEY` and `ALPACA_SECRET_KEY` env vars. Without them, it returns empty fills and still writes the session log.
- `push_notion_log.py` requires `NOTION_API_KEY` and `NOTION_DATABASE_ID`. Without them, it prints a skip message and exits cleanly.

### Linting
```
flake8 scripts/ --max-line-length=120
```
The existing scripts have pre-existing style warnings (unused imports, whitespace). These are cosmetic and do not affect execution.

### Dependencies
- **Python:** `requests`, `python-dateutil` (installed by update script)
- **Dashboard:** Node.js 20+, dependencies in `dashboard/package.json` (installed by update script via `npm install`)
