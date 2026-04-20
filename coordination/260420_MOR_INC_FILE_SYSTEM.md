# MOR_INC — New File Storage System

**Built:** 2026-04-20 15:00 CT
**Root:** `iCloudDrive/MOR_INC/`
**Script:** `bot/migrate_to_mor_inc.ps1` (idempotent, re-runnable)

## Structure (mirrors 5-tier Notion)

```
MOR_INC/
├── _TIER1_LOCKED/          (7 files) — Constitution, Charter, Rules
├── _TIER2_OPERATIONAL/     (5 files) — Live state, append-only
├── _TIER3_AGENT_MEMORY/    (7 files) — per-agent canonical
├── _TIER4_ARCHIVE/        (52 files) — sessions/briefs/backtests/bsr/deliverables
├── _TIER5_CEO_PRIVATE/     — 🔒 CEO only
├── BRANDS/                (21 files) — A1_TRADING + MOR_ELECTRIC + INNER_GOSPEL
├── INFRA/                  — Worker source, skills, crons
├── RESEARCH/              (11 files) — NotebookLM + Pete synthesis
├── INBOX/                 (3 files)  — Raw exports + scratch
└── README.md              — Top-level nav
```

**Total migrated:** 106 files. Originals preserved at legacy paths (30-day safety net).

## Naming rule (enforced)

- `YYMMDD_subject.md` everywhere
- `YYMMDD_HHMM_subject.md` when time precision needed
- snake_case, no spaces, no uppercase
- Auto-normalized during migration (ISO dates → YYMMDD, timestamps → HHMM)

## Write rules

| Tier | CEO | Edge | Pete | Chief | Vera | Cron |
|---|---|---|---|---|---|---|
| 1 LOCKED | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| 2 OPERATIONAL | ✅ | append | append | append | append | structured |
| 3 AGENT MEMORY | ✅ | edge.md | pete.md | chief.md | vera.md | ❌ |
| 4 ARCHIVE | ✅ | auto | auto | auto | auto | structured |
| 5 CEO PRIVATE | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

## Legacy

Old paths stay for 30 days:
- `AA WORK FILES/A1 Trading/`
- `AA WORK FILES/MOR INC/`
- `A1_Projects/memory-markdowns/`
- `.claude/projects/.../memory/`

Prune decision at May 20 weekly review.

## Next

- [ ] Update skills + CLAUDE.md to point to new root
- [ ] Bulk-import 52 Tier 4 sessions into Notion (clone to tier page)
- [ ] Set up iCloud Drive sync visibility for Pete (via px-read endpoint if needed)
- [ ] Weekly re-run of migration script to catch new artifacts

— Edge · 2026-04-20 15:00 CT
