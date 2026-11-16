# Portfólio Arthur Moreira — Especificação do site

> Documento-base para construir o portfólio. Serve como briefing para um desenvolvedor ou como prompt para uma IA de código.
> Versão 2 · 16/11/2026

---

## 1. Objetivo

Um site-portfólio **futurista e cinematográfico** que cumpre duas funções ao mesmo tempo:

1. **Atrair clientes** que querem um site para o próprio negócio. Essa é a prioridade e o motivo de os sites ganharem destaque.
2. **Mostrar a recrutadores** um dev full stack em formação, com projetos reais em Java/Spring Boot e React.

Toda seção deve levar a uma destas duas ações: **pedir orçamento no WhatsApp** ou **ver o projeto/GitHub**.

---

## 2. Identidade visual

### 2.1 Paleta (tirada da foto de perfil)

O fundo da foto é um degradê de azul-aço escuro, no topo, até um verde-acinzentado claro e enevoado, embaixo. A roupa é preta e o óculos é branco. O site usa essa mesma paleta.

| Token | Hex | Origem na foto | Uso |
|---|---|---|---|
| `--ink` | `#05070A` | Camisa preta | Fundo do tema escuro |
| `--steel-900` | `#203747` | Canto superior direito | Superfícies e cards (escuro) |
| `--steel-700` | `#3D5869` | Canto superior esquerdo | Bordas, hover, degradês |
| `--mist-500` | `#74919A` | Meio do fundo | Texto secundário e ícones |
| `--mist-300` | `#96B0B2` | Base do fundo | Degradês e fundo do tema claro |
| `--frame` | `#EEF2F3` | Armação branca do óculos | Texto principal (escuro) e fundo (claro) |
| `--glow` | `#8FE3F0` | Proposta: o azul da foto saturado | Acento futurista: brilhos, linhas, foco |

- **Degradê-assinatura:** `linear-gradient(160deg, #203747 0%, #3D5869 45%, #74919A 80%, #96B0B2 100%)`. É o mesmo da foto e aparece no hero e no CTA final.
- **Tema escuro (padrão):** fundo `--ink`, superfícies `--steel-900` com vidro (blur + 6–10% de opacidade), texto `--frame`, acento `--glow`.
- **Tema claro:** fundo `--frame`, superfícies brancas com borda `--mist-300`, texto `--ink`, acento `--steel-700`. O `--glow` só aparece como detalhe.
- O `--glow` é uma proposta e pode ser ajustado quando a logo ficar pronta.

### 2.2 Estilo "futurista"

- Painéis de vidro (glassmorphism discreto), linhas finas de grade ao fundo e rótulos em estilo HUD (fonte mono, caixa alta, numeração tipo `01 /`).
- Brilho sutil (`--glow`) em bordas no hover, nunca em excesso.
- Ruído/grão leve por cima do degradê, para dar a mesma textura de estúdio da foto.
- Cantos médios (12–16px) e muito respiro.

### 2.3 Tipografia

| Uso | Fonte | Observação |
|---|---|---|
| Títulos de impacto (tela de título, nomes de seção) | **Anton** ou **Bebas Neue** | Condensada e pesada, como "PORTFOLIO" na referência |
| Títulos | **Space Grotesk** (600–700) | Geométrica e com cara de tecnologia |
| Texto | **Inter** (400–500) | Leitura confortável |
| Rótulos HUD, números, código | **JetBrains Mono** | Contador do loading, tags de stack |

### 2.4 Logo

- **Pendente:** Arthur está criando uma logo com o nome dele.
- Até lá, usar o monograma provisório **"AM"** em Space Grotesk com contorno `--glow`.
- A logo aparece no loading, no topo do menu e no rodapé.

---

## 3. Estrutura da página (ordem final)

| # | Seção | Âncora no menu | Função |
|---|---|---|---|
| 0 | Abertura: carregamento + tela de título | — | Primeira impressão cinematográfica |
| 1 | Barra superior + menu | — | Navegação, redes, idioma e tema |
| 2 | Hero + Sobre mim | Início | Entrada cinematográfica: quem sou eu |
| 3 | Trajetória e eventos | Sobre | IFMA, objetivos, Hackathon EQT Lab |
| 4 | Sites que saíram do zero | Sites | **Destaque principal**: sites rodando |
| 5 | Sistemas e projetos | Projetos | FitZone, Conecta Líderes, Imobiliária API |
| 6 | Stack | Stack | Tecnologias divididas por função |
| 7 | O que eu posso construir pra você | Serviços | Ofertas com orçamento pelo WhatsApp |
| 8 | Não é só bonito. É feito pra vender. | Diferenciais | Por que me contratar |
| 9 | Do primeiro oi ao site no ar | Processo | Passo a passo |
| 10 | Contato + rodapé | Contato | CTA final |

---

## 4. Seções em detalhe

### 0. Abertura animada: carregamento + tela de título (estilo menu de jogo)

Referência: portfólio "Portfolio 2025" enviado pelo Arthur, com tela de título de videogame, foto dentro da letra da logo e menu START / OPTIONS / EXIT. A abertura tem duas etapas.

**Etapa A — Carregamento**
- Fundo `--ink`, com um brilho radial azul (`--steel-700` → transparente) acendendo devagar no centro.
- A logo no centro, com o contorno sendo "desenhado" (SVG stroke animation) e depois preenchido.
- **Porcentagem subindo de 0% a 100%** em JetBrains Mono, logo abaixo da logo, com uma linha fina de progresso em `--glow`. Leve efeito de "glitch"/flicker no número a cada 25%.
- A porcentagem acompanha o carregamento real das mídias principais (foto, primeiro vídeo e fontes), com duração mínima de 1,2 s e máxima de 3 s.

**Etapa B — Tela de título**
- Ao chegar em 100%, a logo encolhe e vai para o canto superior esquerdo, e a tela de título se monta:
  - **Esquerda:** a foto do Arthur recortada **dentro da forma da logo** (ou de uma letra grande, como o "D" da referência), sobre um bloco de cor do degradê-assinatura. Ela entra deslizando da esquerda.
  - **Centro/direita:** o título **"PORTFÓLIO"** em fonte display condensada e pesada, com o ano **"2026"** ao lado em versão mais fina. As letras sobem uma a uma.
  - **Abaixo:** o rótulo `■ DESENVOLVEDOR FULL STACK`, que pisca uma vez como um cursor.
  - **Menu centralizado** (estilo jogo), cada item com seta/marcador `▸` no hover e no foco do teclado:
    - **INICIAR**: abre o site, e a tela de título "se desfaz" com zoom + fade direto na entrada do hero.
    - **OPÇÕES**: um painel pequeno com idioma (PT/EN) e tema (claro/escuro), o mesmo controle da barra superior.
    - **CONTATO**: no lugar do "EXIT", vai direto para a seção de contato.
  - Navegação pelo teclado (setas + Enter), como num menu de jogo.
  - Botão discreto **"Pular"** no canto. O Enter também entra direto.
- Partículas ou poeira de luz bem sutis flutuando no brilho azul do fundo (canvas leve, desligado no celular fraco).

**Regras**
- A abertura completa aparece só na primeira visita da sessão (`sessionStorage`). Nas próximas, o site abre direto no hero.
- Com `prefers-reduced-motion`: sem stroke, glitch nem partículas. Mostrar só a tela de título estática, ou entrar direto no site.
- O conteúdo do site já carrega por trás (SEO e links diretos para seções, como `/#sites`, pulam a abertura).

### 1. Barra superior + menu

- **Fixo no topo**, transparente sobre o hero e com fundo de vidro depois que a página rola.
- **Esquerda:** logo.
- **Centro:** Início · Sobre · Sites · Projetos · Stack · Serviços · Processo · Contato. O link da seção visível fica destacado com uma **pílula** de fundo claro (como na referência), que desliza entre os itens.
- **Direita:**
  - Ícones de **Instagram**, **GitHub** e **LinkedIn**
  - Seletor de idioma **PT | EN**
  - Botão de tema **claro/escuro** (ícone sol/lua)
  - Botão **"Pedir orçamento"** (WhatsApp) em destaque
- **Celular:** menu hambúrguer em tela cheia, com os links em lista grande e redes, idioma e tema no rodapé desse menu.

### 2. Hero + Sobre mim (entrada cinematográfica)

**Layout:** texto à esquerda e foto à direita (no celular, a foto vem em cima). A foto se funde ao degradê-assinatura, porque o fundo da foto já é o próprio degradê. Atrás da foto fica um **brilho radial azul** (como o halo atrás da pessoa na tela "About me" da referência). Ele pulsa bem devagar.

**Conteúdo (PT):**
- Rótulo HUD: `// DESENVOLVEDOR FULL STACK · SÃO LUÍS – MA`
- Título: **Arthur Moreira**
- Subtítulo: *Crio sites e sistemas do zero, do banco de dados à interface que o seu cliente vê.*
- Parágrafo curto: estudante de Sistemas de Informação no IFMA, apaixonado por criação de sites, com foco em full stack (Java + Spring Boot no back-end, React no front-end).
- CTAs: **"Pedir orçamento"** (WhatsApp) e **"Ver meus sites"** (âncora para a seção 4).

**Animação de entrada (em sequência, cerca de 2 s no total):**
1. O degradê "acende" de cima para baixo, como uma luz de estúdio.
2. A foto aparece com *clip-path* (revelação vertical), com leve zoom de 1.08 para 1.
3. O nome entra letra por letra (split text), com leve desfoque saindo.
4. O subtítulo, os CTAs e o rótulo HUD sobem com fade, em escalonamento.
5. Uma linha `--glow` percorre a borda da foto uma única vez.

**No scroll:** a foto tem parallax leve e o texto desliza um pouco mais rápido que ela, criando profundidade.

### 3. Trajetória e eventos

- **Linha do tempo vertical**, com pontos que acendem conforme o scroll:
  - **Abr/2025:** início em Sistemas de Informação no IFMA – Campus Monte Castelo
  - **2025–2026:** de C e Java no console até APIs com Spring Boot e front-ends em React
  - **Hackathon Equatorial (EQT Lab):** desenvolvimento do Conecta Líderes em equipe
  - **Nov/2026:** primeiro site vendido para um cliente real
  - **Hoje:** 4º período, buscando o primeiro estágio e novos projetos de sites
- **Objetivos:** um bloco curto, "Para onde estou indo": estágio em desenvolvimento full stack e sites para negócios.
- **Card de evento:** foto do Hackathon EQT Lab (`assets/hackathon-eqtlab.webp`), título, uma linha sobre o desafio "Futuro Líderes" e um link para o Conecta Líderes. A foto se revela com *mask reveal* no scroll.
- Estrutura pronta para receber novos eventos, um card por evento.

### 4. Sites que saíram do zero (destaque principal)

**Título:** "Sites que saíram do zero"
**Subtítulo:** sites criados do zero para negócios. Clique e veja funcionando.

**Cada card:**
- Vídeo do site em uso, em loop, sem som, tocando só quando o card está visível. Usar os vídeos showcase já prontos ou novas gravações do Arthur.
- Nome, nicho e uma frase de destaque.
- Botões: **"Ver rodando"** (abre o vídeo em tela cheia, num modal) e **"Acessar site"** (abre o link em nova aba).
- **Hover:** o card se inclina levemente em 3D (tilt) e a borda brilha.

**Sites iniciais:**

| Site | Nicho | Destaque | Link |
|---|---|---|---|
| TripVerse | Agência de viagens | Hero em vídeo e galeria com prévias | site-tripverse.vercel.app |
| Barbearia do Porto | Barbearia e bar | Agendamento em 7 passos com WhatsApp | barbearia-do-porto.vercel.app |
| Site FitZone | Academia | Planos, aulas e reserva de espaços | *(link da Vercel pendente)* |

**Layout:** o primeiro site ocupa uma linha inteira (card grande) e os demais aparecem em grade de 2 colunas. Quando houver muitos, entram filtros: Todos · Landing page · Agendamento · Institucional.

### 5. Sistemas e projetos

**Título:** "Projetos de desenvolvimento". Esta é a seção mais voltada a recrutadores.

| Projeto | O que mostrar | Links |
|---|---|---|
| **FitZone** | Gestão de academia; evolução em 6 versões (de POO no console até API Spring Boot + React); 29 testes, CI | GitHub |
| **Conecta Líderes** | Hackathon EQT Lab, em equipe; Next.js, TypeScript, PostgreSQL, IA | Site no ar + GitHub |
| **Imobiliária API** | API REST com Spring Security · selo **"em desenvolvimento"** | GitHub |

- **Card:** imagem/print, tags de tecnologia em mono e botões **"Ver no GitHub"** e **"Ver no ar"** (quando houver).
- **FitZone em destaque:** uma mini linha do tempo horizontal com as versões `v1-poo → v2-jpa → v3-console → v4-spring-api → v5-web → v6-portfolio`.
- **Botão final:** "Ver todos os projetos no GitHub".

### 6. Stack

**Título:** "Minha stack". Quatro colunas ou abas, por função:

| Função | Tecnologias |
|---|---|
| **Front-end** | HTML, CSS, JavaScript, TypeScript, React, Vite, Next.js, Bootstrap |
| **Back-end** | Java, Spring Boot, Spring Security, JPA/Hibernate, Maven, C |
| **Banco de dados** | MySQL, PostgreSQL, Flyway |
| **Ferramentas** | Git, GitHub, GitHub Actions, Postman, Vercel, Figma, VS Code |

- Ícone + nome de cada tecnologia, em chips de vidro.
- **Entrada:** os chips surgem em cascata conforme o scroll.
- **Hover:** o chip brilha.

### 7. O que eu posso construir pra você

**Título:** "O que eu posso construir pra você"

Quatro cards numerados (`01` a `04`), cada um com título, descrição curta, três tópicos e o botão **"Quero orçamento"**. O botão abre o WhatsApp com a mensagem já preenchida, por exemplo: *"Olá, Arthur! Vi seu portfólio e quero um orçamento de uma landing page."*

1. **Landing page:** uma página focada em vender um produto ou serviço.
2. **Site institucional:** a presença completa do negócio na internet.
3. **Site com agendamento ou pedidos:** reservas, horários ou pedidos que chegam direto no WhatsApp.
4. **Sistemas web:** painéis e sistemas sob medida (Java + Spring Boot + React).

**Serviços extras**, numa linha discreta abaixo dos cards: manutenção mensal, fotos de produto tratadas com IA e gestão de Instagram.

### 8. Não é só bonito. É feito pra vender.

Duas colunas de blocos curtos (título em negrito + uma frase):
- **Qualidade:** Design exclusivo · Feito para celular primeiro · Carregamento rápido · Pedido direto no WhatsApp
- **Como eu trabalho:** Feito do zero, sem template pronto · Código de verdade (o mesmo de um sistema profissional) · Suporte depois de entregar · Comunicação direta comigo

### 9. Do primeiro oi ao site no ar

Passo a passo numerado, com uma linha `--glow` que liga as etapas e vai se "desenhando" conforme o scroll:

1. **Conversa:** entendo o seu negócio e o que o site precisa fazer.
2. **Proposta:** valor fechado e escopo combinado.
3. **Design e desenvolvimento:** o site sendo construído, com prévias para você acompanhar.
4. **Ajustes:** revisamos juntos até ficar do seu jeito.
5. **Site no ar:** publicação com o seu domínio.
6. **Manutenção (opcional):** atualizações mensais para o site continuar em dia.

### 10. Contato + rodapé

- **CTA final** sobre o degradê-assinatura: "Vamos tirar o seu site do zero?" e um botão grande **"Chamar no WhatsApp"**.
- **Contatos:** WhatsApp (98) 98195-2703 · Instagram @moreiradev._ · LinkedIn · GitHub · e-mail arthurmlucena@gmail.com.
- **Rodapé:** logo, slogan, links do menu e "© 2026 Arthur Moreira".
- **Botão flutuante:** WhatsApp, fixo no canto inferior direito. Aparece depois que o visitante passa do hero.

---

## 5. Idiomas (PT / EN)

- Todos os textos ficam em `src/i18n/pt.json` e `src/i18n/en.json`. Nada de texto fixo no código.
- PT é o padrão. A escolha do visitante fica salva em `localStorage`.
- Detectar o idioma do navegador na primeira visita (`en` → inglês).
- A mensagem pronta do WhatsApp também muda conforme o idioma.

## 6. Temas (claro / escuro)

- Escuro é o padrão. Na primeira visita, respeitar `prefers-color-scheme`.
- Implementar com `data-theme` no `<html>` e as cores como variáveis CSS (seção 2.1).
- A troca de tema tem transição suave de 300 ms.
- A escolha fica salva em `localStorage`.

---

## 7. Técnica

| Item | Escolha |
|---|---|
| Base | React + Vite (mesma stack dos outros sites) |
| Animações | GSAP + ScrollTrigger (entradas, linha do tempo, reveals) |
| Scroll suave | Lenis |
| Estilo | CSS puro com variáveis (ou CSS Modules), sem biblioteca de UI |
| Ícones | Simple Icons (tecnologias) + Lucide (interface) |
| Deploy | Vercel, com domínio próprio (sugestões: `arthurmoreira.dev` ou `arthurmoreira.com.br`) |

**Desempenho e acessibilidade (obrigatórios):**
- Respeitar `prefers-reduced-motion`. Nesse modo: sem loading animado, sem parallax e com entradas só em fade.
- Vídeos em WebM/MP4 leves, com `preload="none"`, poster em imagem e reprodução apenas quando visíveis.
- Imagens em WebP com `loading="lazy"`, exceto a foto do hero.
- Meta Lighthouse: 90 ou mais em Performance no celular.
- Contraste AA nos dois temas, foco visível no teclado e `alt` em todas as imagens.
- SEO: title, description, Open Graph com imagem de compartilhamento (foto + logo no degradê) e `lang` correto por idioma.

---

## 8. Arquivos já disponíveis (`assets/`)

| Arquivo | Uso |
|---|---|
| `perfil.jpg` / `perfil.webp` | Foto do hero (867×1024) |
| `hackathon-eqtlab.webp` | Card do evento na trajetória (otimizada, 1600 px) |

---

## 9. Pendências

- [ ] Logo do Arthur (SVG, versões clara e escura)
- [ ] Link na Vercel do site da FitZone
- [ ] Vídeos dos sites para a seção 4 (reaproveitar os showcases ou gravar novos)
- [ ] Prints ou vídeos dos sistemas (FitZone, Conecta Líderes)
- [ ] Decidir se a Wordburguer (cliente real) entra na seção de sites
- [ ] Domínio do portfólio
- [ ] Revisar os textos em inglês
