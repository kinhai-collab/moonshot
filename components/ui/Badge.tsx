import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'buy' | 'sell' | 'option' | 'exchange' | 'congress' | 'institutional' | 'insider' | 'pro' | 'basic'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-slate-700 text-slate-200',
    buy: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    sell: 'bg-red-500/20 text-red-400 border border-red-500/30',
    option: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    exchange: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    congress: 'bg-violet-500/20 text-violet-400 border border-violet-500/30',
    institutional: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
    insider: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
    pro: 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30',
    basic: 'bg-slate-500/20 text-slate-400 border border-slate-500/30',
  }

  return (
    <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', variants[variant], className)}>
      {children}
    </span>
  )
}
