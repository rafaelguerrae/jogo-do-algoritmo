# jogo-do-algoritmo

Site do projeto do **Grupo 4** (ESGE006-23, Engenharia de Segurança do Trabalho: Ergonomia): gestão algorítmica e carga mental no trabalho por aplicativo.

## Dois modos de jogo

- **Com cartas:** o operador sorteia (ou usa a carta física pelo número) e marca o que o visitante decidir. Atalhos: `N` próxima · `A` aceitar · `S` recusar por segurança · `R` recusar · `P` pausa.
- **Sem cartas (digital):** as corridas aparecem sozinhas na **tela do visitante**, uma atrás da outra, e ele decide ali (botões ou `A` / `S` / `R`; `P` pede a pausa simulada). O operador só inicia, acompanha e encerra. A tela do visitante precisa estar aberta no mesmo navegador: é ela que conduz o relógio.

Nos dois modos, no fim o visitante vê o que fez os pontos subirem, aplica os requisitos ergonômicos e, se quiser, responde a pressão percebida (1 a 5).

## Setup

Requer Node >= 22.12(`.nvmrc`).

```bash
pnpm install
pnpm dev   # desenvolvimento: http://localhost:3000
pnpm build # gera a pasta out/ (site estático)
pnpm start # serve out/ localmente
```

## Tests

```bash
pnpm check    # tipos + lint + testes unitários + build
pnpm test:e2e # Playwright: jogo nos dois modos, apresentação, banner, baralho (pnpm exec playwright install chromium na 1ª vez)
pnpm test:coverage
```

## Regras do jogo (todas fictícias)

- Corrida complexa (9 s) aceita antes de 10 s: **+1** ponto (pressão de tempo)
- A cada 3 corridas seguidas sem pausa de 5 min: **+2** pontos (metas encadeadas)
- Recusa por segurança com queda de nota sem explicação: **+3** pontos (opacidade)
- Pausa de 5 min (simulada) zera a sequência.

> Os pontos e a nota são **recurso didático**, sem equivalência com medição de fadiga ou carga mental humana.
> A pergunta de "pressão percebida (1 a 5)" é opinião do visitante, não medida científica.
