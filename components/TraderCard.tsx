import Link from 'next/link'
import { Users, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Trader } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface TraderCardProps {
  trader: Trader
  isFollowing?: boolean
  onFollow?: (id: string) => void
}

export function TraderCard({ trader, isFollowing = false, onFollow }: TraderCardProps) {
  const isPositive = (trader.recentReturn ?? 0) > 0

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
            {trader.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <Link href={`/traders/${trader.slug}`} className="font-semibold text-white hover:text-indigo-400 transition-colors block">
              {trader.name}
            </Link>
            <p className="text-slate-400 text-xs mt-0.5">{trader.role}</p>
          </div>
        </div>
        <Badge variant={trader.category.toLowerCase() as any}>{trader.category}</Badge>
      </div>

      <p className="text-slate-400 text-sm mb-4 line-clamp-2">{trader.bio}</p>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center">
          <div className="text-white font-semibold text-sm">{trader.totalTrades}</div>
          <div className="text-slate-500 text-xs">Trades</div>
        </div>
        <div className="text-center">
          <div className="text-white font-semibold text-sm">{(trader.followers / 1000).toFixed(1)}K</div>
          <div className="text-slate-500 text-xs">Followers</div>
        </div>
        <div className="text-center">
          <div className={cn('font-semibold text-sm flex items-center justify-center gap-0.5', isPositive ? 'text-emerald-400' : 'text-red-400')}>
            {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            {isPositive ? '+' : ''}{trader.recentReturn?.toFixed(1)}%
          </div>
          <div className="text-slate-500 text-xs">90d return</div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant={isFollowing ? 'secondary' : 'primary'}
          size="sm"
          className="flex-1"
          onClick={() => onFollow?.(trader.id)}
        >
          <Users className="w-3.5 h-3.5" />
          {isFollowing ? 'Following' : 'Follow'}
        </Button>
        <Link href={`/traders/${trader.slug}`}>
          <Button variant="outline" size="sm">
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
