import { TrendingUp, TrendingDown, ChevronDown } from 'lucide-react'
import { MOCK_TRADES, MOCK_TRADERS } from '@/lib/mock-data'
import { TradeCard } from '@/components/TradeCard'
import { cn } from '@/lib/utils'

const FILTER_TABS = ['All', 'Congress', 'Institutional', 'Insider'] as const

const MARKET_TICKERS = [
  { symbol: 'SPY', name: 'S&P 500 ETF', change: 0.4 },
  { symbol: 'QQQ', name: 'Nasdaq ETF', change: 0.8 },
  { symbol: 'DIA', name: 'Dow Jones ETF', change: 0.2 },
  { symbol: 'IWM', name: 'Russell 2000 ETF', change: -0.3 },
]

const TRENDING_TRADERS = MOCK_TRADERS.filter((t) => t.recentReturn && t.recentReturn > 0)
  .sort((a, b) => (b.recentReturn ?? 0) - (a.recentReturn ?? 0))
  .slice(0, 4)

const CATEGORY_BADGE_STYLES: Record<string, string> = {
  CONGRESS: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  INSTITUTIONAL: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  INSIDER: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
}

export default function FeedPage() {
  return (
    <div className="flex gap-6 max-w-screen-xl mx-auto">
      {/* Main feed column */}
      <div className="flex-1 min-w-0">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Your Feed</h1>
          <p className="text-slate-400 text-sm mt-1">Trades from traders you follow</p>
        </div>

        {/* Toolbar: filter tabs + sort */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          {/* Filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
            {FILTER_TABS.map((tab, i) => (
              <button
                key={tab}
                className={cn(
                  'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                  i === 0
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-300 hover:border-slate-700 transition-colors">
            Most Recent
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {/* Trade cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {MOCK_TRADES.map((trade) => (
            <TradeCard key={trade.id} trade={trade} showTrader={true} />
          ))}
        </div>

        {/* Load more */}
        <div className="flex justify-center pb-4">
          <button className="px-6 py-2.5 border border-slate-700 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-800 hover:text-white hover:border-slate-600 transition-colors">
            Load More
          </button>
        </div>
      </div>

      {/* Right sidebar — hidden on mobile, visible on lg */}
      <aside className="hidden lg:flex lg:flex-col gap-5 w-72 shrink-0">
        {/* Trending Traders */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <h2 className="text-sm font-semibold text-white mb-3">Trending Traders</h2>
          <div className="space-y-3">
            {TRENDING_TRADERS.map((trader) => {
              const isPositive = (trader.recentReturn ?? 0) > 0
              return (
                <div key={trader.id} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {trader.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{trader.name}</p>
                      <span
                        className={cn(
                          'inline-block text-[10px] font-semibold border rounded px-1.5 py-0.5',
                          CATEGORY_BADGE_STYLES[trader.category]
                        )}
                      >
                        {trader.category}
                      </span>
                    </div>
                  </div>
                  <div
                    className={cn(
                      'text-sm font-semibold shrink-0 flex items-center gap-0.5',
                      isPositive ? 'text-emerald-400' : 'text-red-400'
                    )}
                  >
                    {isPositive ? (
                      <TrendingUp className="w-3.5 h-3.5" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5" />
                    )}
                    {isPositive ? '+' : ''}
                    {trader.recentReturn?.toFixed(1)}%
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Market Summary */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <h2 className="text-sm font-semibold text-white mb-3">Market Summary</h2>
          <div className="space-y-2.5">
            {MARKET_TICKERS.map((ticker) => {
              const isPositive = ticker.change > 0
              return (
                <div key={ticker.symbol} className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold text-white">{ticker.symbol}</span>
                    <span className="text-xs text-slate-500 ml-1.5">{ticker.name}</span>
                  </div>
                  <span
                    className={cn(
                      'text-sm font-medium',
                      isPositive ? 'text-emerald-400' : 'text-red-400'
                    )}
                  >
                    {isPositive ? '+' : ''}
                    {ticker.change.toFixed(1)}%
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </aside>
    </div>
  )
}
