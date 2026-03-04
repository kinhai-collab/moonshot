import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')

  const traders = await prisma.trader.findMany({
    where: category ? { category: category as any } : {},
    include: { _count: { select: { trades: true, followers: true } } },
    orderBy: { name: 'asc' },
  })

  return NextResponse.json(traders)
}
