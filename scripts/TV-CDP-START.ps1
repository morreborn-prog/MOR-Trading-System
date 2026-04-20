# TV-CDP-START - Canonical TradingView CDP Launcher
# PURPOSE: ONE consistent way for Edge (Claude Code) to connect to TradingView.
# USAGE: Click the desktop shortcut OR run this .ps1 directly.
#        Log into TradingView + Moomoo ONCE on first launch.
#        Every subsequent launch = already logged in.
# DESIGN:
#   - PERSISTENT profile dir so TV login + Moomoo connection survive restarts
#   - Fixed port 9222 (matches MCP config)
#   - Idempotent: if already running with CDP, re-attaches
#   - PREFERS TradingView Desktop (Electron app) - Pete's 260420 recommendation
#   - Falls back to Edge browser if Desktop unavailable
# LAST UPDATED: 2026-04-20 by Edge (per Pete's 260420 spec — prefer Desktop Electron over Edge browser)

$ErrorActionPreference = 'Continue'

$PORT = 9222
$PROFILE_DIR = "C:\Users\Public\TV-CDP"  # NO SPACES - Edge silently fails on paths with spaces
$TV_URL = "https://www.tradingview.com/chart/"
$TV_DESKTOP = "C:\Program Files\WindowsApps\31178TradingViewInc.TradingView_3.0.0.0_x64__q4jpyh43s5mv6\TradingView.exe"

Write-Host "=== TV-CDP Launcher ===" -ForegroundColor Cyan
Write-Host "Port: $PORT"
Write-Host "Profile: $PROFILE_DIR"
Write-Host ""

# 1. Check if CDP is already up
try {
    $existing = Invoke-RestMethod "http://127.0.0.1:$PORT/json/version" -TimeoutSec 2 -ErrorAction Stop
    Write-Host "ALREADY RUNNING on port $PORT" -ForegroundColor Green
    Write-Host "Browser: $($existing.Browser)"
    Write-Host "TV is reachable at http://127.0.0.1:$PORT"
    Read-Host "Press Enter to close"
    exit 0
} catch {
    Write-Host "CDP not yet listening - launching fresh..." -ForegroundColor Yellow
}

# 2. Prefer TV DESKTOP (Electron) — Pete's 260420 recommendation
# Fallback: Edge/Chrome browser if Desktop unavailable
$useDesktop = $false
if (Test-Path $TV_DESKTOP) {
    Write-Host "Found TV Desktop Electron app: $TV_DESKTOP" -ForegroundColor Green
    $useDesktop = $true
} else {
    Write-Host "TV Desktop not found at $TV_DESKTOP — falling back to Edge browser." -ForegroundColor Yellow
    $browsers = @(
        "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
        "${env:ProgramFiles}\Microsoft\Edge\Application\msedge.exe",
        "${env:ProgramFiles}\Google\Chrome\Application\chrome.exe",
        "${env:LOCALAPPDATA}\Google\Chrome\Application\chrome.exe"
    )
    $edgeRunning = Get-Process msedge -ErrorAction SilentlyContinue
    if ($edgeRunning) {
        Write-Host "Killing $($edgeRunning.Count) existing Edge processes..." -ForegroundColor Yellow
        $edgeRunning | Stop-Process -Force -ErrorAction SilentlyContinue
        Start-Sleep -Seconds 2
    }
    $browser = $null
    foreach ($b in $browsers) {
        if (Test-Path $b) { $browser = $b; break }
    }
    if (-not $browser) {
        Write-Host "NO TV DESKTOP AND NO BROWSER FOUND. Install TV Desktop from Windows Store or Edge/Chrome." -ForegroundColor Red
        Read-Host "Press Enter to close"
        exit 1
    }
    Write-Host "Using browser fallback: $browser"
}

# 3. Ensure profile dir exists (for browser-fallback only)
if (-not $useDesktop) {
    if (-not (Test-Path $PROFILE_DIR)) {
        New-Item -ItemType Directory -Path $PROFILE_DIR -Force | Out-Null
        Write-Host "Created NEW profile dir (first launch)." -ForegroundColor Cyan
    } else {
        Write-Host "Using existing profile dir (login state preserved)." -ForegroundColor Green
    }
}

# 4. Launch TV Desktop (preferred) or Edge browser fallback
if ($useDesktop) {
    $tvRunning = Get-Process TradingView -ErrorAction SilentlyContinue
    if ($tvRunning) {
        Write-Host "Killing $($tvRunning.Count) existing TradingView processes..." -ForegroundColor Yellow
        $tvRunning | Stop-Process -Force -ErrorAction SilentlyContinue
        Start-Sleep -Seconds 2
    }
    $launchArgs = @("--remote-debugging-port=$PORT")
    Start-Process -FilePath $TV_DESKTOP -ArgumentList $launchArgs
    Write-Host "Launched TradingView Desktop (Electron) with CDP on $PORT." -ForegroundColor Green
} else {
    $launchArgs = @(
        "--remote-debugging-port=$PORT",
        "--remote-debugging-address=127.0.0.1",
        "--user-data-dir=$PROFILE_DIR",
        "--no-first-run",
        "--no-default-browser-check",
        $TV_URL
    )
    Start-Process -FilePath $browser -ArgumentList $launchArgs
    Write-Host "Launched browser fallback." -ForegroundColor Green
}

# 5. Wait for CDP
Write-Host "Waiting for CDP to accept connections..."
$ready = $false
for ($i = 0; $i -lt 30; $i++) {
    Start-Sleep -Seconds 1
    try {
        $r = Invoke-RestMethod "http://127.0.0.1:$PORT/json/version" -TimeoutSec 1 -ErrorAction Stop
        Write-Host ""
        Write-Host "CDP READY" -ForegroundColor Green
        Write-Host "Browser: $($r.Browser)"
        $ready = $true
        break
    } catch {
        Write-Host "." -NoNewline
    }
}

if (-not $ready) {
    Write-Host ""
    Write-Host "CDP DID NOT COME UP." -ForegroundColor Red
    Write-Host "  1. Close ALL browser windows and re-run."
    Write-Host "  2. Verify browser path or TV Desktop install."
    Read-Host "Press Enter to close"
    exit 2
}

# 6. First-launch guidance
$cookieFile = Join-Path $PROFILE_DIR "Default\Network\Cookies"
if ((-not $useDesktop) -and (-not (Test-Path $cookieFile))) {
    Write-Host ""
    Write-Host "=== FIRST LAUNCH SETUP ===" -ForegroundColor Yellow
    Write-Host "1. Log into TradingView in the window"
    Write-Host "2. Click 'Trade' button top right"
    Write-Host "3. Click 'moomoo' and complete OAuth"
    Write-Host "4. After connected, you can close this terminal"
    Write-Host "Next launch: login + broker will persist."
}

Write-Host ""
Write-Host "DONE - TV live at http://127.0.0.1:$PORT" -ForegroundColor Green
Read-Host "Press Enter to close"
