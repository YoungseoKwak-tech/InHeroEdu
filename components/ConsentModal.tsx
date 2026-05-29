'use client'

export default function ConsentModal({ onConsent }: { onConsent: (agreed: boolean) => void }) {
  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.85)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: '20px',
    }}>
      <div style={{
        background: '#050510',
        border: '1px solid rgba(201,168,76,0.3)',
        borderRadius: '16px',
        padding: '32px',
        maxWidth: '480px',
        width: '100%',
      }}>
        <h2 style={{ color: 'white', fontSize: '20px', marginBottom: '16px' }}>
          Learning pattern analysis — consent
        </h2>
        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', lineHeight: 1.7, marginBottom: '24px' }}>
          <p>
            To improve your learning experience, InHero collects{' '}
            <strong style={{ color: '#C9A84C' }}>behavioral pattern data</strong>.
          </p>
          <br />
          <p><strong style={{ color: 'white' }}>What we collect:</strong></p>
          <p>• Which question types you get stuck on</p>
          <p>• Study time and frequency</p>
          <p>• Thinking-style patterns (direct / analytical / creative)</p>
          <p>• Essay-topic potential signals</p>
          <br />
          <p><strong style={{ color: 'white' }}>What we do NOT collect:</strong></p>
          <p>• Verbatim AI chat transcripts</p>
          <p>• Real name, school name, address</p>
          <p>• Financial info, household info</p>
          <br />
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>
            You can delete or export your data anytime from Settings.
            (Compliant with Korean PIPA Art. 36 and GDPR Article 17.)
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => onConsent(false)}
            style={{
              flex: 1, padding: '12px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              color: 'rgba(255,255,255,0.5)',
              cursor: 'pointer', fontSize: '14px',
            }}
          >
            Decline
          </button>
          <button
            onClick={() => onConsent(true)}
            style={{
              flex: 2, padding: '12px',
              background: '#C9A84C',
              border: 'none', borderRadius: '8px',
              color: 'white', fontWeight: 600,
              cursor: 'pointer', fontSize: '14px',
            }}
          >
            Agree and continue ✦
          </button>
        </div>
      </div>
    </div>
  )
}
