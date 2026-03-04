const BASE = 'https://www.alphavantage.co/query'

export interface StockQuote {
  ticker: string
  price: number
  change: number
  changePercent: number
  volume: number
  latestTradingDay: string
}

export interface DailyBar {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export async function getQuote(ticker: string): Promise<StockQuote> {
  const key = process.env.ALPHA_VANTAGE_API_KEY
  if (!key) throw new Error('ALPHA_VANTAGE_API_KEY not set')

  const url = `${BASE}?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${key}`
  const res = await fetch(url, { next: { revalidate: 300 } })
  const json = await res.json()
  const q = json['Global Quote']

  return {
    ticker,
    price: parseFloat(q['05. price']),
    change: parseFloat(q['09. change']),
    changePercent: parseFloat(q['10. change percent']?.replace('%', '')),
    volume: parseInt(q['06. volume']),
    latestTradingDay: q['07. latest trading day'],
  }
}

export async function getDailyHistory(ticker: string, outputSize: 'compact' | 'full' = 'compact'): Promise<DailyBar[]> {
  const key = process.env.ALPHA_VANTAGE_API_KEY
  if (!key) throw new Error('ALPHA_VANTAGE_API_KEY not set')

  const url = `${BASE}?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=${outputSize}&apikey=${key}`
  const res = await fetch(url, { next: { revalidate: 3600 } })
  const json = await res.json()
  const series = json['Time Series (Daily)'] ?? {}

  return Object.entries(series)
    .map(([date, vals]: [string, any]) => ({
      date,
      open: parseFloat(vals['1. open']),
      high: parseFloat(vals['2. high']),
      low: parseFloat(vals['3. low']),
      close: parseFloat(vals['4. close']),
      volume: parseInt(vals['5. volume']),
    }))
    .sort((a, b) => a.date.localeCompare(b.date))
}
