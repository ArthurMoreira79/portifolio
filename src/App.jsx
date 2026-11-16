import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { I18nProvider } from './i18n/I18nContext.jsx'
import { ThemeProvider } from './lib/ThemeContext.jsx'
import { gsap, ScrollTrigger, prefersReducedMotion } from './lib/animations.js'
import Intro from './components/Intro.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Journey from './components/Journey.jsx'
import Sites from './components/Sites.jsx'
import Projects from './components/Projects.jsx'
import Stack from './components/Stack.jsx'
import Services from './components/Services.jsx'
import Sell from './components/Sell.jsx'
import Process from './components/Process.jsx'
import Contact from './components/Contact.jsx'
import WhatsFloat from './components/WhatsFloat.jsx'

function shouldSkipIntro() {
  try {
    // ?intro força a abertura (útil para rever a animação)
    if (new URLSearchParams(window.location.search).has('intro')) return false
    if (window.location.hash) return true
    if (sessionStorage.getItem('introSeen')) return true
  } catch {}
  return false
}

export default function App() {
  const [introDone, setIntroDone] = useState(() => shouldSkipIntro() || prefersReducedMotion())

  /* Lenis + ScrollTrigger */
  useEffect(() => {
    if (prefersReducedMotion()) return
    const lenis = new Lenis({ lerp: 0.1 })
    window.__lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      window.__lenis = null
    }
  }, [])

  /* trava o scroll durante a abertura */
  useEffect(() => {
    document.body.classList.toggle('no-scroll', !introDone)
    if (!introDone) window.__lenis?.stop()
    else window.__lenis?.start()
  }, [introDone])

  const finishIntro = () => {
    try {
      sessionStorage.setItem('introSeen', '1')
    } catch {}
    setIntroDone(true)
  }

  return (
    <ThemeProvider>
      <I18nProvider>
        <div className="bg-grid" aria-hidden="true" />
        <div className="bg-noise" aria-hidden="true" />
        {!introDone && <Intro onDone={finishIntro} />}
        <Navbar />
        <main>
          <Hero active={introDone} />
          <Journey />
          <Sites />
          <Projects />
          <Stack />
          <Services />
          <Sell />
          <Process />
        </main>
        <Contact />
        <WhatsFloat />
      </I18nProvider>
    </ThemeProvider>
  )
}
