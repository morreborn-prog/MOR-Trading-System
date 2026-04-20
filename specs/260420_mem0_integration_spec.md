# mem0 Integration Spec — MOR INC
**File:** `260420_mem0_integration_spec.md`
**Author:** Pete (Perplexity Computer)
**Date:** 2026-04-20
**Status:** DRAFT — Pete uses, Edge installs MCP bridge

---

## 1. Why mem0

- 48K GitHub stars (most popular agent memory layer)
- 91% latency reduction vs naive RAG retrieval (benchmarked)
- Python-native, works with Claude out of the box
- Free tier sufficient for MOR Phase 1
- Managed service — zero infra for Pete

**Decision (consensus Apr 20):** mem0 first. Letta = Sprint 2. MCP memory server as zero-config bridge while mem0 ramps.

---

## 2. Architecture

```
Pete Session Start
       │
       ▼
[mem0 API call] ←── retrieve(user_id="pete", query=session_intent)
       │
       ▼
[Relevant facts returned] ──► Pete uses as session context
       │
  [Pete works]
       │
       ▼
[Session End Ritual]
       │
       ▼
[mem0 API call] ←── add(messages=session_summary, user_id="pete")
       │
       ▼
[mem0 stores + deduplicates automatically]
```

---

## 3. Pete's Session-Start Call (Schema)

Pete calls mem0 at session start to retrieve context relevant to today's intent.

```python
import mem0
from mem0 import MemoryClient

client = MemoryClient(api_key=MEM0_API_KEY)

# Retrieve at session start
def pete_session_start(session_intent: str) -> dict:
    """
    Called by Pete at the top of each session.
    session_intent: 1-2 sentence description of what Pete is doing today
    """
    memories = client.search(
        query=session_intent,
        user_id="pete",
        limit=10
    )
    return {
        "retrieved_facts": memories,
        "session_intent": session_intent,
        "retrieved_at": "ISO8601_TIMESTAMP"
    }

# Example call
pete_session_start(
    "Iran ceasefire expiry watch, UVIX/UVXY position review, EOD ritual"
)
```

---

## 4. Pete's Session-End Call (Schema)

Pete writes to mem0 at session end — after writing the session summary.

```python
def pete_session_end(session_summary: dict) -> None:
    """
    Called by Pete at EOD ritual.
    session_summary: structured summary of the session
    """
    messages = [
        {
            "role": "user",
            "content": f"Session: {session_summary['date']}"
        },
        {
            "role": "assistant",
            "content": f"""
                Key decisions: {session_summary['decisions']}
                Positions: {session_summary['positions']}
                Market state: {session_summary['market_state']}
                Iran/BSR: {session_summary['bsr']}
                Next session priorities: {session_summary['next_priorities']}
                Open items: {session_summary['open_items']}
            """
        }
    ]
    client.add(messages=messages, user_id="pete")
```

---

## 5. Agent Isolation Rules (mem0)

| user_id | Agent | Write | Read |
|---------|-------|-------|------|
| `pete` | Pete | ✅ | ✅ |
| `edge` | Edge | ✅ | ✅ |
| `openclaw` | OpenClaw | ✅ | ✅ |
| `shared` | All agents | team consensus only | ✅ |

No cross-writes. Pete writes to `user_id="pete"`. Pete can read `user_id="shared"` for coordination state.

---

## 6. Session Summary Schema (standard format)

All agent session summaries must conform to this schema before writing to mem0:

```json
{
  "date": "YYMMDD",
  "agent": "pete | edge | openclaw",
  "session_intent": "string",
  "decisions": ["list of key decisions made"],
  "trades": [
    {
      "ticker": "SPY",
      "action": "hold | enter | exit | stop",
      "strike": "700P",
      "expiry": "Apr 24",
      "broker": "moomoo | robinhood | tradestation",
      "outcome": "open | closed | expired | stopped"
    }
  ],
  "positions_reviewed": ["list of tickers reviewed"],
  "market_state": {
    "spy_close": 0.00,
    "vix": 0.00,
    "bsr": "10/36 Cautious",
    "regime": "cautious | elevated | crisis"
  },
  "iran_bsr": {
    "score": 10,
    "max": 36,
    "label": "Cautious",
    "ceasefire_status": "string"
  },
  "open_items": ["list of unresolved items for next session"],
  "next_priorities": ["P0", "P1", "P2"],
  "github_commits": ["list of commit SHAs this session"],
  "notion_writes": ["list of Notion pages updated this session"]
}
```

---

## 7. MCP Memory Server (Zero-Config Bridge)

Edge adds this in Claude Code — one line:

```bash
claude mcp add memory
```

This gives Edge (and OpenClaw) an MCP-compatible memory server with no additional infra. Works in parallel with mem0 during onboarding period.

**Pete does not need to install anything for the MCP bridge** — Edge handles.

---

## 8. Startup Program Note

mem0 Pro is free for 3 months for startups under $5M ARR. MOR INC may qualify.
- Apply at: https://mem0.ai/startup
- Pete recommends Michael applies this week while we're in Phase 1

---

## 9. Edge Tasks (from this spec)

- [ ] `pip install mem0ai` on Edge's local environment
- [ ] Add MEM0_API_KEY to Worker KV secrets
- [ ] `claude mcp add memory` — MCP bridge live in Claude Code
- [ ] Wire session-end ritual to call mem0 add after GitHub commit
- [ ] Test: Pete's mock session summary → mem0 → retrieve → validate

---

## 10. Pete Tasks (from this spec)

- [ ] Format session summaries to schema above going forward
- [ ] Call mem0 retrieve at start of each session (once Edge has API key set up)
- [ ] Validate retrieval quality after 3 sessions

*Pete, 260420 — post-close spec sprint*
