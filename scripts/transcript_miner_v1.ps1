# Transcript Miner v1 — minimal
# Greps 311 JSONL transcripts for ticker mentions, outputs per-transcript summary
# Input: MOR_INC/_TIER4_ARCHIVE/transcripts/*.jsonl
# Output: per-transcript ticker counts (top 5)
# Use: Find which sessions were heaviest on which tickers — enables archaeology into past decisions.
# Skip rule: files >50MB (would hang or OOM)

$ErrorActionPreference = 'SilentlyContinue'
$TRANS = 'C:\Users\michael oregan\iCloudDrive\MOR_INC\_TIER4_ARCHIVE\transcripts'
$TICKERS = @('TSLA','SPY','QQQ','NVDA','MRVL','META','AAPL','AMD','UVIX','UVXY','RTX','GLD','USO','VIX','MSTR','COIN','HOOD','USAR','NKE','CMPS','OKLO','IONQ','BTCUSD')

$files = Get-ChildItem -Path $TRANS -Filter '*.jsonl' -File | Sort-Object LastWriteTime -Descending

Write-Output "# Transcript Ticker Index - 260420 v1"
Write-Output ""
Write-Output "$($files.Count) transcripts scanned. Tickers found (case-sensitive word match)."
Write-Output ""
Write-Output "| Date | Transcript | Top Tickers (count) | KB |"
Write-Output "|---|---|---|---|"

foreach ($f in $files) {
  if ($f.Length -lt 10KB) { continue }
  if ($f.Length -gt 50MB) {
    Write-Output "| $($f.LastWriteTime.ToString('yy-MM-dd')) | $($f.Name) | SKIPPED (>50MB) | $([math]::Round($f.Length/1KB,0)) |"
    continue
  }
  try {
    $content = Get-Content -Path $f.FullName -Raw -ErrorAction Stop
    $hits = @{}
    foreach ($t in $TICKERS) {
      $count = ([regex]::Matches($content, "\b$t\b")).Count
      if ($count -gt 0) { $hits[$t] = $count }
    }
    if ($hits.Count -gt 0) {
      $top = ($hits.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 5 | ForEach-Object { "$($_.Key)($($_.Value))" }) -join ' '
      Write-Output "| $($f.LastWriteTime.ToString('yy-MM-dd')) | $($f.Name) | $top | $([math]::Round($f.Length/1KB,0)) |"
    }
  } catch {}
}
