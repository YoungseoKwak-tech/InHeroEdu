import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'
import { requireAuthenticatedUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req)
  if (user instanceof NextResponse) return user

  const supabase = createAdminClient()
  const { data } = await supabase
    .from('evolution_log')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true })

  return NextResponse.json({ evolution: data ?? [] })
}
