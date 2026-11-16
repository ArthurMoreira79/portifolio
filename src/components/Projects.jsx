import { ArrowUpRight, Github } from 'lucide-react'
import { useReveal } from '../lib/animations.js'
import { useI18n } from '../i18n/I18nContext.jsx'
import { PROJECTS } from '../data.js'
import { LINKS } from '../config.js'
import './projects.css'

const INITIALS = { fitzone: 'FZ', conecta: 'CL', imobiliaria: 'IA' }

function ProjectCard({ p, info, texts }) {
  return (
    <article className={`proj-card glass reveal ${p.featured ? 'featured' : ''}`}>
      <div className="proj-visual">
        {p.image ? (
          <img src={p.image} alt={info.name} loading="lazy" />
        ) : (
          <span className="proj-initial" aria-hidden="true">
            {INITIALS[p.key]}
          </span>
        )}
        {p.wip && <span className="proj-wip tag">● {texts.wip}</span>}
      </div>
      <div className="proj-body">
        <h3>{info.name}</h3>
        <p>{info.desc}</p>

        {p.versions && (
          <div className="proj-versions">
            <span className="proj-versions-label">{texts.fitzoneVersions}</span>
            <div className="proj-versions-track">
              {p.versions.map((v, i) => (
                <span className="proj-version" key={v}>
                  <code>{v}</code>
                  {i < p.versions.length - 1 && <i aria-hidden="true" />}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="proj-tags">
          {p.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>

        <div className="proj-actions">
          <a className="btn btn-ghost btn-sm" href={p.github} target="_blank" rel="noreferrer">
            <Github size={15} /> {texts.github}
          </a>
          {p.live && (
            <a className="btn btn-primary btn-sm" href={p.live} target="_blank" rel="noreferrer">
              {texts.live} <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const { t } = useI18n()
  const ref = useReveal()

  return (
    <section className="section projects" id="projetos" ref={ref}>
      <div className="container">
        <div className="section-head">
          <span className="hud-label reveal">{t.projects.label}</span>
          <h2 className="section-title reveal">{t.projects.title}</h2>
          <p className="section-sub reveal">{t.projects.sub}</p>
        </div>

        <div className="proj-grid">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.key} p={p} info={t.projects.items[p.key]} texts={t.projects} />
          ))}
        </div>

        <div className="proj-all reveal">
          <a className="btn btn-ghost" href={LINKS.github} target="_blank" rel="noreferrer">
            <Github size={17} /> {t.projects.all}
          </a>
        </div>
      </div>
    </section>
  )
}
