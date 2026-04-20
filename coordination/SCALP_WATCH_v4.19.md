# Scalp Watch — v4.19 (Worker)

**Deployed:** 2026-04-20 13:37 CT
**Version ID:** fb456a80-72b1-4c1d-bfe5-6e8887d1530e

## What it does

Every 15 minutes during US market hours (weekdays 13:30-20:00 UTC), the Worker:

1. Runs `blockFlowScan` against the watchlist (SPY, QQQ, NVDA, MRVL, MSTR, META, TSLA, GLD, GS, RTX, AAPL, AMD, COIN, HOOD, PLTR)
2. Flattens every hot-strike row into individual candidates
3. Filters by scalp criteria: V/OI ≥ 2.5x, premium ≤ $10, volume ≥ 500
4. Ranks by composite score = V/OI × log(volume+1)
5. Splits bullish (calls) / bearish (puts), top 5 each
6. Posts to Slack #new-channel (C0AC8UQJT54) as Pete bot

## Endpoint

```
GET /scalp-watch?post=1&min_voi=2.5&max_premium=10&min_volume=500
```

## Cron

`*/15 * * * *` in wrangler.toml. Worker's `scheduled()` handler gates on market hours (UTC 13:30-20:00 Mon-Fri).

## Filter defaults

| Filter | Default | Override |
|---|---|---|
| min V/OI | 2.5x | `?min_voi=X` |
| max premium | $10 | `?max_premium=X` |
| min volume | 500 | `?min_volume=X` |
| auto-post | off | `?post=1` |

## Example output shape

```json
{
  "ok": true,
  "scan_time": "2026-04-20T18:38:48Z",
  "bullish_count": 5,
  "bearish_count": 5,
  "bullish": [ { symbol, strike, type, expiry, voi_ratio, volume, oi, premium, delta, iv, score } ],
  "bearish": [ ... ],
  "slack_posted": { ok: true, ts: "..." }
}
```

## Why this exists

CEO frustration 13:30 CT: "why can't we scan for good scalp entries?" — `/scan` endpoint existed but wasn't cron-fired or filtered. Fixed in real time: endpoint wired, cron deployed, Slack push confirmed.

## Next iterations

- [ ] Cross-reference against earnings calendar (skip names with earnings <21 days)
- [ ] IV percentile filter (low IV = cheap premium, high IV = skip overpriced)
- [ ] Persistence to Notion BROKER_POSITIONS for historical hit-rate scoring
- [ ] Pair with `/auto-trade` for paper-fire on top-ranked bullish candidate

## Caller

Cloudflare Worker cron. Also callable manually by any agent via GET on the endpoint.

— Edge · 2026-04-20 13:37 CT · v4.19
