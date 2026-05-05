// GDPR + 한국 개인정보보호법 준수
import { createAdminClient } from '@/lib/supabase'

export async function checkConsent(userId: string, consentType: string): Promise<boolean> {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('privacy_consents')
    .select('consented')
    .eq('user_id', userId)
    .eq('consent_type', consentType)
    .single()

  return data?.consented ?? false
}

export async function recordConsent(
  userId: string,
  consentType: string,
  consented: boolean
) {
  const supabase = createAdminClient()
  await supabase.from('privacy_consents').upsert({
    user_id: userId,
    consent_type: consentType,
    consented,
    consent_date: new Date().toISOString(),
    version: '1.0',
  })
}

// GDPR Article 17 — 삭제 권리
export async function requestDataDeletion(userId: string) {
  const supabase = createAdminClient()

  await supabase.from('deletion_requests').insert({
    user_id: userId,
    status: 'pending',
  })

  // 즉시 삭제 (30일 이내 법적 의무)
  await Promise.all([
    supabase.from('cognitive_logs').delete().eq('user_id', userId),
    supabase.from('thinking_evolution').delete().eq('user_id', userId),
    supabase.from('privacy_consents').delete().eq('user_id', userId),
  ])

  return { success: true, message: '모든 학습 데이터가 삭제되었습니다.' }
}

// GDPR Article 20 — 데이터 이동권
export async function exportUserData(userId: string) {
  const supabase = createAdminClient()

  const [logs, evolution, consents] = await Promise.all([
    supabase.from('cognitive_logs').select('*').eq('user_id', userId),
    supabase.from('thinking_evolution').select('*').eq('user_id', userId),
    supabase.from('privacy_consents').select('*').eq('user_id', userId),
  ])

  return {
    exported_at: new Date().toISOString(),
    cognitive_logs: logs.data,
    thinking_evolution: evolution.data,
    privacy_consents: consents.data,
    note: '이 파일에는 행동 패턴 데이터만 포함됩니다. 대화 내용 원본은 저장되지 않습니다.',
  }
}
