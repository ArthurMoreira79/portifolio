// Links e contatos centralizados — edite aqui quando algo mudar.
export const WHATSAPP_NUMBER = '5598981952703'

export const LINKS = {
  github: 'https://github.com/ArthurMoreira79',
  linkedin: 'https://www.linkedin.com/in/arthur-moreira79/',
  instagram: 'https://www.instagram.com/moreiradev._',
  email: 'arthurmlucena@gmail.com',
}

export function waLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
