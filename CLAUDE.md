# CLAUDE.md

Projeto do **Grupo 4** para a **I Mostra de Ergonomia da UFABC** (01/12/2026), disciplina ESGE006-23 *Engenharia de Segurança do Trabalho: Ergonomia* (turma NA1ESGE006-23SB, noturno, Profa. Giselle Ramirez Canedo). Tema: **gestão algorítmica e carga mental no trabalho por aplicativo** (Eixo V: IA em Ergonomia e Fatores Humanos).

Este repositório é o site do **Jogo do Algoritmo**, que substitui a planilha do jogo da Mostra e traz a página institucional e o roteiro de apresentação.

## Idioma e estilo
- Tudo em **português do Brasil**: interface, textos, commits, comentários.
- Respostas curtas e objetivas. O usuário (Anderson) pediu concisão.
- Identidade visual feita à mão, sem cara de template de IA: papel `#EFE7D6`, tinta `#16130E`, laranja `#FF4A14`, sombras duras, bordas grossas, sem gradientes, emoji ou cantos arredondados. Fontes **Archivo** (variável, com largura) e **IBM Plex Mono**, ambas locais em `src/app/fonts/`.

## Regra de ouro (feedback da professora)
Os pontos de sobrecarga e a nota do app são **fictícios**, um recurso didático **sem equivalência com medição humana**. Nunca apresentar como medida de fadiga ou carga mental. A "pressão percebida 1–5" é opinião do visitante, não medida científica. Manter os avisos na tela, na tela do visitante e na página institucional.
O estudo é revisão integrativa + análise documental, **sem coleta primária**. O NASA-TLX é só referência de dimensões da carga na literatura. Não afirmar que PLP 152/2025 ou a diretiva europeia tratam "exclusivamente" de proteção contratual (a comparação documental ainda é do artigo).

## Stack e comandos
Next.js (App Router) + React + TypeScript, **exportação estática** (`output: "export"`), CSS puro em `src/app/globals.css`. Sem backend, sem banco, sem internet em runtime.

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # gera out/ (estático)
npm start         # serve out/
npm run lint      # tsc --noEmit
node scripts-gerar-roteiro.mjs   # regenera docs/ROTEIRO.md a partir de src/lib/roteiro.ts
```
`NEXT_PUBLIC_BASE_PATH=/repo npm run build` para GitHub Pages. Use sempre `next/link` (não `<a href="/...">`), por causa do basePath.

## Estrutura
- `src/app/page.tsx`: página institucional em seções (modo apresentação)
- `src/app/jogo`: painel do operador (atalhos N, A, S, R, P)
- `src/app/tela`: tela do visitante (sem navegação), sincroniza com `/jogo`
- `src/app/resultados`: histórico, médias, exportação CSV
- `src/app/baralho`: 24 cartas 63 × 88 mm + versos, impressão A4 (9 por folha)
- `src/app/roteiro`: roteiro com cronômetro, pitch e perguntas frequentes
- `src/lib/deck.ts`: baralho (dados fictícios) · `game.ts`: regras e estado · `store.ts`: persistência e sincronização · `roteiro.ts`: textos do roteiro
- `banner/`: fonte HTML do banner 90 × 120 cm (ver `banner/LEIA-ME.md`)
- `docs/ROTEIRO.md`: roteiro gerado

## Regras do jogo (`src/lib/game.ts`)
- Corrida complexa (limite 9 s) aceita em menos de 10 s: **+1** (`tempo`). Corridas simples têm 20 s e não pontuam.
- A cada 3 corridas aceitas seguidas sem pausa: **+2** (`encadeadas`).
- Recusa por segurança com queda de nota sem explicação: **+3** (`opacidade`); a nota cai 0,15.
- Pausa de 5 min (simulada) zera a sequência. Tempo esgotado e recusa por outro motivo não pontuam.
- Ao fim, "Aplicar" requisito ergonômico zera os pontos daquele mecanismo (`aplicados` no estado; `pontosEfetivos`).

## Como o estado funciona
Estado único em `localStorage` (`jda:estado`, `jda:sessoes`). `/jogo` escreve; `/tela` lê. Sincronização por `BroadcastChannel` + evento `storage`, na mesma máquina e navegador. Quem controla o relógio e a expiração é o `/jogo`.

## Armadilhas já encontradas
- O minificador de CSS do Next (lightningcss) **funde `font:` + `font-stretch`** em `font: 800 75% 20px/1 ...`, que é inválido e derruba a fonte. Use **propriedades separadas** (`font-weight`, `font-size`, `font-family`, `font-stretch`) quando houver `font-stretch`, e não use `clamp()` dentro do atalho `font:`.
- Fontes são importadas por `@font-face` com `url(./fonts/...)` em `globals.css` (empacotadas pelo Next). Não trocar por `next/font` (perde `font-stretch`).
- Impressão do baralho: `@page` e `.folha` em `globals.css`; imprimir em 100%, sem "ajustar à página".

## Pendências conhecidas
- Ficha de recursos da Mostra (docx) já enviada pelo grupo; falta e-mail institucional do representante e confirmar número do grupo, presença do Miguel Carlos Pereira e quantidades de recursos.
- Banner 90 × 120 cm (PDF) com a gráfica: confirmar formato, sangria e prova de cor (arquivo em RGB).
- Artigo final (template Revista Ação Ergonômica, 8–12 páginas) entrega em 03/12. Feedback pendente de resolver no texto: definir dimensões da matriz de extração; sequência mecanismo → exigência → evidência → melhoria por requisito; papel do NASA-TLX sem coleta primária; algoritmo como parte do sistema de trabalho (trânsito, veículo, ambiente, relações organizacionais); completar referências; comparar o conteúdo dos documentos regulatórios; conferir a data de entrega.
- Possíveis melhorias do site: QR code para o site na página do banner, modo escuro para a tela, testes automatizados (Playwright) do fluxo do jogo.
