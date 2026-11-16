import { Check } from 'lucide-react'
import { useReveal } from '../lib/animations.js'
import { useI18n } from '../i18n/I18nContext.jsx'
import { waLink } from '../config.js'
import './services.css'

export default function Services() {
  const { t } = useI18n()
  const ref = useReveal()

  return (
    <section className="section services" id="servicos" ref={ref}>
      <div className="container">
        <div className="section-head">
          <span className="hud-label reveal">{t.services.label}</span>
          <h2 className="section-title reveal">{t.services.title}</h2>
          <p className="section-sub reveal">{t.services.sub}</p>
        </div>

        <div className="svc-grid">
          {t.services.items.map((item, i) => (
            <article className="svc-card glass reveal" key={item.num} data-delay={i * 0.08}>
              <span className="svc-num">{item.num}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <ul>
                {item.topics.map((topic) => (
                  <li key={topic}>
                    <Check size={14} /> {topic}
                  </li>
                ))}
              </ul>
              <a className="btn btn-primary btn-sm" href={waLink(item.wa)} target="_blank" rel="noreferrer">
                {t.services.cta}
              </a>
            </article>
          ))}
        </div>

        <p className="svc-extras reveal">{t.services.extras}</p>
      </div>
    </section>
  )
}
