import { useState, useEffect, useCallback } from 'react'

const ALPACA_KEY = import.meta.env.VITE_ALPACA_API_KEY || ''
const ALPACA_SECRET = import.meta.env.VITE_ALPACA_SECRET_KEY || ''
const ALPACA_BASE = import.meta.env.VITE_ALPACA_BASE_URL || 'https://paper-api.alpaca.markets'

const REFRESH_MS = 15 * 60 * 1000

function formatUSD(n) {
  if (n == null || isNaN(n)) return '—'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)
}

function pctClass(v) {
  if (v > 0) return 'text-emerald-400'
  if (v < 0) return 'text-red-400'
  return 'text-zinc-400'
}

function Panel({ title, icon, children }) {
  return (
    <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 flex flex-col gap-3">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
        <span>{icon}</span> {title}
      </h2>
      {children}
    </div>
  )
}

function AccountSummary({ account, positions }) {
  if (!account) {
    return (
      <Panel title="Account Summary" icon="💰">
        <p className="text-zinc-500 text-sm italic">
          {ALPACA_KEY ? 'Loading...' : 'Set VITE_ALPACA_API_KEY and VITE_ALPACA_SECRET_KEY in .env to connect'}
        </p>
      </Panel>
    )
  }
  const equity = parseFloat(account.equity)
  const bp = parseFloat(account.buying_power)
  const dailyPl = parseFloat(account.equity) - parseFloat(account.last_equity)
  const dailyPct = (dailyPl / parseFloat(account.last_equity)) * 100

  return (
    <Panel title="Account Summary" icon="💰">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-zinc-500">Equity</div>
          <div className="text-2xl font-bold text-white">{formatUSD(equity)}</div>
        </div>
        <div>
          <div className="text-xs text-zinc-500">Buying Power</div>
          <div className="text-2xl font-bold text-white">{formatUSD(bp)}</div>
        </div>
        <div>
          <div className="text-xs text-zinc-500">Daily P&L</div>
          <div className={`text-xl font-bold ${pctClass(dailyPl)}`}>
            {formatUSD(dailyPl)} ({dailyPct.toFixed(2)}%)
          </div>
        </div>
        <div>
          <div className="text-xs text-zinc-500">Open Positions</div>
          <div className="text-xl font-bold text-white">{positions.length}</div>
        </div>
      </div>
      {positions.length > 0 && (
        <div className="mt-2 overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-zinc-500 border-b border-zinc-800">
                <th className="text-left py-1">Symbol</th>
                <th className="text-right py-1">Qty</th>
                <th className="text-right py-1">Avg Entry</th>
                <th className="text-right py-1">Current</th>
                <th className="text-right py-1">P&L</th>
              </tr>
            </thead>
            <tbody>
              {positions.map(p => {
                const pl = parseFloat(p.unrealized_pl)
                return (
                  <tr key={p.asset_id} className="border-b border-zinc-800/50">
                    <td className="py-1 font-medium text-white">{p.symbol}</td>
                    <td className="text-right py-1 text-zinc-300">{p.qty}</td>
                    <td className="text-right py-1 text-zinc-300">{formatUSD(parseFloat(p.avg_entry_price))}</td>
                    <td className="text-right py-1 text-zinc-300">{formatUSD(parseFloat(p.current_price))}</td>
                    <td className={`text-right py-1 font-medium ${pctClass(pl)}`}>{formatUSD(pl)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </Panel>
  )
}

function SessionPL({ orders }) {
  const wins = orders.filter(o => parseFloat(o.filled_avg_price) > 0 && o.side === 'sell')
  const totalTrades = orders.length
  return (
    <Panel title="Session P&L" icon="📈">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <div className="text-xs text-zinc-500">Trades Today</div>
          <div className="text-xl font-bold text-white">{totalTrades}</div>
        </div>
        <div>
          <div className="text-xs text-zinc-500">Filled Orders</div>
          <div className="text-xl font-bold text-white">{orders.filter(o => o.status === 'filled').length}</div>
        </div>
        <div>
          <div className="text-xs text-zinc-500">Closed Orders</div>
          <div className="text-xl font-bold text-white">{wins.length}</div>
        </div>
      </div>
      {orders.length > 0 ? (
        <div className="mt-2 overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-zinc-500 border-b border-zinc-800">
                <th className="text-left py-1">Symbol</th>
                <th className="text-left py-1">Side</th>
                <th className="text-right py-1">Qty</th>
                <th className="text-right py-1">Avg Price</th>
                <th className="text-left py-1">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => (
                <tr key={o.id || i} className="border-b border-zinc-800/50">
                  <td className="py-1 font-medium text-white">{o.symbol}</td>
                  <td className={`py-1 ${o.side === 'buy' ? 'text-emerald-400' : 'text-red-400'}`}>{o.side?.toUpperCase()}</td>
                  <td className="text-right py-1 text-zinc-300">{o.filled_qty || o.qty}</td>
                  <td className="text-right py-1 text-zinc-300">{formatUSD(parseFloat(o.filled_avg_price))}</td>
                  <td className="py-1 text-zinc-400">{o.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-zinc-500 text-sm italic">No orders today</p>
      )}
    </Panel>
  )
}

const WORKERS = [
  { name: 'SPY VWAP Bias', type: 'Primary', status: 'Active' },
  { name: 'Gap Scanner', type: 'Primary', status: 'Active' },
  { name: 'Volume Gainer Scan', type: 'Primary', status: 'Active' },
  { name: 'Gamma/VIX Filter', type: 'Primary', status: 'Active' },
  { name: 'Dark Pool Anomaly', type: 'Secondary', status: 'Monitor' },
  { name: 'Option Block Watcher', type: 'Secondary', status: 'Monitor' },
  { name: 'Fib 1.618 Trigger', type: 'Confirmation', status: 'Active' },
  { name: 'Tape Pressure', type: 'Confirmation', status: 'Active' },
]

function WorkerScoreboard() {
  return (
    <Panel title="Worker Scoreboard" icon="🤖">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-zinc-500 border-b border-zinc-800">
              <th className="text-left py-1">Worker</th>
              <th className="text-left py-1">Type</th>
              <th className="text-left py-1">Status</th>
              <th className="text-right py-1">Signals</th>
              <th className="text-right py-1">Win Rate</th>
            </tr>
          </thead>
          <tbody>
            {WORKERS.map(w => (
              <tr key={w.name} className="border-b border-zinc-800/50">
                <td className="py-1 font-medium text-white">{w.name}</td>
                <td className="py-1 text-zinc-400">{w.type}</td>
                <td className="py-1">
                  <span className={`inline-block w-2 h-2 rounded-full mr-1 ${w.status === 'Active' ? 'bg-emerald-400' : 'bg-yellow-400'}`} />
                  <span className="text-zinc-300">{w.status}</span>
                </td>
                <td className="text-right py-1 text-zinc-500">—</td>
                <td className="text-right py-1 text-zinc-500">—</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  )
}

const RULES_LOG = [
  { date: '2026-04-20', rule: 'Catalyst Play Rules', change: 'Added — binary catalyst = min 30 DTE' },
  { date: '2026-04-16', rule: 'A-setup entry', change: 'Structure only → Structure + tape confirmation' },
]

function RuleChangeFeed() {
  return (
    <Panel title="Rule Change Feed" icon="📜">
      <div className="space-y-2">
        {RULES_LOG.map((r, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="text-xs text-zinc-600 whitespace-nowrap mt-0.5">{r.date}</span>
            <div>
              <div className="text-sm font-medium text-white">{r.rule}</div>
              <div className="text-xs text-zinc-400">{r.change}</div>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  )
}

function ActiveSetups() {
  return (
    <Panel title="Active Setups" icon="🎯">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-sm text-white">A-Setup: SPY VWAP bias + tape confirmation</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-yellow-400" />
          <span className="text-sm text-white">B-Setup: Mean reversion at gamma/put wall</span>
        </div>
        <p className="text-xs text-zinc-500 mt-2">
          Setup triggers auto-populated from session log after market close.
        </p>
      </div>
    </Panel>
  )
}

function TomorrowPrep() {
  return (
    <Panel title="Tomorrow Prep" icon="🗓️">
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <div className="text-xs text-zinc-500">Bias</div>
          <div className="text-zinc-300 italic">Pending post-close</div>
        </div>
        <div>
          <div className="text-xs text-zinc-500">Key Levels</div>
          <div className="text-zinc-300 italic">Pending post-close</div>
        </div>
        <div>
          <div className="text-xs text-zinc-500">Active Setups</div>
          <div className="text-zinc-300 italic">Pending post-close</div>
        </div>
        <div>
          <div className="text-xs text-zinc-500">Stand-aside</div>
          <div className="text-zinc-300 italic">Pending post-close</div>
        </div>
      </div>
    </Panel>
  )
}

function StatusBar({ lastRefresh, error }) {
  return (
    <div className="flex items-center gap-4 text-xs text-zinc-500">
      <span className={`inline-block w-2 h-2 rounded-full ${error ? 'bg-red-400' : 'bg-emerald-400'}`} />
      <span>{error ? `Error: ${error}` : 'Connected'}</span>
      <span>Last refresh: {lastRefresh ? lastRefresh.toLocaleTimeString() : '—'}</span>
      <span>Auto-refresh: 15 min</span>
    </div>
  )
}

export default function App() {
  const [account, setAccount] = useState(null)
  const [positions, setPositions] = useState([])
  const [orders, setOrders] = useState([])
  const [lastRefresh, setLastRefresh] = useState(null)
  const [error, setError] = useState(null)

  const fetchAlpaca = useCallback(async () => {
    if (!ALPACA_KEY || !ALPACA_SECRET) return
    const headers = {
      'APCA-API-KEY-ID': ALPACA_KEY,
      'APCA-API-SECRET-KEY': ALPACA_SECRET,
    }
    try {
      const [accRes, posRes, ordRes] = await Promise.all([
        fetch(`${ALPACA_BASE}/v2/account`, { headers }),
        fetch(`${ALPACA_BASE}/v2/positions`, { headers }),
        fetch(`${ALPACA_BASE}/v2/orders?status=closed&after=${new Date().toISOString().slice(0, 10)}T00:00:00Z&limit=100`, { headers }),
      ])
      if (!accRes.ok) throw new Error(`Account: ${accRes.status}`)
      setAccount(await accRes.json())
      setPositions(posRes.ok ? await posRes.json() : [])
      setOrders(ordRes.ok ? await ordRes.json() : [])
      setError(null)
      setLastRefresh(new Date())
    } catch (e) {
      setError(e.message)
    }
  }, [])

  useEffect(() => {
    fetchAlpaca()
    const id = setInterval(fetchAlpaca, REFRESH_MS)
    return () => clearInterval(id)
  }, [fetchAlpaca])

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">MOR Trading Dashboard</h1>
          <p className="text-xs text-zinc-500">MOR Trading Systems — Live System Health</p>
        </div>
        <StatusBar lastRefresh={lastRefresh} error={error} />
      </header>
      <main className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 max-w-7xl mx-auto">
        <AccountSummary account={account} positions={positions} />
        <SessionPL orders={orders} />
        <WorkerScoreboard />
        <ActiveSetups />
        <TomorrowPrep />
        <RuleChangeFeed />
      </main>
      <footer className="border-t border-zinc-800 px-6 py-3 text-center text-xs text-zinc-600">
        MOR INC &copy; {new Date().getFullYear()} — Auto-refresh every 15 minutes
      </footer>
    </div>
  )
}
