# NOTEBOOKLM DB #01 — MEMORY SYSTEM + AI COLLAB

**Purpose:** Upload to NotebookLM as Source #1. Tailored to MOR INC. stack.
**Built:** 2026-04-20 14:10 CT by Edge
**Goals:** solve 4-AI amnesia, tighten Pete↔Edge↔Chief↔Vera collab, compound session knowledge

See full content at `iCloudDrive/AA WORK FILES/A1 Trading/bot/NOTEBOOKLM_DB01_memory_system.md`.

## SOURCES COLLECTED

### Pillar 1 — Hugging Face papers (8)
- [AI Hippocampus](https://hf.co/papers/2601.09113) — implicit / explicit / agentic memory
- [Memory for Autonomous LLM Agents survey](https://hf.co/papers/2603.07670) — write/manage/read loop
- [Scaling Teams or Scaling Time](https://hf.co/papers/2604.03295) — smaller+better beats bigger
- [Intrinsic Memory Agents](https://hf.co/papers/2508.08997) — per-agent memory, not shared
- [A-MEM Agentic Memory](https://hf.co/papers/2502.12110) — Zettelkasten for LLM
- [LatentMem](https://hf.co/papers/2602.03036) — learnable experience bank
- [H-MEM Hierarchical](https://hf.co/papers/2507.22925) — indexed retrieval
- [Collaborative Multi-Agent Optimization](https://hf.co/papers/2603.12631) — joint RL reward

### Pillar 2 — GitHub repos (10)
- [mem0ai/mem0](https://github.com/mem0ai/mem0) 48K⭐ universal memory layer
- [letta-ai/agent-file](https://github.com/letta-ai/agent-file) .af serialization format
- [getzep/zep](https://www.getzep.com/) temporal knowledge graph
- [humanlayer/12-factor-agents](https://github.com/humanlayer/12-factor-agents) production principles
- [MervinPraison/PraisonAI](https://github.com/MervinPraison/PraisonAI) 24/7 workforce
- [deepset-ai/haystack](https://github.com/deepset-ai/haystack) orchestration
- [griptape-ai/griptape](https://github.com/griptape-ai/griptape) Python framework
- [CommandCodeAI/BaseAI](https://github.com/CommandCodeAI/BaseAI) serverless
- [topoteretes/cognee](https://github.com/topoteretes/cognee) knowledge graph
- neuron-core/neuron-ai (PHP)

### Pillar 3 — Claude ecosystem (Anthropic)
- [Subagents with memory](https://code.claude.com/docs/en/sub-agents) v2.1.33 Feb 2026
- [Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
- [Memory tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool)
- [Agent Skills cheat codes Medium](https://medium.com/jonathans-musings/agent-skills-the-cheat-codes-for-claude-code-b8679f0c3c4d)
- [Claude.md vs Agents.md hierarchy guide](https://amitray.com/claude-md-vs-agents-md-memory-md-skills-md-context-md-guide-2026/)

### Pillar 4 — Substack / newsletters
- [Latent.Space](https://www.latent.space/) — swyx + Alessio
- [Agent Engineering keynote](https://www.latent.space/p/agent)
- [Scaling without Slop](https://www.latent.space/p/2026)
- Simon Willison blog
- [Multi-Agent Memory arxiv](https://arxiv.org/html/2603.10062v1)

### Pillar 5 — YouTube
- [I Gave Claude Code Permanent Memory](https://www.youtube.com/watch?v=EsFa7W-FYdM)
- [Second Brain for Claude](https://www.youtube.com/watch?v=a2hgayvr-H4)
- [Claude Code Tutorial](https://www.youtube.com/watch?v=kwE-uSEakYU)

### Pillar 6 — MOR INC. current state
- Team: Edge / Chief / Vera / Pete / NotebookLM / OpenClaw / Groq / Copilot
- 5-tier Notion architecture (LIVE today — pages created)
- 16 Worker crons, Slack #new-channel primary comms
- 29 session MDs indexed (SESSION_MD_AUDIT_0420.md)
- Today's shipped: CAPABILITY_HEATMAP, Pete Slack bot, /scalp-watch cron

## KEY INSIGHTS APPLIED TO US

1. **Keep per-agent memory separate** (Intrinsic Memory Agents paper) — validates our Tier 3
2. **Smaller teams + better memory beat bigger teams** — don't add a 5th AI, fix memory first
3. **Zettelkasten atomic notes** — break monolithic session MDs into tagged atoms for NotebookLM retrieval
4. **Add "manage" step to write-manage-read** — `mor-session-end` needs consolidation/pruning
5. **Team-level KPI** — weekly P&L attribution forces Pete/Edge/Chief/Vera onto shared outcome

## IMPLEMENTATION PRIORITY (from research)

1. Letta-style agent memory file (.af format) per agent
2. mem0 as universal memory layer behind Worker
3. 12-factor-agents principles audit on Edge + Pete
4. NotebookLM queries (see main doc)
5. Atomic Zettelkasten session notes during Tier 4 migration

---

*Edge · 2026-04-20 · v1.0 · 4 parallel research passes*
