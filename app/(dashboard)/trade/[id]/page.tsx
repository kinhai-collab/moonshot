import Link from 'next/link'
import { ArrowLeft, ExternalLink, TrendingUp, TrendingDown, Clock, FileText } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { StockChart } from '@/components/StockChart'
import { MOCK_TRADES, formatAmount, formatDate } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export function generateStaticParams() {
  return MOCK_TRADES.map((t) => ({ id: t.id }))
}

const SOURCE_LABELS: Record<string, string> = {
  FORM4: 'SEC Form 4',
  FORM13F: 'SEC 13F-HR',
  HOUSE: 'House Financial Disclosure',
  SENATE: 'Senate Financial Disclosure',
}

export default async function TradeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const trade = MOCK_TRADES.find((t) => t.id === id) ?? MOCK_TRADES[0]
  const isPositive = (trade.priceChange ?? 0) > 0
  const isBuy = trade.tradeType === 'BUY'

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link href="/feed" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Feed
        </Link>
      </div>

      {/* Trade header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
        <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Badge variant={trade.tradeType.toLowerCase() as any}>{trade.tradeType}</Badge>
              <Badge variant={trade.trader.category.toLowerCase() as any}>{trade.trader.category}</Badge>
              <span className="text-slate-500 text-xs">{SOURCE_LABELS[trade.source]}</span>
            </div>
            <h1 className="text-4xl font-bold text-white">{trade.ticker}</h1>
            <p className="text-slate-400 mt-1">{trade.companyName}</p>
          </div>
          {trade.currentPrice && (
            <div className="text-right">
              <div className="text-3xl font-bold text-white">${trade.currentPrice.toFixed(2)}</div>
              <div className={cn('flex items-center justify-end gap-1 mt-1', isPositive ? 'text-emerald-400' : 'text-red-400')}>
                {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{isPositive ? '+' : ''}{trade.priceChange?.toFixed(1)}% since trade</span>
              </div>
            </div>
          )}
        </div>

        {/* Key details grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
          <div>
            <div className="text-slate-500 text-xs mb-1">Trade Amount</div>
            <div className={cn('font-semibold', isBuy ? 'text-emerald-400' : 'text-red-400')}>
              {formatAmount(trade.amountMin, trade.amountMax)}
            </div>
          </div>
          <div>
            <div className="text-slate-500 text-xs mb-1">Price at Trade</div>
            <div className="text-white font-semibold">${trade.priceAtTrade?.toFixed(2) ?? 'N/A'}</div>
          </div>
          <div>
            <div className="text-slate-500 text-xs mb-1">Trade Date</div>
            <div className="text-white font-semibold">{formatDate(trade.tradeDate)}</div>
          </div>
          <div>
            <div className="text-slate-500 text-xs mb-1">Filing Date</div>
            <div className="text-white font-semibold">{formatDate(trade.filingDate)}</div>
          </div>
        </div>
      </div>

      {/* Stock chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold">{trade.ticker} Price — 90 Days</h2>
          <div className="flex gap-2 text-xs">
            {['1W', '1M', '3M', '6M', '1Y'].map((p) => (
              <button
                key={p}
                className={cn('px-2 py-1 rounded', p === '3M' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white')}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <StockChart ticker={trade.ticker} height={250} />
      </div>

      {/* Trader info */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
        <h2 className="text-white font-semibold mb-4">Trader</h2>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-lg">
            {trade.trader.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <Link href={`/traders/${trade.trader.slug}`} className="text-white font-semibold hover:text-indigo-400 transition-colors">
              {trade.trader.name}
            </Link>
            <p className="text-slate-400 text-sm">{trade.trader.role}</p>
            <div className="flex items-center gap-2 mt-1.5">
              <Badge variant={trade.trader.category.toLowerCase() as any}>{trade.trader.category}</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Filing link */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-center gap-3 text-slate-400">
          <FileText className="w-5 h-5 shrink-0" />
          <div>
            <div className="text-white text-sm font-medium">{SOURCE_LABELS[trade.source]}</div>
            <div className="text-slate-500 text-xs mt-0.5">Filed {formatDate(trade.filingDate)}</div>
          </div>
          <a href="#" className="ml-auto flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors">
            View Filing <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  )
}
