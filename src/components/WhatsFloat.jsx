import { useEffect, useState } from 'react'
import { useI18n } from '../i18n/I18nContext.jsx'
import { waLink } from '../config.js'
import WhatsIcon from './WhatsIcon.jsx'

export default function WhatsFloat() {
  const { t } = useI18n()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      className={`whats-float ${visible ? 'visible' : ''}`}
      href={waLink(t.contact.wa)}
      target="_blank"
      rel="noreferrer"
      aria-label={t.contact.floatLabel}
    >
      <WhatsIcon size={26} />
    </a>
  )
}
