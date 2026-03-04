import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import type { Tier } from '@prisma/client'

const PRICE_TO_TIER: Record<string, Tier> = {
  [process.env.STRIPE_BASIC_PRICE_ID ?? '']: 'BASIC',
  [process.env.STRIPE_PRO_PRICE_ID ?? '']: 'PRO',
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!
  const secret = process.env.STRIPE_WEBHOOK_SECRET!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret)
  } catch (err) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      if (session.mode !== 'subscription') break

      const userId = session.metadata?.userId
      if (!userId) break

      const sub = await stripe.subscriptions.retrieve(session.subscription as string) as any
      const priceId: string = sub.items.data[0]?.price.id
      const tier: Tier = PRICE_TO_TIER[priceId] ?? 'BASIC'

      await prisma.subscription.upsert({
        where: { userId },
        create: {
          userId,
          stripeCustomerId: session.customer as string,
          stripeSubscriptionId: sub.id,
          stripePriceId: priceId,
          tier,
          status: sub.status,
          currentPeriodEnd: new Date(sub.current_period_end * 1000),
        },
        update: {
          stripeSubscriptionId: sub.id,
          stripePriceId: priceId,
          tier,
          status: sub.status,
          currentPeriodEnd: new Date(sub.current_period_end * 1000),
        },
      })
      break
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as any
      const priceId: string = subscription.items.data[0]?.price.id
      const tier: Tier = PRICE_TO_TIER[priceId] ?? 'BASIC'

      await prisma.subscription.updateMany({
        where: { stripeSubscriptionId: subscription.id },
        data: {
          status: subscription.status,
          tier,
          stripePriceId: priceId,
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        },
      })
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      await prisma.subscription.updateMany({
        where: { stripeSubscriptionId: subscription.id },
        data: { status: 'canceled' },
      })
      break
    }
  }

  return NextResponse.json({ received: true })
}
