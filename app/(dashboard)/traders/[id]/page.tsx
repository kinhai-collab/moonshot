import Link from 'next/link'
import { ArrowLeft, Users, TrendingUp, TrendingDown, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { TradeCard } from '@/components/TradeCard'
import { StockChart } from '@/components/StockChart'
import { MOCK_TRADERS, MOCK_TRADES } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export function generateStaticParams() {
  return MOCK_TRADERS.map((t) => ({ id: t.slug }))
}

export default async function TraderProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const trader = MOCK_TRADERS.find((t) => t.slug === id) ?? MOCK_TRADERS[0]
  const trades = MOCK_TRADES.filter((t) => t.trader.id === trader.id)
  const isPositive = (trader.recentReturn ?? 0) > 0

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/discover" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Discover
        </Link>
      </div>

      {/* Profile header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">
            {trader.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div>
                <h1 className="text-2xl font-bold text-white">{trader.name}</h1>
                <p className="text-slate-400 mt-0.5">{trader.role}</p>
                {trader.party && (
                  <p className="text-slate-500 text-sm mt-0.5">{trader.party}</p>
                )}
              </div>
              <div className="flex gap-2 flex-wrap">
                <Badge variant={trader.category.toLowerCase() as any}>{trader.category}</Badge>
                <Button variant="primary" size="sm">
                  <Users className="w-3.5 h-3.5" />
                  Follow
                </Button>
              </div>
            </div>
            <p className="text-slate-400 text-sm mt-3">{trader.bio}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800">
          <div>
            <div className="text-2xl font-bold text-white">{trader.totalTrades}</div>
            <div className="text-slate-500 text-sm">Total Trades</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{(trader.followers / 1000).toFixed(1)}K</div>
            <div className="text-slate-500 text-sm">Followers</div>
          </div>
          <div>
            <div className={cn('text-2xl font-bold flex items-center gap-1', isPositive ? 'text-emerald-400' : 'text-red-400')}>
              {isPositive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
              {isPositive ? '+' : ''}{trader.recentReturn?.toFixed(1)}%
            </div>
            <div className="text-slate-500 text-sm">90-day return</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">4.2d</div>
            <div className="text-slate-500 text-sm">Avg lag to file</div>
          </div>
        </div>
      </div>

      {/* Portfolio mock chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
        <h2 className="text-white font-semibold mb-4">Portfolio Performance (Mock)</h2>
        <StockChart ticker={trader.slug} height={220} />
      </div>

      {/* Trade history */}
      <div>
        <h2 className="text-white font-semibold mb-4">Recent Trades ({trades.length > 0 ? trades.length : MOCK_TRADES.length})</h2>
        <div className="space-y-3">
          {(trades.length > 0 ? trades : MOCK_TRADES).map((trade) => (
            <TradeCard key={trade.id} trade={trade} showTrader={false} />
          ))}
        </div>
      </div>
    </div>
  )
}
