'use client'

import { useState } from 'react'
import PaymentButton from '@/components/PaymentButton'
import { krw, usd } from '@/lib/pricing'

type Tab = 'free' | 'elite'

function openSignupModal() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(
    new CustomEvent('inhero:open-auth', {
      detail: { mode: 'signup', source: 'pricing_free', redirectTo: '/dashboard' },
    }),
  )
}

const tabBtn = (active: boolean): React.CSSProperties => ({
  padding: '12px 24px',
  borderRadius: '12px',
  fontSize: '13px',
  fontWeight: 700,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  cursor: 'pointer',
  transition: 'background 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s',
  background: active ? 'rgba(201,168,76,0.16)' : 'transparent',
  color: active ? '#fff' : 'rgba(255,255,255,0.55)',
  border: `1px solid ${active ? 'rgba(201,168,76,0.55)' : 'rgba(255,255,255,0.12)'}`,
  boxShadow: active ? '0 0 22px rgba(201,168,76,0.22)' : 'none',
})

export default function EnglishPricingSection() {
  const [tab, setTab] = useState<Tab>('free')

  return (
    <div style={{ background: '#000', minHeight: '100vh', padding: '80px 24px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        {/* ── Hero ───────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{
            fontSize: '11px',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.6)',
            marginBottom: '16px',
          }}>
            INHERO PRICING
          </p>
          <h1 style={{
            fontSize: 'clamp(2.3rem, 5vw, 4.4rem)',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.04,
            marginBottom: '16px',
          }}>
            One price. Everything in.
          </h1>
          <p style={{
            fontSize: '16px',
            color: 'rgba(255,255,255,0.54)',
            maxWidth: '560px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            Free through May 31, 2026 — full access, every layer of AI, every lesson. Switch to Elite afterward if it&apos;s working.
          </p>
        </div>

        {/* ── Tab switcher ───────────────────────────────────── */}
        <div
          role="tablist"
          aria-label="Pricing plans"
          style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '36px', flexWrap: 'wrap' }}
        >
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'free'}
            onClick={() => setTab('free')}
            style={tabBtn(tab === 'free')}
          >
            Free until May 31, 2026
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'elite'}
            onClick={() => setTab('elite')}
            style={tabBtn(tab === 'elite')}
          >
            Elite — {usd(29)} / mo
          </button>
        </div>

        {/* ── Free until May card ────────────────────────────── */}
        {tab === 'free' && (
          <div
            role="tabpanel"
            style={{
              position: 'relative',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '22px',
              padding: '40px 36px',
              display: 'flex',
              flexDirection: 'column',
              animation: 'fadeIn 0.3s ease',
            }}
          >
            <div style={{
              position: 'absolute',
              top: '-11px',
              left: '24px',
              background: '#00FFB2',
              color: '#001',
              fontSize: '10px',
              fontWeight: 800,
              letterSpacing: '0.16em',
              padding: '5px 12px',
              borderRadius: '999px',
              textTransform: 'uppercase',
            }}>
              AP Season Promo
            </div>

            <p style={{
              fontSize: '12px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(0,255,178,0.78)',
              marginBottom: '10px',
            }}>
              Free until May 31, 2026
            </p>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '6px' }}>
              <span style={{ fontSize: 'clamp(2.6rem, 5vw, 3.6rem)', fontWeight: 700, color: '#fff' }}>$0</span>
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.44)' }}>until May 31, 2026</span>
            </div>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.42)', marginBottom: '18px' }}>
              No credit card required · cancel anytime
            </p>
            <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.62)', marginBottom: '24px' }}>
              Get the full InHero stack — every lesson, every AI layer, every TAP_QUICK checkpoint — free through May 31, 2026. Switch to Elite after that if it&apos;s working.
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0', flex: 1 }}>
              {[
                'Unlimited access to every published course',
                'AI Companion · Socratic Mode · Reverse Tutor',
                'TAP_QUICK attention-friendly checkpoints in every lesson',
                'Streak + tier system, progress dashboard',
                'Mission Control AI side panel',
              ].map((feature) => (
                <li
                  key={feature}
                  style={{
                    display: 'flex',
                    gap: '10px',
                    marginBottom: '10px',
                    color: 'rgba(255,255,255,0.78)',
                    fontSize: '14px',
                    lineHeight: 1.6,
                  }}
                >
                  <span style={{ color: '#00FFB2' }}>✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={openSignupModal}
              style={{
                width: '100%',
                padding: '14px 18px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: '#00FFB2',
                color: '#001',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 0 32px rgba(0,255,178,0.34)',
              }}
            >
              Start free — through May 31, 2026
            </button>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '12px', textAlign: 'center' }}>
              After May 31, your account converts to Free Plan unless you upgrade.
            </p>
          </div>
        )}

        {/* ── Elite card ─────────────────────────────────────── */}
        {tab === 'elite' && (
          <div
            role="tabpanel"
            style={{
              position: 'relative',
              background: 'rgba(201,168,76,0.08)',
              border: '1px solid rgba(201,168,76,0.46)',
              borderRadius: '22px',
              padding: '40px 36px',
              display: 'flex',
              flexDirection: 'column',
              animation: 'fadeIn 0.3s ease',
            }}
          >
            <div style={{
              position: 'absolute',
              top: '-11px',
              left: '24px',
              background: '#C9A84C',
              color: '#000',
              fontSize: '10px',
              fontWeight: 800,
              letterSpacing: '0.16em',
              padding: '5px 12px',
              borderRadius: '999px',
              textTransform: 'uppercase',
            }}>
              Founding Cohort
            </div>

            <p style={{
              fontSize: '12px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.76)',
              marginBottom: '10px',
            }}>
              Elite Plan
            </p>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '6px' }}>
              <span style={{ fontSize: 'clamp(2.6rem, 5vw, 3.6rem)', fontWeight: 700, color: '#fff' }}>{usd(29)}</span>
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.44)' }}>/month</span>
            </div>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.42)', marginBottom: '18px' }}>
              Charged in KRW: {krw(39000)} monthly
            </p>
            <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.62)', marginBottom: '24px' }}>
              Unlock the full course library plus every layer of the AI tutor — fast tutoring, deeper analysis, identity signals, and direction mapping. One price, everything in.
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0', flex: 1 }}>
              {[
                'Unlimited course access (all subjects)',
                'AI Companion · Socratic Mode · Reverse Tutor',
                'Thinking Analyzer + Portrait layer',
                'Hero Codes + Trajectory Lab',
                'Learning dashboard + progress tracking',
              ].map((feature) => (
                <li
                  key={feature}
                  style={{
                    display: 'flex',
                    gap: '10px',
                    marginBottom: '10px',
                    color: 'rgba(255,255,255,0.78)',
                    fontSize: '14px',
                    lineHeight: 1.6,
                  }}
                >
                  <span style={{ color: '#C9A84C' }}>✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <PaymentButton
              serviceId="single"
              subjectId="ap-biology"
              amount={29}
              orderName="Elite Plan — Full Access"
              label="Checkout — $29/mo"
              style={{
                width: '100%',
                padding: '14px 18px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: '#C9A84C',
                color: '#000',
                border: 'none',
              }}
            />
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
