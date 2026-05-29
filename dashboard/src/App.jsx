import { useState, useEffect, useCallback } from 'react'

const TRADIER_TOKEN = import.meta.env.VITE_TRADIER_TOKEN || ''
const TRADIER_ACCOUNT = import.meta.env.VITE_TRADIER_ACCOUNT_ID || ''
const TRADIER_BASE = import.meta.env.VITE_TRADIER_BASE_URL || 'https://api.tradier.com'

const COINBASE_KEY = import.meta.env.VITE_COINBASE_API_KEY || ''
const COINBASE_SECRET = import.meta.env.VITE_COINBASE_API_SECRET || ''
const COINBASE_BASE = 'https://api.coinbase.com'

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

function BrokerBadge({ name, connected }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${connected ? 'bg-emerald-900/50 text-emerald-300' : 'bg-zinc-800 text-zinc-500'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${connected ? 'bg-emerald-400' : 'bg-zinc-600'}`} />
      {name}
    </span>
  )
}

function TradierAccount({ balances, positions }) {
  if (!balances && !TRADIER_TOKEN) {
    return (
      <Panel title="Tradier — Options & Stocks" icon="📊">
        <p className="text-zinc-500 text-sm italic">
          Set VITE_TRADIER_TOKEN and VITE_TRADIER_ACCOUNT_ID in .env to connect
        </p>
      </Panel>
    )
  }
  if (!balances) {
    return (
      <Panel title="Tradier — Options & Stocks" icon="📊">
        <p className="text-zinc-500 text-sm italic">Loading...</p>
      </Panel>
    )
  }

  const equity = balances.total_equity || balances.account_value || 0
  const cash = balances.total_cash || balances.cash?.cash_available || 0
  const marketValue = balances.market_value || 0

  return (
    <Panel title="Tradier — Options & Stocks" icon="📊">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <div className="text-xs text-zinc-500">Equity</div>
          <div className="text-2xl font-bold text-white">{formatUSD(equity)}</div>
        </div>
        <div>
          <div className="text-xs text-zinc-500">Cash</div>
          <div className="text-xl font-bold text-white">{formatUSD(cash)}</div>
        </div>
        <div>
          <div className="text-xs text-zinc-500">Market Value</div>
          <div className="text-xl font-bold text-white">{formatUSD(marketValue)}</div>
        </div>
      </div>
      {positions.length > 0 && (
        <div className="mt-2 overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-zinc-500 border-b border-zinc-800">
                <th className="text-left py-1">Symbol</th>
                <th className="text-right py-1">Qty</th>
                <th className="text-right py-1">Cost Basis</th>
                <th className="text-right py-1">Gain/Loss</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((p, i) => {
                const gl = (p.quantity * (p.last_price || 0)) - p.cost_basis
                return (
                  <tr key={p.symbol || i} className="border-b border-zinc-800/50">
                    <td className="py-1 font-medium text-white">{p.symbol}</td>
                    <td className="text-right py-1 text-zinc-300">{p.quantity}</td>
                    <td className="text-right py-1 text-zinc-300">{formatUSD(p.cost_basis)}</td>
                    <td className={`text-right py-1 font-medium ${pctClass(gl)}`}>{formatUSD(gl)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
      {positions.length === 0 && (
        <p className="text-zinc-500 text-xs italic">No open positions</p>
      )}
    </Panel>
  )
}

function CoinbaseAccount({ accounts }) {
  if (!accounts && !COINBASE_KEY) {
    return (
      <Panel title="Coinbase — Crypto" icon="₿">
        <p className="text-zinc-500 text-sm italic">
          Set VITE_COINBASE_API_KEY and VITE_COINBASE_API_SECRET in .env to connect
        </p>
      </Panel>
    )
  }
  if (!accounts) {
    return (
      <Panel title="Coinbase — Crypto" icon="₿">
        <p className="text-zinc-500 text-sm italic">Loading...</p>
      </Panel>
    )
  }

  const nonZero = accounts.filter(a => parseFloat(a.available_balance?.value || 0) > 0)
  const totalValue = nonZero.reduce((sum, a) => sum + parseFloat(a.available_balance?.value || 0), 0)

  return (
    <Panel title="Coinbase — Crypto" icon="₿">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-zinc-500">Total Holdings</div>
          <div className="text-2xl font-bold text-white">{formatUSD(totalValue)}</div>
        </div>
        <div>
          <div className="text-xs text-zinc-500">Active Assets</div>
          <div className="text-xl font-bold text-white">{nonZero.length}</div>
        </div>
      </div>
      {nonZero.length > 0 && (
        <div className="mt-2 overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-zinc-500 border-b border-zinc-800">
                <th className="text-left py-1">Asset</th>
                <th className="text-right py-1">Balance</th>
                <th className="text-right py-1">Value (USD)</th>
              </tr>
            </thead>
            <tbody>
              {nonZero.slice(0, 10).map(a => (
                <tr key={a.uuid} className="border-b border-zinc-800/50">
                  <td className="py-1 font-medium text-white">{a.currency || a.name}</td>
                  <td className="text-right py-1 text-zinc-300">{parseFloat(a.available_balance?.value || 0).toFixed(6)}</td>
                  <td className="text-right py-1 text-zinc-300">{formatUSD(parseFloat(a.available_balance?.value || 0))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {nonZero.length === 0 && (
        <p className="text-zinc-500 text-xs italic">No crypto holdings</p>
      )}
    </Panel>
  )
}

function TradierOrders({ orders }) {
  return (
    <Panel title="Session Orders — Tradier" icon="📈">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <div className="text-xs text-zinc-500">Orders Today</div>
          <div className="text-xl font-bold text-white">{orders.length}</div>
        </div>
        <div>
          <div className="text-xs text-zinc-500">Filled</div>
          <div className="text-xl font-bold text-white">{orders.filter(o => o.status === 'filled').length}</div>
        </div>
        <div>
          <div className="text-xs text-zinc-500">Pending</div>
          <div className="text-xl font-bold text-white">{orders.filter(o => o.status === 'pending' || o.status === 'open').length}</div>
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
                <th className="text-right py-1">Price</th>
                <th className="text-left py-1">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => (
                <tr key={o.id || i} className="border-b border-zinc-800/50">
                  <td className="py-1 font-medium text-white">{o.symbol}</td>
                  <td className={`py-1 ${o.side === 'buy' || o.side === 'buy_to_open' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {o.side?.toUpperCase().replace(/_/g, ' ')}
                  </td>
                  <td className="text-right py-1 text-zinc-300">{o.quantity}</td>
                  <td className="text-right py-1 text-zinc-300">{formatUSD(o.avg_fill_price || o.price || 0)}</td>
                  <td className="py-1 text-zinc-400">{o.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-zinc-500 text-sm italic">No orders this session</p>
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
  { date: '2026-05-05', rule: 'Connector Integrity', change: 'ALL connectors must be LIVE — flag immediately if any fails' },
  { date: '2026-04-20', rule: 'Catalyst Play Rules', change: 'Binary catalyst = minimum 30 DTE' },
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

function StatusBar({ lastRefresh, tradierOk, coinbaseOk, errors }) {
  const anyError = errors.length > 0
  return (
    <div className="flex items-center gap-3 text-xs text-zinc-500 flex-wrap">
      <BrokerBadge name="Tradier" connected={tradierOk} />
      <BrokerBadge name="Coinbase" connected={coinbaseOk} />
      <span className={`inline-block w-2 h-2 rounded-full ${anyError ? 'bg-red-400' : 'bg-emerald-400'}`} />
      <span>{anyError ? errors[0] : 'All systems OK'}</span>
      <span>Refresh: {lastRefresh ? lastRefresh.toLocaleTimeString() : '—'}</span>
    </div>
  )
}

export default function App() {
  const [tradierBalances, setTradierBalances] = useState(null)
  const [tradierPositions, setTradierPositions] = useState([])
  const [tradierOrders, setTradierOrders] = useState([])
  const [coinbaseAccounts, setCoinbaseAccounts] = useState(null)
  const [lastRefresh, setLastRefresh] = useState(null)
  const [errors, setErrors] = useState([])

  const fetchTradier = useCallback(async () => {
    if (!TRADIER_TOKEN || !TRADIER_ACCOUNT) return false
    const headers = {
      'Authorization': `Bearer ${TRADIER_TOKEN}`,
      'Accept': 'application/json',
    }
    try {
      const [balRes, posRes, ordRes] = await Promise.all([
        fetch(`${TRADIER_BASE}/v1/accounts/${TRADIER_ACCOUNT}/balances`, { headers }),
        fetch(`${TRADIER_BASE}/v1/accounts/${TRADIER_ACCOUNT}/positions`, { headers }),
        fetch(`${TRADIER_BASE}/v1/accounts/${TRADIER_ACCOUNT}/orders`, { headers }),
      ])
      if (!balRes.ok) throw new Error(`Tradier: ${balRes.status}`)
      const balData = await balRes.json()
      setTradierBalances(balData.balances || balData)

      const posData = posRes.ok ? await posRes.json() : {}
      const rawPos = posData.positions?.position
      setTradierPositions(Array.isArray(rawPos) ? rawPos : rawPos ? [rawPos] : [])

      const ordData = ordRes.ok ? await ordRes.json() : {}
      const rawOrd = ordData.orders?.order
      setTradierOrders(Array.isArray(rawOrd) ? rawOrd : rawOrd ? [rawOrd] : [])
      return true
    } catch (e) {
      return false
    }
  }, [])

  const fetchCoinbase = useCallback(async () => {
    if (!COINBASE_KEY || !COINBASE_SECRET) return false
    const headers = {
      'Content-Type': 'application/json',
    }
    try {
      const res = await fetch(`${COINBASE_BASE}/api/v3/brokerage/accounts?limit=50`, { headers })
      if (!res.ok) throw new Error(`Coinbase: ${res.status}`)
      const data = await res.json()
      setCoinbaseAccounts(data.accounts || [])
      return true
    } catch (e) {
      return false
    }
  }, [])

  const refresh = useCallback(async () => {
    const errs = []
    const tradierOk = await fetchTradier()
    const coinbaseOk = await fetchCoinbase()
    if (TRADIER_TOKEN && !tradierOk) errs.push('Tradier connection failed')
    if (COINBASE_KEY && !coinbaseOk) errs.push('Coinbase connection failed')
    setErrors(errs)
    setLastRefresh(new Date())
  }, [fetchTradier, fetchCoinbase])

  useEffect(() => {
    refresh()
    const id = setInterval(refresh, REFRESH_MS)
    return () => clearInterval(id)
  }, [refresh])

  const tradierOk = !!tradierBalances
  const coinbaseOk = !!coinbaseAccounts

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">MOR Trading Dashboard</h1>
          <p className="text-xs text-zinc-500">MOR Trading Systems — Tradier + Coinbase</p>
        </div>
        <StatusBar lastRefresh={lastRefresh} tradierOk={tradierOk} coinbaseOk={coinbaseOk} errors={errors} />
      </header>
      <main className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 max-w-7xl mx-auto">
        <TradierAccount balances={tradierBalances} positions={tradierPositions} />
        <CoinbaseAccount accounts={coinbaseAccounts} />
        <TradierOrders orders={tradierOrders} />
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
