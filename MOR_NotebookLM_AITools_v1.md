# MOR INC — NotebookLM Intelligence Packet
## AI Platforms: Claude · Perplexity · OpenAI · Colab
**Version:** 1.0 | **Compiled:** April 20, 2026 | **By:** Pete (Perplexity Computer)
**For:** Michael O'Regan, MOR INC / A1-EDGE Trading System

> **OpenClaw Caveat:** "OpenClaw" referenced in the original request. Research found it mentioned in a YouTube comparison video alongside Claude Cowork and Perplexity Computer as a competing AI agent product — NOT confirmed to be OpenAI. This packet covers OpenAI/GPT as the closest confirmed match. If OpenClaw is a different specific product, Pete can build a supplemental section. No guessing beyond this note.

---

## HOW TO USE THIS IN NOTEBOOKLM

**Option A — URL Sources (fastest):**
Copy each URL from the source lists below and paste into NotebookLM → "Add Source" → "Website" one at a time.

**Option B — Document Upload:**
Upload this entire file as a document source in NotebookLM. It contains all key content for AI-powered Q&A.

**Recommended NotebookLM questions to start:**
- "What are the key differences between Claude, Perplexity, and OpenAI for agent development?"
- "How do I integrate Claude with a trading system?"
- "What is the Colab MCP server and how does it work?"
- "Compare the pricing for each AI platform"

---

## SECTION 1: CLAUDE / ANTHROPIC

### What Claude Is (2026 State)
Claude is Anthropic's AI model family. Current lineup:
- **Claude Opus 4.7** (April 2026) — Most capable. Best for agentic workflows, multi-step tasks, complex reasoning.
- **Claude Sonnet** — Balanced cost/performance. Primary workhorse for production systems.
- **Claude Haiku** — Fast and cheap. Sub-agent tasks, classification, quick lookups.

**Context window:** 200K tokens (all models)
**API pricing:** Sonnet 3.5 at ~$3/M input, $15/M output tokens

**Claude's key differentiator for agents:** Native MCP (Model Context Protocol) support. Claude can natively use any MCP server as a tool — GitHub, Slack, Notion, Alpaca, Google Drive — without additional glue code.

**A1-EDGE Connection:** Edge (Claude Code) is MOR's primary infrastructure agent. Claude Opus 4.6 is the reasoning core of Perplexity Computer.

---

### Claude Official Sources (Add to NotebookLM)

| Source | URL | Type |
|---|---|---|
| Anthropic Docs — Building with Claude | https://docs.anthropic.com/en/docs/overview | Official Docs |
| Claude API Reference | https://docs.anthropic.com/en/api/getting-started | API Docs |
| Claude Model Families + Pricing | https://docs.anthropic.com/en/docs/about-claude/models | Docs |
| Claude Cookbooks (code examples) | https://github.com/anthropics/anthropic-cookbook | GitHub |
| MCP Servers (official) | https://github.com/modelcontextprotocol/servers | GitHub |
| MCP Python SDK | https://github.com/modelcontextprotocol/python-sdk | GitHub |
| Anthropic News/Blog | https://www.anthropic.com/news | Blog |
| Claude Quickstarts | https://github.com/anthropics/claude-quickstarts | GitHub |
| Claude Code (terminal agent) | https://github.com/anthropics/claude-code | GitHub |
| Anthropic SDK Python | https://github.com/anthropics/anthropic-sdk-python | GitHub |

---

### Claude YouTube Sources

| Video | URL | Runtime |
|---|---|---|
| Mastering Claude Code in 30 minutes (Anthropic official) | https://www.youtube.com/watch?v=6eBSHbLKuN0 | 30 min |
| Claude AI 101: Full Course Walkthrough (Kilo Loco) | https://www.youtube.com/watch?v=H6LchswC74Y | 3 hr+ |
| Claude 3.7 Sonnet: Claude Code + Copilot Agent Mode | https://www.youtube.com/watch?v=LnvlEd9fVok | — |
| Technical: SWE-Bench, Computer Use, Multi-Agent (Latent Space) | https://www.youtube.com/watch?v=QXbsEoOZeTM | 71 min |
| Claude 3.5 Sonnet Coding Benchmark (The AI Advantage) | https://www.youtube.com/watch?v=xZX0vOqWsC8 | — |

---

### Claude Substack/Newsletter Sources

| Source | URL | Best For |
|---|---|---|
| Simon Willison's Newsletter | https://simonw.substack.com | Best Claude-specific coverage; production behavior |
| Claude Skills article (Simon Willison) | https://simonw.substack.com/p/claude-skills-are-awesome-maybe-a | Claude Skills architecture deep-dive |
| Claude Cowork review (Simon Willison) | https://simonwillison.net/2026/Jan/12/claude-cowork/ | Hands-on Cowork review |
| Ben's Bites | https://www.bensbites.com | First-mover coverage of all Anthropic releases |
| Don't Worry About the Vase (Zvi) | https://thezvi.substack.com | Rigorous model analysis, risk-aware perspective |
| One Useful Thing (Ethan Mollick) | https://www.oneusefulthing.org | Practical AI applications, evidence-based |
| Claude's Corner (official Anthropic Substack) | https://substack.com/home/post/p-189177838 | Model perspective from Anthropic |

---

### Key Claude Concepts for A1-EDGE

**Claude Skills:**
- Markdown-based `.md` files that extend Claude's capabilities
- Skills live in Claude's GitHub repo and load on demand
- MOR INC is already using this system — `pete-mor-intel` is a Pete skill

**Model Context Protocol (MCP):**
- Open standard by Anthropic for AI↔tool connections
- All MCP servers (GitHub, Slack, Notion, Alpaca) connect to Claude via one protocol
- Pete uses MCP: `github_mcp_direct`, `notion_mcp`, `slack_direct`, `alpaca__pipedream`
- Edge can `claude mcp add` any server one-line

**Claude Code:**
- Terminal-based agentic coding tool (Edge's primary interface)
- Full codebase context awareness
- Computer use: Edge can click, type, navigate like a human
- Integrates with all MCP servers

---

## SECTION 2: PERPLEXITY AI

### What Perplexity Is (2026 State)
Perplexity started as a search engine but is now a **multi-model AI orchestration platform**.

**Key products:**
- **Perplexity Search** — AI-powered web search with citations
- **Perplexity Computer** (Feb 2026) — Cloud AI worker orchestrating 19 frontier models
- **Perplexity API** — Sonar model family for developers

**Perplexity Computer specs:**
- 19 frontier models including Claude Opus 4.6 (reasoning), Gemini (deep research), GPT-5.2 (long-context), Grok (speed)
- 7 parallel search types simultaneously
- 400+ app integrations
- Cloud Linux sandbox: 2 vCPU, 8GB RAM (same as MOR's sandbox)
- $200/month (Max plan)
- Skills system (markdown-based, same as Claude)

**A1-EDGE Connection:** Pete IS Perplexity Computer. All 25 Pete abilities run on this platform. Perplexity MCP server is already integrated in MOR Trading System.

---

### Perplexity Official Sources (Add to NotebookLM)

| Source | URL | Type |
|---|---|---|
| Perplexity Blog (Hub) | https://www.perplexity.ai/hub | Official Blog |
| Perplexity API Docs | https://docs.perplexity.ai | API Docs |
| "The AI is the Computer" (CEO post) | https://www.perplexity.ai/hub/blog/the-ai-is-the-computer | Strategy |
| Enterprise model-switching article | https://www.perplexity.ai/hub/blog/inside-the-rise-of-enterprise-ai-model-switching | Enterprise |
| Perplexity MCP Server (GitHub) | https://github.com/perplexityai/modelcontextprotocol | GitHub |
| Perplexity Python SDK | https://github.com/perplexityai/perplexity-py | GitHub |
| Perplexity Node.js SDK | https://github.com/perplexityai/perplexity-node | GitHub |

---

### Perplexity YouTube Sources

| Video | URL | Runtime |
|---|---|---|
| Perplexity Spaces launch walkthrough (Skill Leap AI) | https://www.youtube.com/watch?v=ArPU944U_q8 | 16 min |
| Build and Automate with Perplexity Computer (Julian Goldie) | https://www.youtube.com/watch?v=_yhYEGMb8ms | — |
| Perplexity Computer: AI Employees 24/7 (Brock Mesarich) | https://www.youtube.com/watch?v=UHz8sQ6ZM24 | — |
| Perplexity Labs API Walkthrough (Janakiram MSV) | https://www.youtube.com/watch?v=46XRqjOjzE0 | 15 min |
| Perplexity AI for Beginners 2025 (David Hood) | https://www.youtube.com/watch?v=jusBbYr60Xc | 8 min |

---

### Perplexity Substack/Newsletter Sources

| Source | URL | Best For |
|---|---|---|
| Definitive Guide to Perplexity Computer (Linas) | https://linas.substack.com/p/perplexity-computer-guide | 10 prompt templates, credit strategy, AGENT framework |
| Perplexity Computer: Honest Analysis (Nate) | https://natesnewsletter.substack.com/p/perplexity-shipped-its-best-product | Structural risks + moat analysis |
| How to Use Perplexity Computer (Dept. of Product) | https://departmentofproduct.substack.com/p/how-to-use-perplexitys-new-computer | Step-by-step workflow builds |
| Perplexity Computer: What I Built in One Night | https://karozieminski.substack.com/p/perplexity-computer-review-examples-guide | Real build examples, multi-model architecture |
| Perplexity Computer Complete Guide 2026 (Eesel AI) | https://www.eesel.ai/blog/perplexity-computer | Technical architecture deep dive |
| Perplexity Computer Review 7.2/10 (Awesome Agents) | https://awesomeagents.ai/reviews/review-perplexity-computer/ | Honest rating, known weaknesses |
| Wonder Tools: The New Perplexity | https://wondertools.substack.com/p/the-new-perplexity | Labs, voice mode, 53 pro prompts |

---

## SECTION 3: OPENAI / GPT
> ⚠️ **OpenClaw Caveat:** "OpenClaw" from Michael's request is likely a separate product — found referenced as an AI agent competitor alongside Claude Cowork and Perplexity Computer. This section covers OpenAI as the closest confirmed AI platform match. Pete can supplement with an OpenClaw-specific section once identified.

### What OpenAI Is (2026 State)
OpenAI is the maker of GPT and the leading AI infrastructure provider. Current model lineup:

| Model | Best For | Context |
|---|---|---|
| GPT-4o | Multimodal (text + image + audio), general use | 128K |
| o3 | Complex reasoning, coding, financial analysis | 128K |
| o4-mini | Fast, cost-effective, visual coding | 128K |
| GPT-4.1 | Coding tasks, 1M context | 1M |
| GPT-5.2 | Long-context recall, broad search | Long |
| gpt-oss-120b | Open-weight, on-prem deployable | — |

**Key 2025 launch:** Responses API + Agents SDK — OpenAI's agentic platform. Replaces the older Assistants API. Built-in tools: web search, file search (vector store), computer use.

---

### OpenAI Official Sources (Add to NotebookLM)

| Source | URL | Type |
|---|---|---|
| OpenAI Platform Docs | https://platform.openai.com/docs/overview | Official Docs |
| New Tools for Building Agents (March 2025) | https://openai.com/index/new-tools-for-building-agents/ | Blog |
| Introducing o3 and o4-mini | https://openai.com/index/introducing-o3-and-o4-mini/ | Blog |
| OpenAI for Developers 2025 Year in Review | https://developers.openai.com/blog/openai-for-developers-2025 | Blog |
| OpenAI Python SDK | https://github.com/openai/openai-python | GitHub |
| OpenAI Cookbook (71.7k stars) | https://github.com/openai/openai-cookbook | GitHub |
| OpenAI Codex (terminal agent, 76.5k stars) | https://github.com/openai/codex | GitHub |
| OpenAI Evals | https://github.com/openai/evals | GitHub |
| OpenAI open-weight models (gpt-oss) | https://github.com/openai/gpt-oss | GitHub |
| OpenAI Model Release Notes | https://help.openai.com/en/articles/9624314-model-release-notes | Docs |

---

### OpenAI YouTube Sources

| Video | URL | Runtime |
|---|---|---|
| Responses API Walkthrough (Dave Ebbelaar) | https://www.youtube.com/watch?v=0pGxoubWI6s | 30 min |
| o3 Agentic Coding Evaluation (Prompt Engineering) | https://www.youtube.com/watch?v=qkjwGd_jV00 | — |
| GPT-4o API: Image + Function Calling Intro | https://www.youtube.com/watch?v=3F55ZQWcwW4 | — |
| OpenAI 2025 Product Line Overview (COMMAND) | https://www.youtube.com/watch?v=msmcuTmHknk | 10 min |
| GPT-4o API Crash Course (Mervin Praison) | https://www.youtube.com/watch?v=O6H5op-iamU | 9 min |

---

### OpenAI Substack/Newsletter Sources

| Source | URL | Best For |
|---|---|---|
| The Rundown AI | https://www.therundown.ai | Daily coverage, 2M subscribers |
| Stratechery (Ben Thompson) | https://stratechery.com | Strategic analysis of OpenAI's position |
| TheSequence — Agents Deep Dive | https://thesequence.substack.com/p/the-sequence-engineering-513-a-deep | Responses API + Agents SDK technical breakdown |
| Interconnects (Nathan Lambert) | https://www.interconnects.ai | Training methodology, alignment, reliability |
| Ankur's Newsletter — o3/o4/GPT-4o Comparison | https://www.ankursnewsletter.com/p/open-ai-o3-o4-mini-gpt-4o-and-alternatives | Side-by-side model comparison |

---

## SECTION 4: GOOGLE COLAB

### What Colab Is (2026 State)
Google Colab is a **free cloud-hosted Jupyter notebook environment** with GPU/TPU access. In March 2026, Colab launched an **MCP server** — making it the first major cloud notebook that AI agents can autonomously control.

**Why it matters for A1-EDGE:**
- Free GPU compute for backtesting and model inference
- Claude Code (Edge) can now autonomously create and run Colab notebooks via MCP
- No local infrastructure needed for heavy computation
- Sandboxed execution — keeps experimental code off production machines

**Colab MCP capability:**
```
Claude Code / Gemini CLI
    ↓ MCP protocol
Colab MCP Server (localhost)
    ↓ WebSocket bridge  
Google Colab notebook (browser)
    ↓ Jupyter kernel
Cloud GPU execution
```
Setup is 4 steps: `pip install uv` → add MCP config JSON → open notebook → give agent a command.

**Key integration pattern for MOR:**
- Pete identifies analysis needed
- Edge (Claude Code) uses Colab MCP to autonomously build a backtesting notebook
- Colab runs it on GPU
- Results come back to Pete via GitHub or Slack

---

### Google Colab Official Sources (Add to NotebookLM)

| Source | URL | Type |
|---|---|---|
| Google Colab | https://colab.research.google.com | Platform |
| Colab MCP Server announcement | https://developers.googleblog.com/announcing-the-colab-mcp-server-connect-any-ai-agent-to-google-colab/ | Blog |
| Colab MCP GitHub (open source) | https://github.com/googlecolab/colab-mcp | GitHub |
| Google Cloud: Dev Guide to Production AI Agents | https://cloud.google.com/blog/products/ai-machine-learning/a-devs-guide-to-production-ready-ai-agents | Blog |
| colabtools (Colab Python library) | https://github.com/googlecolab/colabtools | GitHub |
| Gemini CLI (60k+ stars) | https://github.com/google-gemini/gemini-cli | GitHub |

---

### Google Colab YouTube Sources

| Video | URL | Runtime |
|---|---|---|
| AI-First Colab (Google for Developers official) | https://www.youtube.com/watch?v=SThT9rw0sPU | — |
| How to Use Generative AI in Colab 2025 (itversity) | https://www.youtube.com/watch?v=oTGmTPPqGag | — |
| Colab Setup + Gemini + Dashboard (KSR Datavizon) | https://www.youtube.com/watch?v=-UTH9F9LqwU | 45 min |
| Running GPT-4o Mini in Colab (Tony Kipkemboi) | https://www.youtube.com/watch?v=qxu7AxUnLPs | — |
| Complete Colab Guide for AI/ML 2025 (Art of Intelligence) | https://www.youtube.com/watch?v=cmNrIcB77D0 | 30 min |

---

### Colab Tutorial Sources

| Source | URL | Best For |
|---|---|---|
| Production AI Agent Automating Colab (MarkTechPost) | https://www.marktechpost.com/2026/03/23/how-to-design-a-production-ready-ai-agent-that-automates-google-colab-workflows-using-colab-mcp-mcp-tools-fastmcp-and-kernel-execution/ | Full MCP production tutorial |
| InfoQ: Google Brings MCP to Colab | https://www.infoq.com/news/2026/04/colab-mcp-server/ | Architecture overview |
| AI Magicx: Colab MCP Server Guide | https://www.aimagicx.com/blog/colab-mcp-server-free-cloud-agents-2026 | Practical patterns |
| MachineLearningMastery: AI-Assisted Colab | https://machinelearningmastery.com/setting-up-a-google-colab-ai-assisted-coding-environment-that-actually-works/ | Best-practice workflow |

---

## SECTION 5: TOP CHANNELS (ALL PLATFORMS)

### Cross-Platform YouTube Channels to Follow

| Channel | URL | Best For |
|---|---|---|
| Anthropic (official) | https://www.youtube.com/@anthropic-ai | Claude releases, Claude Code |
| Perplexity (official) | https://www.youtube.com/@PerplexityAI | Perplexity products |
| OpenAI (official) | https://www.youtube.com/@OpenAI | GPT releases, research |
| Google for Developers | https://www.youtube.com/@GoogleforDevelopers | Colab AI features, Gemini |
| Letta (official) | https://www.youtube.com/@letta-ai | MemGPT, stateful agents |
| AI Engineer Foundation | https://www.youtube.com/@AIEngineerFdn | Deep workshops with tool creators |
| DeepLearning.AI | https://www.youtube.com/@Deeplearningai | Short courses on agents, RAG, memory |
| Matt Wolfe | https://www.youtube.com/@mreflow | Weekly AI news, all platforms |
| AI Explained | https://www.youtube.com/@aiexplained-official | Model comparisons, analytical |
| Latent Space | https://www.youtube.com/@latentspacepod | Technical deep dives with engineers |
| Skill Leap AI | https://www.youtube.com/@skillleapai | Claude + Perplexity practitioner |
| Dave Ebbelaar | https://www.youtube.com/@daveebbelaar | OpenAI production tutorials |
| MLOps.community | https://www.youtube.com/@MLOpscommunity | Paper readings: Mem0, MemGPT |
| LangChain (official) | https://www.youtube.com/@LangChain | RAG, agents, vector DB |

---

## SECTION 6: MASTER NEWSLETTER LIST

### Daily News
| Newsletter | URL | Subs | Cost |
|---|---|---|---|
| The Rundown AI | https://www.therundown.ai | 2M+ | Free |
| Ben's Bites | https://www.bensbites.com | 161K+ | Free |
| TLDR AI | https://tldr.tech/ai | 500K+ | Free |

### Deep Technical Analysis
| Newsletter | URL | Cost |
|---|---|---|
| Simon Willison (Claude/LLMs) | https://simonw.substack.com | $10/mo |
| Interconnects (Nathan Lambert) | https://www.interconnects.ai | ~$10/mo |
| TheSequence (engineering) | https://thesequence.substack.com | Free/Paid |
| Don't Worry About the Vase (Zvi) | https://thezvi.substack.com | Free/Paid |

### Strategy
| Newsletter | URL | Cost |
|---|---|---|
| Stratechery (Ben Thompson) | https://stratechery.com | ~$200/yr |
| One Useful Thing (Ethan Mollick) | https://www.oneusefulthing.org | Free |

### Perplexity-Specific
| Newsletter | URL | Cost |
|---|---|---|
| Linas's Newsletter | https://linas.substack.com | Free/Paid |
| Product with Attitude (Karo) | https://karozieminski.substack.com | Free/Paid |
| Nate's Newsletter | https://natesnewsletter.substack.com | Free/Paid |

---

## A1-EDGE INTEGRATION MAP

**Already Active:**
- Perplexity Computer (Pete) + Claude Opus 4.6 core
- Claude Code (Edge) + all MCP servers
- GitHub, Slack, Notion, Alpaca, Google Drive, OneDrive via MCP

**High Priority Adds:**
- Colab MCP → Edge adds it one-line for GPU notebook automation
- OpenAI API → Alternative model for comparison/fallback
- TradeStation API (in progress — Edge building)

**Future:**
- OpenAI Agents SDK for cross-provider agent orchestration
- OpenAI Codex as Edge's backup terminal agent

---

*Compiled by Pete (Perplexity Computer) — MOR INC A1-EDGE Trading System*
*Research sources: YouTube, GitHub, Substack, official docs — April 20, 2026*
