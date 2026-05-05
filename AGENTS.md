# AGENTS.md

## Cursor Cloud specific instructions

### Product overview
This is a documentation/coordination repo for an AI-coordinated automated stock/options trading system. There is **no buildable application** — the repo contains Markdown docs, Python pipeline scripts, PowerShell scripts, and GitHub Actions workflows. The "product" runs across external cloud services (Cloudflare Workers, GitHub Actions, broker APIs).

### Runnable components
The three Python scripts under `scripts/` are the only executable code in this repo:
- `scripts/pull_alpaca_fills.py` — pulls filled orders from Alpaca API, writes to today's session log
- `scripts/score_workers.py` — placeholder worker accuracy scorer (no external deps)
- `scripts/push_notion_log.py` — pushes session summary to Notion API

All scripts degrade gracefully when API keys are absent (no crashes).

### Dependencies
Python 3.11+ with `requests` and `python-dateutil` (matches the GitHub Actions workflow).

### Running scripts
```bash
python3 scripts/score_workers.py
python3 scripts/pull_alpaca_fills.py
python3 scripts/push_notion_log.py
```

### Linting
```bash
ruff check scripts/
```
Existing code has 4 minor lint warnings (unused imports/vars) — these are pre-existing.

### External API keys (optional)
Set as environment variables to enable full pipeline:
- `ALPACA_API_KEY` / `ALPACA_SECRET_KEY` — Alpaca broker (paper trading by default)
- `NOTION_API_KEY` / `NOTION_DATABASE_ID` — Notion daily log sync
