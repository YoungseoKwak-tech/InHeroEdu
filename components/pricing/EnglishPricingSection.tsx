'use client'

import type { CSSProperties, ReactNode } from 'react'
import PaymentButton from '@/components/PaymentButton'
import { FREE_FOR_ALL } from '@/lib/config'
import { usd } from '@/lib/pricing'

const AP_BIO_FIRST_LESSON = '/courses/ap-biology/ap-biology-u1-l1'

const planShell: CSSProperties = {
  position: 'relative',
  borderRadius: '24px',
  padding: '34px 30px',
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
}

function PriceLine({
  original,
  current,
  suffix,
  accent,
}: {
  original?: number
  current: number
  suffix: string
  accent: string
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', margin: '14px 0 8px' }}>
      {original !== undefined && (
        <span
          style={{
            color: '#ff6b6b',
            fontSize: 'clamp(1.8rem, 3.2vw, 2.45rem)',
            fontWeight: 800,
            textDecorationLine: 'line-through',
            textDecorationThickness: '3px',
            textDecorationColor: '#ff3b3b',
            opacity: 0.9,
          }}
        >
          {usd(original)}
        </span>
      )}
      <span style={{ color: '#fff', fontSize: 'clamp(3.1rem, 6vw, 4.7rem)', fontWeight: 850, letterSpacing: '-0.06em' }}>
        {usd(current)}
      </span>
      <span style={{ color: accent, fontSize: 15, fontWeight: 700 }}>{suffix}</span>
    </div>
  )
}

function FeatureList({ items, color }: { items: string[]; color: string }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: '22px 0 30px', flex: 1 }}>
      {items.map((feature) => (
        <li
          key={feature}
          style={{
            display: 'flex',
            gap: 11,
            marginBottom: 12,
            color: 'rgba(255,255,255,0.78)',
            fontSize: 14,
            lineHeight: 1.55,
          }}
        >
          <span style={{ color, fontWeight: 900 }}>✓</span>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  )
}

function PlanCard({
  badge,
  eyebrow,
  title,
  description,
  border,
  background,
  accent,
  children,
}: {
  badge?: string
  eyebrow: string
  title: string
  description: string
  border: string
  background: string
  accent: string
  children: ReactNode
}) {
  return (
    <article
      style={{
        ...planShell,
        background,
        border,
        boxShadow: `0 0 44px ${accent}18`,
      }}
    >
      {badge && (
        <div
          style={{
            position: 'absolute',
            top: '-13px',
            left: 24,
            background: accent,
            color: '#001',
            fontSize: 10,
            fontWeight: 900,
            letterSpacing: '0.16em',
            padding: '6px 14px',
            borderRadius: 999,
            textTransform: 'uppercase',
          }}
        >
          {badge}
        </div>
      )}
      <p
        style={{
          fontSize: 11,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: accent,
          marginBottom: 10,
          fontWeight: 800,
        }}
      >
        {eyebrow}
      </p>
      <h2 style={{ color: '#fff', fontSize: 24, fontWeight: 850, letterSpacing: '-0.03em', margin: 0 }}>
        {title}
      </h2>
      <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.65, margin: '14px 0 0' }}>
        {description}
      </p>
      {children}
    </article>
  )
}

const legalLinks = [
  { label: 'Refund Policy', href: '/refund-policy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
]

function LegalLinksRow() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '10px 26px',
        fontSize: 12,
      }}
    >
      {legalLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          style={{
            color: 'rgba(255,255,255,0.38)',
            textDecoration: 'underline',
            textUnderlineOffset: 3,
          }}
        >
          {link.label}
        </a>
      ))}
    </div>
  )
}

function FreeForAllSection() {
  return (
    <div style={{ background: '#000', minHeight: '100vh', padding: '88px 24px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
        <p
          style={{
            fontSize: 11,
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'rgba(0,255,178,0.7)',
            marginBottom: 16,
          }}
        >
          INHERO ACCESS
        </p>
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 850,
            color: '#fff',
            lineHeight: 0.98,
            marginBottom: 18,
            letterSpacing: '-0.06em',
          }}
        >
          Everything is free<br />for all students.
        </h1>
        <p
          style={{
            fontSize: 16,
            color: 'rgba(255,255,255,0.58)',
            maxWidth: 560,
            margin: '0 auto 40px',
            lineHeight: 1.7,
          }}
        >
          Right now, every course, every textbook, and every AI study layer is
          open to every signed-in student. No plans, no checkout, no credit card.
        </p>

        <div
          style={{
            ...planShell,
            background: 'linear-gradient(180deg, rgba(0,255,178,0.1), rgba(201,168,76,0.05))',
            border: '1px solid rgba(0,255,178,0.4)',
            boxShadow: '0 0 44px rgba(0,255,178,0.1)',
            textAlign: 'left',
            maxWidth: 480,
            margin: '0 auto',
          }}
        >
          <PriceLine current={0} suffix="for everyone" accent="#00FFB2" />
          <FeatureList
            color="#00FFB2"
            items={[
              'Unlimited course access across all subjects',
              'Unlimited textbook access across all subjects',
              'AI Companion · Socratic Mode · Reverse Tutor',
              'TAP_QUICK checkpoints + progress tracking',
            ]}
          />
          <a
            href="/courses"
            style={{
              display: 'block',
              width: '100%',
              padding: '15px 18px',
              borderRadius: 14,
              fontSize: 13,
              fontWeight: 900,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              background: '#00FFB2',
              color: '#001',
              boxShadow: '0 0 32px rgba(0,255,178,0.3)',
              textAlign: 'center',
              textDecoration: 'none',
            }}
          >
            Start learning free
          </a>
        </div>

        <div style={{ marginTop: 44 }}>
          <LegalLinksRow />
        </div>
      </div>
    </div>
  )
}

export default function EnglishPricingSection() {
  if (FREE_FOR_ALL) {
    return <FreeForAllSection />
  }

  return (
    <div style={{ background: '#000', minHeight: '100vh', padding: '88px 24px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '54px' }}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.68)',
              marginBottom: 16,
            }}
          >
            INHERO PRICING
          </p>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 850,
              color: '#fff',
              lineHeight: 0.98,
              marginBottom: 18,
              letterSpacing: '-0.06em',
            }}
          >
            Free to start.<br />Elite when you&apos;re ready.
          </h1>
          <p
            style={{
              fontSize: 16,
              color: 'rgba(255,255,255,0.58)',
              maxWidth: 690,
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Compare the first-lesson free plan, one-subject Elite, and the all-subject pass at a glance.
            Elite includes unlimited course access plus textbook access.
          </p>
        </div>

        <div className="pricing-grid">
          <PlanCard
            badge="Start here"
            eyebrow="Free version"
            title="Free Plan"
            description="No timed trial. Every course opens its first lesson for free, then Elite unlocks the rest."
            border="1px solid rgba(0,255,178,0.28)"
            background="linear-gradient(180deg, rgba(0,255,178,0.08), rgba(255,255,255,0.025))"
            accent="#00FFB2"
          >
            <PriceLine current={0} suffix="forever" accent="#00FFB2" />
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.42)', margin: 0 }}>
              No credit card required
            </p>
            <FeatureList
              color="#00FFB2"
              items={[
                'First lesson free in every course',
                'No 3-day timer or credit card required',
                'Explore courses, library, and lounges',
                'Upgrade only when Elite is useful',
              ]}
            />
            <a
              href={AP_BIO_FIRST_LESSON}
              style={{
                display: 'block',
                width: '100%',
                padding: '15px 18px',
                borderRadius: 14,
                fontSize: 13,
                fontWeight: 900,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: '#00FFB2',
                color: '#001',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 0 32px rgba(0,255,178,0.3)',
                textAlign: 'center',
                textDecoration: 'none',
              }}
            >
              Start first lesson free
            </a>
          </PlanCard>

          <PlanCard
            badge="Founding price"
            eyebrow="Elite version"
            title="One Subject Elite"
            description="For one AP/SAT subject. Unlimited course access plus the matching textbook, built for students who want one class locked in."
            border="1px solid rgba(201,168,76,0.5)"
            background="linear-gradient(180deg, rgba(201,168,76,0.14), rgba(201,168,76,0.045))"
            accent="#C9A84C"
          >
            <PriceLine original={99} current={49} suffix="per month" accent="#C9A84C" />
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.42)', margin: 0 }}>
              AP Biology checkout shown first
            </p>
            <FeatureList
              color="#C9A84C"
              items={[
                'Unlimited course access for one subject',
                'Textbook access for that subject',
                'AI Companion · Socratic Mode · Reverse Tutor',
                'TAP_QUICK checkpoints + progress tracking',
              ]}
            />
            <PaymentButton
              serviceId="single"
              subjectId="ap-biology"
              amount={49}
              orderName="AP Biology Elite Pass"
              returnTo={AP_BIO_FIRST_LESSON}
              label="Checkout AP Bio — $49/mo"
              style={{
                width: '100%',
                padding: '15px 18px',
                borderRadius: 14,
                fontSize: 13,
                fontWeight: 900,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: '#C9A84C',
                color: '#000',
                border: 'none',
              }}
            />
          </PlanCard>

          <PlanCard
            badge="Best value"
            eyebrow="All subject pass"
            title="Elite All Subjects"
            description="For students taking multiple AP/SAT tracks. One pass unlocks every published course and every published textbook."
            border="1px solid rgba(0,255,178,0.48)"
            background="linear-gradient(180deg, rgba(0,255,178,0.11), rgba(201,168,76,0.06))"
            accent="#00FFB2"
          >
            <PriceLine original={899} current={199} suffix="/ mo" accent="#00FFB2" />
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.42)', margin: 0 }}>
              All subjects, one pass
            </p>
            <FeatureList
              color="#00FFB2"
              items={[
                'Unlimited course access across all subjects',
                'Unlimited textbook access across all subjects',
                'Every AI study layer included',
                'Best fit for multi-AP and SAT students',
              ]}
            />
            <PaymentButton
              serviceId="novapass"
              amount={199}
              orderName="Elite All Subject Pass"
              returnTo="/courses"
              label="Checkout All Subjects — $199/mo"
              style={{
                width: '100%',
                padding: '15px 18px',
                borderRadius: 14,
                fontSize: 13,
                fontWeight: 900,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: '#00FFB2',
                color: '#001',
                border: 'none',
                boxShadow: '0 0 34px rgba(0,255,178,0.24)',
              }}
            />
          </PlanCard>
        </div>

        <div style={{ textAlign: 'center', marginTop: 44 }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: '0 0 14px' }}>
            7-day money-back guarantee on your first Elite purchase. Cancel anytime.
          </p>
          <LegalLinksRow />
        </div>
      </div>

      <style>{`
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          align-items: stretch;
        }
        @media (max-width: 980px) {
          .pricing-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
