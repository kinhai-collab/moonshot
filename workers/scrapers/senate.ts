/**
 * Senate Financial Disclosure (EFDS) scraper
 * Source: https://efts.senate.gov/public/index.cfm/filings-search
 */
import axios from 'axios'
import type { RawFiling } from '../normalizer'

const SENATE_API = 'https://efts.senate.gov/public/index.cfm/filings-search'

export async function senateScraper(): Promise<RawFiling[]> {
  const results: RawFiling[] = []

  try {
    const { data } = await axios.get(SENATE_API, {
      params: {
        q: '',
        dateFrom: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        dateTo: new Date().toISOString().split('T')[0],
        report_types: 'ptr', // Periodic Transaction Reports
      },
      headers: { 'User-Agent': 'Moonshot research@moonshot.app' },
    })

    const filings: any[] = data?.results ?? []

    for (const f of filings) {
      results.push({
        source: 'SENATE',
        traderId: null,
        rawTraderName: `${f.first_name ?? ''} ${f.last_name ?? ''}`.trim(),
        ticker: f.asset_name ?? '',
        tradeType: (f.transaction_type ?? '').toUpperCase().includes('SALE') ? 'SELL' : 'BUY',
        amountMin: parseAmountBound(f.amount, 'min'),
        amountMax: parseAmountBound(f.amount, 'max'),
        tradeDate: f.transaction_date ?? new Date().toISOString().split('T')[0],
        filingDate: f.date_received ?? new Date().toISOString().split('T')[0],
        filingUrl: f.link ?? undefined,
        rawData: f,
      })
    }
  } catch (err) {
    console.error('[senate scraper] error:', err)
  }

  return results
}

function parseAmountBound(amount: string, bound: 'min' | 'max'): number | undefined {
  if (!amount) return undefined
  // Format: "$1,001 - $15,000"
  const parts = amount.split('-').map((s) => parseInt(s.replace(/[^0-9]/g, '').trim()))
  if (bound === 'min') return isNaN(parts[0]) ? undefined : parts[0]
  return isNaN(parts[1]) ? undefined : parts[1]
}
