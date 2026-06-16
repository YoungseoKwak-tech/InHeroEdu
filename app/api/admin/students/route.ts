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

// 학부모 가입 시 '자녀 학교 유형'은 이 고정 목록 중 하나로 profiles.school 에 저장된다.
// (학생은 학교명을 자유 입력하므로 이 enum 과 겹치지 않는다.)
// role 메타데이터가 누락된 레거시 학부모를 잡아내는 보조 신호로 사용한다.
const PARENT_SCHOOL_TYPES = new Set([
  '국제학교',
  '보딩스쿨 (Boarding)',
  '외국인학교',
  '미국 현지 학교',
  '특목고·자사고',
  '일반고',
  '홈스쿨링',
  '기타',
])

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
  const allUsers = await listAllAuthUsers()
  // Drop synthetic diagnostic/test accounts (e.g. payment smoke-tests at
  // diag-pay-…@inhero-diag.test). `.test` is a reserved TLD that can never be a
  // real signup, so these only pollute the roster + the "students joined" count.
  const users = allUsers.filter((u) => {
    const email = (u.email ?? '').toLowerCase()
    return !!email && !email.endsWith('.test') && !email.includes('@inhero-diag.')
  })
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

  // Newest signups first.
  const usersByNewest = [...users].sort(
    (a, b) => new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime()
  )

  const studentData = usersByNewest.map((u) => {
    const authProfile = normalizeProfileFields(u.user_metadata ?? {})
    const mergedProfile = mergeProfileFields(
      (profileMap.get(u.id) as Parameters<typeof mergeProfileFields>[0]) ?? null,
      authProfile
    )

    // 가입 시 user_metadata.role 에 '학생'/'학부모'(student|parent)가 저장된다.
    // role 이 누락된 레거시 학부모는 자녀 학교 유형(profiles.school)으로 보정한다.
    const rawRole = u.user_metadata?.role
    const explicitParent =
      typeof rawRole === 'string' && rawRole.toLowerCase() === 'parent'
    const schoolLooksLikeParent =
      typeof mergedProfile.school === 'string' && PARENT_SCHOOL_TYPES.has(mergedProfile.school)
    const role: 'student' | 'parent' =
      explicitParent || schoolLooksLikeParent ? 'parent' : 'student'

    return {
      id: u.id,
      email: u.email,
      createdAt: u.created_at,
      lastSignIn: u.last_sign_in_at,
      role,
      spark: sparkMap.get(u.id) ?? null,
      pattern: patternMap.get(u.id) ?? null,
      moments: momentsMap.get(u.id) ?? [],
      evolution: evolutionMap.get(u.id) ?? [],
      profile: mergedProfile,
    }
  })

  return NextResponse.json({ students: studentData })
}
