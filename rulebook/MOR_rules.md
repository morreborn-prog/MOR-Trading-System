# MOR Master Trading Rulebook

**Version:** 1.0  
**Effective:** 2026-04-16  
**Rule changes:** commit with date + reason

---

## Risk Rules
- Max risk per trade: 1% of account
- Max risk per session: 3% of account
- Hard stop: cease trading if session loss > 4%
- No revenge trading — 15 min cooldown after full-stop loss

---

## A-Setup Entry Rules
1. SPY above premarket VWAP
2. Bid volume > offer volume on tape (confirmation)
3. Price accepted above opening range high (longs) or below opening range low (shorts)
4. VIX < 20 for long bias; VIX > 20 = stand aside or short-only
5. Fib 1.618 extension confirmed on 5-min chart
6. No entry into chop — price must show clear directional acceptance

---

## B-Setup Rules
- Mean reversion at key gamma/put wall levels
- Must have volume confirmation
- Smaller size (0.5% max risk)

---

## Stand-Aside Conditions
- VIX > 20 + oil > $100 simultaneously
- Mixed internals (A/D line flat, no sector leadership)
- First 15-min range inside premarket range with no breakout
- Major news catalyst unresolved (Fed, geopolitical)

---

## Session Phases
| Phase | Time (CDT) | Action |
|---|---|---|
| Pre-Market | 8:00–9:29 AM | Bias, levels, setup map |
| First 15 | 9:30–9:45 AM | Confirm/reject bias, A-setup trigger |
| Mid-Session | 9:45 AM–2:59 PM | Execute, manage, stand aside if chop |
| Power Hour | 3:00–4:00 PM | EOD structure, swing closes, gamma pin |
| Post-Close | 4:00–5:00 PM | Backtest recs vs P&L, adjust rules, tomorrow prep |

---

## Rule Change Log
| Date | Rule Changed | Before | After | Reason |
|---|---|---|---|---|
| 2026-04-16 | A-setup entry | Structure only | Structure + tape confirmation | Reduce false triggers |

---

## Catalyst Play Rules (added 2026-04-20)

**Rule: Binary catalyst = minimum 30 DTE**
- If the catalyst has uncertain timing (e.g. "expected in April"), use 30+ DTE
- 4-7 DTE on a binary catalyst = lottery ticket, not a trade
- Example: USAR DOC funding "April 2026" → correct play is May or June expiry, not Apr 24
- Lesson source: USAR $23.50C Apr 24 — right thesis, wrong expiry. Down $106 on a live catalyst.

**DTE Guide by catalyst type:**
| Catalyst Type | Min DTE | Notes |
|---------------|---------|-------|
| Earnings (known date) | 7-14 DTE | Tight window, date is fixed |
| Government/regulatory (month guidance) | 30+ DTE | Timing uncertain, need runway |
| Geopolitical binary (ceasefire/expiry) | 14-21 DTE | Known date but vol decay risk |
| Sector sweep / institutional flow | 14-21 DTE | Give the thesis room to develop |
| Macro event (Fed, CPI) | 7 DTE | Date is fixed, short window fine |
