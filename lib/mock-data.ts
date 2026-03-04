export type TraderCategory = 'CONGRESS' | 'INSTITUTIONAL' | 'INSIDER'
export type TradeType = 'BUY' | 'SELL' | 'OPTION' | 'EXCHANGE'
export type DataSource = 'FORM4' | 'FORM13F' | 'HOUSE' | 'SENATE'

export interface Trader {
  id: string
  name: string
  slug: string
  image?: string
  category: TraderCategory
  bio: string
  role: string
  party?: string
  followers: number
  totalTrades: number
  recentReturn?: number
}

export interface Trade {
  id: string
  trader: Trader
  ticker: string
  companyName: string
  tradeType: TradeType
  amountMin: number
  amountMax: number
  tradeDate: string
  filingDate: string
  source: DataSource
  priceAtTrade?: number
  currentPrice?: number
  priceChange?: number
}

export const MOCK_TRADERS: Trader[] = [
  {
    id: '1',
    name: 'Nancy Pelosi',
    slug: 'nancy-pelosi',
    category: 'CONGRESS',
    bio: 'Former Speaker of the House, representing California\'s 11th congressional district since 1987.',
    role: 'Representative - CA',
    party: 'Democrat',
    followers: 48200,
    totalTrades: 127,
    recentReturn: 31.4,
  },
  {
    id: '2',
    name: 'Warren Buffett',
    slug: 'warren-buffett',
    category: 'INSTITUTIONAL',
    bio: 'CEO of Berkshire Hathaway. Known as the "Oracle of Omaha", one of the most successful investors of all time.',
    role: 'CEO - Berkshire Hathaway',
    followers: 92100,
    totalTrades: 43,
    recentReturn: 18.2,
  },
  {
    id: '3',
    name: 'Tim Cook',
    slug: 'tim-cook',
    category: 'INSIDER',
    bio: 'CEO of Apple Inc. since 2011. Regularly reports insider transactions via SEC Form 4.',
    role: 'CEO - Apple Inc.',
    followers: 31800,
    totalTrades: 18,
    recentReturn: 22.7,
  },
  {
    id: '4',
    name: 'Michael Burry',
    slug: 'michael-burry',
    category: 'INSTITUTIONAL',
    bio: 'Founder of Scion Asset Management. Famous for his Big Short bet against the housing market in 2008.',
    role: 'Founder - Scion Asset Management',
    followers: 67400,
    totalTrades: 89,
    recentReturn: -8.3,
  },
  {
    id: '5',
    name: 'Tommy Tuberville',
    slug: 'tommy-tuberville',
    category: 'CONGRESS',
    bio: 'U.S. Senator from Alabama, former college football head coach.',
    role: 'Senator - AL',
    party: 'Republican',
    followers: 22100,
    totalTrades: 54,
    recentReturn: 14.9,
  },
  {
    id: '6',
    name: 'Elon Musk',
    slug: 'elon-musk',
    category: 'INSIDER',
    bio: 'CEO of Tesla and SpaceX. Insider transactions reported via SEC Form 4.',
    role: 'CEO - Tesla / X Corp',
    followers: 145000,
    totalTrades: 31,
    recentReturn: -4.1,
  },
  {
    id: '7',
    name: 'Dan Crenshaw',
    slug: 'dan-crenshaw',
    category: 'CONGRESS',
    bio: 'U.S. Representative from Texas. Former Navy SEAL officer.',
    role: 'Representative - TX',
    party: 'Republican',
    followers: 18900,
    totalTrades: 42,
    recentReturn: 9.6,
  },
  {
    id: '8',
    name: 'Cathie Wood',
    slug: 'cathie-wood',
    category: 'INSTITUTIONAL',
    bio: 'Founder and CEO of ARK Investment Management. Known for high-conviction growth investing.',
    role: 'CEO - ARK Invest',
    followers: 53200,
    totalTrades: 312,
    recentReturn: -12.4,
  },
]

export const MOCK_TRADES: Trade[] = [
  {
    id: 't1',
    trader: MOCK_TRADERS[0],
    ticker: 'NVDA',
    companyName: 'NVIDIA Corporation',
    tradeType: 'BUY',
    amountMin: 1000000,
    amountMax: 5000000,
    tradeDate: '2025-02-18',
    filingDate: '2025-02-22',
    source: 'HOUSE',
    priceAtTrade: 721.33,
    currentPrice: 874.18,
    priceChange: 21.2,
  },
  {
    id: 't2',
    trader: MOCK_TRADERS[1],
    ticker: 'OXY',
    companyName: 'Occidental Petroleum',
    tradeType: 'BUY',
    amountMin: 500000000,
    amountMax: 1000000000,
    tradeDate: '2025-02-15',
    filingDate: '2025-02-19',
    source: 'FORM13F',
    priceAtTrade: 58.92,
    currentPrice: 61.44,
    priceChange: 4.3,
  },
  {
    id: 't3',
    trader: MOCK_TRADERS[2],
    ticker: 'AAPL',
    companyName: 'Apple Inc.',
    tradeType: 'SELL',
    amountMin: 20000000,
    amountMax: 50000000,
    tradeDate: '2025-02-10',
    filingDate: '2025-02-12',
    source: 'FORM4',
    priceAtTrade: 185.62,
    currentPrice: 191.73,
    priceChange: 3.3,
  },
  {
    id: 't4',
    trader: MOCK_TRADERS[3],
    ticker: 'JD',
    companyName: 'JD.com Inc.',
    tradeType: 'BUY',
    amountMin: 5000000,
    amountMax: 25000000,
    tradeDate: '2025-02-08',
    filingDate: '2025-02-14',
    source: 'FORM13F',
    priceAtTrade: 24.11,
    currentPrice: 27.43,
    priceChange: 13.8,
  },
  {
    id: 't5',
    trader: MOCK_TRADERS[4],
    ticker: 'MSFT',
    companyName: 'Microsoft Corporation',
    tradeType: 'BUY',
    amountMin: 100000,
    amountMax: 250000,
    tradeDate: '2025-02-05',
    filingDate: '2025-02-09',
    source: 'SENATE',
    priceAtTrade: 389.44,
    currentPrice: 406.32,
    priceChange: 4.3,
  },
  {
    id: 't6',
    trader: MOCK_TRADERS[0],
    ticker: 'GOOGL',
    companyName: 'Alphabet Inc.',
    tradeType: 'BUY',
    amountMin: 500000,
    amountMax: 1000000,
    tradeDate: '2025-01-28',
    filingDate: '2025-02-01',
    source: 'HOUSE',
    priceAtTrade: 168.24,
    currentPrice: 179.83,
    priceChange: 6.9,
  },
  {
    id: 't7',
    trader: MOCK_TRADERS[7],
    ticker: 'TSLA',
    companyName: 'Tesla Inc.',
    tradeType: 'BUY',
    amountMin: 10000000,
    amountMax: 50000000,
    tradeDate: '2025-01-22',
    filingDate: '2025-01-24',
    source: 'FORM13F',
    priceAtTrade: 358.19,
    currentPrice: 177.92,
    priceChange: -50.3,
  },
  {
    id: 't8',
    trader: MOCK_TRADERS[5],
    ticker: 'TSLA',
    companyName: 'Tesla Inc.',
    tradeType: 'SELL',
    amountMin: 100000000,
    amountMax: 500000000,
    tradeDate: '2025-01-20',
    filingDate: '2025-01-22',
    source: 'FORM4',
    priceAtTrade: 403.84,
    currentPrice: 177.92,
    priceChange: -55.9,
  },
]

export const MOCK_STOCK_CHART_DATA = Array.from({ length: 90 }, (_, i) => {
  const base = 150
  const trend = i * 0.5
  const noise = Math.sin(i * 0.4) * 15 + Math.cos(i * 0.2) * 8
  return {
    date: new Date(Date.now() - (90 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    price: Math.round((base + trend + noise) * 100) / 100,
  }
})

export function formatAmount(min: number, max: number): string {
  const fmt = (n: number) => {
    if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
    if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
    return `$${n}`
  }
  return `${fmt(min)} – ${fmt(max)}`
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
