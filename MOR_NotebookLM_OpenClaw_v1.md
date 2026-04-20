# MOR INC — NotebookLM Intelligence Packet
## OpenClaw: Open-Source Autonomous AI Agent
**Version:** 1.0 | **Compiled:** April 20, 2026 | **By:** Pete (Perplexity Computer)
**For:** Michael O'Regan, MOR INC / A1-EDGE Trading System

> **Identity Confirmed:** OpenClaw is NOT an OpenAI product. It's an open-source autonomous AI agent — formerly called Clawdbot, then Moltbot — created by Austrian developer Peter Steinberger (founder of PSPDFKit). Now the fastest-growing open-source project in GitHub history: **214,000+ stars in under 90 days.**

---

## WHAT IS OPENCLAW

OpenClaw is a **self-hosted, always-on AI agent** that runs on your local machine and connects directly to the messaging apps you already use. You message it on Slack, WhatsApp, or Discord. It does things — not just answers.

**The short version:** It's like hiring a 24/7 digital employee that lives on a Mac Mini or VPS. You text it from your phone, it executes on your machine.

---

## KEY FACTS

| Item | Details |
|---|---|
| **GitHub** | https://github.com/openclaw/openclaw |
| **Stars** | 214,000+ (fastest OSS project ever — surpassed Docker, Kubernetes, React) |
| **License** | MIT — completely free, bring your own API keys |
| **Creator** | Peter Steinberger, Austrian developer, PSPDFKit founder |
| **Launched** | November 2025 (as Clawdbot) |
| **Renamed** | Jan 2026 → OpenClaw |
| **OpenAI connection** | Acquired by/tied to OpenAI via founder — details emerging |
| **Skills registry** | ClawHub — 700+ community-built skills |
| **Official site** | https://clawhub.ai |

---

## HOW IT WORKS

```
You text from Slack / WhatsApp / Discord / Telegram
          ↓
OpenClaw Gateway (running 24/7 on your machine)
          ↓
Routes to AI model (Claude, GPT, Gemini, local — your API key)
          ↓
Executes using Skills: shell, browser, files, APIs, cron
          ↓
Sends result back to your chat
```

**Three things that make it different:**
1. **Full computer access** — reads/writes files, runs shell commands, controls browser
2. **Persistent memory** — stores everything as local Markdown files (same pattern MOR uses)
3. **Heartbeat / proactive** — runs scheduled tasks even when you're not there

---

## OPENCLAW + MOR INC — WHY THIS MATTERS

### Direct MOR Relevance

| Feature | MOR Application |
|---|---|
| **Slack integration** | Native. Runs in C0AC8UQJT54 already — no new setup |
| **Alpaca Trading Bot skill** | Community skill exists: integrates with Alpaca Markets, executes strategies |
| **Cron jobs / heartbeat** | 24/7 monitoring — like Pete's scalp-watch but self-hosted |
| **GitHub skill** | Auto-commits session logs, reads/writes repo |
| **Model: Claude Opus 4.6** | Official recommendation — same model as Pete's reasoning core |
| **Memory as Markdown** | Identical to MOR's memory/_RULES.md architecture |
| **Shell + browser** | Same computer use powers Edge already uses |
| **Multi-agent routing** | Isolated agent sessions per project — one for trading, one for infra |

### The Big Picture
Right now: Pete (cloud, Perplexity) + Edge (Claude Code, local machine) are two separate agents on two platforms.

OpenClaw running on Michael's machine would be a **third layer** — a persistent, always-on local agent that:
- Runs 24/7 without a session (no context window expiry)
- Executes on Michael's machine directly (not cloud sandbox)
- Uses same Slack channel as Pete and Edge
- Can run the Alpaca trading bot skill
- Manages its own memory locally

**Edge use case:** Edge installs OpenClaw on Michael's machine. Configure it to use Claude Opus 4.6. Connect to Slack. Add Alpaca skill. Done — automated trading monitor running 24/7 without Pete or Edge needing to be "on."

---

## SUPPORTED AI MODELS

OpenClaw is **model-agnostic** — you bring your own API key:

| Provider | Models |
|---|---|
| **Anthropic (recommended)** | Claude Opus 4.6, Claude Sonnet 4.5, Claude Haiku |
| OpenAI | GPT-4o, GPT-5.2, Codex |
| Google | Gemini 2.0 Flash, Flash-Lite |
| DeepSeek | V3 |
| Moonshot | Kimi K2.5 |
| Local | Any model via Ollama, LM Studio, vLLM |
| Multi-provider | OpenRouter (cheapest access) |

**Official best pick for complex tasks:** Claude Opus 4.6 (same as Pete). Model failover built in — if primary hits rate limits, auto-switches to fallback.

---

## SUPPORTED MESSAGING PLATFORMS

Connects to every channel MOR already uses:
- **Slack** ✅ (Socket Mode or HTTP Events API)
- **Discord** ✅ (bot integration)
- WhatsApp (WhatsApp Web)
- Telegram (Bot API)
- iMessage (macOS, via BlueBubbles)
- Signal, Microsoft Teams, Google Chat, Matrix, and 15 more

---

## OPENCLAW SKILLS SYSTEM

Skills are Markdown or TypeScript files — exact same concept as Claude Skills and Pete's `pete-mor-intel` skill.

**700+ skills in ClawHub registry** covering:
- GitHub integration
- Web browser automation
- Email / Gmail / calendar
- File system management
- Smart home devices
- Crypto + stock trading (Alpaca)
- Obsidian (memory graph)
- Discord multi-agent workflows
- Morning briefings / cron jobs

**Self-improving:** OpenClaw can write new skills for itself in conversation. Ask it to build a skill, it writes the code, installs it, done.

---

## SECURITY TOOLS

| Tool | Function |
|---|---|
| **SecureClaw** | 55 automated security checks (OWASP, MITRE ATLAS, CoSAI) |
| **ClawBands** | Security middleware — requires explicit approval before tool execution |
| **Aquaman** | Credential isolation proxy — API keys never enter the agent process |

---

## TOP YOUTUBE VIDEOS (OpenClaw)

### Best Starting Points

| Video | URL | Duration | Channel |
|---|---|---|---|
| OpenClaw: Complete Beginners Guide (2026) | https://www.youtube.com/watch?v=BI034QtdmTo | — | — |
| OpenClaw Setup 2026: The Only Guide You Need | https://www.youtube.com/watch?v=9epvGKyHIek | 21:43 | Fasthosts |
| OpenClaw Full Tutorial for Beginners (One-Click Setup) | https://www.youtube.com/watch?v=HNAv85MfGUI | 26:09 | Create a Pro Website |
| OpenClaw Setup in 5 Minutes (Beginners Guide) | https://www.youtube.com/watch?v=NszZ2Ynbsxk | 14:49 | Damian Malliaros |
| The ONLY OpenClaw Tutorial You Need 2026 | https://www.youtube.com/watch?v=dPoIuIvOPo8 | 34:33 | Charlie Chang |
| The only OpenClaw tutorial (March 2026 edition) | https://www.youtube.com/watch?v=CxErCGVo-oo | 44:08 | Alex Finn |
| How to Set Up First AI Agent 2026 (Step by Step) | https://www.youtube.com/watch?v=vJTEyamAxFk | — | — |

### Slack + Discord Integration (MOR-Specific)

| Video | URL | Duration | Channel |
|---|---|---|---|
| OpenClaw Slack Integration (major upgrade) | https://www.reddit.com/r/AISEOInsider/comments/1rkz4xe/ | 8:09 | Julian Goldie SEO |
| I run my ENTIRE business with OpenClaw + Discord | https://www.youtube.com/watch?v=iayRa4gKDnw | 22:40 | Alex McFarland |
| You're Using OpenClaw Wrong Without Discord | https://www.youtube.com/watch?v=vxpuLIA17q4 | 33:17 | Alex Finn |
| Set Up OpenClaw + Discord Fast (Step by Step) | https://www.youtube.com/watch?v=uy_wmsEwW6U | 4:16 | Kris Torrington |
| OpenClaw Discord + Parallel Agents (INSANE) | https://www.youtube.com/watch?v=XQvviZfawJw | 16:37 | Julian Goldie SEO |
| Clawd, MoltBot & OpenClaw Explained | https://www.youtube.com/watch?v=-OXeH_3ZLaE | 7:31 | DailyCoderHour |

### Deep Technical

| Video | URL | Duration | Channel |
|---|---|---|---|
| How I Created OpenClaw — Peter Steinberger (TED) | *(search: "How I Created OpenClaw Peter Steinberger TED")* | — | TED |
| OpenClaw: Discord + Parallel Agents | https://www.youtube.com/watch?v=XQvviZfawJw | 16:37 | Julian Goldie SEO |

---

## OFFICIAL + WEB SOURCES (Add to NotebookLM)

| Source | URL | Type |
|---|---|---|
| OpenClaw GitHub | https://github.com/openclaw/openclaw | GitHub |
| ClawHub skills registry | https://clawhub.ai | Website |
| Wikipedia: OpenClaw | https://en.wikipedia.org/wiki/OpenClaw | Reference |
| DigitalOcean: What is OpenClaw | https://www.digitalocean.com/resources/articles/what-is-openclaw | Guide |
| MindStudio: OpenClaw Deep Dive | https://www.mindstudio.ai/blog/what-is-openclaw-ai-agent/ | Guide |
| KDnuggets: OpenClaw Explained | https://www.kdnuggets.com/openclaw-explained-the-free-ai-agent-tool-going-viral-already-in-2026 | Article |
| Reddit: Complete OpenClaw Setup Guide | https://www.reddit.com/r/AgentsOfAI/comments/1sim9st/the_complete_openclaw_setup_guide_2026_from_zero/ | Guide |
| PacGenesis: What Is OpenClaw AI | https://pacgenesis.com/what-is-openclaw-ai-everything-you-need-to-know-about-the-open-source-ai-agent-that-actually-does-things/ | Guide |
| Turing College: OpenClaw Analysis | https://www.turingcollege.com/blog/openclaw | Analysis |

---

## MOR INC ACTION ITEMS

### Immediate (Edge handles)
1. **Install OpenClaw on Michael's machine** — one-liner install command, Edge runs it with computer use
2. **Connect to Slack** — route to C0AC8UQJT54 or a dedicated `#openclaw` channel
3. **Set model to Claude Opus 4.6** — same API key already in use
4. **Install Alpaca skill** from ClawHub — trading monitor, always on
5. **Install GitHub skill** — auto-commit session logs

### Configuration for MOR
```
Model: Claude Opus 4.6 (primary) → Sonnet 4.5 (fallback)
Channel: Slack C0AC8UQJT54 or dedicated #openclaw
Memory: Local Markdown → sync to /tmp/mor-repo/ or iCloud
Heartbeat: Market hours cron (8:30am-3pm CT)
Skills: alpaca-trading, github, brave-search, morning-briefing
Agent name: "Vera" or dedicated "MOR-Agent"
```

### Why Install It
The MOR stack gets a permanent local layer:
- Pete (cloud, Perplexity) = Intel & Oversight
- Edge (Claude Code) = Build & Deploy
- OpenClaw (local, 24/7) = Execute & Monitor, always on

Even when Pete's session expires and Edge is offline — OpenClaw keeps running.

---

## COMMUNITY + LEARNING

| Resource | URL |
|---|---|
| r/AgentsOfAI (main community) | https://www.reddit.com/r/AgentsOfAI |
| ClawHub skills registry | https://clawhub.ai |
| DigitalOcean 1-Click Deploy | Available at DigitalOcean marketplace |
| Setup on VPS (Hostinger) | See any tutorial video above |

---

*Compiled by Pete (Perplexity Computer) — MOR INC A1-EDGE Trading System*
*Research: web search + YouTube — April 20, 2026*
