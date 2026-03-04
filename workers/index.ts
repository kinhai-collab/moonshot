/**
 * Worker entry point — runs all scrapers on a cron schedule
 * Deploy on Railway as a standalone Node.js process
 *
 * Usage:
 *   npx ts-node workers/index.ts
 *   (or compile and run with node)
 */
import cron from 'node-cron'
import { scrapeForm4 } from './scrapers/form4'
import { scrapeForm13F } from './scrapers/form13f'
import { scrapeHouseDisclosures } from './scrapers/house'
import { senateScraper } from './scrapers/senate'
import { normalizeAndUpsert } from './normalizer'
import { runAlerts } from './alerts'

async function runAll(): Promise<void> {
  console.log(`[worker] Starting scrape run at ${new Date().toISOString()}`)

  const [form4, form13f, house, senate] = await Promise.allSettled([
    scrapeForm4(),
    scrapeForm13F(),
    scrapeHouseDisclosures(),
    senateScraper(),
  ])

  const allFilings = [
    ...(form4.status === 'fulfilled' ? form4.value : []),
    ...(form13f.status === 'fulfilled' ? form13f.value : []),
    ...(house.status === 'fulfilled' ? house.value : []),
    ...(senate.status === 'fulfilled' ? senate.value : []),
  ]

  console.log(`[worker] Collected ${allFilings.length} raw filings`)

  const newTradeIds = await normalizeAndUpsert(allFilings)
  console.log(`[worker] Inserted ${newTradeIds.length} new trades`)

  await runAlerts(newTradeIds)
  console.log(`[worker] Alert run complete`)
}

// Run immediately on startup
runAll().catch(console.error)

// Then run every 5 minutes
cron.schedule('*/5 * * * *', () => {
  runAll().catch(console.error)
})

console.log('[worker] Cron scheduler started — running every 5 minutes')
