import { NextRequest, NextResponse } from 'next/server'
import { getLivingPortrait } from '@/lib/memory'
import { requireAuthenticatedUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req)
  if (user instanceof NextResponse) return user

  const portrait = await getLivingPortrait(user.id)
  return NextResponse.json({ portrait })
}
