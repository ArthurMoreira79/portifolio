import { Gem, Workflow } from 'lucide-react'
import { useReveal } from '../lib/animations.js'
import { useI18n } from '../i18n/I18nContext.jsx'
import './sell.css'

function Column({ icon, title, items, delay }) {
  return (
    <div className="sell-col glass reveal" data-delay={delay}>
      <h3>
        {icon} {title}
      </h3>
      <div className="sell-items">
        {items.map((item) => (
          <div className="sell-item" key={item.title}>
            <strong>{item.title}</strong>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Sell() {
  const { t } = useI18n()
  const ref = useReveal()

  return (
    <section className="section sell" id="diferenciais" ref={ref}>
      <div className="container">
        <div className="section-head">
          <span className="hud-label reveal">{t.sell.label}</span>
          <h2 className="section-title reveal">{t.sell.title}</h2>
        </div>

        <div className="sell-grid">
          <Column icon={<Gem size={18} />} title={t.sell.qualityTitle} items={t.sell.quality} delay={0} />
          <Column icon={<Workflow size={18} />} title={t.sell.workTitle} items={t.sell.work} delay={0.12} />
        </div>
      </div>
    </section>
  )
}
