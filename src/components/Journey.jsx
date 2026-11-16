import { useEffect, useRef } from 'react'
import { ArrowUpRight, Target } from 'lucide-react'
import { gsap, prefersReducedMotion, useReveal, scrollToId } from '../lib/animations.js'
import { useI18n } from '../i18n/I18nContext.jsx'
import hackathon from '../assets/hackathon-eqtlab.jpg'
import './journey.css'

export default function Journey() {
  const { t } = useI18n()
  const ref = useReveal()
  const tlRef = useRef(null)

  useEffect(() => {
    const root = tlRef.current
    if (!root) return
    if (prefersReducedMotion()) {
      root.querySelectorAll('.jr-item').forEach((el) => el.classList.add('lit'))
      root.querySelector('.jr-line-fill')?.style.setProperty('transform', 'scaleY(1)')
      const mask = root.closest('.journey')?.querySelector('.jr-event-img')
      if (mask) mask.style.clipPath = 'inset(0 0 0 0)'
      return
    }

    const ctx = gsap.context(() => {
      /* pontos acendem */
      gsap.utils.toArray('.jr-item').forEach((item) => {
        gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 72%',
            toggleActions: 'play none none reverse',
            onToggle: (self) => item.classList.toggle('lit', self.isActive || self.progress > 0),
          },
        })
      })

      /* linha que preenche com o scroll */
      gsap.fromTo(
        '.jr-line-fill',
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top',
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top 70%', end: 'bottom 55%', scrub: 0.6 },
        },
      )

      /* mask reveal da foto do evento */
      gsap.fromTo(
        '.jr-event-img',
        { clipPath: 'inset(0 0 100% 0)' },
        {
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.jr-event', start: 'top 78%' },
        },
      )
    }, root.closest('.journey'))

    return () => ctx.revert()
  }, [])

  return (
    <section className="section journey" id="sobre" ref={ref}>
      <div className="container">
        <div className="section-head">
          <span className="hud-label reveal">{t.journey.label}</span>
          <h2 className="section-title reveal">{t.journey.title}</h2>
          <p className="section-sub reveal">{t.journey.sub}</p>
        </div>

        <div className="jr-grid">
          <div className="jr-timeline" ref={tlRef}>
            <div className="jr-line" aria-hidden="true">
              <div className="jr-line-fill" />
            </div>
            {t.journey.timeline.map((item, i) => (
              <div className="jr-item" key={i}>
                <span className="jr-dot" aria-hidden="true" />
                <span className="jr-date">{item.date}</span>
                <h3 className="jr-item-title">{item.title}</h3>
                <p className="jr-item-text">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="jr-side">
            <div className="jr-goals glass reveal">
              <span className="jr-goals-icon">
                <Target size={20} />
              </span>
              <h3>{t.journey.goalsTitle}</h3>
              <p>{t.journey.goalsText}</p>
            </div>

            <article className="jr-event glass reveal">
              <div className="jr-event-img-wrap">
                <img
                  className="jr-event-img"
                  src={hackathon}
                  alt={t.journey.eventAlt}
                  loading="lazy"
                />
              </div>
              <div className="jr-event-body">
                <span className="tag">EQT LAB · 2026</span>
                <h3>{t.journey.eventTitle}</h3>
                <p>{t.journey.eventText}</p>
                <button className="jr-event-link" onClick={() => scrollToId('projetos')}>
                  {t.journey.eventLink} <ArrowUpRight size={15} />
                </button>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
