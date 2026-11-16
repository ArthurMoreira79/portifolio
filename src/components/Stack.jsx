import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion, useReveal } from '../lib/animations.js'
import { useI18n } from '../i18n/I18nContext.jsx'
import { STACK } from '../data.js'
import './stack.css'

const GROUPS = ['front', 'back', 'db', 'tools']

export default function Stack() {
  const { t } = useI18n()
  const ref = useReveal()
  const gridRef = useRef(null)

  /* chips em cascata */
  useEffect(() => {
    const root = gridRef.current
    if (!root) return
    const chips = root.querySelectorAll('.stack-chip')

    if (prefersReducedMotion()) {
      chips.forEach((c) => (c.style.opacity = 1))
      return
    }

    const ctx = gsap.context(() => {
      root.querySelectorAll('.stack-col').forEach((col) => {
        gsap.fromTo(
          col.querySelectorAll('.stack-chip'),
          { opacity: 0, y: 16, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: 'power2.out',
            scrollTrigger: { trigger: col, start: 'top 85%' },
          },
        )
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section className="section stack" id="stack" ref={ref}>
      <div className="container">
        <div className="section-head">
          <span className="hud-label reveal">{t.stack.label}</span>
          <h2 className="section-title reveal">{t.stack.title}</h2>
          <p className="section-sub reveal">{t.stack.sub}</p>
        </div>

        <div className="stack-grid" ref={gridRef}>
          {GROUPS.map((g, gi) => (
            <div className="stack-col glass reveal" key={g} data-delay={gi * 0.08}>
              <h3>
                <span className="stack-num">{String(gi + 1).padStart(2, '0')}</span>
                {t.stack[g]}
              </h3>
              <div className="stack-chips">
                {STACK[g].map((tech) => (
                  <span className="stack-chip" key={tech.name}>
                    <img
                      src={`https://cdn.simpleicons.org/${tech.slug}`}
                      alt=""
                      width="16"
                      height="16"
                      loading="lazy"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
