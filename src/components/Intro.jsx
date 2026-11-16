import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/animations.js'
import { useI18n } from '../i18n/I18nContext.jsx'
import Logo from './Logo.jsx'
import perfil from '../assets/perfil.jpg'
import './intro.css'

export default function Intro({ onDone }) {
  const { t } = useI18n()
  const [phase, setPhase] = useState('loading') // loading | title
  const [progress, setProgress] = useState(0)
  const [glitch, setGlitch] = useState(false)
  const rootRef = useRef(null)
  const loaderRef = useRef(null)
  const titleRef = useRef(null)
  const leaving = useRef(false)

  /* ---- Etapa A: carregamento real (min 1,2s / max 3s) ---- */
  useEffect(() => {
    let assetsReady = false
    const img = new Image()
    img.src = perfil
    Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      new Promise((res) => {
        img.onload = res
        img.onerror = res
      }),
    ]).then(() => {
      assetsReady = true
    })

    const MIN = 1200
    const MAX = 3000
    const start = performance.now()
    let lastQuarter = 0
    let raf

    const tick = (now) => {
      const el = now - start
      let p = Math.min(1, el / MIN) * (assetsReady ? 100 : 90)
      if (el >= MAX || (assetsReady && el >= MIN)) p = 100
      p = Math.floor(p)
      setProgress(p)

      const q = Math.floor(p / 25)
      if (q > lastQuarter && p < 100) {
        lastQuarter = q
        setGlitch(true)
        setTimeout(() => setGlitch(false), 160)
      }

      if (p >= 100) {
        setTimeout(() => setPhase('title'), 420)
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  /* ---- Logo: contorno desenhado e depois preenchido ---- */
  useEffect(() => {
    const paths = loaderRef.current?.querySelectorAll('.logo-path')
    if (!paths?.length) return
    const ctx = gsap.context(() => {
      paths.forEach((p) => {
        const len = p.getTotalLength()
        gsap.set(p, { fillOpacity: 0 })
        gsap.fromTo(
          p,
          { strokeDasharray: len, strokeDashoffset: len },
          { strokeDashoffset: 0, duration: 1.3, ease: 'power2.inOut' },
        )
        gsap.to(p, { fillOpacity: 1, duration: 0.7, delay: 1.0, ease: 'power2.out' })
      })
    })
    return () => ctx.revert()
  }, [])

  /* ---- Saída: zoom + fade (o mesmo efeito do antigo INICIAR) ---- */
  const exit = () => {
    if (leaving.current) return
    leaving.current = true
    gsap.to(rootRef.current, {
      scale: 1.12,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.in',
      onComplete: onDone,
    })
  }

  /* ---- Etapa B: tela de título monta e entra sozinha no site ---- */
  useEffect(() => {
    if (phase !== 'title') return
    const root = titleRef.current
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.fromTo(root, { opacity: 0 }, { opacity: 1, duration: 0.3 })
        .fromTo(
          '.intro-photo',
          { xPercent: -60, opacity: 0 },
          { xPercent: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
          0.1,
        )
        .fromTo(
          '.intro-letter',
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.65, ease: 'power3.out', stagger: 0.055 },
          0.35,
        )
        .fromTo('.intro-year', { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.5 }, '-=0.3')
        .fromTo('.intro-role', { opacity: 0 }, { opacity: 1, duration: 0.15, repeat: 2, yoyo: true }, '-=0.2')
        .fromTo('.intro-skip', { opacity: 0 }, { opacity: 0.7, duration: 0.4 }, '<')
        /* entrada automática, como se INICIAR tivesse sido clicado */
        .call(exit, null, '+=0.9')
    }, root)

    return () => ctx.revert()
  }, [phase])

  /* Enter/Espaço/Esc pulam direto */
  useEffect(() => {
    const onKey = (e) => {
      if (['Enter', ' ', 'Escape'].includes(e.key)) exit()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="intro" ref={rootRef} role="dialog" aria-label={t.intro.title}>
      <div className="intro-glow" aria-hidden="true" />

      {phase === 'loading' && (
        <div className="intro-loader" ref={loaderRef}>
          <Logo className="intro-logo" strokeWidth={5} />
          <div className={`intro-counter ${glitch ? 'glitch' : ''}`}>
            <span className="intro-counter-label">{t.intro.loading}</span>
            <span className="intro-counter-num">{String(progress).padStart(3, '0')}%</span>
          </div>
          <div className="intro-bar">
            <div className="intro-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {phase === 'title' && (
        <div className="intro-title-screen" ref={titleRef}>
          <div className="intro-corner-logo">
            <Logo />
          </div>

          <button className="intro-skip" onClick={exit}>
            {t.intro.skip} →
          </button>

          <div className="intro-title-grid">
            <div className="intro-photo" aria-hidden="true">
              <div className="intro-photo-block" />
              <img className="intro-photo-img" src={perfil} alt="" />
            </div>

            <div className="intro-title-text">
              <h1 className="intro-title">
                {t.intro.title.split('').map((ch, i) => (
                  <span className="intro-letter" key={i}>
                    {ch}
                  </span>
                ))}
                <span className="intro-year">{t.intro.year}</span>
              </h1>
              <p className="intro-role">{t.intro.role}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
