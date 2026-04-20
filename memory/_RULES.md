# MOR Memory Architecture — Compression Rules
**Owner:** Pete | **Last Updated:** 2026-04-20

---

## Two-Folder System

```
memory/
├── archive/        ← RAW ORIGINALS — NEVER MODIFIED
│   ├── 2026-04-16/
│   ├── 2026-04-19/
│   └── 2026-04-20/
│
├── active/         ← TIERED SUMMARIES — WORKING MEMORY
│   ├── 0-14d/      ← Light summaries (last 14 days)
│   ├── 3mo/        ← Medium summaries (15 days – 3 months)
│   └── 6mo/        ← Heavy summaries (3 months – 6 months)
│
└── _RULES.md       ← This file
```

---

## Compression Tiers

### Tier 1 — 0–14 Days (Light Summary)
- **Format:** `YYYY-MM-DD_summary.md`
- **What to keep:**
  - All active position entries/exits with P&L
  - All rule changes (verbatim rule text)
  - Infrastructure milestones (deployed, confirmed, broken)
  - Key decisions made by Michael
  - Open items / next session handoff
- **What to cut:**
  - Blank template fields
  - Verbose analysis and padded reasoning
  - Duplicate/repeat context
  - Exploration that led nowhere
- **Target length:** 150–300 lines per session

### Tier 2 — 15 Days – 3 Months (Medium Summary)
- **Format:** `YYYY-MM_summary.md` (monthly rollup)
- **What to keep:**
  - Net P&L by week
  - Rule changes (just the change, not context)
  - Infrastructure version history (what was built)
  - Any major thesis changes
  - Recurring problems or patterns
- **What to cut:**
  - Individual trade detail
  - Session-by-session blow-by-blow
  - Resolved open items
- **Target length:** 50–100 lines per month

### Tier 3 — 3 Months – 6 Months (Heavy Summary)
- **Format:** `YYYY-Q[N]_summary.md` (quarterly rollup)
- **What to keep:**
  - Quarterly P&L
  - Major system version milestones
  - Rule framework changes
  - High-level thesis evolution
- **What to cut:**
  - Everything else
- **Target length:** 20–40 lines per quarter

---

## Aging Schedule

| File Age | Action | Who |
|----------|--------|-----|
| < 14 days | Move to `active/0-14d/` as light summary | Pete |
| 15–90 days | Compress into monthly `.md` in `active/3mo/` | Pete |
| 91–180 days | Compress into quarterly `.md` in `active/6mo/` | Pete |
| > 180 days | Archive stays untouched, active entry deleted | Pete |

---

## Rules

1. `archive/` is READ-ONLY. Never modify. Never delete.
2. `active/` summaries are regenerated from `archive/` source — always reproducible.
3. One summary file per session in `0-14d/`. One per month in `3mo/`. One per quarter in `6mo/`.
4. Agent reads `active/` first on session start. Falls back to `archive/` only if active is missing.
5. Pete is responsible for compression. Edge does not modify memory files.
6. When adding new sessions: drop raw file in `archive/YYYY-MM-DD/`, create light summary in `active/0-14d/`.
