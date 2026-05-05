import { NextResponse } from 'next/server'
import { requireAdminUser } from '@/lib/auth'
import { mergeProfileFields, normalizeProfileFields } from '@/lib/profile'
import { createAdminClient } from '@/lib/supabase'

type AuthUser = {
  id: string
  email?: string | null
  created_at?: string | null
  last_sign_in_at?: string | null
  user_metadata?: Record<string, unknown> | null
}

function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size))
  }
  return chunks
}

async function listAllAuthUsers() {
  const adminSupabase = createAdminClient()
  const users: AuthUser[] = []
  let page = 1
  const perPage = 200

  while (true) {
    const { data, error } = await adminSupabase.auth.admin.listUsers({ page, perPage })
    if (error) throw error

    const batch = (data.users ?? []) as AuthUser[]
    users.push(...batch)

    if (!data.nextPage || batch.length === 0) break
    page = data.nextPage
  }

  return users
}

export async function GET(req: Request) {
  const admin = await requireAdminUser(req)
  if (admin instanceof NextResponse) return admin

  const adminSupabase = createAdminClient()
  const users = await listAllAuthUsers()
  const userIds = users.map((u) => u.id)

  if (userIds.length === 0) {
    return NextResponse.json({ students: [] })
  }

  const sparkRows: Record<string, unknown>[] = []
  const patternRows: Record<string, unknown>[] = []
  const momentRows: Record<string, unknown>[] = []
  const evolutionRows: Record<string, unknown>[] = []
  const profileRows: Record<string, unknown>[] = []

  for (const ids of chunk(userIds, 200)) {
    const [sparkRes, patternRes, momentRes, evolutionRes, profileRes] = await Promise.all([
      adminSupabase.from('spark_bank').select('*').in('user_id', ids),
      adminSupabase.from('pattern_bank').select('*').in('user_id', ids),
      adminSupabase.from('moment_bank').select('*').in('user_id', ids).order('created_at', { ascending: false }),
      adminSupabase.from('evolution_log').select('*').in('user_id', ids).order('created_at', { ascending: true }),
      adminSupabase.from('profiles').select('*').in('id', ids),
    ])

    if (sparkRes.data) sparkRows.push(...sparkRes.data)
    if (patternRes.data) patternRows.push(...patternRes.data)
    if (momentRes.data) momentRows.push(...momentRes.data)
    if (evolutionRes.data) evolutionRows.push(...evolutionRes.data)
    if (profileRes.data) profileRows.push(...profileRes.data)
  }

  const sparkMap = new Map(sparkRows.map((row) => [String(row.user_id), row]))
  const patternMap = new Map(patternRows.map((row) => [String(row.user_id), row]))
  const profileMap = new Map(profileRows.map((row) => [String(row.id), row]))
  const momentsMap = new Map<string, Record<string, unknown>[]>()
  const evolutionMap = new Map<string, Record<string, unknown>[]>()

  for (const row of momentRows) {
    const userId = String(row.user_id)
    const existing = momentsMap.get(userId) ?? []
    if (existing.length < 10) existing.push(row)
    momentsMap.set(userId, existing)
  }

  for (const row of evolutionRows) {
    const userId = String(row.user_id)
    const existing = evolutionMap.get(userId) ?? []
    existing.push(row)
    evolutionMap.set(userId, existing)
  }

  const studentData = users.map((u) => {
    const authProfile = normalizeProfileFields(u.user_metadata ?? {})
    const mergedProfile = mergeProfileFields(
      (profileMap.get(u.id) as Parameters<typeof mergeProfileFields>[0]) ?? null,
      authProfile
    )

    return {
      id: u.id,
      email: u.email,
      createdAt: u.created_at,
      lastSignIn: u.last_sign_in_at,
      spark: sparkMap.get(u.id) ?? null,
      pattern: patternMap.get(u.id) ?? null,
      moments: momentsMap.get(u.id) ?? [],
      evolution: evolutionMap.get(u.id) ?? [],
      profile: mergedProfile,
    }
  })

  return NextResponse.json({ students: studentData })
}
