import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { canFollow } from '@/lib/tier'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { traderId } = await req.json()
  if (!traderId) return NextResponse.json({ error: 'traderId required' }, { status: 400 })

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      subscription: true,
      follows: { select: { traderId: true } },
    },
  })

  const tier = user?.subscription?.tier ?? null
  const currentFollows = user?.follows.length ?? 0

  if (!canFollow(tier, currentFollows)) {
    return NextResponse.json(
      { error: 'Follow limit reached. Upgrade to Pro for unlimited follows.' },
      { status: 403 },
    )
  }

  const follow = await prisma.userTraderFollow.create({
    data: { userId: session.user.id, traderId },
  })

  return NextResponse.json(follow, { status: 201 })
}
