/**
 * SEC Form 4 scraper — insider transaction filings
 * Endpoint: https://efts.sec.gov/LATEST/search-index?q=%22form+4%22&dateRange=custom&startdt=YESTERDAY
 */
import axios from 'axios'
import type { RawFiling } from '../normalizer'

const EDGAR_BASE = 'https://efts.sec.gov/LATEST/search-index'

function yesterday(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().split('T')[0]
}

interface EdgarHit {
  _source: {
    period_of_report?: string
    file_date?: string
    entity_name?: string
    file_num?: string
    form_type?: string
    biz_location?: string
  }
  _id: string
}

export async function scrapeForm4(): Promise<RawFiling[]> {
  const startdt = yesterday()

  const { data } = await axios.get(EDGAR_BASE, {
    params: {
      q: '"form 4"',
      dateRange: 'custom',
      startdt,
      enddt: startdt,
      forms: '4',
      hits: { total: { value: 0 } },
    },
    headers: { 'User-Agent': 'Moonshot research@moonshot.app' },
  })

  const hits: EdgarHit[] = data?.hits?.hits ?? []

  return hits.map((hit): RawFiling => ({
    source: 'FORM4',
    traderId: null, // resolved in normalizer by matching entity_name
    rawTraderName: hit._source.entity_name ?? 'Unknown',
    ticker: '', // Form 4 XML needs a follow-up fetch for ticker
    tradeType: 'BUY', // resolved from full filing XML
    amountMin: undefined,
    amountMax: undefined,
    tradeDate: hit._source.period_of_report ?? startdt,
    filingDate: hit._source.file_date ?? startdt,
    filingUrl: `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&filenum=${hit._source.file_num ?? ''}&type=4&dateb=&owner=include&count=1`,
    rawData: hit._source,
  }))
}
