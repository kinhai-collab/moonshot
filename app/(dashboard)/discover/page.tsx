'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { MOCK_TRADERS, TraderCategory } from '@/lib/mock-data'
import { TraderCard } from '@/components/TraderCard'
import { cn } from '@/lib/utils'

type FilterTab = 'All' | TraderCategory

const FILTER_TABS: FilterTab[] = ['All', 'CONGRESS', 'INSTITUTIONAL', 'INSIDER']

const TAB_LABELS: Record<FilterTab, string> = {
  All: 'All',
  CONGRESS: 'Congress',
  INSTITUTIONAL: 'Institutional',
  INSIDER: 'Insider',
}

export default function DiscoverPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>('All')
  const [followedIds, setFollowedIds] = useState<Set<string>>(new Set())

  const filteredTraders =
    activeTab === 'All'
      ? MOCK_TRADERS
      : MOCK_TRADERS.filter((t) => t.category === activeTab)

  function handleFollow(id: string) {
    setFollowedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="max-w-screen-xl mx-auto">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Discover Traders</h1>
          <p className="text-slate-400 text-sm mt-1">
            {MOCK_TRADERS.length} traders tracked &middot; Updated every 5 minutes
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search traders..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Category filter tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg w-fit mb-6">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
              activeTab === tab
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            )}
          >
            {TAB_LABELS[tab]}
          </button>
        ))}
      </div>

      {/* Stats bar */}
      <p className="text-xs text-slate-500 mb-5">
        Showing {filteredTraders.length} of {MOCK_TRADERS.length} traders
        {activeTab !== 'All' && (
          <> &middot; filtered by <span className="text-slate-400 font-medium">{TAB_LABELS[activeTab]}</span></>
        )}
      </p>

      {/* Trader cards grid */}
      {filteredTraders.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTraders.map((trader) => (
            <TraderCard
              key={trader.id}
              trader={trader}
              isFollowing={followedIds.has(trader.id)}
              onFollow={handleFollow}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-slate-400 text-sm">No traders found for this category.</p>
        </div>
      )}
    </div>
  )
}
