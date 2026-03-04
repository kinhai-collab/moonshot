import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { canAccessCategory } from '@/lib/tier'

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') ?? '1')
  const limit = parseInt(searchParams.get('limit') ?? '20')
  const category = searchParams.get('category')
  const feedOnly = searchParams.get('feed') === 'true'

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { subscription: true, follows: { select: { traderId: true } } },
  })

  const tier = user?.subscription?.tier ?? null
  const followedIds = user?.follows.map((f) => f.traderId) ?? []

  const whereCategory = category && canAccessCategory(tier, category)
    ? { trader: { category: category as any } }
    : {}

  const whereFollow = feedOnly && followedIds.length > 0
    ? { traderId: { in: followedIds } }
    : {}

  const trades = await prisma.trade.findMany({
    where: { ...whereCategory, ...whereFollow },
    include: { trader: true },
    orderBy: { filingDate: 'desc' },
    skip: (page - 1) * limit,
    take: limit,
  })

  return NextResponse.json(trades)
}
