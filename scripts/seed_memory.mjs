// Run: node scripts/seed_memory.mjs
import { createClient } from '@supabase/supabase-js'

const SUPA_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SRK = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!SUPA_URL || !SRK) { console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY'); process.exit(1) }
const UID = 'e3b10f0a-5a62-4540-8b3d-2972d00827b5'

const supabase = createClient(SUPA_URL, SRK, {
  auth: { autoRefreshToken: false, persistSession: false }
})

async function seed() {
  // pattern_bank
  const p = await supabase.from('pattern_bank').insert({
    user_id: UID,
    hero_code_core: 'CF',
    hero_code_state: 4,
    hero_code_status: 'provisional',
    processing_style: 'visual_sequential',
    total_hours: 23.5
  }).select()
  console.log('pattern_bank:', p.error ? `ERROR: ${p.error.message}` : 'OK', p.data?.[0]?.id)

  // spark_bank
  const s = await supabase.from('spark_bank').insert({
    user_id: UID,
    trigger_type: 'pattern_disruption',
    intensity: 0.87,
    fired_count: 3,
    subject: 'AP_Calc'
  }).select()
  console.log('spark_bank:', s.error ? `ERROR: ${s.error.message}` : 'OK', s.data?.[0]?.id)

  // moment_bank
  const m = await supabase.from('moment_bank').insert([
    { user_id: UID, moment_text: '처음으로 공식 스스로 유도함', subject: 'AP_Calc', moment_type: 'essay_seed', session_id: 'test_001' },
    { user_id: UID, moment_text: '효소-기질 비유 직접 만듦', subject: 'AP_Bio', moment_type: 'growth', session_id: 'test_002' }
  ]).select()
  console.log('moment_bank:', m.error ? `ERROR: ${m.error.message}` : `OK (${m.data?.length} rows)`)

  console.log('\n=== Testing /api/memory/portrait ===')
  const res = await fetch(`https://inheroedu.com/api/memory/portrait?userId=${UID}`)
  const json = await res.json()
  console.log(JSON.stringify(json, null, 2))
}

seed().catch(console.error)
