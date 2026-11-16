import { LINKS } from './config.js'
import imgTripverse from './assets/site-tripverse.webp'
import imgBarbearia from './assets/site-barbearia.jpg'
import imgFitzoneSite from './assets/site-fitzone.webp'
import imgFitzonePainel from './assets/proj-fitzone.png'
import imgConecta from './assets/proj-conecta.png'

// ===== Seção 4 — Sites =====
// video: caminho do vídeo showcase (webm/mp4). Enquanto não houver, o card usa a imagem.
export const SITES = [
  {
    key: 'tripverse',
    url: 'https://site-tripverse.vercel.app',
    github: `${LINKS.github}/TripVerse`,
    video: null,
    poster: null,
    image: imgTripverse,
    featured: true,
  },
  {
    key: 'barbearia',
    url: 'https://barbearia-do-porto.vercel.app',
    github: `${LINKS.github}/barbearia-do-porto`,
    video: null,
    poster: null,
    image: imgBarbearia,
  },
  {
    key: 'fitzone',
    url: 'https://fitzone-site.vercel.app',
    github: `${LINKS.github}/site-fitzone`,
    video: null,
    poster: null,
    image: imgFitzoneSite,
  },
]

// ===== Seção 5 — Projetos =====
export const PROJECTS = [
  {
    key: 'fitzone',
    featured: true,
    tags: ['Java 21', 'Spring Boot', 'React', 'MySQL', 'Flyway', 'JUnit', 'CI'],
    github: `${LINKS.github}/FitZone`,
    live: null,
    image: imgFitzonePainel,
    versions: ['v1-poo', 'v2-jpa', 'v3-console', 'v4-spring-api', 'v5-web', 'v6-portfolio'],
  },
  {
    key: 'conecta',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Drizzle', 'IA (Gemini)'],
    github: `${LINKS.github}/EqtLab-ConectaLideres`,
    live: 'https://conecta-lideres-eqtlab.vercel.app',
    image: imgConecta,
  },
  {
    key: 'imobiliaria',
    wip: true,
    tags: ['Java', 'Spring Boot', 'Spring Security', 'JPA', 'MySQL'],
    github: `${LINKS.github}/Imobiliaria-API`,
    live: null,
    image: null,
  },
]

// ===== Seção 6 — Stack =====
// slug = ícone em cdn.simpleicons.org
export const STACK = {
  front: [
    { name: 'HTML', slug: 'html5' },
    { name: 'CSS', slug: 'css' },
    { name: 'JavaScript', slug: 'javascript' },
    { name: 'TypeScript', slug: 'typescript' },
    { name: 'React', slug: 'react' },
    { name: 'Vite', slug: 'vite' },
    { name: 'Next.js', slug: 'nextdotjs' },
    { name: 'Bootstrap', slug: 'bootstrap' },
  ],
  back: [
    { name: 'Java', slug: 'openjdk' },
    { name: 'Spring Boot', slug: 'springboot' },
    { name: 'Spring Security', slug: 'springsecurity' },
    { name: 'JPA / Hibernate', slug: 'hibernate' },
    { name: 'Maven', slug: 'apachemaven' },
    { name: 'C', slug: 'c' },
  ],
  db: [
    { name: 'MySQL', slug: 'mysql' },
    { name: 'PostgreSQL', slug: 'postgresql' },
    { name: 'Flyway', slug: 'flyway' },
  ],
  tools: [
    { name: 'Git', slug: 'git' },
    { name: 'GitHub', slug: 'github' },
    { name: 'GitHub Actions', slug: 'githubactions' },
    { name: 'Postman', slug: 'postman' },
    { name: 'Vercel', slug: 'vercel' },
    { name: 'Figma', slug: 'figma' },
    { name: 'VS Code', slug: 'visualstudiocode' },
  ],
}
