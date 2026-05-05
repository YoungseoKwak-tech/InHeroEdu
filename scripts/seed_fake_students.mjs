import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const DEFAULT_COUNT = 1000
const DOMAIN = 'seed.inhero.dev'
const PASSWORD = 'InheroSeed!2026'
const CHUNK_SIZE = 200
const AUTH_CONCURRENCY = 8

const FIRST_NAMES = [
  'Olivia', 'Emma', 'Sophia', 'Amelia', 'Charlotte', 'Ava', 'Mia', 'Harper', 'Ella', 'Grace',
  'Lily', 'Chloe', 'Nora', 'Zoe', 'Lucy', 'Isla', 'Hannah', 'Madison', 'Claire', 'Evelyn',
  'Noah', 'Liam', 'Ethan', 'Mason', 'Lucas', 'James', 'Benjamin', 'Alexander', 'Henry', 'Jack',
  'Leo', 'Owen', 'Sebastian', 'Julian', 'Nathan', 'Caleb', 'Ryan', 'Aiden', 'Daniel', 'Samuel',
]

const LAST_NAMES = [
  'Smith', 'Johnson', 'Brown', 'Miller', 'Davis', 'Wilson', 'Anderson', 'Taylor', 'Thomas', 'Moore',
  'Martin', 'Jackson', 'White', 'Harris', 'Clark', 'Lewis', 'Walker', 'Hall', 'Allen', 'Young',
  'King', 'Wright', 'Scott', 'Green', 'Baker', 'Adams', 'Nelson', 'Carter', 'Mitchell', 'Perez',
]

const SCHOOLS = [
  'Phillips Exeter Academy',
  'Phillips Academy Andover',
  'The Lawrenceville School',
  'Choate Rosemary Hall',
  'Loomis Chaffee',
  'Harvard-Westlake School',
  'The Harker School',
  'Stuyvesant High School',
  'Thomas Jefferson High School for Science and Technology',
  'Maggie L. Walker Governor\'s School',
  'Palo Alto High School',
  'Cupertino High School',
  'Arcadia High School',
  'Mission San Jose High School',
  'Troy High School',
  'Jericho High School',
  'Basis Scottsdale',
  'Montgomery Bell Academy',
  'Sidwell Friends School',
  'Westminster School',
  'Singapore American School',
  'Hong Kong International School',
  'United World College of South East Asia',
  'American School in London',
  'International School of Geneva',
  'Upper Canada College',
  'Deerfield Academy',
  'Mira Costa High School',
  'EF Academy New York',
  'Cornell Summer College Prep',
]

const GRADES = [
  'Grade 8',
  'Grade 9',
  'Grade 10',
  'Grade 11',
  'Grade 12',
  'Freshman',
  'Sophomore',
  'Junior',
  'Senior',
]

const SUBJECTS = [
  'AP_Bio',
  'AP_Chem',
  'AP_Calc',
  'AP_Physics',
  'APUSH',
  'AP_Lang',
  'SAT_Math',
  'SAT_RW',
  'Research',
]

const HERO_CORES = ['CF', 'CS', 'CA', 'CE']

const PROCESSING_STYLES = {
  CF: ['visual_sequential', 'pattern_first', 'analogy_builder', 'slow_reflective'],
  CS: ['systems_structural', 'logic_chain', 'framework_planner', 'model_builder'],
  CA: ['fast_iterative', 'experiment_driven', 'action_loop', 'pressure_responsive'],
  CE: ['narrative_relational', 'language_sensitive', 'empathy_linking', 'contextual_synthesizer'],
}

const SPARK_TRIGGERS = {
  CF: ['pattern_disruption', 'unexpected_connection', 'visual_model_click', 'mechanism_reveal'],
  CS: ['system_design', 'logic_unlock', 'framework_control', 'structure_mastery'],
  CA: ['competition_pressure', 'challenge_cycle', 'deadline_focus', 'score_gap'],
  CE: ['human_story_link', 'teaching_someone', 'identity_reflection', 'language_bridge'],
}

const ESSAY_SEEDS = {
  CF: [
    'Started cataloging recurring mistake patterns instead of just fixing answers one by one',
    'Redrew the flow of cellular respiration as a visual system map',
    'Grouped confusing concepts into one narrative that actually made sense',
    'Realized I naturally look for structure before I memorize formulas',
  ],
  CS: [
    'Built a cleaner note-taking system for AP classes and kept refining it',
    'Standardized lab data into a single reusable analysis template',
    'Proposed a better weekly study structure for my friend group',
    'Mapped the dependency chain between major concepts in one unit',
  ],
  CA: [
    'Designed a two-week recovery routine after a bad mock exam',
    'Wrote down action rules for staying composed under timed pressure',
    'Built a drill set focused only on the question types that break me',
    'Kept a record of restarting after multiple failed attempts',
  ],
  CE: [
    'Translated abstract class ideas into everyday language that felt human',
    'Noticed how teaching someone younger exposed my own blind spots',
    'A friend\'s question forced me to test whether I truly understood the idea',
    'Started journaling how academic pressure shapes identity and voice',
  ],
}

const GROWTH_MOMENTS = {
  CF: [
    'Tracked the cause of a graph shift all the way through for the first time',
    'Explained the mechanism instead of falling back on memorization',
    'Labeled the source of my own mistakes before checking the answer key',
    'Collapsed a dense table into one clean structural takeaway',
  ],
  CS: [
    'Turned a confusing unit into a step-by-step system I could actually trust',
    'Structured FRQ responses more deliberately and saw scores stabilize',
    'Caught an experimental design flaw before anyone else in the group',
    'Reframed formulas as condition-based decision logic',
  ],
  CA: [
    'Held onto my reasoning order even under heavy time pressure',
    'Recovered a weak question type in the very next practice set',
    'Used routine instead of emotion to stabilize after getting answers wrong',
    'Came back from short breaks much faster than before',
  ],
  CE: [
    'Started adapting explanations to the listener instead of just reciting facts',
    'Corrected language confusion mid-answer and still finished strong',
    'Used a friend\'s question to discover and close a conceptual gap',
    'Began connecting academic moments into a more coherent story',
  ],
}

const EVOLUTION_NOTES = {
  CF: [
    'Moved from noticing patterns to articulating them clearly',
    'Began turning intuition into explainable structure',
    'Started defaulting to structural tracing instead of anxiety',
  ],
  CS: [
    'Shifted from solving isolated problems to designing systems',
    'Moved from answer-chasing toward structure-first thinking',
    'Developed more confidence controlling complex academic workflows',
  ],
  CA: [
    'Shifted from reactive studying into a more self-directed execution loop',
    'Turned score obsession into strategic experimentation',
    'Became noticeably faster at recovering from setbacks',
  ],
  CE: [
    'Got better at translating understanding into a personal voice',
    'Discovered that explaining ideas to others deepened self-understanding',
    'Started linking identity more directly to learning experience',
  ],
}

function parseCount() {
  const argIndex = process.argv.indexOf('--count')
  if (argIndex >= 0 && process.argv[argIndex + 1]) {
    const parsed = Number(process.argv[argIndex + 1])
    if (Number.isFinite(parsed) && parsed > 0) return parsed
  }
  return DEFAULT_COUNT
}

function mulberry32(seed) {
  return function rng() {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pick(rng, items) {
  return items[Math.floor(rng() * items.length)]
}

function int(rng, min, max) {
  return Math.floor(rng() * (max - min + 1)) + min
}

function float(rng, min, max, digits = 2) {
  const value = min + rng() * (max - min)
  return Number(value.toFixed(digits))
}

function isoDaysAgo(rng, minDays, maxDays) {
  const daysAgo = int(rng, minDays, maxDays)
  const hoursAgo = int(rng, 0, 23)
  const date = new Date(Date.now() - ((daysAgo * 24 + hoursAgo) * 60 * 60 * 1000))
  return date.toISOString()
}

function makeName(index, rng) {
  const first = FIRST_NAMES[index % FIRST_NAMES.length]
  const last = pick(rng, LAST_NAMES)
  return `${first} ${last}`
}

function buildStudent(index) {
  const rng = mulberry32(index * 7919)
  const core = HERO_CORES[index % HERO_CORES.length]
  const totalHours = float(rng, 4, 180, 1)
  const status = totalHours >= 100 ? 'confirmed' : 'provisional'
  const heroState =
    totalHours >= 140 ? int(rng, 7, 9)
      : totalHours >= 90 ? int(rng, 5, 7)
        : totalHours >= 40 ? int(rng, 3, 5)
          : int(rng, 1, 3)

  const name = makeName(index, rng)
  const grade = pick(rng, GRADES)
  const school = pick(rng, SCHOOLS)
  const subject = pick(rng, SUBJECTS)
  const createdAt = isoDaysAgo(rng, 7, 360)
  const updatedAt = isoDaysAgo(rng, 0, 20)
  const sparkDate = isoDaysAgo(rng, 0, 14)
  const email = `student${String(index).padStart(4, '0')}@${DOMAIN}`
  const intensity = float(rng, 0.35, 0.98, 2)
  const firedCount = int(rng, 1, 14)
  const processingStyle = pick(rng, PROCESSING_STYLES[core])
  const momentCount = int(rng, 4, 9)
  const evolutionCount = heroState >= 5 ? int(rng, 1, 3) : (heroState >= 3 && rng() > 0.55 ? 1 : 0)

  const moments = []
  for (let i = 0; i < momentCount; i += 1) {
    const momentTypeRoll = rng()
    const momentType =
      momentTypeRoll < 0.34 ? 'essay_seed'
        : momentTypeRoll < 0.82 ? 'growth'
          : 'spark_fired'

    const source =
      momentType === 'essay_seed'
        ? ESSAY_SEEDS[core]
        : momentType === 'growth'
          ? GROWTH_MOMENTS[core]
          : GROWTH_MOMENTS[core]

    moments.push({
      user_id: null,
      moment_text: pick(rng, source),
      subject: pick(rng, SUBJECTS),
      moment_type: momentType,
      session_id: `seed-${index}-${i + 1}`,
      created_at: isoDaysAgo(rng, 0, 180),
    })
  }

  const evolution = []
  if (evolutionCount > 0) {
    const checkpoints = []
    let state = Math.max(1, heroState - (evolutionCount + int(rng, 0, 1)))
    for (let i = 0; i < evolutionCount; i += 1) {
      const nextState = Math.min(heroState, state + int(rng, 1, 2))
      checkpoints.push([state, nextState])
      state = nextState
    }

    checkpoints.forEach(([prevState, nextState]) => {
      evolution.push({
        user_id: null,
        prev_code: `${core}-${prevState}`,
        new_code: `${core}-${nextState}`,
        delta_note: pick(rng, EVOLUTION_NOTES[core]),
        grade_year: grade,
        created_at: isoDaysAgo(rng, 10, 220),
      })
    })
  }

  return {
    email,
    password: PASSWORD,
    authMeta: { name, grade, school, seed_batch: 'fake_students_v1' },
    profile: {
      id: null,
      name,
      grade,
      school,
      created_at: createdAt,
      updated_at: updatedAt,
    },
    spark: {
      user_id: null,
      trigger_type: pick(rng, SPARK_TRIGGERS[core]),
      intensity,
      last_fired_at: sparkDate,
      fired_count: firedCount,
      subject,
      raw_signal: `${core} learner spike around ${subject}`,
      updated_at: updatedAt,
    },
    pattern: {
      user_id: null,
      hero_code_core: core,
      hero_code_state: heroState,
      hero_code_status: status,
      processing_style: processingStyle,
      total_hours: totalHours,
      confirmed_at: status === 'confirmed' ? updatedAt : null,
      updated_at: updatedAt,
    },
    moments,
    evolution,
  }
}

async function listAllAuthUsers() {
  const users = []
  let page = 1
  const perPage = 200

  while (true) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage })
    if (error) throw error
    users.push(...(data.users ?? []))
    if (!data.nextPage || data.users.length === 0) break
    page = data.nextPage
  }

  return users
}

async function runPool(items, limit, task) {
  const executing = new Set()

  for (const item of items) {
    const promise = Promise.resolve().then(() => task(item))
    executing.add(promise)
    promise.finally(() => executing.delete(promise))
    if (executing.size >= limit) {
      await Promise.race(executing)
    }
  }

  await Promise.all(executing)
}

async function deleteSeedRows(table, userIds) {
  for (const ids of chunk(userIds, CHUNK_SIZE)) {
    const { error } = await supabase.from(table).delete().in('user_id', ids)
    if (error) throw new Error(`${table} delete failed: ${error.message}`)
  }
}

function chunk(items, size) {
  const chunks = []
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size))
  }
  return chunks
}

async function insertRows(table, rows) {
  for (const batch of chunk(rows, CHUNK_SIZE)) {
    if (batch.length === 0) continue
    const { error } = await supabase.from(table).insert(batch)
    if (error) throw new Error(`${table} insert failed: ${error.message}`)
  }
}

async function upsertProfiles(rows) {
  for (const batch of chunk(rows, CHUNK_SIZE)) {
    const { error } = await supabase.from('profiles').upsert(batch, { onConflict: 'id' })
    if (error) throw new Error(`profiles upsert failed: ${error.message}`)
  }
}

async function ensureAuthUsers(specs) {
  const existingUsers = await listAllAuthUsers()
  const existingByEmail = new Map(
    existingUsers
      .filter((user) => user.email?.endsWith(`@${DOMAIN}`))
      .map((user) => [user.email, user])
  )

  let created = 0
  let updated = 0

  await runPool(specs, AUTH_CONCURRENCY, async (spec) => {
    const existing = existingByEmail.get(spec.email)
    if (existing) {
      spec.userId = existing.id
      const { error } = await supabase.auth.admin.updateUserById(existing.id, {
        user_metadata: spec.authMeta,
        email_confirm: true,
      })
      if (error) throw error
      updated += 1
      return
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email: spec.email,
      password: spec.password,
      email_confirm: true,
      user_metadata: spec.authMeta,
    })
    if (error || !data.user) throw error ?? new Error(`Failed to create ${spec.email}`)
    spec.userId = data.user.id
    created += 1
  })

  return { created, updated }
}

async function main() {
  const count = parseCount()
  const specs = Array.from({ length: count }, (_, i) => buildStudent(i + 1))

  console.log(`Preparing ${count} fake students...`)
  const authResult = await ensureAuthUsers(specs)
  console.log(`Auth ready: ${authResult.created} created, ${authResult.updated} updated`)

  const userIds = specs.map((spec) => spec.userId).filter(Boolean)
  if (userIds.length !== count) {
    throw new Error(`Expected ${count} user ids, got ${userIds.length}`)
  }

  console.log('Refreshing seed logs...')
  await Promise.all([
    deleteSeedRows('spark_bank', userIds),
    deleteSeedRows('pattern_bank', userIds),
    deleteSeedRows('moment_bank', userIds),
    deleteSeedRows('evolution_log', userIds),
  ])

  const profiles = []
  const sparks = []
  const patterns = []
  const moments = []
  const evolution = []

  for (const spec of specs) {
    profiles.push({ ...spec.profile, id: spec.userId })
    sparks.push({ ...spec.spark, user_id: spec.userId })
    patterns.push({ ...spec.pattern, user_id: spec.userId })
    moments.push(...spec.moments.map((row) => ({ ...row, user_id: spec.userId })))
    evolution.push(...spec.evolution.map((row) => ({ ...row, user_id: spec.userId })))
  }

  await upsertProfiles(profiles)
  await insertRows('spark_bank', sparks)
  await insertRows('pattern_bank', patterns)
  await insertRows('moment_bank', moments)
  await insertRows('evolution_log', evolution)

  console.log(JSON.stringify({
    seededUsers: userIds.length,
    profiles: profiles.length,
    sparkRows: sparks.length,
    patternRows: patterns.length,
    momentRows: moments.length,
    evolutionRows: evolution.length,
    sampleEmail: specs[0]?.email ?? null,
    password: PASSWORD,
  }, null, 2))
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
