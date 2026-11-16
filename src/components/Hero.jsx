import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion, scrollToId } from '../lib/animations.js'
import { useI18n } from '../i18n/I18nContext.jsx'
import { waLink } from '../config.js'
import perfil from '../assets/perfil.jpg'
import './hero.css'

export default function Hero({ active }) {
  const { t } = useI18n()
  const root = useRef(null)
  const played = useRef(false)

  useEffect(() => {
    if (!active || played.current) return
    played.current = true
    const el = root.current

    if (prefersReducedMotion()) {
      el.classList.add('hero-ready')
      return
    }

    const ctx = gsap.context(() => {
      const line = el.querySelector('.hero-border-line rect')

      gsap.set('.hero-glow-bg', { opacity: 0, scaleY: 0.3, transformOrigin: 'top center' })
      gsap.set('.hero-photo-wrap', { clipPath: 'inset(0 0 100% 0)', scale: 1.08 })
      gsap.set('.hero-letter', { opacity: 0, y: 34, filter: 'blur(10px)' })
      gsap.set('.hero-stagger', { opacity: 0, y: 26 })
      gsap.set(line, { strokeDasharray: '26 74', strokeDashoffset: 100, opacity: 0 })
      el.classList.add('hero-ready')

      const tl = gsap.timeline()
      tl.to('.hero-glow-bg', { opacity: 1, scaleY: 1, duration: 0.9, ease: 'power2.out' })
        .to(
          '.hero-photo-wrap',
          { clipPath: 'inset(0 0 0% 0)', scale: 1, duration: 1.05, ease: 'power3.out' },
          0.25,
        )
        .to(
          '.hero-letter',
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, stagger: 0.04, ease: 'power3.out' },
          0.55,
        )
        .to('.hero-stagger', { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out' }, '-=0.35')
        .to(line, { opacity: 1, duration: 0.15 }, '-=0.2')
        .to(line, { strokeDashoffset: -100, duration: 1.4, ease: 'power1.inOut' }, '<')
        .to(line, { opacity: 0, duration: 0.3 }, '-=0.25')

      /* parallax no scroll */
      gsap.to('.hero-photo-col', {
        yPercent: 9,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero-copy', {
        yPercent: -14,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, el)

    return () => ctx.revert()
  }, [active])

  const name = t.hero.name

  return (
    <section className="hero" id="inicio" ref={root}>
      <div className="hero-glow-bg" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hud-label hero-stagger">{t.hero.hud}</p>
          <h1 className="hero-name" aria-label={name}>
            {name.split(' ').map((word, wi) => (
              <span className="hero-word" key={wi} aria-hidden="true">
                {word.split('').map((ch, i) => (
                  <span className="hero-letter" key={i}>
                    {ch}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <p className="hero-subtitle hero-stagger">{t.hero.subtitle}</p>
          <p className="hero-paragraph hero-stagger">{t.hero.paragraph}</p>
          <div className="hero-ctas hero-stagger">
            <a className="btn btn-primary" href={waLink(t.contact.wa)} target="_blank" rel="noreferrer">
              {t.hero.ctaBudget}
            </a>
            <button
              className="btn btn-ghost"
              onClick={() => scrollToId('sites')}
            >
              {t.hero.ctaSites} ↓
            </button>
          </div>
        </div>

        <div className="hero-photo-col">
          <div className="hero-halo" aria-hidden="true" />
          <div className="hero-photo-wrap">
            <img src={perfil} alt={t.hero.photoAlt} fetchpriority="high" />
            <svg className="hero-border-line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <rect x="1" y="1" width="98" height="98" rx="4" pathLength="100" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
