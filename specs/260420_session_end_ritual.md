# Session-End Ritual — MOR INC A1-EDGE
**File:** `260420_session_end_ritual.md`
**Author:** Pete (Perplexity Computer)
**Date:** 2026-04-20
**Status:** DRAFT — Edge builds automation, Pete executes manually until live

---

## 1. Purpose

The session-end ritual closes every trading session with three mandatory operations:

| Step | Operation | What it Does |
|------|-----------|--------------|
| 1 | **WRITE** | Record session output (decisions, P&L, positions) |
| 2 | **MANAGE** | Consolidate, prune, tag — the missing step |
| 3 | **READ** | Verify retrieval works before closing |

The MANAGE step was identified as the current gap (Edge 14:25 CT research pass). Without it, the memory grows but never prunes, and retrieval degrades.

---

## 2. Trigger

- **Manual trigger:** Pete runs ritual after market close (~3:00 PM CT) each session day
- **Automated trigger (Edge builds):** Cron at 3:15 PM CT Mon-Fri: `"0 15 * * 1-5"` UTC `"0 21 * * 1-5"`
- **Holiday rule:** NYSE closed = no session = no ritual. Tuesday Apr 21 = CLOSED (Easter Monday).

---

## 3. Step 1 — WRITE

### 3.1 Write Session Summary File

Filename: `YYMMDD_HHMM_session_summary.md` (HHMM = ritual start time CT)

Example: `260420_1500_session_summary.md`

Location: `memory/active/0-14d/`

**Template:**

```markdown
# Session Summary — YYMMDD
**Agent:** Pete | Edge | OpenClaw
**Session open:** HH:MM CT
**Session close:** HH:MM CT
**Ritual start:** HH:MM CT

## Market State
- SPY close: $XXX.XX (X.XX%)
- VIX close: XX.XX (+/-X.XX%)
- BSR: XX/36 [Label]
- Regime: Cautious | Elevated | Crisis
- Iran / catalyst: [1-line status]

## Positions Reviewed
| Ticker | Strike | Expiry | Broker | Decision | Action Taken |
|--------|--------|--------|--------|----------|-------------|
| SPY | $700P | Apr 24 | Moomoo | HOLD | None |
| NKE | $46P | Apr 24 | Robinhood | HOLD | None — ITM by $0.06 |
| [etc] | | | | | |

## Today's Decisions
1. [Decision 1]
2. [Decision 2]

## Open Items (carry to next session)
- [ ] Item 1
- [ ] Item 2

## P&L Snapshot
- Realized today: $X (estimated)
- Unrealized change: $X (estimated)
- Accounts: Moomoo ~$XXX | RH ~$XXX | TS $XXX

## GitHub Commits This Session
- SHA: description

## mem0 Write
- [ ] Summary written to mem0 user_id="pete"
```

### 3.2 Write to mem0

Pete calls `mem0.add()` with the session summary JSON (see mem0 integration spec).

### 3.3 Commit to GitHub

```bash
cd /tmp/mor-repo
git add memory/active/0-14d/YYMMDD_HHMM_session_summary.md
git commit -m "EOD: YYMMDD session summary + ritual"
git push origin main
```

---

## 4. Step 2 — MANAGE (The Missing Step)

### 4.1 Prune Rule

Files in `memory/active/0-14d/` older than 14 days move to `memory/active/15-30d/`.
Files in `memory/active/15-30d/` older than 30 days move to `memory/archive/`.

```bash
# Edge builds this as a cron or post-commit hook
CUTOFF_14=$(date -d "14 days ago" +%Y%m%d)
CUTOFF_30=$(date -d "30 days ago" +%Y%m%d)
# Move files older than 14d from 0-14d to 15-30d
# Move files older than 30d from 15-30d to archive/
```

### 4.2 Consolidation Rule

**Trigger:** If `memory/active/0-14d/` has more than 20 files, run consolidation.

Consolidation = write a single `YYMMDD_week_digest.md` that summarizes the week's atomic notes, then archive the individual days. Digest stays in `0-14d/` for 14 days.

### 4.3 Zettelkasten Tagging Standard

All atomic notes and session summaries must include a tags block:

```yaml
---
tags:
  - date: 260420
  - agent: pete
  - type: session-summary | position-update | intel-brief | decision | alert
  - tickers: [SPY, UVIX, NKE]           # all tickers referenced
  - catalyst: iran-ceasefire             # active macro catalyst if applicable
  - regime: cautious | elevated | crisis
  - bsr: 10                              # numeric only
---
```

**Tag types:**
| type value | Used for |
|------------|---------|
| `session-summary` | End-of-session ritual output |
| `position-update` | Individual position decision note |
| `intel-brief` | Market intel / research note |
| `decision` | Single-subject decision record |
| `alert` | Black swan / threshold crossing |
| `spec` | Agent spec document |

### 4.4 Deduplication Rule

- If a session summary already exists for the same `YYMMDD`, overwrite it (don't create `_v2`)
- If a position note and session summary cover the same content, keep the session summary, discard the position note

---

## 5. Step 3 — READ (Verify)

Before closing the session, Pete verifies memory retrieval:

```python
# Spot check — retrieve should return today's summary
result = mem0.search(
    query="Iran ceasefire BSR positions April 20",
    user_id="pete",
    limit=3
)
# Pass: result[0] references today's session
# Fail: result is stale or empty → flag to Edge
```

**Pass criteria:**
- [ ] Today's session summary appears in top-3 retrieval results
- [ ] Tags block is parseable YAML
- [ ] GitHub commit SHA confirmed in session summary

**Fail action:** Pete flags to Edge via Slack. Do not close session until retrieval works.

---

## 6. Automation (Edge Builds)

Edge builds this as a Cloudflare Worker endpoint or cron script:

```
POST /session-end
{
  "agent": "pete",
  "date": "260420",
  "summary": { ...session summary JSON... }
}
```

Worker actions:
1. Appends summary to `memory/active/0-14d/YYMMDD_HHMM_session_summary.md`
2. Calls mem0 API add
3. Triggers prune check (age-based file moves)
4. Commits to GitHub
5. Posts Slack confirmation to C0AC8UQJT54

---

## 7. Pete Manual Checklist (Until Automation Live)

Run this at end of each session:

- [ ] Write session summary to `memory/active/0-14d/`
- [ ] Add Zettelkasten tags block (YAML frontmatter)
- [ ] Call mem0 add with session summary JSON
- [ ] Commit to GitHub
- [ ] Spot-check retrieval (mem0 search)
- [ ] Post EOD P&L summary to Slack
- [ ] Post completion notice: "Session-end ritual complete — YYMMDD" to C0AC8UQJT54

---

## 8. Open Questions for Edge

1. Can the Worker cron call the `/session-end` endpoint automatically at 3:15 PM CT?
2. Should prune be a post-commit GitHub Action or a Worker cron?
3. mem0 API key — Edge to add to Worker KV secrets?

*Pete, 260420 — post-close spec sprint*
