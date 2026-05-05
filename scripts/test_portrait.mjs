// 로컬에서 getLivingPortrait 로직 직접 테스트
import { createClient } from '@supabase/supabase-js'

const SUPA_URL = 'https://pxxdduhtnulwmseygojv.supabase.co'
const SRK = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4eGRkdWh0bnVsd21zZXlnb2p2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTQwMTcwNSwiZXhwIjoyMDkwOTc3NzA1fQ.PCRhCPzAXwUuUEbFIB9GCKqkBkwb6TH26Beu89EXZsc"
const UID = 'e3b10f0a-5a62-4540-8b3d-2972d00827b5'

const supabase = createClient(SUPA_URL, SRK, {
  auth: { autoRefreshToken: false, persistSession: false }
})

async function test() {
  const [sparkRes, patternRes, momentRes] = await Promise.all([
    supabase.from('spark_bank').select('*').eq('user_id', UID).single(),
    supabase.from('pattern_bank').select('*').eq('user_id', UID).single(),
    supabase.from('moment_bank').select('*').eq('user_id', UID).order('created_at', { ascending: false }).limit(5),
  ])

  console.log('pattern_bank query:', patternRes.error?.message ?? 'OK')
  console.log('spark_bank query:', sparkRes.error?.message ?? 'OK')
  console.log('moment_bank query:', momentRes.error?.message ?? `OK (${momentRes.data?.length} rows)`)

  if (!patternRes.data) {
    console.log('\n❌ patternRes.data is null — portrait will return null')
    return
  }

  const p = patternRes.data
  const s = sparkRes.data
  const moments = momentRes.data ?? []

  const portrait = {
    heroCode: `${p.hero_code_core}-${p.hero_code_state}`,
    heroCodeStatus: p.hero_code_status,
    sparkTrigger: s?.trigger_type ?? 'unknown',
    sparkIntensity: s?.intensity ?? 0,
    processingStyle: p.processing_style ?? 'unknown',
    totalHours: p.total_hours,
    recentMoments: moments.filter(m => m.moment_type === 'growth').map(m => m.moment_text),
    essaySeeds: moments.filter(m => m.moment_type === 'essay_seed').map(m => m.moment_text),
  }

  console.log('\n✅ Portrait built successfully:')
  console.log(JSON.stringify(portrait, null, 2))

  // Vercel env 확인
  console.log('\n=== Checking Vercel env (service role key present?) ===')
  const check = await fetch('https://inheroedu.com/api/memory/portrait?userId=' + UID)
  const json = await check.json()
  console.log('Vercel response:', JSON.stringify(json, null, 2))

  if (!json.portrait) {
    console.log('\n⚠️  Vercel returned null — SUPABASE_SERVICE_ROLE_KEY likely missing from Vercel env')
  }
}

test().catch(console.error)
