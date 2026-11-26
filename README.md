# Jogo do Algoritmo · I Mostra de Ergonomia da UFABC

Site do projeto do **Grupo 4** (ESGE006-23, Engenharia de Segurança do Trabalho: Ergonomia): gestão algorítmica e carga mental no trabalho por aplicativo.
Substitui a planilha do jogo e os slides por um site que roda **offline**, feito em Next.js (exportação estática).

## Páginas

| Rota            | Para quê                                                                                                                                                  |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`             | Página institucional, em seções                                                                                                                           |
| `/apresentacao` | **Apresentação** (no lugar dos slides): contexto, definições, método, fontes, métricas, resultados ao vivo. Setas, `F` tela cheia, `N` notas, `?` atalhos |
| `/jogo`         | **Painel do operador** (o "algoritmo"): escolhe o modo, inicia a rodada e acompanha                                                                       |
| `/tela`         | **Tela do visitante**: abra em outra janela e arraste para o monitor/TV (F11). No modo digital, é onde o visitante joga                                   |
| `/resultados`   | Histórico, médias, tempo de decisão e exportação em CSV                                                                                                   |
| `/baralho`      | 24 cartas-corrida (63 × 88 mm) e versos, prontas para imprimir em A4                                                                                      |
| `/banner`       | Banner 90 × 120 cm: prévia e download do PDF (gráfica) e do PNG                                                                                           |
| `/roteiro`      | Roteiro de apresentação com cronômetro, pitch e perguntas frequentes                                                                                      |

## Dois modos de jogo

- **Com cartas:** o operador sorteia (ou usa a carta física pelo número) e marca o que o visitante decidir. Atalhos: `N` próxima · `A` aceitar · `S` recusar por segurança · `R` recusar · `P` pausa.
- **Sem cartas (digital):** as corridas aparecem sozinhas na **tela do visitante**, uma atrás da outra, e ele decide ali (botões ou `A` / `S` / `R`; `P` pede a pausa simulada). O operador só inicia, acompanha e encerra. A tela do visitante precisa estar aberta no mesmo navegador: é ela que conduz o relógio.

Nos dois modos, no fim o visitante vê o que fez os pontos subirem, aplica os requisitos ergonômicos e, se quiser, responde a pressão percebida (1 a 5).

## Como rodar

Requer Node 22.12 ou mais novo (`.nvmrc`).

```bash
npm install
npm run dev          # desenvolvimento: http://localhost:3000
npm run build        # gera a pasta out/ (site estático)
npm start            # serve out/ localmente
```

Para o dia da Mostra: rode `npm run build` antes, com internet, e depois `npm start`. A partir daí **nada depende de internet**.
O site também pode ser publicado em qualquer hospedagem estática (Vercel, GitHub Pages). Em GitHub Pages use `NEXT_PUBLIC_BASE_PATH=/nome-do-repositorio npm run build`.

## Qualidade

```bash
npm run check        # tipos + lint + testes unitários + build
npm run test:e2e     # Playwright: jogo nos dois modos, apresentação, banner, baralho (npx playwright install chromium na 1ª vez)
npm run test:coverage
```

O CI (`.github/workflows/ci.yml`) roda `quality`, `build`, `e2e` e `banner` em todo PR; há ainda CodeQL, revisão de dependências e Dependabot. Veja `CONTRIBUTING.md` e `SECURITY.md`.

## Banner

```bash
npx playwright install chromium   # uma vez
npm run banner:build              # PDF vetorial 900 × 1200 mm + PNG de prévia em public/banner/
```

A fonte é `public/banner/banner.html`. O PDF sai em RGB e sem sangria: confirme formato e prova de cor com a gráfica.

## Regras do jogo (todas fictícias)

- Corrida complexa (9 s) aceita antes de 10 s: **+1** ponto (pressão de tempo)
- A cada 3 corridas seguidas sem pausa de 5 min: **+2** pontos (metas encadeadas)
- Recusa por segurança com queda de nota sem explicação: **+3** pontos (opacidade)
- Pausa de 5 min (simulada) zera a sequência.

> Os pontos e a nota são **recurso didático**, sem equivalência com medição de fadiga ou carga mental humana.
> A pergunta de "pressão percebida (1 a 5)" é opinião do visitante, não medida científica.

## Dados

Tudo fica no `localStorage` do navegador (chaves `jda:*`). Exporte o CSV em `/resultados` antes de trocar de computador.

## Edição rápida

- Cartas: `src/lib/deck.ts` · Regras e pesos: `src/lib/game.ts` · Métricas: `src/lib/metricas.ts`
- Roteiro: `src/lib/roteiro.ts` (depois `npm run roteiro:gerar` para atualizar `docs/ROTEIRO.md`)
- Apresentação: slides em `src/components/apresentacao/slides.tsx`; textos compartilhados (fontes, mecanismos, grupo) em `src/lib/conteudo.ts`
- Identidade visual: `src/app/globals.css` (papel `#EFE7D6`, tinta `#16130E`, laranja `#FF4A14`; fontes Archivo e IBM Plex Mono, ambas embutidas)
