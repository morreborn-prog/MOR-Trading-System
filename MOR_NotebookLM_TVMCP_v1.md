# MOR INC — NotebookLM Source Packet: TradingView MCP
**File:** `MOR_NotebookLM_TVMCP_v1.md`
**Author:** Pete | 260420
**Target notebook:** DB#02 — AI Platforms + OpenClaw
**Upload as:** URL source or paste

---

## What Is TradingView MCP?

TradingView MCP is an open-source server that connects Claude Code (Edge) directly to the TradingView Desktop app via Chrome DevTools Protocol. It replaces the old screenshot-and-paste workflow with a live data bridge — Claude reads actual chart data, indicators, drawings, and price in real time.

**Key distinction:** This is NOT a TradingView API or screenshot tool. Claude reads the DOM/data layer of the desktop app — the same way a developer reads website code.

**GitHub:** https://github.com/tradesdontlie/tradingview-mcp
**MCP Market listing:** https://mcpmarket.com/server/tradingview-2

---

## How It Works

```
TradingView Desktop App
        │
        │ Chrome DevTools Protocol (CDP)
        ▼
TradingView MCP Server (local Node process)
        │
        │ MCP protocol
        ▼
Claude Code (Edge in VS Code)
        │
        ▼
Analysis / Pine Script / Alerts — live, no screenshots
```

- Runs 100% locally on Michael's machine
- Requires TradingView DESKTOP app (not the browser version)
- Requires TradingView paid subscription for real-time data
- Works with Claude Code — Edge's native environment

---

## Install (Edge runs once)

Paste into Claude Code terminal:

```
Install the TradingView MCP server.
Clone and explore https://github.com/tradesdontlie/tradingview-mcp
Run npm install, add to my MCP config at ~/.claude/.mcp.json,
and launch TradingView with the debug port.
```

Claude Code handles the rest automatically.

**Health check (run every session start):**
```
Use tv_health_check to confirm TradingView is connected.
```

---

## Capabilities — What Edge Can Do With This

| Capability | Command / Use Case |
|------------|-------------------|
| Read live chart | "What's on my chart right now?" |
| Technical analysis | "Conduct TA on SPY 5m — draw support/resistance with volume" |
| Draw trend lines | "Draw the key levels on SPY 1D" |
| Scan watchlist | "Scan my MOR watchlist for A+ setups" |
| Create indicators | "Write a Pine Script VWAP indicator and add it to my chart" |
| Deploy Pete's scripts | Paste Pete's Pine Script draft — Edge deploys via TV MCP |
| Set alerts | "Set an alert when VIX crosses 22" |
| Manage alert system | "Review all my active TV alerts and clean up expired ones" |
| Backtest strategies | "Backtest this scalp strategy on SPY 5m for last 30 days" |
| Morning market brief | "I haven't been at my desk — give me a full market report" |

---

## MOR-Specific Use Cases

### 1. Deploy Pete's Pine Scripts
Pete writes all Pine Script in v5. Edge deploys via TV MCP:
- `MOR_BlackSwan_v1` → SPY 1D, alert on 3+ signal confluence
- `MOR_CrackSignals_v1` → SPY 5m, scalp alert overlay
- `MOR_APlus_SetupScore_v1` → any ticker, A+ setup grading

### 2. Morning Session Start
Edge runs at 7:45 AM CT before Pete's brief:
```
Use tv_health_check. Then scan my MOR watchlist on the 5m timeframe.
Flag any tickers showing: unusual volume, key level breaks, or momentum signals.
Post summary to Slack C0AC8UQJT54.
```

### 3. Iran / Vol Watch
During Iran ceasefire period:
```
Every 15 minutes — read VIX, UVIX, and USO on my chart.
If VIX > 22 or UVIX > 10%, post alert to Slack C0AC8UQJT54 immediately.
```

### 4. Pete Script → Edge Deploy Pipeline
1. Pete writes Pine Script, posts to GitHub
2. Edge pulls from GitHub
3. Edge pastes into Claude Code → TV MCP deploys to chart
4. Edge confirms via Slack: "Script deployed to SPY 5m ✅"

### 5. EOD Chart Review
Post-close:
```
Pull up SPY 1D and 5m. Summarize today's price action, key levels respected/broken,
and flag any setups for tomorrow. Post to Slack.
```

---

## OpenClaw + TV MCP Integration (Sprint 2)

From research: one creator runs OpenClaw connected to TV MCP on a Mac Mini — always on, scanning market 24/7, posting briefs to Telegram. This is the MOR target state:

- OpenClaw (Michael's machine, always on) + TV MCP = 24/7 chart monitoring
- Pete provides signal logic → OpenClaw executes scan → results to Slack
- Edge handles setup and maintenance

---

## Key Sources for NotebookLM

Add these URLs to DB#02:

| Source | URL |
|--------|-----|
| GitHub repo | https://github.com/tradesdontlie/tradingview-mcp |
| MCP Market listing | https://mcpmarket.com/server/tradingview-mcp |
| YouTube — How To Connect Claude + TV | https://www.youtube.com/watch?v=MIvtj0VCHTY |
| YouTube — 5 Powerful Use Cases | https://www.youtube.com/watch?v=Qd4YVckP7o8 |
| YouTube — Setup Tutorial | https://www.youtube.com/watch?v=ZmCokBWkWYk |
| TradingView chart — System Builder writeup | https://www.tradingview.com/chart/XAUUSD/e07pkCDb-Trader-System-Builder-the-interface-that-changes-everything/ |

---

## Requirements Checklist

- [ ] TradingView Desktop app installed on Michael's machine
- [ ] TradingView paid subscription (real-time data)
- [ ] Claude Code running in VS Code (Edge's environment)
- [ ] TV MCP installed via Claude Code one-prompt install
- [ ] tv_health_check passes
- [ ] Pete's Pine Scripts cloned from GitHub, ready to deploy

*Pete, 260420*
