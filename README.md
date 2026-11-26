# Jogo do Algoritmo · I Mostra de Ergonomia da UFABC

Site do projeto do **Grupo 4** (ESGE006-23, Engenharia de Segurança do Trabalho: Ergonomia): gestão algorítmica e carga mental no trabalho por aplicativo.
Substitui a planilha do jogo por um site que roda **offline**, feito em Next.js (exportação estática).

## Páginas

| Rota | Para quê |
|---|---|
| `/` | Página institucional, em seções, para apresentar o projeto |
| `/jogo` | **Painel do operador** (o “algoritmo”): sorteia corridas, registra decisões, aplica as regras |
| `/tela` | **Tela do visitante**: abra em outra janela e arraste para o monitor/TV (F11). Sincroniza sozinha com `/jogo` |
| `/resultados` | Histórico das rodadas, médias e exportação em CSV |
| `/baralho` | 24 cartas-corrida (63 × 88 mm) e versos, prontas para imprimir em A4 |
| `/roteiro` | Roteiro de apresentação com cronômetro, pitch e perguntas frequentes |

## Como rodar

```bash
npm install
npm run dev          # desenvolvimento: http://localhost:3000
npm run build        # gera a pasta out/ (site estático)
npm start            # serve out/ localmente
```

Para o dia da Mostra: rode `npm run build` antes, com internet, e depois `npm start`. A partir daí **nada depende de internet**.
O site também pode ser publicado em qualquer hospedagem estática (Vercel, GitHub Pages). Em GitHub Pages use `NEXT_PUBLIC_BASE_PATH=/nome-do-repositorio npm run build`.

## Regras do jogo (todas fictícias)

- Corrida complexa (9 s) aceita antes de 10 s: **+1** ponto (pressão de tempo)
- A cada 3 corridas seguidas sem pausa de 5 min: **+2** pontos (metas encadeadas)
- Recusa por segurança com queda de nota sem explicação: **+3** pontos (opacidade)
- Pausa de 5 min (simulada) zera a sequência.

Atalhos no painel do operador: `N` próxima · `A` aceitar · `S` recusar por segurança · `R` recusar · `P` pausa.

> Os pontos e a nota são **recurso didático**, sem equivalência com medição de fadiga ou carga mental humana.
> A pergunta de “pressão percebida (1 a 5)” é opinião do visitante, não medida científica.

## Dados

Tudo fica no `localStorage` do navegador (chaves `jda:*`). Exporte o CSV em `/resultados` antes de trocar de computador.

## Edição rápida

- Cartas: `src/lib/deck.ts` · Regras e pesos: `src/lib/game.ts` · Roteiro: `src/lib/roteiro.ts` (depois `node scripts-gerar-roteiro.mjs` para atualizar `docs/ROTEIRO.md`)
- Identidade visual: `src/app/globals.css` (papel `#EFE7D6`, tinta `#16130E`, laranja `#FF4A14`; fontes Archivo e IBM Plex Mono, ambas embutidas)
