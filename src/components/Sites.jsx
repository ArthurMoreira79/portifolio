import { useEffect, useRef, useState } from 'react'
import { ExternalLink, MonitorPlay, X } from 'lucide-react'
import { useReveal } from '../lib/animations.js'
import { useI18n } from '../i18n/I18nContext.jsx'
import { SITES } from '../data.js'
import './sites.css'

function SiteCard({ site, info, texts, onWatch, featured }) {
  const cardRef = useRef(null)
  const videoRef = useRef(null)

  /* tilt 3D no hover */
  const onMove = (e) => {
    const el = cardRef.current
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--rx', `${(-y * 4).toFixed(2)}deg`)
    el.style.setProperty('--ry', `${(x * 6).toFixed(2)}deg`)
  }
  const onLeave = () => {
    const el = cardRef.current
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  /* vídeo só toca quando visível */
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.35 },
    )
    obs.observe(v)
    return () => obs.disconnect()
  }, [])

  return (
    <article
      className={`site-card glass reveal ${featured ? 'featured' : ''}`}
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="site-media">
        {site.video ? (
          <video
            ref={videoRef}
            src={site.video}
            poster={site.poster || undefined}
            muted
            loop
            playsInline
            preload="none"
          />
        ) : (
          <div className="site-placeholder">
            <div className="site-ph-chrome" aria-hidden="true">
              <span />
              <span />
              <span />
              <em>{site.url ? site.url.replace('https://', '') : '···'}</em>
            </div>
            {site.image ? (
              <img className="site-ph-img" src={site.image} alt={info.name} loading="lazy" />
            ) : (
              <div className="site-ph-body" aria-hidden="true">
                <strong>{info.name}</strong>
                <span className="tag">{texts.videoSoon}</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="site-body">
        <div className="site-head">
          <h3>{info.name}</h3>
          <span className="tag">{info.niche}</span>
        </div>
        <p>{info.highlight}</p>
        <div className="site-actions">
          {site.video && (
            <button className="btn btn-ghost btn-sm" onClick={() => onWatch(site)}>
              <MonitorPlay size={15} /> {texts.watch}
            </button>
          )}
          {site.url ? (
            <a className="btn btn-primary btn-sm" href={site.url} target="_blank" rel="noreferrer">
              {texts.visit} <ExternalLink size={14} />
            </a>
          ) : (
            <span className="btn btn-ghost btn-sm disabled">{texts.linkSoon}</span>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Sites() {
  const { t } = useI18n()
  const ref = useReveal()
  const [modal, setModal] = useState(null)

  useEffect(() => {
    if (!modal) return
    const onKey = (e) => e.key === 'Escape' && setModal(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modal])

  return (
    <section className="section sites" id="sites" ref={ref}>
      <div className="container">
        <div className="section-head">
          <span className="hud-label reveal">{t.sites.label}</span>
          <h2 className="section-title reveal">{t.sites.title}</h2>
          <p className="section-sub reveal">{t.sites.sub}</p>
        </div>

        <div className="sites-grid">
          {SITES.map((site) => (
            <SiteCard
              key={site.key}
              site={site}
              info={t.sites.items[site.key]}
              texts={t.sites}
              featured={site.featured}
              onWatch={setModal}
            />
          ))}
        </div>
      </div>

      {modal && (
        <div className="site-modal" onClick={() => setModal(null)} role="dialog" aria-modal="true">
          <button className="site-modal-close" aria-label={t.sites.closeVideo}>
            <X size={26} />
          </button>
          <video
            src={modal.video}
            poster={modal.poster || undefined}
            controls
            autoPlay
            playsInline
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
