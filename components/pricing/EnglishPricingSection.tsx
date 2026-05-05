'use client'

import type { ReactNode } from 'react'
import PaymentButton from '@/components/PaymentButton'
import { KAKAO_LINK, PRICING, krw, usd } from '@/lib/pricing'

const freeAccess = [
  ['First lesson in each subject', 'Free'],
  ['AI reflection counseling', 'Free'],
]

const categoryText = [
  'AP: Bio, Chem, Calc BC, Calc AB, Precalculus, Physics C Mech, Physics C E&M, Physics 1, Stats, CS A, CS Principles, English Lang, English Lit, US History, World History, Psychology, Macro, Micro, Environmental Science',
  'Honors: Biology, Chemistry, Physics, Precalculus, English, Algebra, US History',
  'Core: Integrated Science, Geometry, Algebra, English, US History, Chemistry, Biology, Physics',
  'Test Prep: SAT Math, SAT Reading & Writing, ACT, TOEFL',
]

function SectionHeader({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div style={{ marginBottom: '22px' }}>
      <p style={{ fontSize: '11px', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.64)', marginBottom: '10px' }}>
        {eyebrow}
      </p>
      <h2 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', lineHeight: 1.1, fontWeight: 700, color: '#fff', marginBottom: body ? '10px' : 0 }}>
        {title}
      </h2>
      {body && (
        <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'rgba(255,255,255,0.55)', maxWidth: '760px' }}>
          {body}
        </p>
      )}
    </div>
  )
}

function TableCard({
  headers,
  rows,
}: {
  headers: string[]
  rows: ReactNode[][]
}) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '20px',
      overflow: 'hidden',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))`,
        gap: '16px',
        padding: '18px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.02)',
      }}>
        {headers.map((header) => (
          <div key={header} style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.42)' }}>
            {header}
          </div>
        ))}
      </div>
      {rows.map((row, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))`,
            gap: '16px',
            padding: '18px 20px',
            borderBottom: rowIndex === rows.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.06)',
            alignItems: 'center',
          }}
        >
          {row.map((cell, cellIndex) => (
            <div key={`cell-${rowIndex}-${cellIndex}`} style={{ fontSize: '14px', lineHeight: 1.6, color: cellIndex === 0 ? '#fff' : 'rgba(255,255,255,0.72)' }}>
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default function EnglishPricingSection() {
  const gradeRows = PRICING.gradePackages.map((pkg) => [
    <div key={`${pkg.id}-name`}>
      <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{pkg.nameEn}</div>
      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>{pkg.desc}</div>
    </div>,
    <div key={`${pkg.id}-price`}>
      <div style={{ fontWeight: 700 }}>{usd(pkg.priceUSD)} / mo</div>
      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>{krw(pkg.priceKRW)} billed monthly</div>
    </div>,
    <div key={`${pkg.id}-included`}>{pkg.includes.join(' · ')}</div>,
    <PaymentButton
      key={`${pkg.id}-pay`}
      serviceId={pkg.id}
      amount={pkg.priceKRW}
      orderName={pkg.name}
      label="Checkout"
      style={{
        width: '100%',
        padding: '10px 14px',
        borderRadius: '12px',
        border: '1px solid rgba(201,168,76,0.38)',
        background: 'transparent',
        color: '#C9A84C',
        fontWeight: 700,
      }}
    />,
  ])

  const competitionRows = PRICING.competitionPackages.map((pkg) => [
    <div key={`${pkg.id}-name`}>
      <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{pkg.nameEn}</div>
      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>{pkg.desc}</div>
    </div>,
    <div key={`${pkg.id}-price`}>
      <div style={{ fontWeight: 700 }}>{usd(pkg.priceUSD)} / mo</div>
      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>{krw(pkg.priceKRW)}</div>
    </div>,
    <div key={`${pkg.id}-target`}>{pkg.target || 'Focused competition training'}</div>,
    <PaymentButton
      key={`${pkg.id}-pay`}
      serviceId={pkg.id}
      amount={pkg.priceKRW}
      orderName={pkg.name}
      label="Checkout"
      style={{
        width: '100%',
        padding: '10px 14px',
        borderRadius: '12px',
        border: '1px solid rgba(201,168,76,0.38)',
        background: 'transparent',
        color: '#C9A84C',
        fontWeight: 700,
      }}
    />,
  ])

  const tutoringRows = PRICING.tutoring.map((item) => [
    <div key={`${item.id}-name`}>
      <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{item.nameEn}</div>
      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>{item.unit}</div>
    </div>,
    <div key={`${item.id}-price`}>
      <div style={{ fontWeight: 700 }}>{usd(item.priceUSD)}</div>
      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>{krw(item.priceKRW)}</div>
    </div>,
    <div key={`${item.id}-notes`}>{item.desc || item.badge || 'Direct purchase, then schedule details in KakaoTalk.'}</div>,
    <PaymentButton
      key={`${item.id}-pay`}
      serviceId={item.id}
      amount={item.priceKRW}
      orderName={item.name}
      label="Checkout"
      style={{
        width: '100%',
        padding: '10px 14px',
        borderRadius: '12px',
        border: '1px solid rgba(201,168,76,0.38)',
        background: 'transparent',
        color: '#C9A84C',
        fontWeight: 700,
      }}
    />,
  ])

  return (
    <div style={{ background: '#000', minHeight: '100vh', padding: '80px 24px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: '16px' }}>
            INHERO PRICING
          </p>
          <h1 style={{ fontSize: 'clamp(2.3rem, 5vw, 4.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.04, marginBottom: '16px' }}>
            Pricing built for the full student arc.
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.54)', maxWidth: '760px', margin: '0 auto', lineHeight: 1.7 }}>
            Start with AI, layer in courses, and move into full student strategy only when the story, ambition, and workload justify it.
          </p>
        </div>

        <section style={{ marginBottom: '72px' }}>
          <SectionHeader
            eyebrow="Student Intelligence Engine"
            title="Layered AI plans for students, not generic chatbots."
            body="These plans now go straight into checkout instead of sending students into the wrong part of the product."
          />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}>
            {PRICING.aiPlans.map((plan) => (
              <div
                key={plan.id}
                style={{
                  position: 'relative',
                  background: plan.badge ? 'rgba(201,168,76,0.08)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${plan.badge ? 'rgba(201,168,76,0.46)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '22px',
                  padding: '28px',
                }}
              >
                {plan.badge && (
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
                    {plan.badge}
                  </div>
                )}
                <p style={{ fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.76)', marginBottom: '10px' }}>
                  {plan.nameEn}
                </p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '6px' }}>
                  <span style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#fff' }}>{usd(plan.priceUSD)}</span>
                  <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.44)' }}>/month</span>
                </div>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.42)', marginBottom: '14px' }}>
                  Charged in KRW: {krw(plan.priceKRW)} monthly
                </p>
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.58)', marginBottom: '22px' }}>
                  {plan.desc}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 26px 0' }}>
                  {plan.features.map((feature) => (
                    <li key={feature} style={{ display: 'flex', gap: '10px', marginBottom: '10px', color: 'rgba(255,255,255,0.74)', fontSize: '14px', lineHeight: 1.6 }}>
                      <span style={{ color: '#C9A84C' }}>✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <PaymentButton
                  serviceId={plan.id}
                  amount={plan.priceKRW}
                  orderName={plan.name}
                  label="Checkout AI plan"
                  style={{
                    width: '100%',
                    padding: '13px 18px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    background: plan.badge ? '#C9A84C' : 'transparent',
                    color: plan.badge ? '#000' : '#C9A84C',
                    border: plan.badge ? 'none' : '1px solid rgba(201,168,76,0.38)',
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '72px' }}>
          <SectionHeader
            eyebrow="Free Access"
            title="Free removes the first barrier."
            body="Students can enter the platform before they commit. That makes the first click lighter and the upgrade path more believable."
          />
          <TableCard headers={['Service', 'Price']} rows={freeAccess} />
        </section>

        <section style={{ marginBottom: '72px' }}>
          <SectionHeader
            eyebrow="Lesson Subscription"
            title="Simple monthly passes."
            body="These are the clean entry products. Keep them extremely easy to understand."
          />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '24px',
          }}>
            {PRICING.subscriptions.map((plan) => (
              <div
                key={plan.id}
                style={{
                  position: 'relative',
                  background: plan.badge ? 'rgba(201,168,76,0.08)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${plan.badge ? 'rgba(201,168,76,0.46)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '22px',
                  padding: '28px',
                }}
              >
                {plan.badge && (
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
                    Most Popular
                  </div>
                )}
                <p style={{ fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.76)', marginBottom: '10px' }}>
                  {plan.nameEn}
                </p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '6px' }}>
                  <span style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#fff' }}>{usd(plan.priceUSD)}</span>
                  <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.44)' }}>/month</span>
                </div>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.42)', marginBottom: '14px' }}>
                  Charged in KRW: {krw(plan.priceKRW)} monthly
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 26px 0' }}>
                  {plan.features.map((feature) => (
                    <li key={feature} style={{ display: 'flex', gap: '10px', marginBottom: '10px', color: 'rgba(255,255,255,0.74)', fontSize: '14px', lineHeight: 1.6 }}>
                      <span style={{ color: '#C9A84C' }}>✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <PaymentButton
                  serviceId={plan.id}
                  amount={plan.priceKRW}
                  orderName={plan.name}
                  label="Checkout subject pass"
                  style={{
                    width: '100%',
                    padding: '13px 18px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    background: plan.badge ? '#C9A84C' : 'transparent',
                    color: plan.badge ? '#000' : '#C9A84C',
                    border: plan.badge ? 'none' : '1px solid rgba(201,168,76,0.38)',
                  }}
                />
              </div>
            ))}
          </div>
          <div style={{ padding: '22px 24px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.42)', marginBottom: '12px' }}>
              Subject Categories
            </p>
            <div style={{ display: 'grid', gap: '10px' }}>
              {categoryText.map((line) => (
                <p key={line} style={{ margin: 0, fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.72)' }}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '72px' }}>
          <SectionHeader
            eyebrow="Grade Packages"
            title="Monthly packages by academic stage."
            body="These now point straight to checkout instead of leaving students in a dead-end table."
          />
          <TableCard headers={['Package', 'Price', 'Included', 'Action']} rows={gradeRows} />
        </section>

        <section style={{ marginBottom: '72px' }}>
          <SectionHeader
            eyebrow="Competition Tracks"
            title="Focused tracks for students aiming above class level."
          />
          <TableCard headers={['Track', 'Price', 'Target', 'Action']} rows={competitionRows} />
        </section>

        <section style={{ marginBottom: '72px' }}>
          <SectionHeader
            eyebrow="1:1 Services"
            title="Tutoring, essays, and project planning."
            body="Purchase first, then use KakaoTalk for scheduling and coordination."
          />
          <TableCard headers={['Service', 'Price', 'Notes', 'Action']} rows={tutoringRows} />
        </section>

        <section style={{ marginBottom: '72px' }}>
          <SectionHeader
            eyebrow="Admissions Consulting"
            title="High-touch packages stay consultative."
            body="These go to the right place too: direct consultation instead of a misleading instant checkout."
          />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}>
            {PRICING.consulting.map((pkg) => (
              <div
                key={pkg.id}
                style={{
                  position: 'relative',
                  background: pkg.badge ? 'rgba(201,168,76,0.08)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${pkg.badge ? 'rgba(201,168,76,0.46)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '22px',
                  padding: '28px',
                }}
              >
                {pkg.badge && (
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
                    {pkg.badge}
                  </div>
                )}
                <p style={{ fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.76)', marginBottom: '10px' }}>
                  {pkg.nameEn}
                </p>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#fff' }}>{usd(pkg.priceUSD)}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.42)' }}>{krw(pkg.priceKRW)} · {pkg.period}</div>
                </div>
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.58)', marginBottom: '18px' }}>
                  {pkg.desc}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0' }}>
                  {pkg.includes.slice(0, 4).map((feature) => (
                    <li key={feature} style={{ display: 'flex', gap: '10px', marginBottom: '10px', color: 'rgba(255,255,255,0.74)', fontSize: '14px', lineHeight: 1.6 }}>
                      <span style={{ color: '#C9A84C' }}>✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={KAKAO_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    padding: '13px 18px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    background: '#FEE500',
                    color: '#000',
                  }}
                >
                  Book consultation
                </a>
              </div>
            ))}
          </div>
        </section>

        <div style={{
          textAlign: 'center',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '40px',
        }}>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.36)', marginBottom: '16px' }}>
            Need help with fit, billing, or scheduling after checkout?
          </p>
          <a
            href={KAKAO_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#FEE500',
              color: '#000',
              fontWeight: 700,
              fontSize: '13px',
              padding: '12px 24px',
              borderRadius: '12px',
              textDecoration: 'none',
            }}
          >
            KakaoTalk support
          </a>
        </div>
      </div>
    </div>
  )
}
