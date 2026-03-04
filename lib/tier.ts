import type { Tier } from '@prisma/client'

interface TierLimits {
  maxFollows: number
  instantAlerts: boolean
  categories: string[]
  historyDays: number
}

const LIMITS: Record<Tier, TierLimits> = {
  BASIC: {
    maxFollows: 5,
    instantAlerts: false,
    categories: ['CONGRESS'],
    historyDays: 90,
  },
  PRO: {
    maxFollows: Infinity,
    instantAlerts: true,
    categories: ['CONGRESS', 'INSTITUTIONAL', 'INSIDER'],
    historyDays: Infinity,
  },
}

export function getTierLimits(tier: Tier | null | undefined): TierLimits {
  if (!tier) return LIMITS.BASIC
  return LIMITS[tier]
}

export function canAccessCategory(tier: Tier | null | undefined, category: string): boolean {
  return getTierLimits(tier).categories.includes(category)
}

export function canFollow(tier: Tier | null | undefined, currentFollows: number): boolean {
  return currentFollows < getTierLimits(tier).maxFollows
}

export function hasInstantAlerts(tier: Tier | null | undefined): boolean {
  return getTierLimits(tier).instantAlerts
}
