# AGENTS.md

## Cursor Cloud specific instructions

### Overview
This repo is the **MOR Master Trading System** — a coordination hub for an AI-orchestrated stock/options trading pipeline. It contains:
- **Python automation scripts** (`scripts/`) — the 15-minute pipeline
- **React dashboard** (`dashboard/`) — live trading dashboard (Vite + React + TailwindCSS v4)
- **Markdown documentation** — specs, logs, coordination, rulebook

### Brokers
- **Tradier** — primary broker for options and stocks
- **Coinbase** — crypto holdings
- Alpaca is deprecated (legacy script `pull_alpaca_fills.py` remains for reference)

### Dashboard (React app)
```bash
cd dashboard && npm run dev    # Starts Vite dev server on http://localhost:5173
cd dashboard && npm run build  # Production build to dashboard/dist/
cd dashboard && npm run lint   # ESLint
```
To connect brokers, create `dashboard/.env`:
```
VITE_TRADIER_TOKEN=your_tradier_access_token
VITE_TRADIER_ACCOUNT_ID=your_account_id
VITE_TRADIER_BASE_URL=https://api.tradier.com

VITE_COINBASE_API_KEY=your_coinbase_api_key
VITE_COINBASE_API_SECRET=your_coinbase_api_secret
```
Without these env vars the dashboard still loads — panels show placeholder/empty state.

### Running the pipeline scripts
The Python scripts in `scripts/` form the 15-minute automation pipeline (`.github/workflows/mor_15min_loop.yml`):

```
python3 scripts/pull_tradier_fills.py  # Pulls filled orders from Tradier API
python3 scripts/score_workers.py       # Scores worker accuracy (placeholder)
python3 scripts/push_notion_log.py     # Pushes session summary to Notion
```

- `score_workers.py` runs standalone with no secrets.
- `pull_tradier_fills.py` requires `TRADIER_TOKEN` and `TRADIER_ACCOUNT_ID` env vars. Without them, prints a skip message and exits cleanly.
- `push_notion_log.py` requires `NOTION_API_KEY` and `NOTION_DATABASE_ID`. Without them, prints a skip message and exits cleanly.

### Linting
```
flake8 scripts/ --max-line-length=120   # Python
cd dashboard && npm run lint            # JavaScript/React
```

### Dependencies
- **Python:** `requests`, `python-dateutil` (installed by update script)
- **Dashboard:** Node.js 20+, dependencies in `dashboard/package.json` (installed by update script via `npm install`)
