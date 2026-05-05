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
          학습 패턴 분석 동의
        </h2>
        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', lineHeight: 1.7, marginBottom: '24px' }}>
          <p>
            InHero는 더 나은 학습 경험을 위해{' '}
            <strong style={{ color: '#C9A84C' }}>행동 패턴 데이터</strong>를 수집합니다.
          </p>
          <br />
          <p><strong style={{ color: 'white' }}>수집하는 것:</strong></p>
          <p>• 어떤 유형의 문제에서 막히는지</p>
          <p>• 학습 시간 및 빈도</p>
          <p>• 사고 방식 패턴 (직접적/분석적/창의적)</p>
          <p>• 에세이 소재 가능성 지표</p>
          <br />
          <p><strong style={{ color: 'white' }}>수집하지 않는 것:</strong></p>
          <p>• AI와 나눈 대화 내용 원본</p>
          <p>• 실명, 학교명, 주소</p>
          <p>• 재정 정보, 가정환경 정보</p>
          <br />
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>
            언제든지 설정에서 데이터를 삭제하거나 내보낼 수 있습니다.
            (개인정보보호법 제36조, GDPR Article 17 준수)
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
            동의 안함
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
            동의하고 시작하기 ✦
          </button>
        </div>
      </div>
    </div>
  )
}
