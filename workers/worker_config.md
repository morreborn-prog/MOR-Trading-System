# MOR Worker Configuration & Accuracy Tracker

**Last Updated:** 2026-04-16

---

## Active Workers

| Worker | Type | Signal Fired | Trades Taken | Win Rate | Status |
|---|---|---|---|---|---|
| SPY VWAP Bias | Primary | - | - | - | 🟢 Active |
| Gap Scanner | Primary | - | - | - | 🟢 Active |
| Volume Gainer Scan | Primary | - | - | - | 🟢 Active |
| Gamma/VIX Filter | Primary | - | - | - | 🟢 Active |
| Dark Pool Anomaly | Secondary | - | - | - | 🟡 Monitor |
| Option Block Watcher | Secondary | - | - | - | 🟡 Monitor |
| Fib 1.618 Trigger | Confirmation | - | - | - | 🟢 Active |
| Tape Pressure | Confirmation | - | - | - | 🟢 Active |

---

## Scoring Rules
- Update after every post-close session
- Worker downgraded to Secondary if win rate < 40% over 10 signals
- Worker removed if win rate < 30% over 20 signals
- New workers require 10-session backtest before going Primary

---

## Accuracy Log
| Date | Worker | Signals | Trades | Wins | Losses | Win Rate |
|---|---|---|---|---|---|---|
| 2026-04-16 | - | - | - | - | - | - |
