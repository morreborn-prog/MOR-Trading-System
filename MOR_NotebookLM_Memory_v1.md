# MOR INC — NotebookLM Intelligence Packet
## AI Memory Systems: Architecture, Tools & Integration
**Version:** 1.0 | **Compiled:** April 20, 2026 | **By:** Pete (Perplexity Computer)
**For:** Michael O'Regan, MOR INC / A1-EDGE Trading System

> **Why Memory is Separate:** Memory systems are a distinct infrastructure layer from AI platforms. A trading system team needs to understand memory independently before deciding how to bolt it onto Claude, OpenAI, or any other platform. This packet covers the full landscape — from architecture theory to production tools to MOR-specific recommendations.

---

## HOW TO USE THIS IN NOTEBOOKLM

**Option A — URL Sources:**
Copy URLs from source tables below → NotebookLM → "Add Source" → "Website"

**Option B — Upload this file:**
Upload entire document as a source for AI Q&A.

**Recommended starter questions:**
- "What's the difference between RAG and AI memory?"
- "Which memory system is best for a trading AI agent?"
- "How does mem0 work and what does it cost?"
- "What is Letta and how does it compare to mem0?"
- "How would I add persistent memory to a system that already uses Claude?"

---

## SECTION 1: WHY MEMORY MATTERS FOR A1-EDGE

### The Problem Today (MOR INC Specific)
Every session, Pete re-injects the full context:
- Full position table
- Full rulebook
- Full team structure
- All trade decisions

This is **stateless** operation. Pete has no memory between sessions — context must be summarized and re-pasted each time.

**What persistent memory would change:**
- Pete remembers last week's analysis without re-injection
- Pete recalls that USAR was a 30+ DTE rule violation without being told again
- Pete knows Michael's risk tolerance, broker preferences, and strategy history
- Session starts in 10 seconds instead of 2 minutes of context loading
- Token costs drop 80-90%

### The Two Mechanisms
| Mechanism | Question It Answers | State |
|---|---|---|
| **RAG (Retrieval Augmented Generation)** | "What does this document say?" | Read-only |
| **AI Memory** | "What does this user/agent need?" | Read-Write |

**Trading system needs BOTH:**
- **RAG** → static knowledge (rulebook, SEC filings, strategy docs, Pine Scripts)
- **Memory** → dynamic state (preferences, past trades, evolving context, market regime history)

---

## SECTION 2: MEMORY ARCHITECTURE FUNDAMENTALS

### The 7-Layer Memory Stack
*Source: [Interesting Engineering Substack](https://interestingengineering.substack.com/p/the-memory-stack-from-rag-to-cognitive)*

| Layer | Name | Function | Trading Relevance |
|---|---|---|---|
| 0 | Hardware | GPU VRAM, memory wall | Inference cost |
| 1 | KV Cache | Working memory during inference | Speed for real-time signals |
| 2 | Context Window | What the model sees NOW | Prompt budget management |
| 3 | Long-Term Persistence | RAG, vector databases | Market knowledge retrieval |
| 4 | Procedural Learning | Skill/pattern memory | Strategy preference learning |
| 5 | Multimodal Memory | Chart patterns, images | Technical analysis recall |
| 6 | Tool Integration | When/which tool to use | API calls, data fetching |
| 7 | Cognitive Architecture | Full CRUD orchestration | True agent autonomy |

**Evolution path:** Naive RAG → Agentic RAG (tool calls) → Agent Memory (read-write CRUD)
MOR is currently at Layer 2-3. Target: Layer 4-7.

---

### Three Types of AI Agent Memory
*Source: [Cobus Greyling Substack](https://cobusgreyling.substack.com/p/three-types-of-ai-agent-memory)*

#### Type 1: Factual Memory (Long-Term)
- RAG-based
- World knowledge, user preferences, facts
- Stored in vector databases
- Tools: LangChain, LlamaIndex
- **MOR use:** Rulebook, session logs, earnings data, Iran geopolitical context

#### Type 2: Experiential Memory (Long-Term)
- Case-based: past decision trajectories
- Strategy-based: reusable patterns that worked
- Skill-based: MCP/API tool integrations
- Enables self-improvement
- **MOR use:** "USAR was a catalyst DTE violation" → learn + avoid next time

#### Type 3: Working Memory (Short-Term)
- Context management (what's in the context window right now)
- State consolidation
- Hierarchical summarization (prevents token overflow)
- **MOR use:** The current session summary that gets compressed and re-loaded

---

### Rolling Memory Pattern (Production)
*Source: [Deriv AI Substack](https://derivai.substack.com/p/building-an-ai-agent-that-actually)*

```
Active session → Compact summary → Memory files → Auto-loaded next session

Three practical fixes for memory failures:
1. Memory loading as architecture (not optional) — inject memory BEFORE every LLM call
2. Unified sessions — merge all threads into one session to prevent fragmentation
3. Safeguard mode — keep last 10-15 messages in full detail during compaction
```

**This is what MOR's memory/_RULES.md + active/ folders implement.** The architecture Pete just pushed to GitHub (commit 6be66b5) follows this exact pattern:
- `active/0-14d/` = recent compressed summaries (auto-loaded)
- `archive/` = full session logs (searchable, not auto-loaded)

---

## SECTION 3: MEM0 — TOP PICK FOR MOR INC

### What It Is
**mem0** is a universal, self-improving memory layer for LLM applications. It sits between your app and the LLM, automatically extracting, storing, and retrieving relevant memories.

| Item | Details |
|---|---|
| GitHub | https://github.com/mem0ai/mem0 |
| Website | https://mem0.ai |
| Stars | ~53.6k |
| Research Paper | https://arxiv.org/html/2504.19413v1 |
| License | Apache 2.0 |

### How It Works
```python
pip install mem0ai

from mem0 import MemoryClient
client = MemoryClient(api_key="your-api-key")

# Store memory from a conversation
messages = [
    {"role": "user", "content": "I prefer RSI over MACD for momentum signals."},
    {"role": "assistant", "content": "Got it. I'll use RSI for your momentum analysis."}
]
client.add(messages, user_id="michael_mor")

# Retrieve relevant memories before any LLM call
results = client.search(
    "What indicators does this trader prefer?",
    filters={"user_id": "michael_mor"}
)
# Returns: [{"memory": "Prefers RSI over MACD for momentum", "score": 0.92}]
```

### Core Architecture
1. **Extraction** — LLM call extracts salient facts from conversation
2. **Consolidation** — Deduplicates, merges, handles contradictions. Scales to 10K memories/user
3. **Storage** — Vector embeddings + graph (Mem0ᵍ) for relational queries
4. **Retrieval** — Scoring: `similarity × recency_decay × importance`

### Performance Benchmarks (vs OpenAI Memory)
| Metric | Mem0 | Full Context | OpenAI Memory |
|---|---|---|---|
| LLM-as-Judge Score | +26% | — | Baseline |
| p95 Latency | 1.44s | ~18s | — |
| Token Cost | ~10% of baseline | 100% | ~100% |

**91% latency reduction. 90% token savings. 26% accuracy improvement.**

### Pricing
| Plan | Cost | Add Requests/mo | Retrieval/mo |
|---|---|---|---|
| Hobby | Free | 10,000 | 1,000 |
| Starter | $19/mo | 50,000 | 5,000 |
| Pro | $249/mo | 500,000 | 50,000 |
| Enterprise | Custom | Unlimited | Unlimited |

**Startup program:** 3 months Pro free for startups under $5M funding — MOR may qualify.

### Integrations
- Python SDK, JavaScript SDK
- LangChain, LangGraph, CrewAI
- Works with Claude, OpenAI, Gemini
- SOC 2 + HIPAA compliant

### MOR INC Application
| Memory Type | What to Store | Benefit |
|---|---|---|
| Trader preferences | "Prefers RSI, 30+ DTE rule, TradeStation primary" | No re-injection each session |
| Market regime context | "Iran ceasefire T-2, VIX elevated, cautious regime" | Pete starts sessions informed |
| Trade history | "USAR was DTE violation. RTX was manually cut Apr 20." | Pattern learning |
| Agent instructions | "Pete = Intel only. Edge = Deployment." | Role clarity without skill reload |
| P/L patterns | "UVIX positions underperformed 4/20, held through catalyst" | Strategy refinement |

---

### Mem0 Sources (Add to NotebookLM)

| Source | URL | Type |
|---|---|---|
| mem0.ai homepage | https://mem0.ai | Website |
| Mem0 GitHub | https://github.com/mem0ai/mem0 | GitHub |
| Mem0 research paper | https://arxiv.org/html/2504.19413v1 | Paper |
| mem0 blog | https://mem0.ai/blog | Blog |
| RAG vs Memory article | https://mem0.ai/blog/rag-vs-ai-memory | Blog |
| Long-Term Memory for AI Agents | https://mem0.ai/blog/long-term-memory-ai-agents | Blog |
| MLOps Reading Group video | https://home.mlops.community/public/videos/mem0-building-production-ready-ai-agents-with-scalable-long-term-memory-may-2025-reading-group | Video |
| Mem0 YouTube deep-dive (MLOps.community) | https://www.youtube.com/watch?v=cHQyugatz6M | YouTube |

---

## SECTION 4: LETTA (MEMGPT) — STATEFUL AGENTS

### What It Is
Letta is an **agent development environment** for stateful agents — AI that remembers and learns during deployment, not just during training.

| Item | Details |
|---|---|
| GitHub | https://github.com/letta-ai/letta |
| Website | https://www.letta.com |
| Docs | https://docs.letta.com |
| Formerly | github.com/cpacker/MemGPT (redirects) |
| Stars | ~22.2k |
| License | Apache 2.0 |

### The Core Insight
> "Traditional LLMs are stateless: trapped in an eternal present, no new memories or learning from experience. Most current 'agents' are stateless workflows, not true agents."

| Feature | Stateless Agent (now) | Stateful Agent (Letta) |
|---|---|---|
| Memory | Single session only | Persistent across all sessions |
| Learning | Training-time only | Continuous during deployment |
| Identity | Resets each session | Persistent, evolving |
| Architecture | Context window only | In-context + external recall + archival |

### Memory Architecture (Letta)

```
┌─────────────────────────────────────────────┐
│  CONTEXT WINDOW (LLM sees this)             │
│  System Prompt (locked core instructions)   │
│  Memory Blocks (editable learned info)      │
│  Recent Messages (immediate context)        │
│  Summary (compressed history)               │
└─────────────────────────────────────────────┘
         ↕ Tools call external stores
┌─────────────────────────────────────────────┐
│  EXTERNAL MEMORY (persisted)                │
│  Recall Memory (searchable interaction log) │
│  Archival Memory (general-purpose storage)  │
└─────────────────────────────────────────────┘
```

**Key innovations:**
- **Memory Blocks** — agent rewrites its own memory using tool calls
- **Sleep-time agents** — background agents that consolidate memory asynchronously
- **Tool-based memory** — agent decides what to retrieve and when
- **REST API** — all state queryable programmatically (audit trails)

### Letta Sources (Add to NotebookLM)

| Source | URL | Type |
|---|---|---|
| letta.com | https://www.letta.com | Website |
| Letta docs | https://docs.letta.com | Docs |
| Letta GitHub | https://github.com/letta-ai/letta | GitHub |
| Blog: Stateful Agents | https://www.letta.com/blog/stateful-agents | Blog |
| Blog: Agent Memory | https://www.letta.com/blog/agent-memory | Blog |
| Blog: Letta v1 (lessons from MemGPT) | https://www.letta.com/blog/letta-v1-agent | Blog |
| Codecademy: Intro to AI Agents with Letta | https://www.codecademy.com/learn/intro-to-ai-agents-with-letta | Course |
| Full Workshop — Charles Packer (AI Engineer) | https://www.youtube.com/watch?v=E0k9Ppq6yXY | YouTube (79 min) |
| Agents That Redesign Their Own Architecture (Letta YT) | https://www.youtube.com/watch?v=0nfNDrRKSuU | YouTube |
| DeepLearning.AI: LLMs as OS, Agent Memory | https://www.youtube.com/watch?v=RQ5HzSAx27I | YouTube |

---

## SECTION 5: OTHER KEY MEMORY TOOLS

### MCP Memory Server (Built into Claude)
The official MCP implementation includes a **built-in knowledge graph memory server**. Zero setup — just `claude mcp add memory`.

| Item | Details |
|---|---|
| GitHub | https://github.com/modelcontextprotocol/servers (memory server) |
| Stars | ~83.8k (parent repo) |
| Best for | Lightweight cross-session persistence without new infrastructure |
| Caveat | Less feature-rich than mem0 or Letta; good starting point |

**For MOR INC:** Edge can add this immediately via Claude Code. Zero infrastructure. Not production-scale but good for testing persistent memory today.

---

### Microsoft GraphRAG
Knowledge graph-based RAG for reasoning over large, interconnected document sets.

| Item | Details |
|---|---|
| GitHub | https://github.com/microsoft/graphrag |
| Stars | ~28.8k |
| Best for | Complex reasoning over rulebooks, logs, regulatory docs |

**MOR use case:** Build a knowledge graph over the entire MOR rulebook + session log archive. Query: "What trades violated rules in the last 30 days?" with full reasoning chain.

---

### LangGraph — Stateful Agent Orchestration
Low-level framework for building stateful agent workflows as graphs.

| Item | Details |
|---|---|
| GitHub | https://github.com/langchain-ai/langgraph |
| Stars | ~29.8k |
| Best for | Complex multi-step agent pipelines with human-in-the-loop |
| Key feature | Durable execution — agent resumes from checkpoint after failures |

---

### LangChain + LlamaIndex (The Full Ecosystem)

| Tool | GitHub | Stars | Best For |
|---|---|---|---|
| LangChain | https://github.com/langchain-ai/langchain | ~110k | Full agent stack, 200+ tool integrations |
| LlamaIndex | https://github.com/run-llama/llama_index | ~47.1k | Data-centric RAG, 40+ vector DB integrations |

---

## SECTION 6: VECTOR DATABASE COMPARISON

*Source: [Sparkco AI Deep Dive, Oct 2025](https://sparkco.ai/blog/pinecone-vs-weaviate-vs-chroma-a-deep-dive-into-vector-dbs)*

| Feature | Pinecone | Weaviate | Chroma | Qdrant |
|---|---|---|---|---|
| Deployment | Fully managed cloud | Hybrid cloud+on-prem | Open-source local | Open-source, cloud option |
| Query latency | Sub-100ms | Competitive | Higher on large datasets | Fastest raw speed |
| Scalability | Effortless 1M+ | Cloud-native | Manual tuning | High-performance |
| Pricing | Usage-based | Cost-effective | Free (infra costs) | Free tier + cloud |
| Best for | Production, no ops | Enterprise/compliance | Prototyping | Production raw speed |

**Quick Decision Matrix:**
- **Ship to production fast, no infra ops** → **Pinecone**
- **Finance/compliance, need on-prem control** → **Weaviate**
- **Open-source stack, prototyping** → **Chroma**
- **Best raw speed, production** → **Qdrant**
- **Already on PostgreSQL** → **pgvector** (free extension, zero new infra)

**For MOR INC starting out:** Pinecone (managed, zero ops) or Qdrant (self-hosted, fast) are both strong choices. Mem0 handles the vector DB layer for you if you use their managed service.

---

## SECTION 7: RESEARCH PAPERS & DEEP DIVES

### Must-Read Papers
| Paper | URL | Key Finding |
|---|---|---|
| Mem0 Paper (2025) | https://arxiv.org/html/2504.19413v1 | 26% better than OpenAI Memory; 91% latency reduction |
| Long-Term Memory for AI Agents | https://mem0.ai/blog/long-term-memory-ai-agents | Semantic, episodic, procedural memory in production |

### Deep Dive Substacks (Add to NotebookLM)
| Source | URL | Best For |
|---|---|---|
| The Memory Stack: RAG to Cognitive AI | https://interestingengineering.substack.com/p/the-memory-stack-from-rag-to-cognitive | 7-layer architecture framework |
| Three Types of AI Agent Memory (Cobus Greyling) | https://cobusgreyling.substack.com/p/three-types-of-ai-agent-memory | Factual, experiential, working memory |
| Building an Agent That Actually Remembers (Deriv) | https://derivai.substack.com/p/building-an-ai-agent-that-actually | Rolling memory, 3 practical fixes |
| How Memory Works in Agentic AI (WTF In Tech) | https://bhavishyapandit9.substack.com/p/how-memory-works-in-agentic-ai-a | Vector retrieval pipeline |
| The AI Agent Stack in 2025 | https://thenuancedperspective.substack.com/p/the-ai-agent-stack-in-2025-how-its | Full stack overview, LangChain memory |

### RAG Best-Practice Videos
| Video | URL | Runtime |
|---|---|---|
| RAG 2025 Best-Practice Stack (AI Makerspace) | https://www.youtube.com/watch?v=vf9emNxXWdA | — |
| Build and Deploy RAG App with Pinecone (LangChain) | https://www.youtube.com/watch?v=EhlPDL4QrWY | — |

---

## SECTION 8: MOR INC MEMORY ROADMAP

### Current State
- Memory: Context summary re-injected each session (stateless)
- Storage: GitHub repo (`memory/active/` + `memory/archive/`)
- Architecture: Custom age-tier compression rules (`memory/_RULES.md`)

### Near-Term (This Week)
1. **Add MCP Memory Server via Claude Code** — Edge runs `claude mcp add memory`. Zero cost, zero infra. Tests lightweight cross-session persistence immediately.
2. **Evaluate mem0 Hobby tier (free)** — Pete's `user_id="pete_mor_trading"` stores trader preferences, market context, and rules. Test against the current context re-injection pattern.

### Medium-Term (1-2 weeks)
3. **mem0 Starter ($19/mo)** — If hobby works, upgrade. 50K add requests/month is more than enough for daily trading sessions.
4. **mem0 + Cloudflare Worker integration** — Pete calls `/mem0-retrieve` before every LLM call. Worker injects top memories into context. Edge builds the endpoint.
5. **Rulebook → RAG** — Index all 29 session MDs + rulebook into a vector store. Query: "What is the current rule for catalyst events?" without scanning entire files.

### Long-Term (1 month+)
6. **Letta integration** — If stateful agent behavior is needed (agents that learn and improve continuously), Letta is the path.
7. **GraphRAG over MOR corpus** — Knowledge graph of all rules, sessions, market events. Complex cross-document reasoning.

---

## SECTION 9: QUICK REFERENCE — ALL MEMORY SOURCES

### GitHub Repos (Add to NotebookLM)
| Repo | URL | Stars |
|---|---|---|
| mem0ai/mem0 | https://github.com/mem0ai/mem0 | ~53.6k |
| letta-ai/letta | https://github.com/letta-ai/letta | ~22.2k |
| microsoft/graphrag | https://github.com/microsoft/graphrag | ~28.8k |
| langchain-ai/langgraph | https://github.com/langchain-ai/langgraph | ~29.8k |
| langchain-ai/langchain | https://github.com/langchain-ai/langchain | ~110k |
| run-llama/llama_index | https://github.com/run-llama/llama_index | ~47.1k |
| modelcontextprotocol/servers (memory server) | https://github.com/modelcontextprotocol/servers | ~83.8k |

### Official Docs
| Service | URL |
|---|---|
| mem0.ai | https://mem0.ai |
| mem0 docs | https://docs.mem0.ai |
| letta.com | https://www.letta.com |
| letta docs | https://docs.letta.com |
| Pinecone | https://www.pinecone.io |
| Qdrant | https://qdrant.tech |

---

## PRIORITY READING LIST (For MOR INC Specifically)

1. `https://mem0.ai/blog/rag-vs-ai-memory` — RAG vs Memory distinction (start here)
2. `https://arxiv.org/html/2504.19413v1` — Mem0 paper (benchmark evidence)
3. `https://www.letta.com/blog/stateful-agents` — Why stateless is broken
4. `https://interestingengineering.substack.com/p/the-memory-stack-from-rag-to-cognitive` — 7-layer architecture
5. `https://www.letta.com/blog/agent-memory` — Implementation guide
6. `https://cobusgreyling.substack.com/p/three-types-of-ai-agent-memory` — Three memory types
7. `https://derivai.substack.com/p/building-an-ai-agent-that-actually` — Rolling memory, 3 practical fixes
8. `https://github.com/mem0ai/mem0` — GitHub repo (code + README)
9. `https://github.com/letta-ai/letta` — Letta framework
10. `https://github.com/modelcontextprotocol/servers` — MCP memory server (quickest win)

---

*Compiled by Pete (Perplexity Computer) — MOR INC A1-EDGE Trading System*
*Research sources: YouTube, GitHub, Substack, academic papers — April 20, 2026*
