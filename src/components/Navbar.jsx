import { useEffect, useRef, useState } from 'react'
import { Github, Instagram, Linkedin, Menu, Moon, Sun, X } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext.jsx'
import { useTheme } from '../lib/ThemeContext.jsx'
import { scrollToId } from '../lib/animations.js'
import { LINKS, waLink } from '../config.js'
import Logo from './Logo.jsx'
import './navbar.css'

const IDS = ['inicio', 'sobre', 'sites', 'projetos', 'stack', 'servicos', 'processo', 'contato']

export default function Navbar() {
  const { t, lang, setLang } = useI18n()
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('inicio')
  const [open, setOpen] = useState(false)
  const listRef = useRef(null)
  const [pill, setPill] = useState({ left: 0, width: 0, visible: false })

  /* fundo de vidro depois do scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* scroll-spy */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )
    IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  /* pílula deslizante */
  useEffect(() => {
    const update = () => {
      const list = listRef.current
      if (!list) return
      const link = list.querySelector(`[data-id="${active}"]`)
      if (!link) return setPill((p) => ({ ...p, visible: false }))
      setPill({ left: link.offsetLeft, width: link.offsetWidth, visible: true })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [active, lang])

  useEffect(() => {
    document.body.classList.toggle('no-scroll', open)
    return () => document.body.classList.remove('no-scroll')
  }, [open])

  const go = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    scrollToId(id)
  }

  const socials = (
    <>
      <a href={LINKS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
        <Instagram size={18} />
      </a>
      <a href={LINKS.github} target="_blank" rel="noreferrer" aria-label="GitHub">
        <Github size={18} />
      </a>
      <a href={LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
        <Linkedin size={18} />
      </a>
    </>
  )

  const langSwitch = (
    <div className="nav-lang" role="group" aria-label="Idioma / Language">
      <button className={lang === 'pt' ? 'on' : ''} onClick={() => setLang('pt')}>
        PT
      </button>
      <span>|</span>
      <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>
        EN
      </button>
    </div>
  )

  const themeBtn = (
    <button className="nav-icon-btn" onClick={toggle} aria-label={t.nav.themeToggle}>
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#inicio" className="nav-logo" onClick={go('inicio')} aria-label="Arthur Moreira">
          <Logo />
        </a>

        <nav className="nav-links" aria-label="Menu">
          <ul ref={listRef}>
            <span
              className="nav-pill"
              style={{
                transform: `translateX(${pill.left}px)`,
                width: pill.width,
                opacity: pill.visible ? 1 : 0,
              }}
              aria-hidden="true"
            />
            {IDS.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  data-id={id}
                  className={active === id ? 'active' : ''}
                  onClick={go(id)}
                >
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-right">
          <div className="nav-socials">{socials}</div>
          {langSwitch}
          {themeBtn}
          <a className="btn btn-primary btn-sm nav-cta" href={waLink(t.contact.wa)} target="_blank" rel="noreferrer">
            {t.nav.cta}
          </a>
          <button
            className="nav-icon-btn nav-burger"
            onClick={() => setOpen(true)}
            aria-label={t.nav.openMenu}
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {open && (
        <div className="nav-mobile">
          <button className="nav-icon-btn nav-close" onClick={() => setOpen(false)} aria-label={t.nav.closeMenu}>
            <X size={26} />
          </button>
          <ul>
            {IDS.map((id, i) => (
              <li key={id} style={{ animationDelay: `${i * 50}ms` }}>
                <a href={`#${id}`} onClick={go(id)}>
                  <span className="nav-mobile-num">{String(i + 1).padStart(2, '0')}</span>
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav-mobile-footer">
            <div className="nav-socials">{socials}</div>
            {langSwitch}
            {themeBtn}
          </div>
        </div>
      )}
    </header>
  )
}
