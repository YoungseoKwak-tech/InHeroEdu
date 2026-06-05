/**
 * delete_seed_students.mjs — removes the fake students created by
 * seed_fake_students.mjs and NOTHING else.
 *
 * Match rule: auth user email ends with "@seed.inhero.dev" (exact domain
 * the seed script used). Real signups can never match.
 *
 * Cleans, in order:
 *   1. spark_bank / pattern_bank / moment_bank / evolution_log (user_id)
 *   2. profiles (id)
 *   3. auth.users via admin API
 *
 * Usage:
 *   DRY_RUN=1 node scripts/delete_seed_students.mjs   # report only
 *   node scripts/delete_seed_students.mjs             # actually delete
 *
 * Writes a backup of matched ids/emails to /tmp/seed-users-backup.json
 * before deleting (the data is regenerable via the seed script anyway).
 */
import { createClient } from '@supabase/supabase-js'
import { writeFileSync } from 'node:fs'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const DRY_RUN = process.env.DRY_RUN === '1'
const SEED_DOMAIN = '@seed.inhero.dev'
const CHUNK_SIZE = 100
const AUTH_CONCURRENCY = 8

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

async function listAllUsers() {
  const users = []
  let page = 1
  for (;;) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 1000 })
    if (error) throw new Error(`listUsers page ${page}: ${error.message}`)
    users.push(...(data?.users ?? []))
    if (!data || data.users.length < 1000) break
    page += 1
  }
  return users
}

function chunk(arr, size) {
  const out = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

async function deleteRowsByColumn(table, column, ids) {
  let deleted = 0
  for (const batch of chunk(ids, CHUNK_SIZE)) {
    const { error, count } = await supabase
      .from(table)
      .delete({ count: 'exact' })
      .in(column, batch)
    if (error) throw new Error(`${table} delete failed: ${error.message}`)
    deleted += count ?? 0
  }
  return deleted
}

async function main() {
  console.log('Listing all auth users…')
  const allUsers = await listAllUsers()

  const seedUsers = allUsers.filter((u) =>
    (u.email ?? '').toLowerCase().endsWith(SEED_DOMAIN)
  )
  const realUsers = allUsers.length - seedUsers.length

  console.log(`Total auth users:   ${allUsers.length}`)
  console.log(`Seed users matched: ${seedUsers.length}  (email ends with ${SEED_DOMAIN})`)
  console.log(`Real users (kept):  ${realUsers}`)
  if (seedUsers.length > 0) {
    console.log(`Sample matches: ${seedUsers.slice(0, 3).map((u) => u.email).join(', ')}`)
  }

  if (seedUsers.length === 0) {
    console.log('Nothing to delete.')
    return
  }

  const ids = seedUsers.map((u) => u.id)

  if (DRY_RUN) {
    console.log('\nDRY_RUN=1 — no deletions performed.')
    return
  }

  // Backup ids/emails before deleting.
  const backupPath = '/tmp/seed-users-backup.json'
  writeFileSync(
    backupPath,
    JSON.stringify(seedUsers.map((u) => ({ id: u.id, email: u.email })), null, 2)
  )
  console.log(`Backup written: ${backupPath}`)

  // 1. Seeded public-table rows.
  for (const [table, column] of [
    ['spark_bank', 'user_id'],
    ['pattern_bank', 'user_id'],
    ['moment_bank', 'user_id'],
    ['evolution_log', 'user_id'],
    ['profiles', 'id'],
  ]) {
    const n = await deleteRowsByColumn(table, column, ids)
    console.log(`${table}: deleted ${n} rows`)
  }

  // 2. Auth users, with limited concurrency.
  let ok = 0
  const failures = []
  for (const batch of chunk(ids, AUTH_CONCURRENCY)) {
    await Promise.all(
      batch.map(async (id) => {
        const { error } = await supabase.auth.admin.deleteUser(id)
        if (error) failures.push({ id, error: error.message })
        else ok += 1
      })
    )
    if ((ok + failures.length) % 200 < AUTH_CONCURRENCY) {
      console.log(`auth: ${ok + failures.length}/${ids.length}…`)
    }
  }

  console.log(`\nAuth users deleted: ${ok}/${ids.length}`)
  if (failures.length > 0) {
    console.log(`Failures (${failures.length}):`)
    for (const f of failures.slice(0, 10)) console.log(`  ${f.id}: ${f.error}`)
    if (failures.length > 10) console.log(`  …and ${failures.length - 10} more`)
    process.exitCode = 1
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
