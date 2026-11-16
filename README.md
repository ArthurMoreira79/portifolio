# Portfólio · Arthur Moreira

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?logo=greensock&logoColor=black)
![Lenis](https://img.shields.io/badge/Lenis-smooth_scroll-111111)
![Vercel](https://img.shields.io/badge/deploy-Vercel-000000?logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue)

Meu site-portfólio: **futurista e cinematográfico**, em português e inglês, com tema escuro e claro. Ele tem dois objetivos:

1. **Atrair clientes** que querem um site para o próprio negócio. É a prioridade, por isso os sites que fiz ganham destaque.
2. **Mostrar a recrutadores** um desenvolvedor full stack em formação, com projetos reais em Java/Spring Boot e React.

Toda seção leva a uma de duas ações: **pedir orçamento pelo WhatsApp** ou **ver o projeto no ar e no GitHub**.

---

## Destaques

- **Abertura cinematográfica:** tela de título com contador de carregamento e efeito glitch. Ela aparece uma vez por sessão e pode ser revista abrindo o site com `?intro` no endereço.
- **Rolagem suave e animações por scroll:** Lenis integrado ao GSAP ScrollTrigger, sincronizados no mesmo ciclo de animação.
- **Português e inglês:** todos os textos ficam em `src/i18n/pt.json` e `en.json`, e a escolha do idioma fica salva no navegador.
- **Tema escuro e claro**, também salvo no navegador.
- **Identidade visual tirada da foto de perfil:** a paleta vem do degradê de azul-aço a verde-acinzentado do fundo da foto, com um acento ciano (`--glow`) para o toque futurista. O visual usa painéis de vidro, linhas de grade e rótulos no estilo HUD.
- **Respeita `prefers-reduced-motion`:** com a redução de movimento ativada no sistema, a abertura é pulada e a rolagem suave é desligada.

---

## Seções

| # | Seção | O que mostra |
|---|---|---|
| — | Abertura | Tela de título "PORTFÓLIO" com contador de carregamento |
| — | Hero | Apresentação e chamadas para orçamento e projetos |
| 01 | Trajetória | Minha caminhada na faculdade e na programação |
| 02 | Sites | Sites publicados: TripVerse, Barbearia do Porto e FitZone |
| 03 | Projetos | Projetos de desenvolvimento: sistema FitZone, Conecta Líderes e Imobiliária API |
| 04 | Stack | Tecnologias que uso, com ícones |
| 05 | Serviços | O que posso construir para um cliente |
| 06 | Diferenciais | Por que os sites são feitos para vender |
| 07 | Processo | Do primeiro contato ao site no ar |
| 08 | Contato | WhatsApp, e-mail, GitHub, LinkedIn e Instagram |

Um botão flutuante de WhatsApp fica disponível em todas as seções.

---

## Tecnologias

| Camada | Tecnologias |
|---|---|
| Interface | React 18 · JavaScript |
| Build | Vite 5 |
| Animação | GSAP 3 com ScrollTrigger · Lenis (rolagem suave) |
| Ícones | lucide-react · Simple Icons (logos da stack) |
| Estilo | CSS puro, um arquivo por componente, com variáveis de tema |
| Tipografia | Anton, Space Grotesk, Inter e JetBrains Mono (Google Fonts) |
| Deploy | Vercel |

---

## Estrutura

```
src/
├── components/   # Intro, Navbar, Hero, Journey, Sites, Projects, Stack,
│                 # Services, Sell, Process, Contact, WhatsFloat (cada um com seu .css)
├── i18n/         # I18nContext e textos em pt.json e en.json
├── lib/          # ThemeContext (tema escuro/claro) e animations (GSAP)
├── styles/       # global.css: paleta, tipografia e temas
├── config.js     # links e contatos centralizados (WhatsApp, GitHub, LinkedIn...)
└── data.js       # sites, projetos e stack exibidos no portfólio

PORTFOLIO-SPEC.md # especificação completa do site: objetivos, identidade visual e seções
```

Para atualizar o conteúdo, não é preciso mexer nos componentes: os projetos ficam em `data.js`, os textos em `i18n/` e os contatos em `config.js`.

---

## Como rodar localmente

**Pré-requisito:** Node.js 18 ou mais novo.

```bash
npm install
npm run dev
```

O site abre em `http://localhost:5173`. Para gerar a versão de produção, use `npm run build`.

---

## Contato

[GitHub](https://github.com/ArthurMoreira79) · [LinkedIn](https://www.linkedin.com/in/arthur-moreira79/) · [Instagram](https://www.instagram.com/moreiradev._)

Distribuído sob a licença [MIT](LICENSE).
