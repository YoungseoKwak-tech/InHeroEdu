'use client'

import PaymentButton from '@/components/PaymentButton'
import { krw, usd } from '@/lib/pricing'

function SectionHeader({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div style={{ marginBottom: '22px', textAlign: 'center' }}>
      <p style={{ fontSize: '11px', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.64)', marginBottom: '10px' }}>
        {eyebrow}
      </p>
      <h2 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', lineHeight: 1.1, fontWeight: 700, color: '#fff', marginBottom: body ? '10px' : 0 }}>
        {title}
      </h2>
      {body && (
        <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'rgba(255,255,255,0.55)', maxWidth: '760px', margin: '0 auto' }}>
          {body}
        </p>
      )}
    </div>
  )
}

function openSignupModal() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(
    new CustomEvent('inhero:open-auth', {
      detail: { mode: 'signup', source: 'pricing_free', redirectTo: '/dashboard' },
    }),
  )
}

export default function EnglishPricingSection() {
  return (
    <div style={{ background: '#000', minHeight: '100vh', padding: '80px 24px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: '16px' }}>
            INHERO PRICING
          </p>
          <h1 style={{ fontSize: 'clamp(2.3rem, 5vw, 4.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.04, marginBottom: '16px' }}>
            One price. Everything in.
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.54)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.7 }}>
            Try it free, then unlock the full library and every layer of AI for a single monthly price.
          </p>
        </div>

        <section style={{ marginBottom: '40px' }}>
          <SectionHeader
            eyebrow="Two plans, zero confusion"
            title="Start free. Upgrade when you are in."
          />

          {/* Two-card grid: Free + Elite. Elite uses the `single` SKU with
              subjectId="ap-biology" hardcoded — the only currently-published
              course. Backend will mint orders.service_id = "single:ap-biology"
              and the lesson gate's hasPaidEnglishCourseAccess() unlocks via
              the ":ap-biology" pattern. */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            maxWidth: '880px',
            margin: '0 auto',
          }}>
            {/* ── Free Plan ─────────────────────────────────────── */}
            <div style={{
              position: 'relative',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: '22px',
              padding: '36px 32px',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <p style={{ fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: '10px' }}>
                Free Plan
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '6px' }}>
                <span style={{ fontSize: 'clamp(2.4rem, 5vw, 3.4rem)', fontWeight: 700, color: '#fff' }}>$0</span>
                <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.44)' }}>/forever</span>
              </div>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.42)', marginBottom: '14px' }}>
                No credit card required
              </p>
              <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.58)', marginBottom: '22px' }}>
                See the platform before you commit. The first lesson of every subject is open, and the AI reflection space is unlimited.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 26px 0', flex: 1 }}>
                {[
                  'First lesson in each subject',
                  'AI reflection counseling — unlimited',
                  'Read the textbook table of contents',
                  'Browse the full course catalog',
                ].map((feature) => (
                  <li key={feature} style={{ display: 'flex', gap: '10px', marginBottom: '10px', color: 'rgba(255,255,255,0.74)', fontSize: '14px', lineHeight: 1.6 }}>
                    <span style={{ color: 'rgba(255,255,255,0.55)' }}>✓</span>
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
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.85)',
                  border: '1px solid rgba(255,255,255,0.22)',
                  cursor: 'pointer',
                }}
              >
                Get started — Free
              </button>
            </div>

            {/* ── Elite Plan ────────────────────────────────────── */}
            <div style={{
              position: 'relative',
              background: 'rgba(201,168,76,0.08)',
              border: '1px solid rgba(201,168,76,0.46)',
              borderRadius: '22px',
              padding: '36px 32px',
              display: 'flex',
              flexDirection: 'column',
            }}>
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
              <p style={{ fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.76)', marginBottom: '10px' }}>
                Elite Plan
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '6px' }}>
                <span style={{ fontSize: 'clamp(2.4rem, 5vw, 3.4rem)', fontWeight: 700, color: '#fff' }}>{usd(29)}</span>
                <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.44)' }}>/month</span>
              </div>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.42)', marginBottom: '14px' }}>
                Charged in KRW: {krw(39000)} monthly
              </p>
              <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.58)', marginBottom: '22px' }}>
                Unlock the full course library plus every layer of the AI tutor — fast tutoring, deeper analysis, identity signals, and direction mapping. One price, everything in.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 26px 0', flex: 1 }}>
                {[
                  'Unlimited course access (all subjects)',
                  'AI Companion · Socratic Mode · Reverse Tutor',
                  'Thinking Analyzer + Portrait layer',
                  'Hero Codes + Trajectory Lab',
                  'Learning dashboard + progress tracking',
                ].map((feature) => (
                  <li key={feature} style={{ display: 'flex', gap: '10px', marginBottom: '10px', color: 'rgba(255,255,255,0.74)', fontSize: '14px', lineHeight: 1.6 }}>
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
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  background: '#C9A84C',
                  color: '#000',
                  border: 'none',
                }}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
