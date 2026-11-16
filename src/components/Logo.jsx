/**
 * Logo definitiva "AM" — vetorizada a partir de imagens/logo AM.jpg.
 * Paths preenchidos; `strokeWidth` > 0 adiciona contorno (usado na animação do loading).
 */
export default function Logo({ className = '', strokeWidth = 0 }) {
  return (
    <svg
      viewBox="0 0 546 281"
      className={className}
      aria-hidden="true"
      fill="currentColor"
      stroke={strokeWidth ? 'currentColor' : 'none'}
      strokeWidth={strokeWidth}
      strokeLinejoin="miter"
    >
      {/* A — perna esquerda */}
      <path className="logo-path" d="M133 0 L204 0 L67 280 L0 280 Z" />
      {/* A — perna direita */}
      <path className="logo-path" d="M136 0 L197 0 L333 280 L264 280 Z" />
      {/* A — travessão */}
      <path className="logo-path" d="M115 152 L185 152 L212 210 L88 210 Z" />
      {/* M — "V" central */}
      <path className="logo-path" d="M219 0 L307 0 L386 140 L470 0 L537 0 L410 210 L368 210 Z" />
      {/* M — perna direita */}
      <path className="logo-path" d="M482 0 L545 0 L545 280 L482 280 Z" />
    </svg>
  )
}
