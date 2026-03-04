import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const trader = await prisma.trader.findUnique({
    where: { slug: id },
    include: {
      trades: { orderBy: { filingDate: 'desc' }, take: 50 },
      _count: { select: { followers: true, trades: true } },
    },
  })

  if (!trader) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json(trader)
}
