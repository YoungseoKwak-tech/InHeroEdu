import { NextRequest, NextResponse } from 'next/server'
import { compressSession } from '@/lib/memory'
import { requireAuthenticatedUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req)
  if (user instanceof NextResponse) return user

  const body = await req.json()
  const { sessionId, subject, durationMin, rawSummary } = body

  if (!sessionId || !subject || !durationMin || !rawSummary) {
    return NextResponse.json({ error: 'missing fields' }, { status: 400 })
  }

  await compressSession({ userId: user.id, sessionId, subject, durationMin, rawSummary })
  return NextResponse.json({ ok: true })
}
