import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Projeto from "@/app/page";
import {
  AVISO_FICTICIO,
  CONTEXTO,
  cita,
  ENTREGADORES,
  LIMITES,
  LINKS_NORMAS,
  LITERATURA,
  MATRIZ,
  MECANISMOS,
  METODO,
  OBJETIVO_GERAL,
  OBJETIVOS_ESPECIFICOS,
  PERGUNTA,
  PORQUE_9S,
  REF_IDS,
  REFERENCIAS,
  REGULACAO,
  RESSALVA_LITERATURA,
  RESSALVA_MATRIZ,
  RESSALVA_REGULACAO,
  RESSALVA_SISTEMA,
  SEQUENCIA,
  SISTEMA,
  SISTEMA_INTRO,
} from "@/lib/conteudo";
import { TEMPO_COMPLEXA_S, TEMPO_SIMPLES_S } from "@/lib/deck";
import { campoCsv, ENCADEADAS, NOTA_INICIAL, PONTOS, QUEDA_NOTA, REQUISITOS } from "@/lib/game";
import { FORA_DA_MATRIZ, MATRIZ_PREENCHIDA } from "@/lib/matriz";

const virg = (n: number) => n.toFixed(2).replace(".", ",");
const lista = (itens: readonly string[]) => itens.map((t) => `- ${t}`).join("\n");
const linha = (celulas: string[]) => `| ${celulas.join(" | ")} |`;
const tabela = (cab: string[], linhas: string[][]) => [linha(cab), linha(cab.map(() => "---")), ...linhas.map(linha)].join("\n");

/** Na ordem das oito dimensões de MATRIZ. */
const linhasDaMatriz = () =>
  MATRIZ_PREENCHIDA.map((l) => [l.referencia, l.contexto, l.mecanismo, l.exigencia, l.evidencia, l.sistema, l.melhoria, l.limitacoes]);

/** Separado por ponto e vírgula e com BOM, para abrir direto na planilha em português. */
const csv = () =>
  `\uFEFF${[MATRIZ.map((m) => m.dimensao), ...linhasDaMatriz()].map((linhaCsv) => linhaCsv.map(campoCsv).join(";")).join("\n")}\n`;

const resumo = () => `# Resumo para o artigo: Jogo do Algoritmo

> Gerado de \`src/lib/conteudo.ts\` e \`src/lib/game.ts\` (\`pnpm resumo:gerar\`). Não editar à mão: é o texto de referência do site e do artigo.

## Pergunta de pesquisa

${PERGUNTA}

## Objetivos

**Geral:** ${OBJETIVO_GERAL}

**Específicos:**

${lista(OBJETIVOS_ESPECIFICOS)}

## Contexto

${lista([...CONTEXTO, ENTREGADORES])}

## Método

${lista(METODO)}

## Matriz de extração

${tabela(
  ["Dimensão", "O que registrar"],
  MATRIZ.map((m) => [m.dimensao, m.registrar]),
)}

${RESSALVA_MATRIZ}

${tabela(
  MATRIZ.map((m) => m.dimensao),
  linhasDaMatriz(),
)}

${FORA_DA_MATRIZ}

## Mecanismos

${tabela(
  ["Mecanismo", "No jogo", "Exigência sobre quem trabalha"],
  MECANISMOS.map((m) => [m.t, m.d, m.exigencia]),
)}

## O que a literatura mostra

${tabela(
  ["Mecanismo", "Efeito descrito", "Fonte"],
  LITERATURA.map((l) => [l.mecanismo, l.efeito, cita(l.ref, l.onde)]),
)}

${RESSALVA_LITERATURA}

## Requisitos ergonômicos

${lista(REQUISITOS.map((r) => `**${r.titulo}:** ${r.requisito}.`))}

## Do mecanismo à melhoria

${tabela(
  ["Mecanismo de gestão", "Exigência gerada", "Evidência encontrada", "Limite da evidência", "Possibilidade de melhoria"],
  SEQUENCIA.map((l) => [l.mecanismo, l.exigencia, l.evidencia, l.lacuna, l.melhoria]),
)}

## O algoritmo no sistema de trabalho

${SISTEMA_INTRO}

${tabela(
  ["Componente", "Evidência encontrada", "Pergunta de projeto", "No jogo"],
  SISTEMA.map((l) => [l.componente, l.evidencia, l.pergunta, l.noJogo]),
)}

${RESSALVA_SISTEMA}

## Regras jurídicas × requisitos ergonômicos

${tabela(
  ["Tema", "O que o texto normativo trata", "O que o projeto da interface exige"],
  REGULACAO.map((l) => [l.tema, `Diretiva: ${l.diretiva} PLP: ${l.plp} ${l.refs.map((id) => cita(id)).join(" ")}`, l.projeto]),
)}

${RESSALVA_REGULACAO}

${lista(LINKS_NORMAS.map((l) => `${l.rotulo}: ${l.url}`))}

## Regras do jogo

- Corridas complexas dão ${TEMPO_COMPLEXA_S} s para decidir; as simples, ${TEMPO_SIMPLES_S} s.
- **+${PONTOS.tempo}** (pressão de tempo): aceitar corrida complexa, com pouco tempo para decidir.
- **+${PONTOS.encadeadas}** (metas encadeadas): a cada ${ENCADEADAS} corridas aceitas seguidas, sem pausa de 5 min (simulada).
- **+${PONTOS.opacidade}** (opacidade e punição): recusa por segurança; a nota, que começa em ${virg(NOTA_INICIAL)}, cai ${virg(QUEDA_NOTA)} sem explicação.
- Corridas simples aceitas, outras recusas e tempo esgotado não pontuam por si.
- Ao fim, aplicar um requisito ergonômico zera os pontos daquele mecanismo.
- ${PORQUE_9S}
- ${AVISO_FICTICIO}

## Limites e cuidados

${lista(LIMITES)}

## Referências

${REF_IDS.map((id) => `${REFERENCIAS[id].apa} ${REFERENCIAS[id].url}`).join("\n\n")}
`;

describe("resumo para o artigo", () => {
  it("docs/resumo-para-artigo.md está igual ao conteúdo do site", async () => {
    await expect(resumo()).toMatchFileSnapshot("../../docs/resumo-para-artigo.md");
  });
});

describe("matriz de extração", () => {
  it("docs/matriz-de-extracao.csv está igual à matriz do site", async () => {
    await expect(csv()).toMatchFileSnapshot("../../docs/matriz-de-extracao.csv");
  });

  it("toda linha tem as oito dimensões preenchidas", () => {
    for (const l of linhasDaMatriz()) {
      expect(l).toHaveLength(MATRIZ.length);
      for (const celula of l) expect(celula.length).toBeGreaterThan(0);
    }
  });
});

describe("referências e citações", () => {
  const pagina = renderToStaticMarkup(createElement(Projeto)).replaceAll("&amp;", "&");
  // a lista de referências não conta como citação
  const corpo = pagina.slice(0, pagina.indexOf('id="referencias"'));

  it("toda referência da lista é citada na página do projeto", () => {
    for (const id of REF_IDS) expect(corpo, id).toContain(`href="#ref-${id}"`);
  });

  it("toda citação (Autor, ano) do texto está na lista", () => {
    const conhecidas = REF_IDS.map((id) => REFERENCIAS[id].citacao);
    const texto = resumo().split("## Referências")[0];
    const achadas = [...texto.matchAll(/\(([\p{Lu}][^()]*?, (?:19|20)\d\d)(?:, [^()]*)?\)/gu)].map((m) => m[1]);
    expect(achadas.length).toBeGreaterThan(0);
    for (const c of achadas) expect(conhecidas).toContain(c);
  });

  it("a lista está em ordem alfabética", () => {
    const autores = REF_IDS.map((id) => REFERENCIAS[id].apa);
    expect(autores).toEqual([...autores].sort((a, b) => a.localeCompare(b, "pt-BR")));
  });
});
