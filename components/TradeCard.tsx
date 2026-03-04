'use client'

import Link from 'next/link'
import { TrendingUp, TrendingDown, ArrowUpDown, Clock, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Trade, formatAmount, formatDate } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface TradeCardProps {
  trade: Trade
  showTrader?: boolean
}

const SOURCE_LABELS: Record<string, string> = {
  FORM4: 'Form 4',
  FORM13F: '13F Filing',
  HOUSE: 'House Disclosure',
  SENATE: 'Senate Disclosure',
}

export function TradeCard({ trade, showTrader = true }: TradeCardProps) {
  const isPositive = (trade.priceChange ?? 0) > 0
  const isBuy = trade.tradeType === 'BUY'

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          {showTrader && (
            <Link href={`/traders/${trade.trader.slug}`} className="shrink-0">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold">
                {trade.trader.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
            </Link>
          )}
          <div className="min-w-0">
            {showTrader && (
              <Link href={`/traders/${trade.trader.slug}`} className="text-sm font-medium text-white hover:text-indigo-400 truncate block">
                {trade.trader.name}
              </Link>
            )}
            <div className="flex items-center gap-2 flex-wrap mt-0.5">
              <Badge variant={trade.tradeType.toLowerCase() as any}>{trade.tradeType}</Badge>
              <Badge variant={trade.trader.category.toLowerCase() as any}>{trade.trader.category}</Badge>
            </div>
          </div>
        </div>

        {/* Stock price info */}
        {trade.currentPrice && (
          <div className="text-right shrink-0">
            <div className="text-white font-semibold">${trade.currentPrice.toFixed(2)}</div>
            <div className={cn('text-xs flex items-center justify-end gap-0.5', isPositive ? 'text-emerald-400' : 'text-red-400')}>
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {isPositive ? '+' : ''}{trade.priceChange?.toFixed(1)}%
            </div>
          </div>
        )}
      </div>

      {/* Ticker + Company */}
      <div className="flex items-baseline gap-2 mb-2">
        <Link href={`/trade/${trade.id}`} className="text-2xl font-bold text-white hover:text-indigo-400 transition-colors">
          {trade.ticker}
        </Link>
        <span className="text-slate-400 text-sm truncate">{trade.companyName}</span>
      </div>

      {/* Amount range */}
      <div className="flex items-center gap-2 mb-3">
        <div className={cn('flex items-center gap-1.5 text-sm font-medium', isBuy ? 'text-emerald-400' : 'text-red-400')}>
          {isBuy ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {formatAmount(trade.amountMin, trade.amountMax)}
        </div>
        {trade.priceAtTrade && (
          <span className="text-slate-500 text-xs">at ${trade.priceAtTrade.toFixed(2)}</span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>Traded {formatDate(trade.tradeDate)} · Filed {formatDate(trade.filingDate)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>{SOURCE_LABELS[trade.source]}</span>
          <ExternalLink className="w-3 h-3" />
        </div>
      </div>
    </div>
  )
}
