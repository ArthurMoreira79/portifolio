import { useEffect, useRef, useState } from 'react'
import { gsap, scrollToId } from '../lib/animations.js'
import { useI18n } from '../i18n/I18nContext.jsx'
import { useTheme } from '../lib/ThemeContext.jsx'
import Logo from './Logo.jsx'
import perfil from '../assets/perfil.jpg'
import './intro.css'

export default function Intro({ onDone }) {
  const { t, lang, setLang } = useI18n()
  const { theme, setTheme } = useTheme()
  const [phase, setPhase] = useState('loading') // loading | title
  const [progress, setProgress] = useState(0)
  const [glitch, setGlitch] = useState(false)
  const [optionsOpen, setOptionsOpen] = useState(false)
  const rootRef = useRef(null)
  const loaderRef = useRef(null)
  const titleRef = useRef(null)
  const menuRefs = useRef([])
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

  /* ---- Etapa B: montagem da tela de título ---- */
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
        .fromTo(
          '.intro-menu li',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.09, ease: 'power2.out' },
          '-=0.1',
        )
        .fromTo('.intro-skip', { opacity: 0 }, { opacity: 0.7, duration: 0.4 })
    }, root)

    const focusTimer = setTimeout(() => menuRefs.current[0]?.focus(), 1400)
    return () => {
      clearTimeout(focusTimer)
      ctx.revert()
    }
  }, [phase])

  /* ---- Navegação por teclado (estilo menu de jogo) ---- */
  useEffect(() => {
    if (phase !== 'title') return
    const onKey = (e) => {
      const items = menuRefs.current.filter(Boolean)
      const idx = items.indexOf(document.activeElement)
      if (['ArrowDown', 'ArrowRight'].includes(e.key)) {
        e.preventDefault()
        items[(idx + 1 + items.length) % items.length]?.focus()
      } else if (['ArrowUp', 'ArrowLeft'].includes(e.key)) {
        e.preventDefault()
        items[(idx - 1 + items.length) % items.length]?.focus()
      } else if (e.key === 'Enter' && idx === -1) {
        e.preventDefault()
        start()
      } else if (e.key === 'Escape') {
        setOptionsOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase])

  /* ---- Saída: zoom + fade ---- */
  const exit = (after) => {
    if (leaving.current) return
    leaving.current = true
    gsap.to(rootRef.current, {
      scale: 1.12,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.in',
      onComplete: () => {
        onDone()
        after?.()
      },
    })
  }

  const start = () => exit()
  const goContact = () => exit(() => setTimeout(() => scrollToId('contato'), 120))

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

          <button className="intro-skip" onClick={start}>
            {t.intro.skip} →
          </button>

          <div className="intro-title-grid">
            <div className="intro-photo" aria-hidden="true">
              <div className="intro-photo-block" />
              <svg viewBox="0 0 400 500" className="intro-photo-svg">
                <defs>
                  <clipPath id="introLetter" clipPathUnits="userSpaceOnUse">
                    <path d="M200 14 L372 486 L28 486 Z" />
                  </clipPath>
                </defs>
                <g clipPath="url(#introLetter)">
                  <image
                    href={perfil}
                    x="-20"
                    y="0"
                    width="440"
                    height="520"
                    preserveAspectRatio="xMidYMid slice"
                  />
                </g>
                <path
                  d="M200 14 L372 486 L28 486 Z"
                  fill="none"
                  stroke="var(--glow)"
                  strokeWidth="2"
                  opacity="0.55"
                />
              </svg>
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

              <ul className="intro-menu">
                <li>
                  <button ref={(el) => (menuRefs.current[0] = el)} onClick={start}>
                    {t.intro.start}
                  </button>
                </li>
                <li>
                  <button
                    ref={(el) => (menuRefs.current[1] = el)}
                    onClick={() => setOptionsOpen((o) => !o)}
                    aria-expanded={optionsOpen}
                  >
                    {t.intro.options}
                  </button>
                  {optionsOpen && (
                    <div className="intro-options glass">
                      <div className="intro-opt-row">
                        <span>{t.intro.language}</span>
                        <div>
                          <button
                            className={lang === 'pt' ? 'on' : ''}
                            onClick={() => setLang('pt')}
                          >
                            PT
                          </button>
                          <button
                            className={lang === 'en' ? 'on' : ''}
                            onClick={() => setLang('en')}
                          >
                            EN
                          </button>
                        </div>
                      </div>
                      <div className="intro-opt-row">
                        <span>{t.intro.theme}</span>
                        <div>
                          <button
                            className={theme === 'dark' ? 'on' : ''}
                            onClick={() => setTheme('dark')}
                          >
                            {t.intro.themeDark}
                          </button>
                          <button
                            className={theme === 'light' ? 'on' : ''}
                            onClick={() => setTheme('light')}
                          >
                            {t.intro.themeLight}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
                <li>
                  <button ref={(el) => (menuRefs.current[2] = el)} onClick={goContact}>
                    {t.intro.contact}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
