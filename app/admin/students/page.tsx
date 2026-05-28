'use client'
import { useEffect, useState } from 'react'
import { getClientSession } from '@/lib/client-auth'

interface Student {
  id: string
  email: string
  createdAt: string
  lastSignIn: string
  spark: { trigger_type: string; intensity: number; fired_count: number; subject: string } | null
  pattern: { hero_code_core: string; hero_code_state: number; hero_code_status: string; total_hours: number; processing_style: string } | null
  moments: { moment_text: string; moment_type: string; subject: string; created_at: string }[]
  evolution: { prev_code: string; new_code: string; delta_note: string; created_at: string }[]
  profile: { name: string | null; grade: string | null; school: string | null } | null
}

const coreColors: Record<string, string> = {
  CF: '#BA7517', CS: '#534AB7', CA: '#0F6E56', CE: '#993556'
}
const coreLabel: Record<string, string> = {
  CF: 'Pattern Seeker', CS: 'System Builder', CA: 'Action Driver', CE: 'Empathy Connector'
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('en-US')
}

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState<Student | null>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const load = async () => {
      const session = await getClientSession()
      if (!session) { setError('Please sign in to continue.'); setLoading(false); return }

      const res = await fetch('/api/admin/students', {
        headers: { authorization: `Bearer ${session.access_token}` }
      })
      if (!res.ok) { setError('Admin access required.'); setLoading(false); return }
      const data = await res.json()
      setStudents(data.students ?? [])
      setLoading(false)
    }
    load()
  }, [])

  const filtered = students.filter(s =>
    [
      s.email,
      s.profile?.name,
      s.profile?.grade,
      s.profile?.school,
    ]
      .filter(Boolean)
      .some(value => value!.toLowerCase().includes(search.toLowerCase()))
  )

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#000' }}>
      <div className="flex gap-2">{[0,1,2].map(i => <div key={i} className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: `${i*0.15}s` }}/>)}</div>
    </div>
  )

  if (error) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#000' }}>
      <p className="text-red-400">{error}</p>
    </div>
  )

  return (
    <div className="min-h-screen" style={{ background: '#000' }}>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white">👥 Student History</h1>
            <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {students.length} students joined
            </p>
          </div>
          <input
            type="text"
            placeholder="Search by email, name, grade, or school..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-4 py-2 rounded-xl text-sm text-white"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', outline: 'none', width: '240px' }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 학생 목록 */}
          <div className="lg:col-span-1 space-y-2">
            {filtered.map(s => {
              const core = s.pattern?.hero_code_core
              const color = core ? coreColors[core] : 'rgba(255,255,255,0.2)'
              const isSelected = selected?.id === s.id
              return (
                <button
                  key={s.id}
                  onClick={() => setSelected(s)}
                  className="w-full text-left p-4 rounded-2xl transition-all"
                  style={{
                    background: isSelected ? 'rgba(29,158,117,0.1)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isSelected ? 'rgba(29,158,117,0.4)' : 'rgba(255,255,255,0.07)'}`,
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold text-white truncate">{s.profile?.name ?? s.email}</p>
                    {core && (
                      <span className="text-xs font-black ml-2 flex-shrink-0" style={{ color }}>
                        {core}-{s.pattern?.hero_code_state}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {s.profile?.name && <p className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.3)' }}>{s.email}</p>}
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      {s.pattern?.total_hours.toFixed(1) ?? 0}h
                    </span>
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      Essay seeds {s.moments.filter(m => m.moment_type === 'essay_seed').length}
                    </span>
                    {s.lastSignIn && (
                      <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
                        {formatDate(s.lastSignIn)}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex items-center gap-2 flex-wrap">
                    {s.profile?.grade && (
                      <span className="text-[11px] px-2 py-1 rounded-full" style={{ color: '#C9A84C', background: 'rgba(201,168,76,0.12)' }}>
                        {s.profile.grade}
                      </span>
                    )}
                    {s.profile?.school && (
                      <span className="text-[11px] px-2 py-1 rounded-full" style={{ color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.06)' }}>
                        {s.profile.school}
                      </span>
                    )}
                  </div>
                </button>
              )
            })}
            {filtered.length === 0 && (
              <p className="text-sm text-center py-8" style={{ color: 'rgba(255,255,255,0.3)' }}>
                No matching students found
              </p>
            )}
          </div>

          {/* 학생 상세 */}
          <div className="lg:col-span-2">
            {!selected ? (
              <div className="flex items-center justify-center h-64 rounded-2xl" style={{ border: '1px dashed rgba(255,255,255,0.1)' }}>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>Select a student to view the full profile and learning log</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* 기본 정보 */}
                <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                    <div>
                      <p className="text-lg font-extrabold text-white">{selected.email}</p>
                      <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
                        Joined: {formatDate(selected.createdAt)} ·
                        Last sign-in: {selected.lastSignIn ? formatDate(selected.lastSignIn) : 'None'}
                      </p>
                    </div>
                    {selected.pattern && (
                      <div className="text-right">
                        <p className="text-3xl font-black" style={{ color: coreColors[selected.pattern.hero_code_core] }}>
                          {selected.pattern.hero_code_core}-{selected.pattern.hero_code_state}
                        </p>
                        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                          {coreLabel[selected.pattern.hero_code_core]} · {selected.pattern.hero_code_status === 'confirmed' ? '✅ Confirmed' : '⏳ Collecting data'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Profile row */}
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {[
                      { label: 'Name', value: selected.profile?.name ?? '-' },
                      { label: 'Grade', value: selected.profile?.grade ?? '-' },
                      { label: 'School', value: selected.profile?.school ?? '-' },
                    ].map(item => (
                      <div key={item.label} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.04)' }}>
                        <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{item.label}</p>
                        <p className="text-sm font-bold text-white">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Total Hours', value: `${selected.pattern?.total_hours.toFixed(1) ?? 0}h` },
                      { label: 'Spark Intensity', value: selected.spark ? `${Math.round(selected.spark.intensity * 100)}%` : '-' },
                      { label: 'Processing Style', value: selected.pattern?.processing_style?.replace(/_/g, ' ') ?? '-' },
                    ].map(stat => (
                      <div key={stat.label} className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.04)' }}>
                        <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{stat.label}</p>
                        <p className="text-sm font-bold text-white">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Spark */}
                {selected.spark && (
                  <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <p className="text-xs font-bold mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>⚡ SPARK BANK</p>
                    <p className="text-sm text-white">Trigger: <span className="font-semibold" style={{ color: '#BA7517' }}>{selected.spark.trigger_type?.replace(/_/g, ' ')}</span></p>
                    <p className="text-sm text-white mt-1">Fired: {selected.spark.fired_count} times · Primary subject: {selected.spark.subject}</p>
                  </div>
                )}

                {/* Essay Seeds */}
                <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <p className="text-xs font-bold mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>📝 Essay Seeds</p>
                  {selected.moments.filter(m => m.moment_type === 'essay_seed').length === 0 ? (
                    <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>No entries yet</p>
                  ) : (
                    <div className="space-y-2">
                      {selected.moments.filter(m => m.moment_type === 'essay_seed').map((m, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-xs mt-0.5" style={{ color: '#1D9E75' }}>✦</span>
                          <div>
                            <p className="text-sm text-white">{m.moment_text}</p>
                            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{m.subject} · {formatDate(m.created_at)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Growth moments */}
                <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <p className="text-xs font-bold mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>📈 Growth Moments</p>
                  {selected.moments.filter(m => m.moment_type === 'growth').length === 0 ? (
                    <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>No entries yet</p>
                  ) : (
                    <div className="space-y-2">
                      {selected.moments.filter(m => m.moment_type === 'growth').map((m, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-xs mt-0.5" style={{ color: '#534AB7' }}>◆</span>
                          <div>
                            <p className="text-sm text-white">{m.moment_text}</p>
                            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{m.subject} · {formatDate(m.created_at)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Evolution */}
                <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <p className="text-xs font-bold mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>🧬 HERO CODE Evolution</p>
                  {selected.evolution.length === 0 ? (
                    <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>No evolution yet</p>
                  ) : (
                    <div className="space-y-3">
                      {selected.evolution.map((e, i) => (
                        <div key={i} className="flex items-center gap-3 flex-wrap">
                          <span className="font-black text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>{e.prev_code}</span>
                          <span style={{ color: 'rgba(255,255,255,0.2)' }}>→</span>
                          <span className="font-black text-sm" style={{ color: '#1D9E75' }}>{e.new_code}</span>
                          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{formatDate(e.created_at)}</span>
                          {e.delta_note && <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{e.delta_note}</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
