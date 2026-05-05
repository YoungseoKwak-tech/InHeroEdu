'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

/* ── Canvas animation functions ── */

function setupCanvas(canvas: HTMLCanvasElement) {
  const parent = canvas.parentElement!.getBoundingClientRect()
  const dpr = Math.min(window.devicePixelRatio || 1, 1.25)
  const width = Math.max(1, Math.floor(parent.width))
  const height = Math.max(1, Math.floor(parent.height))
  canvas.width = Math.floor(width * dpr)
  canvas.height = Math.floor(height * dpr)
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  const ctx = canvas.getContext('2d')!
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  return { ctx, W: width, H: height }
}

function drawFirst(canvas: HTMLCanvasElement, animate = true) {
  const { ctx, W, H } = setupCanvas(canvas)

  const stars: { x: number; y: number; r: number; o: number; phase: number }[] = []
  for (let i = 0; i < 96; i++) {
    stars.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.2 + 0.2, o: Math.random() * 0.25 + 0.05, phase: Math.random() * Math.PI * 2 })
  }
  const cx = W * 0.62, cy = H * 0.32
  let raf = 0

  function drawStars() {
    ctx.fillStyle = '#020510'; ctx.fillRect(0, 0, W, H)
    for (let ring = 8; ring > 0; ring--) {
      const rad = ring * 22
      const alpha = 0.03 * (9 - ring) / 8
      ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(120,160,255,${alpha})`; ctx.fill()
    }
    ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill()
    ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fillStyle = '#e0eaff'; ctx.fill()
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      const len = 18 + Math.random() * 4
      ctx.beginPath()
      ctx.moveTo(cx + Math.cos(angle) * 7, cy + Math.sin(angle) * 7)
      ctx.lineTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len)
      ctx.strokeStyle = 'rgba(180,210,255,0.25)'; ctx.lineWidth = 0.5; ctx.stroke()
    }
    const t = Date.now() * 0.001
    stars.forEach(s => {
      const o = s.o + Math.sin(t * 0.8 + s.phase) * s.o * 0.6
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(200,220,255,${o})`; ctx.fill()
    })
    if (animate) raf = requestAnimationFrame(drawStars)
  }
  drawStars()
  if (!animate) return () => {}
  return () => cancelAnimationFrame(raf)
}

function drawDeep(canvas: HTMLCanvasElement, animate = true) {
  const { ctx, W, H } = setupCanvas(canvas)

  const stars: { x: number; y: number; r: number; o: number; phase: number }[] = []
  for (let i = 0; i < 88; i++) {
    stars.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.1 + 0.2, o: Math.random() * 0.2 + 0.05, phase: Math.random() * Math.PI * 2 })
  }
  const cx = W * 0.5, cy = H * 0.3
  let raf = 0

  function draw() {
    ctx.fillStyle = '#080412'; ctx.fillRect(0, 0, W, H)
    for (let n = 6; n > 0; n--) {
      const a = 0.04 * (7 - n) / 6
      ctx.beginPath(); ctx.arc(cx, cy, n * 30, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(100,50,180,${a})`; ctx.fill()
    }
    const t = Date.now() * 0.0005
    const orbits: [number, number][] = [[W * 0.38, 22], [W * 0.62, 36]]
    orbits.forEach(([rx, ry], i) => {
      const ang = t * (i === 0 ? 1 : -0.7) + (i * Math.PI)
      const px = cx + Math.cos(ang) * rx
      const py = cy + Math.sin(ang) * (ry * 0.4)
      ctx.beginPath(); ctx.arc(cx, cy, rx, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(160,100,220,0.18)'; ctx.lineWidth = 0.5; ctx.stroke()
      const pr = i === 0 ? 7 : 5
      for (let r = pr + 4; r > 0; r--) {
        ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${i === 0 ? '180,120,255' : '140,90,210'},${0.06 * (pr + 4 - r) / (pr + 4)})`; ctx.fill()
      }
      ctx.beginPath(); ctx.arc(px, py, pr, 0, Math.PI * 2)
      ctx.fillStyle = i === 0 ? '#c87aff' : '#9a5de0'; ctx.fill()
    })
    ctx.beginPath(); ctx.arc(cx, cy, 10, 0, Math.PI * 2); ctx.fillStyle = 'rgba(80,40,140,0.9)'; ctx.fill()
    ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fillStyle = '#b090ff'; ctx.fill()
    stars.forEach(s => {
      const o = s.o + Math.sin(Date.now() * 0.001 * 0.6 + s.phase) * s.o * 0.5
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(200,180,255,${o})`; ctx.fill()
    })
    if (animate) raf = requestAnimationFrame(draw)
  }
  draw()
  if (!animate) return () => {}
  return () => cancelAnimationFrame(raf)
}

function drawUltimate(canvas: HTMLCanvasElement, animate = true) {
  const { ctx, W, H } = setupCanvas(canvas)

  const stars: { x: number; y: number; r: number; o: number; phase: number }[] = []
  for (let i = 0; i < 110; i++) {
    stars.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.3 + 0.2, o: Math.random() * 0.3 + 0.05, phase: Math.random() * Math.PI * 2 })
  }
  const cx = W * 0.5, cy = H * 0.3
  const armStars: { x: number; y: number; r: number; o: number; phase: number }[] = []
  for (let arm = 0; arm < 4; arm++) {
    for (let j = 0; j < 26; j++) {
      const t = j / 40
      const angle = (arm / 4) * Math.PI * 2 + t * Math.PI * 1.8
      const r = 20 + t * Math.min(W, H) * 0.3
      const spread = r * 0.12
      armStars.push({
        x: cx + Math.cos(angle) * r + (Math.random() - 0.5) * spread,
        y: cy + Math.sin(angle) * r * 0.38 + (Math.random() - 0.5) * spread * 0.4,
        r: Math.random() * 1.5 + 0.3,
        o: Math.random() * 0.5 + 0.1 * (1 - t) * 0.8,
        phase: Math.random() * Math.PI * 2,
      })
    }
  }
  let raf = 0

  function draw() {
    ctx.fillStyle = '#080604'; ctx.fillRect(0, 0, W, H)
    for (let n = 12; n > 0; n--) {
      ctx.beginPath()
      ctx.ellipse(cx, cy, n * 16, n * 6, 0, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(180,130,40,${0.025 * (13 - n) / 12})`; ctx.fill()
    }
    const t = Date.now() * 0.0003
    armStars.forEach(s => {
      const o = s.o * 0.6 + Math.sin(t + s.phase) * s.o * 0.4
      const warm = Math.random() > 0.7
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      ctx.fillStyle = warm ? `rgba(255,210,120,${o})` : `rgba(255,240,200,${o})`; ctx.fill()
    })
    for (let n = 6; n > 0; n--) {
      ctx.beginPath(); ctx.arc(cx, cy, n * 5, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255,220,100,${0.06 * (7 - n) / 6})`; ctx.fill()
    }
    ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2); ctx.fillStyle = '#ffe580'; ctx.fill()
    ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2); ctx.fillStyle = '#fff8d0'; ctx.fill()
    stars.forEach(s => {
      const o = s.o + Math.sin(t + s.phase) * s.o * 0.4
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255,240,180,${o * 0.5})`; ctx.fill()
    })
    if (animate) raf = requestAnimationFrame(draw)
  }
  draw()
  if (!animate) return () => {}
  return () => cancelAnimationFrame(raf)
}

/* ── Component ── */

const CARDS = [
  {
    id: 'c1',
    level: 'LEVEL 01',
    tag: 'DISCOVERY',
    title: ['First', 'Click'],
    subEn: 'The moment you discover your first star',
    descEn: 'A single star shining in the dark. Every universe begins with one light.',
    tagline: 'Your first star. Your first click.',
    accent: '#00FF88',
    accentDim: 'rgba(0,255,136,0.12)',
    accentBorder: 'rgba(0,255,136,0.2)',
    tagColor: 'rgba(0,255,136,0.5)',
    subColor: '#8888AA',
    textColor: '#E8E8F0',
    draw: drawFirst,
  },
  {
    id: 'c2',
    level: 'LEVEL 02',
    tag: 'ORBIT',
    title: ['Deep', 'Click'],
    subEn: 'The moment you enter a planetary orbit',
    descEn: 'As if pulled by gravity, step into the orbit of deeper thinking.',
    tagline: 'Enter the orbit of deep thinking.',
    accent: '#7B61FF',
    accentDim: 'rgba(123,97,255,0.12)',
    accentBorder: 'rgba(123,97,255,0.2)',
    tagColor: 'rgba(123,97,255,0.6)',
    subColor: '#8888AA',
    textColor: '#E8E8F0',
    draw: drawDeep,
  },
  {
    id: 'c3',
    level: 'LEVEL 03',
    tag: 'COSMOS',
    title: ['Ultimate', 'Click'],
    subEn: 'The moment you see the whole galaxy',
    descEn: 'Now you are not reading the map. You are drawing it.',
    tagline: "You don't explore the universe. You become it.",
    accent: '#FFB800',
    accentDim: 'rgba(255,184,0,0.1)',
    accentBorder: 'rgba(255,184,0,0.2)',
    tagColor: 'rgba(255,184,0,0.55)',
    subColor: '#8888AA',
    textColor: '#E8E8F0',
    draw: drawUltimate,
  },
]


export default function ClickSeries() {
  const sectionRef = useRef<HTMLElement>(null)
  const refs = [
    useRef<HTMLCanvasElement>(null),
    useRef<HTMLCanvasElement>(null),
    useRef<HTMLCanvasElement>(null),
  ]
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const [useStaticFrames, setUseStaticFrames] = useState(false)

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 1024px)')
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const syncMode = () => {
      setUseStaticFrames(mobileQuery.matches || reducedMotionQuery.matches)
    }

    syncMode()
    mobileQuery.addEventListener('change', syncMode)
    reducedMotionQuery.addEventListener('change', syncMode)

    return () => {
      mobileQuery.removeEventListener('change', syncMode)
      reducedMotionQuery.removeEventListener('change', syncMode)
    }
  }, [])

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => setShouldAnimate(entry.isIntersecting),
      { threshold: 0.15, rootMargin: '120px 0px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const cleanups: (() => void)[] = []
    const timeout = setTimeout(() => {
      CARDS.forEach((card, i) => {
        const canvas = refs[i].current
        if (!canvas) return
        cleanups.push(card.draw(canvas, shouldAnimate && !useStaticFrames))
      })
    }, shouldAnimate ? 60 : 0)
    return () => {
      clearTimeout(timeout)
      cleanups.forEach(fn => fn())
    }
  }, [shouldAnimate, useStaticFrames])

  return (
    <section ref={sectionRef} style={{ background: 'transparent', padding: '100px 24px', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* ── Header ── */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p className="section-label" style={{ marginBottom: '16px' }}>
            KNOWLEDGE UNIVERSE SERIES
          </p>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '-0.025em',
            marginBottom: '12px',
          }}>
            Click Series
          </h2>
          <p style={{ fontSize: '15px', color: '#8888AA' }}>
            Exploring the universe of knowledge
          </p>
        </div>

        {/* ── 3 Cards ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
        }}
          className="click-series-cards"
        >
          {CARDS.map((card, i) => (
            <div key={card.id} style={{
              position: 'relative',
              aspectRatio: '3/4',
              overflow: 'hidden',
              borderRadius: '8px',
              border: `1px solid ${card.accentBorder}`,
            }}>
              {/* Top accent line */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: '2px',
                background: `linear-gradient(90deg, ${card.accent}, transparent)`,
                opacity: 0.5,
                zIndex: 2,
              }} />
              <canvas
                ref={refs[i]}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '2rem 1.75rem',
                color: card.textColor,
                zIndex: 1,
              }}>
                {/* Level badge */}
                <p style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '9px',
                  letterSpacing: '0.2em',
                  fontWeight: 600,
                  color: card.accent,
                  background: card.accentDim,
                  border: `1px solid ${card.accentBorder}`,
                  borderRadius: '9999px',
                  padding: '3px 10px',
                }}>
                  {card.level}
                </p>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '9px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                  color: card.tagColor,
                }}>
                  {card.tag}
                </p>
                <h3 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                  lineHeight: 1.0,
                  letterSpacing: '-0.02em',
                  marginBottom: '10px',
                  color: '#fff',
                }}>
                  {card.title[0]}<br />{card.title[1]}
                </h3>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  color: card.subColor,
                  marginBottom: '10px',
                  lineHeight: 1.5,
                }}>
                  {card.subEn}
                </p>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px',
                  letterSpacing: '0.04em',
                  color: 'rgba(255,255,255,0.35)',
                  marginBottom: '16px',
                  lineHeight: 1.65,
                }}>
                  {card.descEn}
                </p>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '9px',
                  letterSpacing: '0.1em',
                  paddingTop: '14px',
                  borderTop: `1px solid ${card.accentBorder}`,
                  color: card.tagColor,
                }}>
                  {card.tagline}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div style={{ textAlign: 'center', marginTop: '56px' }}>
          <Link href="/courses" className="btn-secondary" style={{ display: 'inline-flex' }}>
            Begin your first click →
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .click-series-cards { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 640px) and (max-width: 900px) {
          .click-series-cards { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
