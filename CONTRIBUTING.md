# Como contribuir

Projeto do Grupo 4 (ESGE006-23, UFABC) para a I Mostra de Ergonomia. Tudo em **português do Brasil**: interface, commits, comentários e documentação.

## Preparar o ambiente

Node 22.12 ou mais novo (ver `.nvmrc`).

```bash
pnpm install --frozen-lockfile
pnpm dev # http://localhost:3000
```

## Antes de abrir um PR

```bash
pnpm check    # tipos, lint, testes unitários e build
pnpm test:e2e # jogo, tela do visitante, apresentação, banner (constrói e serve out/)
```
Na primeira vez dos testes e2e: `pnpm exec playwright install chromium`.

| Comando                                      | Para quê                                                    |
| -------------------------------------------- | ----------------------------------------------------------- |
| `pnpm typecheck`                             | `tsc --noEmit`                                              |
| `pnpm lint` / `lint:fix`                     | Biome (lint e formatação)                                   |
| `pnpm test` / `test:watch` / `test:coverage` | Vitest, em `tests/unit/`                                    |
| `pnpm test:e2e`                              | Playwright, em `tests/e2e/`                                 |
| `pnpm banner:build`                          | Gera o PDF 90 × 120 cm e a prévia PNG do banner             |
| `pnpm roteiro:gerar`                         | Regenera `docs/ROTEIRO.md` a partir de `src/lib/roteiro.ts` |

## Fluxo

1. Branch a partir da `main` (ex.: `feat/modo-digital`, `fix/contagem-corridas`).
2. Commits pequenos, mensagem no imperativo e em português ("Corrige contagem de corridas resolvidas").
3. PR para a `main`. O check `build` (e os demais do CI) precisa passar e as conversas precisam estar resolvidas (por convenção, enquanto o ruleset não for aplicado). Merge por _squash_ ou _rebase_ (histórico linear).
4. Mudou regra, texto ou comportamento? Atualize o teste e a documentação junto.

## Regra de ouro

Os pontos de sobrecarga e a nota do app são **fictícios**, recurso didático **sem equivalência com medição humana**. Nunca apresente como medida de fadiga ou carga mental. A "pressão percebida 1–5" é opinião do visitante. O estudo é revisão integrativa e análise documental, **sem coleta primária**. Veja `AGENTS.md` para o texto completo e para as armadilhas conhecidas (por exemplo, `font-stretch` no CSS).

## Estilo

- Biome formata e aponta problemas; rode `pnpm lint:fix`.
- CSS puro em `src/app/globals.css`, identidade visual do projeto (sem gradientes, emoji ou cantos arredondados).
- Use `next/link` para rotas (por causa do `basePath`).
- Lógica de jogo fica em `src/lib/` (funções puras e testadas); componentes só apresentam.
