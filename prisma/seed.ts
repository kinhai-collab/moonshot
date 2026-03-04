/**
 * Seed database with 20 known traders.
 * Run: npx prisma db seed
 */
import { PrismaClient, TraderCategory, TradeType, DataSource } from '@prisma/client'

const prisma = new PrismaClient()

const TRADERS = [
  { name: 'Nancy Pelosi', slug: 'nancy-pelosi', category: 'CONGRESS' as TraderCategory, role: 'Representative - CA', party: 'Democrat', bio: "Former Speaker of the House, representing California's 11th congressional district since 1987." },
  { name: 'Tommy Tuberville', slug: 'tommy-tuberville', category: 'CONGRESS' as TraderCategory, role: 'Senator - AL', party: 'Republican', bio: 'U.S. Senator from Alabama, former college football head coach.' },
  { name: 'Dan Crenshaw', slug: 'dan-crenshaw', category: 'CONGRESS' as TraderCategory, role: 'Representative - TX', party: 'Republican', bio: 'U.S. Representative from Texas. Former Navy SEAL officer.' },
  { name: 'Josh Gottheimer', slug: 'josh-gottheimer', category: 'CONGRESS' as TraderCategory, role: 'Representative - NJ', party: 'Democrat', bio: 'U.S. Representative from New Jersey. Known for active trading disclosures.' },
  { name: 'Marjorie Taylor Greene', slug: 'marjorie-taylor-greene', category: 'CONGRESS' as TraderCategory, role: 'Representative - GA', party: 'Republican', bio: 'U.S. Representative from Georgia.' },
  { name: 'Warren Buffett', slug: 'warren-buffett', category: 'INSTITUTIONAL' as TraderCategory, role: 'CEO - Berkshire Hathaway', bio: 'CEO of Berkshire Hathaway. Known as the Oracle of Omaha.' },
  { name: 'Michael Burry', slug: 'michael-burry', category: 'INSTITUTIONAL' as TraderCategory, role: 'Founder - Scion Asset Management', bio: 'Famous for his Big Short bet against the housing market in 2008.' },
  { name: 'Cathie Wood', slug: 'cathie-wood', category: 'INSTITUTIONAL' as TraderCategory, role: 'CEO - ARK Invest', bio: 'Founder and CEO of ARK Investment Management. Known for high-conviction growth investing.' },
  { name: 'David Tepper', slug: 'david-tepper', category: 'INSTITUTIONAL' as TraderCategory, role: 'Founder - Appaloosa Management', bio: 'Legendary hedge fund manager. Owner of the Carolina Panthers NFL team.' },
  { name: 'Bill Ackman', slug: 'bill-ackman', category: 'INSTITUTIONAL' as TraderCategory, role: 'CEO - Pershing Square Capital', bio: 'Activist investor and founder of Pershing Square Capital Management.' },
  { name: 'Ray Dalio', slug: 'ray-dalio', category: 'INSTITUTIONAL' as TraderCategory, role: 'Founder - Bridgewater Associates', bio: 'Founder of the world\'s largest hedge fund, Bridgewater Associates.' },
  { name: 'Tim Cook', slug: 'tim-cook', category: 'INSIDER' as TraderCategory, role: 'CEO - Apple Inc.', bio: 'CEO of Apple Inc. since 2011. Regularly reports insider transactions via SEC Form 4.' },
  { name: 'Elon Musk', slug: 'elon-musk', category: 'INSIDER' as TraderCategory, role: 'CEO - Tesla / X Corp', bio: 'CEO of Tesla, SpaceX, and X Corp. Insider transactions reported via SEC Form 4.' },
  { name: 'Jensen Huang', slug: 'jensen-huang', category: 'INSIDER' as TraderCategory, role: 'CEO - NVIDIA Corporation', bio: 'Co-founder and CEO of NVIDIA Corporation. Frequent SEC Form 4 filer.' },
  { name: 'Jeff Bezos', slug: 'jeff-bezos', category: 'INSIDER' as TraderCategory, role: 'Founder - Amazon', bio: 'Amazon founder and executive chairman. One of the largest individual shareholders.' },
  { name: 'Satya Nadella', slug: 'satya-nadella', category: 'INSIDER' as TraderCategory, role: 'CEO - Microsoft', bio: 'CEO of Microsoft Corporation since 2014.' },
  { name: 'Mark Zuckerberg', slug: 'mark-zuckerberg', category: 'INSIDER' as TraderCategory, role: 'CEO - Meta Platforms', bio: 'Co-founder and CEO of Meta Platforms (formerly Facebook).' },
  { name: 'Larry Ellison', slug: 'larry-ellison', category: 'INSIDER' as TraderCategory, role: 'Co-Founder - Oracle', bio: "Co-founder and CTO of Oracle Corporation. One of the world's wealthiest individuals." },
  { name: 'Sundar Pichai', slug: 'sundar-pichai', category: 'INSIDER' as TraderCategory, role: 'CEO - Alphabet Inc.', bio: 'CEO of Alphabet Inc. and its subsidiary Google.' },
  { name: 'Brian Armstrong', slug: 'brian-armstrong', category: 'INSIDER' as TraderCategory, role: 'CEO - Coinbase', bio: 'Co-founder and CEO of Coinbase Global, the largest US crypto exchange.' },
]

const SAMPLE_TRADES = [
  { traderSlug: 'nancy-pelosi', ticker: 'NVDA', companyName: 'NVIDIA Corporation', tradeType: 'BUY' as TradeType, amountMin: 1_000_000, amountMax: 5_000_000, tradeDate: new Date('2025-02-18'), filingDate: new Date('2025-02-22'), source: 'HOUSE' as DataSource, filingUrl: 'https://disclosures.house.gov/mock/1' },
  { traderSlug: 'warren-buffett', ticker: 'OXY', companyName: 'Occidental Petroleum', tradeType: 'BUY' as TradeType, amountMin: 500_000_000, amountMax: 1_000_000_000, tradeDate: new Date('2025-02-15'), filingDate: new Date('2025-02-19'), source: 'FORM13F' as DataSource, filingUrl: 'https://sec.gov/mock/2' },
  { traderSlug: 'tim-cook', ticker: 'AAPL', companyName: 'Apple Inc.', tradeType: 'SELL' as TradeType, amountMin: 20_000_000, amountMax: 50_000_000, tradeDate: new Date('2025-02-10'), filingDate: new Date('2025-02-12'), source: 'FORM4' as DataSource, filingUrl: 'https://sec.gov/mock/3' },
  { traderSlug: 'michael-burry', ticker: 'JD', companyName: 'JD.com Inc.', tradeType: 'BUY' as TradeType, amountMin: 5_000_000, amountMax: 25_000_000, tradeDate: new Date('2025-02-08'), filingDate: new Date('2025-02-14'), source: 'FORM13F' as DataSource, filingUrl: 'https://sec.gov/mock/4' },
  { traderSlug: 'tommy-tuberville', ticker: 'MSFT', companyName: 'Microsoft Corporation', tradeType: 'BUY' as TradeType, amountMin: 100_000, amountMax: 250_000, tradeDate: new Date('2025-02-05'), filingDate: new Date('2025-02-09'), source: 'SENATE' as DataSource, filingUrl: 'https://efts.senate.gov/mock/5' },
  { traderSlug: 'jensen-huang', ticker: 'NVDA', companyName: 'NVIDIA Corporation', tradeType: 'SELL' as TradeType, amountMin: 50_000_000, amountMax: 100_000_000, tradeDate: new Date('2025-01-30'), filingDate: new Date('2025-02-01'), source: 'FORM4' as DataSource, filingUrl: 'https://sec.gov/mock/6' },
]

async function main() {
  console.log('Seeding database...')

  // Upsert traders
  for (const trader of TRADERS) {
    await prisma.trader.upsert({
      where: { slug: trader.slug },
      update: trader,
      create: trader,
    })
    console.log(`Upserted trader: ${trader.name}`)
  }

  // Insert trades
  for (const trade of SAMPLE_TRADES) {
    const trader = await prisma.trader.findUnique({ where: { slug: trade.traderSlug } })
    if (!trader) continue

    await prisma.trade.upsert({
      where: { filingUrl: trade.filingUrl },
      update: {},
      create: {
        traderId: trader.id,
        ticker: trade.ticker,
        companyName: trade.companyName,
        tradeType: trade.tradeType,
        amountMin: trade.amountMin,
        amountMax: trade.amountMax,
        tradeDate: trade.tradeDate,
        filingDate: trade.filingDate,
        source: trade.source,
        filingUrl: trade.filingUrl,
      },
    })
    console.log(`Inserted trade: ${trade.ticker} by ${trade.traderSlug}`)
  }

  console.log('Seed complete.')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
