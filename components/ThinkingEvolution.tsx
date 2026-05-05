'use client'
import { useState, useEffect } from 'react'
import { authFetch } from "@/lib/client-auth";

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
      사고 패턴 분석 중...
    </div>
  )

  const stats = [
    { label: '총 학습 세션', value: evolution?.totalSessions ?? 0, unit: '회', color: '#C9A84C' },
    { label: '돌파한 순간', value: evolution?.breakthroughCount ?? 0, unit: '번', color: '#1D9E75' },
    { label: '가장 성장한 영역', value: evolution?.strongestSubject ?? '-', unit: '', color: '#0066CC' },
    { label: '사고 성장 지수', value: evolution?.growthIndex ?? '-', unit: '%', color: '#C9A84C' },
  ]

  const GAP_LABELS: Record<string, string> = {
    CONCEPT_GAP: '개념 이해',
    APPLICATION_GAP: '응용 적용',
    LANGUAGE_GAP: '영어 독해',
    LOGIC_GAP: '논리 추론',
  }

  return (
    <div style={{
      backgroundColor: '#050510',
      border: '1px solid rgba(201,168,76,0.2)',
      borderRadius: '16px',
      padding: '32px',
      marginTop: '32px',
    }}>
      {/* 헤더 */}
      <div style={{ marginBottom: '28px' }}>
        <p style={{ color: '#C9A84C', fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase' }}>
          THINKING EVOLUTION
        </p>
        <h2 style={{ color: 'white', fontSize: '22px', fontWeight: 600, marginTop: '8px' }}>
          AI가 기억하는 너의 성장
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginTop: '4px' }}>
          대화 내용이 아닌 사고 패턴만 분석합니다
        </p>
      </div>

      {/* 사고 패턴 카드 */}
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

      {/* GAP 분석 */}
      {evolution?.gapDistribution && Object.keys(evolution.gapDistribution).length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', marginBottom: '16px' }}>
            자주 막히는 패턴
          </h3>
          {Object.entries(evolution.gapDistribution).map(([gap, count]) => (
            <div key={gap} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}>
                  {GAP_LABELS[gap] ?? gap}
                </span>
                <span style={{ color: '#C9A84C', fontSize: '13px' }}>{count}회</span>
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

      {/* 에세이 소재 발굴 */}
      {essaySources.length > 0 && (
        <div style={{
          background: 'rgba(201,168,76,0.05)',
          border: '1px solid rgba(201,168,76,0.2)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px',
        }}>
          <h3 style={{ color: '#C9A84C', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>
            ✦ AI가 발견한 에세이 소재
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
                근거: {source.evidence}
              </div>
            </div>
          ))}
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', marginTop: '12px' }}>
            * 대화 내용이 아닌 학습 행동 패턴을 기반으로 AI가 분석한 결과입니다
          </p>
        </div>
      )}

      {/* 개인정보 안내 + 삭제 버튼 */}
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
          🔒 대화 내용 원본은 저장되지 않습니다. 행동 패턴만 분석합니다.
        </p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={async () => {
              const res = await authFetch('/api/privacy/export', { method: 'POST' })
              if (!res.ok) {
                alert('데이터를 내보낼 수 없어요.')
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
            데이터 내보내기
          </button>
          <button
            onClick={async () => {
              if (confirm('모든 학습 패턴 데이터를 삭제할까요?')) {
                await authFetch('/api/privacy/delete', {
                  method: 'DELETE',
                  headers: { 'Content-Type': 'application/json' },
                })

                alert('삭제되었습니다.')
              }
            }}
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
            데이터 삭제
          </button>
        </div>
      </div>
    </div>
  )
}
