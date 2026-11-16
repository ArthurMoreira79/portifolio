import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export function prefersReducedMotion() {
  // ?motion força as animações (útil para testes e demonstração)
  if (new URLSearchParams(window.location.search).has('motion')) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Revela com fade-up todos os `.reveal` dentro do elemento retornado.
 * Use data-delay (segundos) para escalonar manualmente.
 */
export function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const els = root.querySelectorAll('.reveal')

    if (prefersReducedMotion()) {
      els.forEach((el) => (el.style.opacity = 1))
      return
    }

    const ctx = gsap.context(() => {
      els.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            delay: parseFloat(el.dataset.delay || 0),
            scrollTrigger: { trigger: el, start: 'top 88%' },
          },
        )
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return ref
}

/** Rola suavemente até uma seção pelo id (usa o Lenis quando existir). */
export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -64, duration: 1.4 })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
