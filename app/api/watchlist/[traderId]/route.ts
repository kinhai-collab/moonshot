import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ traderId: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { traderId } = await params
  await prisma.userTraderFollow.deleteMany({
    where: { userId: session.user.id, traderId },
  })

  return NextResponse.json({ success: true })
}
