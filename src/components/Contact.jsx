import { Github, Instagram, Linkedin, Mail } from 'lucide-react'
import { useReveal, scrollToId } from '../lib/animations.js'
import { useI18n } from '../i18n/I18nContext.jsx'
import { LINKS, waLink, WHATSAPP_NUMBER } from '../config.js'
import Logo from './Logo.jsx'
import WhatsIcon from './WhatsIcon.jsx'
import './contact.css'

const NAV_IDS = ['inicio', 'sobre', 'sites', 'projetos', 'stack', 'servicos', 'processo', 'contato']

export default function Contact() {
  const { t } = useI18n()
  const ref = useReveal()

  const phonePretty = `(${WHATSAPP_NUMBER.slice(2, 4)}) ${WHATSAPP_NUMBER.slice(4, 9)}-${WHATSAPP_NUMBER.slice(9)}`

  return (
    <footer className="contact" id="contato" ref={ref}>
      <div className="container">
        <div className="contact-cta reveal">
          <div className="contact-cta-inner">
            <span className="hud-label">{t.contact.label}</span>
            <h2>{t.contact.title}</h2>
            <p>{t.contact.sub}</p>
            <a className="btn contact-btn" href={waLink(t.contact.wa)} target="_blank" rel="noreferrer">
              <WhatsIcon size={20} /> {t.contact.cta}
            </a>
          </div>
        </div>

        <div className="contact-links reveal">
          <a href={waLink(t.contact.wa)} target="_blank" rel="noreferrer">
            <WhatsIcon size={16} /> {phonePretty}
          </a>
          <a href={LINKS.instagram} target="_blank" rel="noreferrer">
            <Instagram size={16} /> @moreiradev._
          </a>
          <a href={LINKS.linkedin} target="_blank" rel="noreferrer">
            <Linkedin size={16} /> LinkedIn
          </a>
          <a href={LINKS.github} target="_blank" rel="noreferrer">
            <Github size={16} /> GitHub
          </a>
          <a href={`mailto:${LINKS.email}`}>
            <Mail size={16} /> {LINKS.email}
          </a>
        </div>

        <div className="footer-bottom">
          <div className="footer-brand">
            <Logo className="footer-logo" />
            <p>{t.contact.slogan}</p>
          </div>
          <nav className="footer-nav" aria-label="Rodapé">
            {NAV_IDS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId(id)
                }}
              >
                {t.nav[id]}
              </a>
            ))}
          </nav>
          <p className="footer-rights">{t.contact.rights}</p>
        </div>
      </div>
    </footer>
  )
}
