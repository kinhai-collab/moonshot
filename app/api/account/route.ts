import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { name, phone, smsEnabled, emailEnabled } = await req.json()

  const [user] = await Promise.all([
    prisma.user.update({
      where: { id: session.user.id },
      data: { name, phone },
      select: { id: true, name: true, phone: true, email: true },
    }),
    prisma.alertPreference.upsert({
      where: { userId: session.user.id },
      create: { userId: session.user.id, smsEnabled, emailEnabled },
      update: { smsEnabled, emailEnabled },
    }),
  ])

  return NextResponse.json(user)
}
