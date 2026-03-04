/**
 * Normalizes raw scraper output into Trade records and upserts to DB.
 * Deduplicates by filingUrl.
 */
import { prisma } from '../lib/prisma'
import type { DataSource, TradeType, Trader } from '@prisma/client'

export interface RawFiling {
  source: DataSource
  traderId: string | null
  rawTraderName: string
  ticker: string
  tradeType: TradeType
  amountMin?: number
  amountMax?: number
  tradeDate: string
  filingDate: string
  filingUrl?: string
  rawData?: Record<string, unknown>
}

/** Resolve trader by name — matches against known traders in DB */
async function resolveTrader(rawName: string): Promise<Trader | null> {
  if (!rawName) return null
  return prisma.trader.findFirst({
    where: {
      name: { contains: rawName.split(' ')[0], mode: 'insensitive' },
    },
  })
}

export async function normalizeAndUpsert(filings: RawFiling[]): Promise<string[]> {
  const newTradeIds: string[] = []

  for (const filing of filings) {
    // Skip if ticker is empty (incomplete filing)
    if (!filing.ticker && filing.source !== 'FORM4') continue

    // Skip if no filingUrl (can't deduplicate)
    if (!filing.filingUrl) continue

    // Check for duplicate
    const existing = await prisma.trade.findUnique({ where: { filingUrl: filing.filingUrl } })
    if (existing) continue

    // Resolve trader
    let traderId = filing.traderId
    if (!traderId) {
      const trader = await resolveTrader(filing.rawTraderName)
      if (!trader) continue // Unknown trader — skip
      traderId = trader.id
    }

    const trade = await prisma.trade.create({
      data: {
        traderId,
        ticker: filing.ticker || 'UNKNOWN',
        tradeType: filing.tradeType,
        amountMin: filing.amountMin,
        amountMax: filing.amountMax,
        tradeDate: new Date(filing.tradeDate),
        filingDate: new Date(filing.filingDate),
        filingUrl: filing.filingUrl,
        source: filing.source,
        rawData: (filing.rawData ?? {}) as any,
      },
    })

    newTradeIds.push(trade.id)
    console.log(`[normalizer] Inserted trade ${trade.id}: ${filing.ticker} ${filing.tradeType} by trader ${traderId}`)
  }

  return newTradeIds
}
