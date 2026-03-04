/**
 * SEC 13F-HR scraper — institutional investment manager quarterly filings
 */
import axios from 'axios'
import type { RawFiling } from '../normalizer'

const EDGAR_BASE = 'https://efts.sec.gov/LATEST/search-index'

function ninetyDaysAgo(): string {
  const d = new Date()
  d.setDate(d.getDate() - 90)
  return d.toISOString().split('T')[0]
}

export async function scrapeForm13F(): Promise<RawFiling[]> {
  const startdt = ninetyDaysAgo()
  const enddt = new Date().toISOString().split('T')[0]

  const { data } = await axios.get(EDGAR_BASE, {
    params: {
      q: '"13F-HR"',
      dateRange: 'custom',
      startdt,
      enddt,
      forms: '13F-HR',
    },
    headers: { 'User-Agent': 'Moonshot research@moonshot.app' },
  })

  const hits = data?.hits?.hits ?? []

  return hits.map((hit: any): RawFiling => ({
    source: 'FORM13F',
    traderId: null,
    rawTraderName: hit._source?.entity_name ?? 'Unknown',
    ticker: '',
    tradeType: 'BUY',
    amountMin: undefined,
    amountMax: undefined,
    tradeDate: hit._source?.period_of_report ?? startdt,
    filingDate: hit._source?.file_date ?? enddt,
    filingUrl: `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${hit._source?.entity_id ?? ''}&type=13F-HR&dateb=&owner=include&count=1`,
    rawData: hit._source,
  }))
}
