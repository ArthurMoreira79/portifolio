import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion, useReveal } from '../lib/animations.js'
import { useI18n } from '../i18n/I18nContext.jsx'
import './process.css'

export default function Process() {
  const { t } = useI18n()
  const ref = useReveal()
  const listRef = useRef(null)

  /* linha glow que se desenha com o scroll */
  useEffect(() => {
    const root = listRef.current
    if (!root) return
    const fill = root.querySelector('.proc-line-fill')

    if (prefersReducedMotion()) {
      fill.style.transform = 'scaleY(1)'
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fill,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top',
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top 72%', end: 'bottom 60%', scrub: 0.5 },
        },
      )
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section className="section process" id="processo" ref={ref}>
      <div className="container">
        <div className="section-head">
          <span className="hud-label reveal">{t.process.label}</span>
          <h2 className="section-title reveal">{t.process.title}</h2>
          <p className="section-sub reveal">{t.process.sub}</p>
        </div>

        <div className="proc-list" ref={listRef}>
          <div className="proc-line" aria-hidden="true">
            <div className="proc-line-fill" />
          </div>
          {t.process.steps.map((step, i) => (
            <div className="proc-step reveal" key={i} data-delay={i * 0.05}>
              <span className="proc-num">{String(i + 1).padStart(2, '0')}</span>
              <div className="proc-step-body glass">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
