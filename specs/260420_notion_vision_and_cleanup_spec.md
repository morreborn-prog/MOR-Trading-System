# Notion Vision + Cleanup — CEO Spec (260420)

**Author:** Michael (CEO) · captured by Edge at EOD
**Status:** DRAFT — next sprint agenda

## CEO's thesis

Our 12-source NotebookLM DB#01 went deep on academic agent memory theory. Went SHALLOW on what Notion actually does natively. CEO's vision is cleaner.

## Core principles (CEO's design)

### 1. Permission zones
- LOCKED read-only (Constitution, Rulebook) — weekly-review committee writes only
- APPEND-ONLY (Decision Ledger, Session Archive) — all agents write, no edit/delete
- READ-WRITE per-agent (edge writes edge.md, pete writes pete.md)
- CEO PRIVATE (billing, credentials, personal)

### 2. Bot-driven merging + deduplication
- Dupe detection (same ticker + date + broker → merge)
- Stale archival (>30d → Tier 4)
- Cross-DB sync (Trade Journal → BROKER_POSITIONS auto-update)
- Orphan detection

### 3. HAL-style validation
Before accepting ANY new row:
- Timestamp within last 24h
- Date parses as valid YYMMDD
- Price cross-ref live feed
- Position within broker BP
- Ticker in known universe
- Expiry future
- Strike within reasonable range of spot
- On failure → Slack alert + `/validation-errors` DB

### 4. Redundancy — 3 places
Notion DB + iCloud markdown + GitHub repo. Bot reconciles hourly.

## Notion features we should use (currently <30% utilization)

**Using now:** pages, basic DBs, single-selects (4/14)

**Should use:**
- Notion AI (page-level AI)
- Notion Automations (triggers)
- Advanced formulas (DTE, R:R, P/L %)
- Relations + Rollups (cross-DB)
- Synced blocks (BSR score in N pages)
- Linked databases (filtered views)
- Forms (MOR Electric lead intake)
- Buttons (one-click actions)
- Templates (enforce schemas)
- Wiki verification (Constitution re-verify weekly)
- Charts (P/L history)
- Audit logs (forensic trail)
- Teamspaces (permission zones)
- Calendar/Timeline views

## Sprint plan

**Phase 1 — audit** (2 hr) — inventory, redundancies, orphans, feature-fit scoring
**Phase 2 — schema redesign** (4 hr) — canonical DBs, templates, formulas, automations
**Phase 3 — migration** (6 hr) — create DBs, migrate data, wire automations, set permissions
**Phase 4 — validation + monitoring** (ongoing) — HAL bot, dedup cron, weekly verify, audit review

**Total: 12-15 hours across Edge + Pete + CEO review.**

## CEO critique (acknowledged)

1. Research was shallow on Notion. Heavy on academic memory theory. FAIR.
2. Permission-zone thesis is cleaner than the 12 research sources.
3. HAL-style validation beats any soft-agent approach.
4. Bot-driven merging IS the "manage" step we identified but didn't build.

**Your thesis is the sprint brief. Pete + Edge execute.**

## Not doing tonight

- Actual overhaul — too big, fresh heads needed
- Pete's sign-off — he's offline until Wed 07:00 CT
- NotebookLM DB#05 (Notion features deep research)

## Next session pickup

1. Read this file first
2. Confirm priorities with CEO
3. Phase 1 audit during quiet moments between Iran binary events
4. Full sprint Thursday if market calm

---

*Edge · 260420 EOD · CEO vision captured · work NOT done*
