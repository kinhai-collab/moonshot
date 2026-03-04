/**
 * Alert engine — sends SMS and email notifications for new trades.
 * Runs after normalizer inserts new trades.
 */
import { prisma } from '../lib/prisma'
import { sendSMS } from '../lib/twilio'
import { hasInstantAlerts } from '../lib/tier'

export async function runAlerts(newTradeIds: string[]): Promise<void> {
  if (newTradeIds.length === 0) return

  for (const tradeId of newTradeIds) {
    const trade = await prisma.trade.findUnique({
      where: { id: tradeId },
      include: { trader: true },
    })
    if (!trade) continue

    // Find all users who follow this trader
    const follows = await prisma.userTraderFollow.findMany({
      where: { traderId: trade.traderId },
      include: {
        user: {
          include: { subscription: true, alerts: true },
        },
      },
    })

    for (const follow of follows) {
      const user = follow.user
      const tier = user.subscription?.tier ?? null
      const alertPrefs = user.alerts

      // Check if already sent
      const alreadySent = await prisma.tradeAlert.findUnique({
        where: { tradeId_userId_channel: { tradeId, userId: user.id, channel: 'sms' } },
      })
      if (alreadySent) continue

      // SMS — Pro only, with phone number and SMS enabled
      if (hasInstantAlerts(tier) && user.phone && alertPrefs?.smsEnabled) {
        try {
          const amount = trade.amountMin && trade.amountMax
            ? ` ($${(trade.amountMin / 1_000_000).toFixed(1)}M–$${(trade.amountMax / 1_000_000).toFixed(1)}M)`
            : ''
          const msg = `🚀 Moonshot Alert: ${trade.trader.name} ${trade.tradeType} ${trade.ticker}${amount}. Filed ${trade.filingDate.toLocaleDateString()}.`
          await sendSMS(user.phone, msg)
          await prisma.tradeAlert.create({
            data: { tradeId, userId: user.id, channel: 'sms' },
          })
          console.log(`[alerts] SMS sent to user ${user.id} for trade ${tradeId}`)
        } catch (err) {
          console.error(`[alerts] SMS failed for user ${user.id}:`, err)
        }
      }
    }
  }
}
