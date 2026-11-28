/**
 * Matriz de extração preenchida: uma linha por estudo e mecanismo, nas oito dimensões de MATRIZ.
 * Só entra o que foi lido no estudo. A classificação pelo NASA-TLX e a coluna de sistema de trabalho são interpretação do grupo.
 * Mudou aqui, rode `pnpm resumo:gerar` (atualiza docs/resumo-para-artigo.md e docs/matriz-de-extracao.csv).
 */
import { MECANISMOS, REFERENCIAS, type RefId } from "./conteudo";

type Mecanismo = "tempo" | "encadeadas" | "opacidade";

const POR_MECANISMO: Record<Mecanismo, { nome: string; exigencia: string; melhoria: string }> = {
  tempo: {
    nome: MECANISMOS[0].t,
    exigencia: "Decidir e agir depressa (demanda temporal; demanda mental).",
    melhoria: MECANISMOS[0].r,
  },
  encadeadas: {
    nome: MECANISMOS[1].t,
    exigencia: "Manter o ritmo sem recuperação (demanda temporal; demanda física; esforço).",
    melhoria: MECANISMOS[1].r,
  },
  opacidade: {
    nome: MECANISMOS[2].t,
    exigencia: "Agir sem entender as regras, sob ameaça de penalidade (demanda mental; frustração).",
    melhoria: MECANISMOS[2].r,
  },
};

export type Estudo = {
  ref: RefId;
  tipo: string;
  contexto: string;
  limitacoes: string;
  achados: { mecanismo: Mecanismo; evidencia: string; sistema: string }[];
};

export const ESTUDOS: Estudo[] = [
  {
    ref: "rani",
    tipo: "Artigo com dados de pesquisas da OIT",
    contexto: "Cerca de 3.000 entregadores por plataforma em 11 países em desenvolvimento, sem o Brasil.",
    limitacoes: "A amostra não é representativa e não inclui o Brasil.",
    achados: [
      {
        mecanismo: "tempo",
        evidencia: "Muito pouco tempo, de 10 a 40 segundos, para aceitar ou recusar um pedido (p. 20).",
        sistema: "Relações organizacionais.",
      },
      {
        mecanismo: "encadeadas",
        evidencia: "Bônus e metas levam a jornadas longas e alta intensidade, com dificuldade de pausar (pp. 22–23).",
        sistema: "Relações organizacionais.",
      },
      {
        mecanismo: "opacidade",
        evidencia: "Relato, na Índia, de avaliação reduzida sem esclarecimento, e repercussões ao recusar ou cancelar pedidos (p. 23).",
        sistema: "Relações organizacionais.",
      },
    ],
  },
  {
    ref: "vignola",
    tipo: "Artigo de revisão",
    contexto: "Literatura sobre trabalho por plataforma e saúde, com a entrega como exemplo principal.",
    limitacoes: "É revisão de literatura: não traz dados próprios nem estima o tamanho dos efeitos.",
    achados: [
      {
        mecanismo: "tempo",
        evidencia:
          "Para cumprir a expectativa de rapidez, entregadores podem correr, avançar sinais, usar o celular e pular pausas (seção 4.1).",
        sistema: "Trânsito; relações organizacionais.",
      },
      {
        mecanismo: "encadeadas",
        evidencia:
          "Incentivos em formato de jogo, para assumir mais trabalhos no pico ou seguir conectado, podem aumentar o estresse (seção 4.3).",
        sistema: "Relações organizacionais.",
      },
      {
        mecanismo: "opacidade",
        evidencia:
          "Mudanças unilaterais, muitas vezes sem explicação, e punição de quem recusa repetidamente, inclusive por segurança (seção 4.7).",
        sistema: "Relações organizacionais.",
      },
    ],
  },
  {
    ref: "zhang",
    tipo: "Artigo de conferência, estudo experimental",
    contexto: "Simulação de entrega em laboratório com 20 participantes de 19 a 30 anos.",
    limitacoes: "Amostra pequena, ambiente controlado e participantes que não representam entregadores reais, segundo os autores.",
    achados: [
      {
        mecanismo: "tempo",
        evidencia: "Sob pressão de tempo, demanda temporal, mental e esforço dominaram a carga psicológica (resumo, p. 31).",
        sistema: "Trânsito simulado; veículo e carga simulados.",
      },
    ],
  },
  {
    ref: "martin",
    tipo: "Relatório institucional (revisão), sem revisão por pares",
    contexto: "Gestão algorítmica no trabalho tradicional e por plataforma; institutos europeus de segurança e saúde.",
    limitacoes: "Não é revisado por pares e reúne contextos além da entrega.",
    achados: [
      {
        mecanismo: "tempo",
        evidencia: "Intensificação das exigências, em especial pressão de tempo, desempenho e incerteza (p. 73).",
        sistema: "Relações organizacionais.",
      },
      {
        mecanismo: "opacidade",
        evidencia: "Decisões percebidas como opacas, com sensação de insegurança e despersonalização (p. 74).",
        sistema: "Relações organizacionais.",
      },
    ],
  },
  {
    ref: "bowdler",
    tipo: "Editorial",
    contexto: "Síntese de 39 estudos (2022 a 2024), a mesma revisão do relatório PEROSH.",
    limitacoes: "É editorial e resume o relatório PEROSH: não conta como evidência independente dele.",
    achados: [
      {
        mecanismo: "tempo",
        evidencia: "Pressões psicossociais, sobretudo de tempo, elevam o estresse (seção Intensification of job demands).",
        sistema: "Relações organizacionais.",
      },
      {
        mecanismo: "opacidade",
        evidencia: "A perda de autonomia é maior quando o algoritmo é percebido como opaco (seção Depletion of job resources).",
        sistema: "Relações organizacionais.",
      },
    ],
  },
  {
    ref: "oliveira",
    tipo: "Artigo original, qualitativo",
    contexto: "14 entregadores de um aplicativo em São Leopoldo (RS), entrevistados em 2020.",
    limitacoes: "Uma cidade, um aplicativo e poucos participantes, durante a pandemia: não permite generalizar.",
    achados: [
      {
        mecanismo: "tempo",
        evidencia: "A pressão para ir mais rápido é constante, e os trabalhadores assumem riscos (Resultados e discussão).",
        sistema: "Trânsito; veículo.",
      },
      {
        mecanismo: "encadeadas",
        evidencia:
          "A maioria dos entrevistados no regime com turnos fixos cumpre 66 horas semanais; falta tempo para refeição (Resultados e discussão).",
        sistema: "Relações organizacionais; ambiente.",
      },
      {
        mecanismo: "opacidade",
        evidencia: "Bloqueios cuja causa não se sabe exatamente estão entre os maiores medos (Resultados e discussão).",
        sistema: "Relações organizacionais.",
      },
    ],
  },
  {
    ref: "rodrigues",
    tipo: "Estudo de escopo",
    contexto: "31 artigos e conteúdos de sites sobre trabalhadores por aplicativo, com foco no Brasil (2014 a 2020).",
    limitacoes: "Possível viés de seleção, segundo os autores; mistura motoristas de passageiros e entregadores.",
    achados: [
      {
        mecanismo: "tempo",
        evidencia: "A remuneração por demanda impõe ritmo intenso e contribui para acidentes (Exposição laboral e risco).",
        sistema: "Trânsito; veículo; ambiente.",
      },
      {
        mecanismo: "encadeadas",
        evidencia: "Jornadas extensas sem pausas para alimentação e descanso, e bonificações em formato de jogo (Introdução).",
        sistema: "Relações organizacionais.",
      },
      {
        mecanismo: "opacidade",
        evidencia:
          "Bloqueios por atraso (exposição laboral) e bloqueio definitivo como forma de controle (seção sobre o crescimento dos aplicativos); não trata da falta de explicação.",
        sistema: "Relações organizacionais.",
      },
    ],
  },
];

export const MATRIZ_PREENCHIDA = ESTUDOS.flatMap((e) =>
  e.achados.map((a) => ({
    referencia: `${REFERENCIAS[e.ref].citacao}; ${e.tipo.charAt(0).toLowerCase()}${e.tipo.slice(1)}`,
    contexto: e.contexto,
    mecanismo: POR_MECANISMO[a.mecanismo].nome,
    exigencia: POR_MECANISMO[a.mecanismo].exigencia,
    evidencia: a.evidencia,
    sistema: a.sistema,
    melhoria: POR_MECANISMO[a.mecanismo].melhoria,
    limitacoes: e.limitacoes,
  })),
);

export const linhasDoEstudo = (e: Estudo) => e.achados.map((a) => ({ ...a, ...POR_MECANISMO[a.mecanismo] }));

export const FORA_DA_MATRIZ = `Ficam fora De Lucca (resenha de livro) e Abramova & Voronin (só o resumo foi lido).`;
