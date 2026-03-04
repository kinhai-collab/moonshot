import { Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface PricingCardProps {
  name: string
  price: number
  description: string
  features: string[]
  isPro?: boolean
  isPopular?: boolean
  ctaText?: string
  onSubscribe?: () => void
}

export function PricingCard({ name, price, description, features, isPro = false, isPopular = false, ctaText = 'Get Started', onSubscribe }: PricingCardProps) {
  return (
    <div className={cn(
      'relative rounded-2xl p-6 border',
      isPro
        ? 'bg-indigo-950/50 border-indigo-500/50 shadow-xl shadow-indigo-500/10'
        : 'bg-slate-900 border-slate-800',
    )}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</span>
        </div>
      )}

      <div className="mb-5">
        <h3 className={cn('text-sm font-semibold uppercase tracking-wider mb-1', isPro ? 'text-indigo-400' : 'text-slate-400')}>{name}</h3>
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-4xl font-bold text-white">${price}</span>
          <span className="text-slate-400">/mo</span>
        </div>
        <p className="text-slate-400 text-sm">{description}</p>
      </div>

      <Button
        variant={isPro ? 'primary' : 'outline'}
        size="lg"
        className="w-full mb-6"
        onClick={onSubscribe}
      >
        {ctaText}
      </Button>

      <ul className="space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-300">
            <Check className={cn('w-4 h-4 mt-0.5 shrink-0', isPro ? 'text-indigo-400' : 'text-emerald-400')} />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}
