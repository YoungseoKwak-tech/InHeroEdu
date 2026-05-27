'use client'

import { useEffect, useState } from 'react'
import { useLang } from '@/app/contexts/LanguageContext'
import { authFetch } from '@/lib/client-auth'
import { normalizeProfileFields } from '@/lib/profile'
import { buildAuthCallbackUrl, getSafeRedirectPath } from '@/lib/auth-redirect'
import { createBrowserClient } from '@/lib/supabase'

interface Props {
  isOpen: boolean
  onClose: () => void
  defaultMode?: 'login' | 'signup'
  redirectTo?: string
}

export default function AuthModal({ isOpen, onClose, defaultMode = 'login', redirectTo = '/dashboard' }: Props) {
  const { lang } = useLang()
  const supabase = createBrowserClient()
  const [mode, setMode] = useState<'login' | 'signup'>(defaultMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [grade, setGrade] = useState('')
  const [school, setSchool] = useState('')
  const [referralStudentEmail, setReferralStudentEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    setMode(defaultMode)
    setError('')
    setSuccess('')
  }, [defaultMode, isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.classList.add('auth-modal-open')
    } else {
      document.body.style.overflow = ''
      document.body.classList.remove('auth-modal-open')
    }

    return () => {
      document.body.style.overflow = ''
      document.body.classList.remove('auth-modal-open')
    }
  }, [isOpen])

  if (!isOpen) return null

  const ko = lang === 'ko'

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '12px',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    color: '#fff',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box' as const,
    transition: 'border-color 0.2s, background 0.2s',
  }

  const labelStyle = {
    display: 'block',
    fontSize: '11px',
    fontWeight: 700,
    color: 'rgba(255,255,255,0.48)',
    marginBottom: '6px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
  }

  const focusInput = (element: HTMLInputElement, active: boolean) => {
    element.style.borderColor = active ? 'rgba(29,158,117,0.7)' : 'rgba(255,255,255,0.12)'
    element.style.background = active ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.06)'
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      if (mode === 'signup') {
        const profile = normalizeProfileFields({
          name,
          grade,
          school,
          referral_student_email: referralStudentEmail,
        })
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: profile },
        })

        if (error) throw error

        if (data.user && data.user.identities && data.user.identities.length === 0) {
          setError(ko ? '이미 가입된 이메일이에요. 로그인해주세요.' : 'Email already registered. Please log in.')
          setMode('login')
          setLoading(false)
          return
        }

        if (data.session) {
          const profileRes = await authFetch('/api/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(profile),
          })

          if (!profileRes.ok) {
            setSuccess(
              ko
                ? '가입은 완료됐지만 프로필 저장 중 문제가 생겼어요. 다시 로그인하면 자동으로 복구됩니다.'
                : 'Signup completed, but profile sync needs one more login to finish.'
            )
          }
        }

        if (data.session) {
          setSuccess(ko ? '✅ 가입 완료! 바로 시작할 수 있어요.' : '✅ Signup complete! You can start right away.')
          setTimeout(() => {
            onClose()
            window.location.reload()
          }, 800)
        } else {
          setSuccess(ko ? '✅ 가입 완료! 이메일을 확인해주세요.' : '✅ Check your email to confirm!')
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error

        setSuccess(ko ? '✅ 로그인 성공!' : '✅ Logged in!')
        setTimeout(() => {
          onClose()
          window.location.reload()
        }, 800)
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: buildAuthCallbackUrl(window.location.origin, getSafeRedirectPath(redirectTo)),
          queryParams: { prompt: 'select_account' },
        },
      })

      if (error) throw error
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e))
      setLoading(false)
    }
  }

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        background: 'rgba(0,0,0,0.82)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '470px',
          borderRadius: '24px',
          background: 'linear-gradient(180deg, rgba(14,14,14,0.98), rgba(8,8,8,0.98))',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 32px 90px rgba(0,0,0,0.72)',
          maxHeight: 'min(760px, calc(100dvh - 48px))',
          overflowY: 'auto',
        }}
      >
        <div
          style={{
            height: '3px',
            background: 'linear-gradient(90deg, #1D9E75, #0ea5e9, #1D9E75)',
            borderRadius: '24px 24px 0 0',
          }}
        />

        <div style={{ padding: '24px 24px 28px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
              padding: '6px',
              borderRadius: '14px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
              marginBottom: '20px',
            }}
          >
            {([
              { key: 'login', label: ko ? '로그인' : 'Login' },
              { key: 'signup', label: ko ? '회원가입' : 'Sign up' },
            ] as const).map((item) => {
              const active = mode === item.key
              return (
                <button
                  key={item.key}
                  onClick={() => {
                    setMode(item.key)
                    setError('')
                    setSuccess('')
                  }}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: active ? '#ffffff' : 'rgba(255,255,255,0.58)',
                    background: active ? 'linear-gradient(135deg, rgba(29,158,117,0.9), rgba(14,165,233,0.88))' : 'transparent',
                    boxShadow: active ? '0 12px 24px rgba(29,158,117,0.15)' : 'none',
                  }}
                >
                  {item.label}
                </button>
              )
            })}
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '20px' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#1D9E75', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '7px' }}>
                {mode === 'login' ? (ko ? '로그인' : 'Sign in') : (ko ? '학생 정보와 함께 가입' : 'Join with your student profile')}
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1.25 }}>
                {mode === 'login'
                  ? (ko ? '정중앙에서 바로 로그인하세요' : 'Sign in right here')
                  : (ko ? '한 번에 가입하고 바로 시작하세요' : 'Create everything in one step')}
              </h2>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.42)', margin: '6px 0 0' }}>
                {mode === 'login'
                  ? (ko ? '이메일과 비밀번호로 바로 들어갈 수 있어요.' : 'Use your email and password to continue.')
                  : (ko ? '이름, 학년, 학교를 같이 저장해서 관리자 페이지에도 바로 보이게 합니다.' : 'We save your name, grade, and school together so admin can see them immediately.')}
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.55)',
                cursor: 'pointer',
                fontSize: '14px',
                flexShrink: 0,
              }}
            >
              ✕
            </button>
          </div>

          <button
            onClick={handleGoogle}
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '14px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.84)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '16px',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
              <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
            </svg>
            {loading ? (ko ? 'Google로 이동 중...' : 'Opening Google...') : (ko ? 'Google로 계속하기' : 'Continue with Google')}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>{ko ? '또는' : 'or'}</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '14px' }}>
            {mode === 'signup' && (
              <div>
                <label style={labelStyle}>{ko ? '이름' : 'Name'}</label>
                <input
                  type="text"
                  placeholder={ko ? '홍길동' : 'John Doe'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => focusInput(e.target, true)}
                  onBlur={(e) => focusInput(e.target, false)}
                />
              </div>
            )}

            {mode === 'signup' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>{ko ? '학년' : 'Grade'}</label>
                  <input
                    type="text"
                    placeholder={ko ? '예: 11학년' : 'e.g. Grade 11'}
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    style={inputStyle}
                    onFocus={(e) => focusInput(e.target, true)}
                    onBlur={(e) => focusInput(e.target, false)}
                  />
                </div>
                <div>
                  <label style={labelStyle}>{ko ? '학교' : 'School'}</label>
                  <input
                    type="text"
                    placeholder={ko ? '학교명' : 'School name'}
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    style={inputStyle}
                    onFocus={(e) => focusInput(e.target, true)}
                    onBlur={(e) => focusInput(e.target, false)}
                  />
                </div>
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label style={labelStyle}>{ko ? '추천학생 이메일' : 'Referral student email'}</label>
                <input
                  type="email"
                  placeholder={ko ? '추천한 학생 이메일 (선택)' : 'Student email who referred you (optional)'}
                  value={referralStudentEmail}
                  onChange={(e) => setReferralStudentEmail(e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => focusInput(e.target, true)}
                  onBlur={(e) => focusInput(e.target, false)}
                />
              </div>
            )}

            <div>
              <label style={labelStyle}>{ko ? '이메일' : 'Email'}</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                style={inputStyle}
                onFocus={(e) => focusInput(e.target, true)}
                onBlur={(e) => focusInput(e.target, false)}
              />
            </div>

            <div>
              <label style={labelStyle}>{ko ? '비밀번호' : 'Password'}</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                style={inputStyle}
                onFocus={(e) => focusInput(e.target, true)}
                onBlur={(e) => focusInput(e.target, false)}
              />
            </div>
          </div>

          {error && (
            <div style={{ marginBottom: '12px', padding: '10px 14px', borderRadius: '12px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', fontSize: '12px' }}>
              {error}
            </div>
          )}

          {success && (
            <div style={{ marginBottom: '12px', padding: '10px 14px', borderRadius: '12px', background: 'rgba(29,158,117,0.08)', border: '1px solid rgba(29,158,117,0.2)', color: '#34d399', fontSize: '12px' }}>
              {success}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || !email || !password}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '14px',
              background: (loading || !email || !password) ? 'rgba(29,158,117,0.3)' : 'linear-gradient(135deg, #1D9E75, #0ea5e9)',
              border: 'none',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 800,
              cursor: (loading || !email || !password) ? 'not-allowed' : 'pointer',
              boxShadow: '0 12px 30px rgba(29,158,117,0.22)',
            }}
          >
            {loading ? '...' : mode === 'login' ? (ko ? '로그인' : 'Log in') : (ko ? '회원가입하고 시작하기' : 'Sign up and start')}
          </button>

          <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px', color: 'rgba(255,255,255,0.32)' }}>
            {mode === 'login' ? (ko ? '아직 계정이 없으신가요? ' : "Don't have an account? ") : (ko ? '이미 계정이 있으신가요? ' : 'Already have an account? ')}
            <button
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login')
                setError('')
                setSuccess('')
              }}
              style={{ background: 'none', border: 'none', color: '#1D9E75', fontWeight: 700, cursor: 'pointer', fontSize: '12px' }}
            >
              {mode === 'login' ? (ko ? '회원가입' : 'Sign up') : (ko ? '로그인' : 'Log in')}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
