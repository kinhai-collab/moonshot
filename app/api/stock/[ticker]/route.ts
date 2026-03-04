import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getQuote, getDailyHistory } from '@/lib/alpha-vantage'

export async function GET(req: NextRequest, { params }: { params: Promise<{ ticker: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { ticker } = await params
  const { searchParams } = new URL(req.url)
  const includeHistory = searchParams.get('history') === 'true'

  const [quote, history] = await Promise.all([
    getQuote(ticker),
    includeHistory ? getDailyHistory(ticker) : Promise.resolve(null),
  ])

  return NextResponse.json({ quote, history })
}
