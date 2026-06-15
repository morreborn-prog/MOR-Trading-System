import { useState, useEffect, useCallback } from 'react'

const WORKER_BASE = import.meta.env.VITE_WORKER_URL || 'https://memory-os-worker.morelectric.workers.dev'
const WORKER_SECRET = import.meta.env.VITE_WORKER_SECRET || 'px-mor-trading-2026'
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

function parseMarkdownTable(md) {
  const lines = md.split('\n').filter(l => l.startsWith('- **'))
  return lines.map(line => {
    const match = line.match(/\*\*(.+?)\*\*\s*\|\s*(.+)/)
    if (!match) return null
    const key = match[1].trim()
    const rest = match[2].split('|').map(s => s.trim())
    return { key, values: rest }
  }).filter(Boolean)
}

function TradierAccount({ balances, positions, loading }) {
  if (loading) {
    return (
      <Panel title="Tradier — Options & Stocks" icon="📊">
        <p className="text-zinc-500 text-sm italic">Loading from Worker...</p>
      </Panel>
    )
  }

  return (
    <Panel title="Tradier — Options & Stocks" icon="📊">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <div className="text-xs text-zinc-500">Equity</div>
          <div className="text-2xl font-bold text-white">{balances.equity || '—'}</div>
        </div>
        <div>
          <div className="text-xs text-zinc-500">Cash Available</div>
          <div className="text-xl font-bold text-white">{balances.cash || '—'}</div>
        </div>
        <div>
          <div className="text-xs text-zinc-500">Option BP</div>
          <div className="text-xl font-bold text-white">{balances.optionBp || '—'}</div>
        </div>
      </div>
      {positions.length > 0 && (
        <div className="mt-2 overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-zinc-500 border-b border-zinc-800">
                <th className="text-left py-1">Symbol</th>
                <th className="text-right py-1">Qty</th>
                <th className="text-right py-1">Cost</th>
                <th className="text-right py-1">Value</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((p, i) => (
                <tr key={i} className="border-b border-zinc-800/50">
                  <td className="py-1 font-medium text-white font-mono text-[11px]">{p.symbol}</td>
                  <td className="text-right py-1 text-zinc-300">{p.qty}</td>
                  <td className="text-right py-1 text-zinc-300">{p.cost}</td>
                  <td className="text-right py-1 text-zinc-300">{p.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {positions.length === 0 && (
        <p className="text-zinc-500 text-xs italic">No open positions</p>
      )}
      <div className="text-[10px] text-zinc-600 mt-1">Account: {balances.account || '—'}</div>
    </Panel>
  )
}

function TradeHistory({ history }) {
  return (
    <Panel title="Recent Trades" icon="📈">
      {history.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-zinc-500 border-b border-zinc-800">
                <th className="text-left py-1">Date</th>
                <th className="text-left py-1">Type</th>
                <th className="text-left py-1">Symbol</th>
                <th className="text-right py-1">Amount</th>
              </tr>
            </thead>
            <tbody>
              {history.slice(0, 10).map((h, i) => (
                <tr key={i} className="border-b border-zinc-800/50">
                  <td className="py-1 text-zinc-400">{h.date}</td>
                  <td className="py-1 text-zinc-300">{h.type}</td>
                  <td className="py-1 font-medium text-white font-mono text-[11px]">{h.symbol || '—'}</td>
                  <td className={`text-right py-1 font-medium ${pctClass(parseFloat(h.amount?.replace('$', '') || 0))}`}>{h.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-zinc-500 text-sm italic">No recent trades</p>
      )}
    </Panel>
  )
}

function WorkerHealth({ health }) {
  if (!health) return null
  return (
    <Panel title="System Health" icon="🏥">
      <div className="flex items-center gap-2 mb-2">
        <span className={`inline-block w-3 h-3 rounded-full ${health.overall === 'HEALTHY' ? 'bg-emerald-400' : 'bg-red-400'}`} />
        <span className="text-sm font-bold text-white">{health.overall}</span>
        <span className="text-xs text-zinc-500">v{health.worker_version}</span>
      </div>
      <div className="grid grid-cols-4 gap-2 text-center">
        <div>
          <div className="text-lg font-bold text-emerald-400">{health.summary?.ok || 0}</div>
          <div className="text-[10px] text-zinc-500">OK</div>
        </div>
        <div>
          <div className="text-lg font-bold text-red-400">{health.summary?.expired || 0}</div>
          <div className="text-[10px] text-zinc-500">Expired</div>
        </div>
        <div>
          <div className="text-lg font-bold text-yellow-400">{health.summary?.missing || 0}</div>
          <div className="text-[10px] text-zinc-500">Missing</div>
        </div>
        <div>
          <div className="text-lg font-bold text-red-400">{health.summary?.error || 0}</div>
          <div className="text-[10px] text-zinc-500">Error</div>
        </div>
      </div>
      <div className="mt-2 space-y-1">
        {health.checks?.map((c, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span className={`w-1.5 h-1.5 rounded-full ${c.status === 'ok' ? 'bg-emerald-400' : 'bg-red-400'}`} />
            <span className="text-zinc-300">{c.name}</span>
            {c.detail && <span className="text-zinc-600 ml-auto">{c.detail}</span>}
          </div>
        ))}
      </div>
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
      </div>
    </Panel>
  )
}

function StatusBar({ lastRefresh, workerOk, tradierOk, error }) {
  return (
    <div className="flex items-center gap-3 text-xs text-zinc-500 flex-wrap">
      <BrokerBadge name="Worker" connected={workerOk} />
      <BrokerBadge name="Tradier" connected={tradierOk} />
      {error && <span className="text-red-400">{error}</span>}
      <span>Refresh: {lastRefresh ? lastRefresh.toLocaleTimeString() : '—'}</span>
    </div>
  )
}

export default function App() {
  const [balances, setBalances] = useState({})
  const [positions, setPositions] = useState([])
  const [history, setHistory] = useState([])
  const [health, setHealth] = useState(null)
  const [lastRefresh, setLastRefresh] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const parseBalances = (md) => {
    const lines = md.split('\n')
    const get = (label) => {
      const line = lines.find(l => l.includes(label))
      return line ? line.split(label)[1]?.replace(/[*:]/g, '').trim() : null
    }
    const accountLine = lines.find(l => l.includes('Account:'))
    return {
      equity: get('Total Equity:'),
      cash: get('Cash Available:'),
      optionBp: get('Option BP:'),
      account: accountLine?.match(/Account:\s*(\S+)/)?.[1] || '',
    }
  }

  const parsePositions = (md) => {
    const lines = md.split('\n').filter(l => l.startsWith('- **'))
    return lines.map(line => {
      const match = line.match(/\*\*(.+?)\*\*\s*\|\s*Qty:\s*(\S+)\s*\|\s*Cost:\s*(\S+)\s*\|\s*Value:\s*(\S+)/)
      if (!match) return null
      return { symbol: match[1], qty: match[2], cost: match[3], value: match[4] }
    }).filter(Boolean)
  }

  const parseHistory = (md) => {
    const lines = md.split('\n').filter(l => l.startsWith('- **'))
    return lines.map(line => {
      const match = line.match(/\*\*(.+?)\*\*\s*\|\s*(\S+)\s*\|\s*(.*?)\s*\|\s*(\S+)/)
      if (!match) return null
      return { date: match[1].slice(0, 10), type: match[2], symbol: match[3].trim(), amount: match[4] }
    }).filter(Boolean)
  }

  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      const [balRes, posRes, histRes, healthRes] = await Promise.all([
        fetch(`${WORKER_BASE}/tradier?action=balances&secret=${WORKER_SECRET}`),
        fetch(`${WORKER_BASE}/tradier?action=positions&secret=${WORKER_SECRET}`),
        fetch(`${WORKER_BASE}/tradier?action=history&secret=${WORKER_SECRET}`),
        fetch(`${WORKER_BASE}/diag`),
      ])

      if (balRes.ok) setBalances(parseBalances(await balRes.text()))
      if (posRes.ok) setPositions(parsePositions(await posRes.text()))
      if (histRes.ok) setHistory(parseHistory(await histRes.text()))
      if (healthRes.ok) setHealth(await healthRes.json())

      setError(null)
      setLastRefresh(new Date())
    } catch (e) {
      setError(e.message)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    refresh()
    const id = setInterval(refresh, REFRESH_MS)
    return () => clearInterval(id)
  }, [refresh])

  const workerOk = !!health
  const tradierOk = balances.equity != null

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">MOR Trading Dashboard</h1>
          <p className="text-xs text-zinc-500">Live via Cloudflare Worker — Tradier + Coinbase</p>
        </div>
        <StatusBar lastRefresh={lastRefresh} workerOk={workerOk} tradierOk={tradierOk} error={error} />
      </header>
      <main className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 max-w-7xl mx-auto">
        <TradierAccount balances={balances} positions={positions} loading={loading} />
        <TradeHistory history={history} />
        <WorkerHealth health={health} />
        <WorkerScoreboard />
        <ActiveSetups />
        <RuleChangeFeed />
      </main>
      <footer className="border-t border-zinc-800 px-6 py-3 text-center text-xs text-zinc-600">
        MOR INC &copy; {new Date().getFullYear()} — Auto-refresh every 15 min — Worker v{health?.worker_version || '?'}
      </footer>
    </div>
  )
}
