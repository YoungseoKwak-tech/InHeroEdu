'use client'
import { useState, useEffect } from 'react'
import { authFetch } from "@/lib/client-auth";
import ConfirmDialog from "@/components/shared/ConfirmDialog";

interface EvolutionData {
  totalSessions?: number
  breakthroughCount?: number
  strongestSubject?: string
  growthIndex?: number
  gapDistribution?: Record<string, number>
}

interface EssaySource {
  theme: string
  angle: string
  evidence: string
  strength: 'high' | 'medium'
}

export default function ThinkingEvolution({ userId }: { userId: string }) {
  const [evolution, setEvolution] = useState<EvolutionData | null>(null)
  const [essaySources, setEssaySources] = useState<EssaySource[]>([])
  const [loading, setLoading] = useState(true)
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchEvolution()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  async function fetchEvolution() {
    try {
      const [evoRes, essayRes] = await Promise.all([
        fetch(`/api/cognitive/log?userId=${userId}`),
        fetch(`/api/cognitive/essay-sources?userId=${userId}`),
      ])
      if (evoRes.ok) setEvolution(await evoRes.json())
      if (essayRes.ok) {
        const essay = await essayRes.json()
        setEssaySources(essay.sources ?? [])
      }
    } catch {
      // API not yet seeded — show empty state gracefully
    } finally {
      setLoading(false)
    }
  }

  if (loading) return (
    <div style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '40px' }}>
      Analyzing your thinking patterns…
    </div>
  )

  const stats = [
    { label: 'Study sessions',     value: evolution?.totalSessions ?? 0, unit: '', color: '#C9A84C' },
    { label: 'Breakthrough moments', value: evolution?.breakthroughCount ?? 0, unit: '', color: '#1D9E75' },
    { label: 'Strongest area',     value: evolution?.strongestSubject ?? '-', unit: '', color: '#0066CC' },
    { label: 'Growth index',       value: evolution?.growthIndex ?? '-', unit: '%', color: '#C9A84C' },
  ]

  const GAP_LABELS: Record<string, string> = {
    CONCEPT_GAP: 'Concept gap',
    APPLICATION_GAP: 'Application gap',
    LANGUAGE_GAP: 'Language gap',
    LOGIC_GAP: 'Logic gap',
  }

  return (
    <div style={{
      backgroundColor: '#050510',
      border: '1px solid rgba(201,168,76,0.2)',
      borderRadius: '16px',
      padding: '32px',
      marginTop: '32px',
    }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <p style={{ color: '#C9A84C', fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase' }}>
          THINKING EVOLUTION
        </p>
        <h2 style={{ color: 'white', fontSize: '22px', fontWeight: 600, marginTop: '8px' }}>
          The growth your AI remembers
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginTop: '4px' }}>
          Analyzes thinking patterns only — never raw conversation content.
        </p>
      </div>

      {/* Pattern cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        {stats.map((stat, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(201,168,76,0.15)',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center',
          }}>
            <div style={{ color: stat.color, fontSize: '28px', fontWeight: 700 }}>
              {stat.value}{stat.unit}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginTop: '6px' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Gap analysis */}
      {evolution?.gapDistribution && Object.keys(evolution.gapDistribution).length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', marginBottom: '16px' }}>
            Where you get stuck most
          </h3>
          {Object.entries(evolution.gapDistribution).map(([gap, count]) => (
            <div key={gap} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}>
                  {GAP_LABELS[gap] ?? gap}
                </span>
                <span style={{ color: '#C9A84C', fontSize: '13px' }}>{count}×</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '4px', height: '6px' }}>
                <div style={{
                  background: 'linear-gradient(90deg, #C9A84C, #E8C96D)',
                  borderRadius: '4px',
                  height: '100%',
                  width: `${Math.min((count / (evolution?.totalSessions ?? 1)) * 100, 100)}%`,
                }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Essay material surfacing */}
      {essaySources.length > 0 && (
        <div style={{
          background: 'rgba(201,168,76,0.05)',
          border: '1px solid rgba(201,168,76,0.2)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px',
        }}>
          <h3 style={{ color: '#C9A84C', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>
            ✦ Essay topics your AI surfaced
          </h3>
          {essaySources.map((source, i) => (
            <div key={i} style={{
              borderLeft: '2px solid rgba(201,168,76,0.4)',
              paddingLeft: '16px',
              marginBottom: '16px',
            }}>
              <div style={{ color: 'white', fontSize: '15px', fontWeight: 600 }}>
                {source.theme}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginTop: '4px' }}>
                {source.angle}
              </div>
              <div style={{ color: 'rgba(201,168,76,0.6)', fontSize: '12px', marginTop: '4px' }}>
                Evidence: {source.evidence}
              </div>
            </div>
          ))}
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', marginTop: '12px' }}>
            * Based on study behavior patterns, not on conversation content.
          </p>
        </div>
      )}

      {/* Privacy note + delete buttons */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.1)',
        paddingTop: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px' }}>
          🔒 Raw conversation content is never stored. We only analyze patterns.
        </p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={async () => {
              const res = await authFetch('/api/privacy/export', { method: 'POST' })
              if (!res.ok) {
                alert("Could not export your data.")
                return
              }
              const data = await res.json()
              const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = 'inhero-privacy-export.json'
              a.click()
              URL.revokeObjectURL(url)
            }}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              color: 'rgba(255,255,255,0.5)',
              fontSize: '11px',
              padding: '6px 12px',
              cursor: 'pointer',
            }}
          >
            Export data
          </button>
          <button
            onClick={() => setConfirmDeleteOpen(true)}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,50,50,0.3)',
              borderRadius: '8px',
              color: 'rgba(255,100,100,0.6)',
              fontSize: '11px',
              padding: '6px 12px',
              cursor: 'pointer',
            }}
          >
            Delete data
          </button>
        </div>
      </div>
      <ConfirmDialog
        open={confirmDeleteOpen}
        title="Delete learning pattern data?"
        message="This removes your stored thinking pattern data."
        confirmLabel="Delete"
        loading={deleting}
        destructive
        onConfirm={async () => {
          setDeleting(true)
          try {
            await authFetch('/api/privacy/delete', {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
            })
            setConfirmDeleteOpen(false)
            alert("Deleted.")
          } finally {
            setDeleting(false)
          }
        }}
        onCancel={() => {
          if (!deleting) setConfirmDeleteOpen(false)
        }}
      />
    </div>
  )
}
