# 260427 — Pete Intel: TradingView MCP → Cursor Hookup (v2 — CORRECTED)
**Filed by:** Pete (Perplexity Computer)
**Date:** April 27, 2026 — 06:45 CT
**Version:** v2 — CORRECTION: no build step, runs directly from src/server.js
**Amend:** Amendment 27 (file naming) + Amendment 28 (baby-steps format)

> ⚠️ v1 had an error: `npm run build` and `dist/index.js` DO NOT EXIST in this repo.
> The server runs directly from `src/server.js`. v2 is the correct guide.

---

## PART 1 — Cursor MCP Config (CORRECTED)

**File location:** `C:\Users\[YourName]\.cursor\mcp.json`

> For **Cursor** (not Claude Code), the config file is `~/.cursor/mcp.json`

```json
{
  "mcpServers": {
    "tradingview": {
      "command": "node",
      "args": ["C:/Users/[YourName]/tradingview-mcp/src/server.js"]
    }
  }
}
```

**Example — if you cloned to your home folder (most common):**
```json
{
  "mcpServers": {
    "tradingview": {
      "command": "node",
      "args": ["C:/Users/Michael/tradingview-mcp/src/server.js"]
    }
  }
}
```

> No `TV_CDP_URL` env var needed — the server connects to `http://127.0.0.1:9222` by default.
> Use forward slashes `/` in the path even on Windows — Node.js handles it.

---

## PART 2 — Baby Steps (v2 — CORRECTED)

### Before You Start
- [ ] Node.js installed → open PowerShell, type `node --version`, hit Enter. See a version = good.
- [ ] Git installed → type `git --version`. See a version = good.
- [ ] If either is missing: Node.js from nodejs.org (LTS), Git from git-scm.com

---

### Step 1 — Open PowerShell
`Win + X` → Terminal (or Windows PowerShell)

---

### Step 2 — Clone the MCP repo
```powershell
git clone https://github.com/tradesdontlie/tradingview-mcp.git
```
This creates a `tradingview-mcp` folder wherever PowerShell is pointed (usually `C:\Users\[YourName]\`)

---

### Step 3 — Go into the folder
```powershell
cd tradingview-mcp
```

---

### Step 4 — Install dependencies
```powershell
npm install
```
Wait for it to finish. You'll see packages scroll by — normal. Done when you get your prompt back.

> **That's it. No build step. No `npm run build`.** The server runs directly from `src/server.js`.

---

### Step 5 — Note your full path
```powershell
pwd
```
Shows something like: `C:\Users\Michael\tradingview-mcp`
**Copy that path.** You'll need it in Step 7.

---

### Step 6 — Start TradingView with CDP
Run the launcher script from your MOR Trading System repo:
```powershell
powershell -ExecutionPolicy Bypass -File "C:\path\to\MOR-Trading-System\scripts\TV-CDP-START.ps1"
```
TradingView Desktop opens. **Leave it open.**

---

### Step 7 — Open Cursor MCP config
Open File Explorer → navigate to: `C:\Users\[YourName]\.cursor\`
Open `mcp.json` in Notepad (or Cursor itself).
If it doesn't exist, create a new file named `mcp.json` in that folder.

---

### Step 8 — Paste the config (from Part 1)
Replace `[YourName]` with whatever showed in your `pwd` output (Step 5).

Example — pwd showed `C:\Users\Michael\tradingview-mcp`:
```json
{
  "mcpServers": {
    "tradingview": {
      "command": "node",
      "args": ["C:/Users/Michael/tradingview-mcp/src/server.js"]
    }
  }
}
```
Save the file.

---

### Step 9 — Restart Cursor
Close Cursor completely. Reopen it.
Go to: **Settings → MCP**
Look for **"tradingview"** with a green dot = connected.

---

### Step 10 — Health check
In Cursor's chat (Agent mode), type:
```
tv_health_check
```
Expected response:
```json
{
  "success": true,
  "cdp_connected": true,
  "chart_symbol": "...",
  "api_available": true
}
```
Green = **YOU'RE HOOKED UP.**

---

### Step 11 — Optional: Install TV CLI globally
From inside the `tradingview-mcp` folder:
```powershell
npm link
```
Now you can run `tv status`, `tv quote`, `tv pine compile` from anywhere in PowerShell.

---

## PART 3 — What You Get (78 MCP Tools)

Once connected, Edge (and Pete via spec) can do ALL of this from inside Cursor:

| Category | What it does |
|---|---|
| **Chart control** | Change symbol, timeframe, chart type |
| **Live data** | Real-time quotes, OHLCV, indicator values (RSI, MACD, BB, EMA) |
| **Pine Script** | Inject code, compile, read errors, save to TV cloud |
| **Drawings** | Draw trend lines, horizontal levels, rectangles, text on chart |
| **Alerts** | Create, list, delete price alerts |
| **Screenshots** | Capture full chart or strategy tester |
| **Replay** | Replay mode — step through bars, simulate trades |
| **Batch** | Run actions across multiple tickers at once |
| **Watchlist** | Read/manage TV watchlist |
| **Panes** | Multi-pane layouts, focus panes, set symbols per pane |

---

## PART 4 — TV Path & Fallback

**Current confirmed TV Desktop path:**
```
C:\Program Files\WindowsApps\31178TradingViewInc.TradingView_3.0.0.0_x64__q4jpyh43s5mv6\TradingView.exe
```
CDP Port: `9222`

If Windows Store silently updates TV and the path breaks:
```powershell
Get-AppxPackage *TradingView*
```
Grab the new `InstallLocation` and update `TV-CDP-START.ps1` line 11.

---

## PART 5 — Claude Code Config (Edge's lane — different from Cursor)

When Edge is back, his config goes in `~/.claude/.mcp.json` (not `.cursor/mcp.json`):
```json
{
  "mcpServers": {
    "tradingview": {
      "command": "node",
      "args": ["/path/to/tradingview-mcp/src/server.js"]
    }
  }
}
```

---

**Repo:** https://github.com/tradesdontlie/tradingview-mcp
**Full spec:** `MOR_NotebookLM_TVMCP_v1.md` in MOR repo
**Filed by:** Pete — solo run, v2 correction
