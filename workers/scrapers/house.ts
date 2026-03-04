/**
 * House of Representatives Financial Disclosure scraper
 * Source: https://disclosures.house.gov/FinancialDisclosure
 */
import axios from 'axios'
import * as cheerio from 'cheerio'
import type { RawFiling } from '../normalizer'

const HOUSE_BASE = 'https://disclosures.house.gov'
const SEARCH_URL = `${HOUSE_BASE}/FinancialDisclosure/ViewMemberSearchResult`

export async function scrapeHouseDisclosures(): Promise<RawFiling[]> {
  const results: RawFiling[] = []

  try {
    const { data } = await axios.post(
      SEARCH_URL,
      new URLSearchParams({
        LastName: '',
        FilingYear: new Date().getFullYear().toString(),
        State: '',
        District: '',
      }),
      {
        headers: {
          'User-Agent': 'Moonshot research@moonshot.app',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )

    const $ = cheerio.load(data)

    $('table tbody tr').each((_, row) => {
      const cells = $(row).find('td')
      if (cells.length < 4) return

      const name = cells.eq(0).text().trim()
      const office = cells.eq(1).text().trim()
      const year = cells.eq(2).text().trim()
      const pdfLink = cells.eq(3).find('a').attr('href') ?? ''

      results.push({
        source: 'HOUSE',
        traderId: null,
        rawTraderName: name,
        ticker: '',
        tradeType: 'BUY',
        amountMin: undefined,
        amountMax: undefined,
        tradeDate: `${year}-01-01`,
        filingDate: new Date().toISOString().split('T')[0],
        filingUrl: pdfLink.startsWith('http') ? pdfLink : `${HOUSE_BASE}${pdfLink}`,
        rawData: { name, office, year },
      })
    })
  } catch (err) {
    console.error('[house scraper] error:', err)
  }

  return results
}
