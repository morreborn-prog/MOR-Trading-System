# AGENTS.md

## Cursor Cloud specific instructions

### Overview
This repo is the **MOR Master Trading System** — a coordination hub for an AI-orchestrated stock/options trading pipeline. It is primarily Markdown documentation, Python automation scripts, and GitHub Actions workflows. There is no frontend application to build or serve.

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
Only two pip packages are needed: `requests` and `python-dateutil`. The update script installs them automatically.

### No build step
There is no build, compile, or bundle step. The repo has no `package.json`, `Dockerfile`, or `requirements.txt`. Dependencies are installed inline (see update script).
