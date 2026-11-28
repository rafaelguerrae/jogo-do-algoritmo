/**
 * Conteúdo institucional compartilhado: página do projeto (/), Apresentação, Roteiro e docs/resumo-para-artigo.md.
 * O artigo e o site precisam dizer a mesma coisa: mudou aqui, rode `pnpm resumo:gerar`.
 *
 * Regra: nada entra sem ter sido lido na fonte. O que falta fica marcado com "[PENDENTE: ...]".
 */
import { TEMPO_COMPLEXA_S } from "./deck";

export type RefId =
  | "abramova"
  | "bowdler"
  | "brasil"
  | "delucca"
  | "hart"
  | "ibge"
  | "martin"
  | "oliveira"
  | "rani"
  | "rodrigues"
  | "ue"
  | "vignola"
  | "zhang";

export type Referencia = {
  /** Forma curta da citação no texto, sem parênteses. */
  citacao: string;
  /** Entrada em APA 7. Trechos entre *asteriscos* são itálico. */
  apa: string;
  url: string;
};

export const REFERENCIAS: Record<RefId, Referencia> = {
  abramova: {
    citacao: "Abramova & Voronin, 2025",
    apa: "Abramova, O., & Voronin, G. (2025). Synthesizing the ambivalent effects of algorithmic management on workers' well-being. *ECIS 2025 Proceedings*, 4.",
    url: "https://aisel.aisnet.org/ecis2025/algo_mgmt/algo_mgmt/4",
  },
  bowdler: {
    citacao: "Bowdler et al., 2026",
    apa: "Bowdler, M., Lahti, H., Jelenko, M., Buresti, G., & Valtonen, T. (2026). Algorithmic management and psychosocial risks at work: An emerging occupational safety and health challenge [Editorial]. *Scandinavian Journal of Work, Environment & Health, 52*(1), 1–5.",
    url: "https://doi.org/10.5271/sjweh.4270",
  },
  brasil: {
    citacao: "Brasil, 2025",
    apa: "Brasil. Câmara dos Deputados. (2025). *Projeto de Lei Complementar nº 152/2025* [Autor: Luiz Gastão].",
    url: "https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2537739",
  },
  delucca: {
    citacao: "De Lucca, 2024",
    apa: "De Lucca, S. R. (2024). Trabalhadores(as) em plataformas digitais: Precarização e sobrevivência [Resenha do livro *Trabalho por plataformas digitais: Do aprofundamento da precarização à busca por alternativas democráticas*, de R. Grohmann & J. Salvagni]. *Cadernos de Saúde Pública, 40*(3), e00000624.",
    url: "https://doi.org/10.1590/0102-311XPT000624",
  },
  hart: {
    citacao: "Hart & Staveland, 1988",
    apa: "Hart, S. G., & Staveland, L. E. (1988). Development of NASA-TLX (Task Load Index): Results of empirical and theoretical research. In P. A. Hancock & N. Meshkati (Eds.), *Human mental workload* (pp. 139–183). North-Holland.",
    url: "https://doi.org/10.1016/S0166-4115(08)62386-9",
  },
  ibge: {
    citacao: "IBGE, 2023",
    apa: "Instituto Brasileiro de Geografia e Estatística. (2023). *Teletrabalho e trabalho por meio de plataformas digitais* [Apresentação; PNAD Contínua, 4º trimestre de 2022; estatísticas experimentais].",
    url: "https://agenciadenoticias.ibge.gov.br/media/com_mediaibge/arquivos/448a4b1b10d3cba64647966eb2772316.pdf",
  },
  martin: {
    citacao: "Martín, 2025",
    apa: "Martín, J. (Ed.). (2025). *Algorithmic management and AI-based systems as a new form of work organisation: Psychosocial factors and implications for occupational safety and health* (ALMA-AI joint scientific report). PEROSH.",
    url: "https://doi.org/10.23775/20250616",
  },
  oliveira: {
    citacao: "Oliveira & Junges, 2023",
    apa: "Oliveira, P. T. G. de, & Junges, J. R. (2023). Plataformas digitais de entrega de alimentação: Condições de trabalho e riscos para a saúde. *Saúde e Sociedade, 32*(3), e220642pt.",
    url: "https://doi.org/10.1590/S0104-12902023220642pt",
  },
  rodrigues: {
    citacao: "Rodrigues et al., 2021",
    apa: "Rodrigues, N. L. P. R., Moreira, A. S., & De Lucca, S. R. (2021). O presente e o futuro do trabalho precarizado dos trabalhadores por aplicativo. *Cadernos de Saúde Pública, 37*(11), e00246620.",
    url: "https://doi.org/10.1590/0102-311X00246620",
  },
  rani: {
    citacao: "Rani et al., 2022",
    apa: "Rani, U., Dhir, R. K., & Gobel, N. (2022). Delivery workers, trapped in an algorithmic system. *Sociologia: Revista da Faculdade de Letras da Universidade do Porto*, número temático *Trabalho, plataformas digitais, cuidados*, 11–31.",
    url: "https://doi.org/10.21747/08723419/soctem2022a2",
  },
  ue: {
    citacao: "União Europeia, 2024",
    apa: "União Europeia. (2024). *Directive (EU) 2024/2831 of the European Parliament and of the Council of 23 October 2024 on improving working conditions in platform work*. Official Journal of the European Union.",
    url: "https://eur-lex.europa.eu/eli/dir/2024/2831/oj",
  },
  vignola: {
    citacao: "Vignola et al., 2023",
    apa: "Vignola, E. F., Baron, S., Abreu Plasencia, E., Hussein, M., & Cohen, N. (2023). Workers' health under algorithmic management: Emerging findings and urgent research questions. *International Journal of Environmental Research and Public Health, 20*(2), 1239.",
    url: "https://doi.org/10.3390/ijerph20021239",
  },
  zhang: {
    citacao: "Zhang & Rau, 2026",
    apa: "Zhang, Y., & Rau, P.-L. P. (2026). Measuring workload of food delivery riders under algorithmic management. *Social & Occupational Ergonomics, 228*, 31–41.",
    url: "https://doi.org/10.54941/ahfe1007933",
  },
};

/** Ids em ordem alfabética de autoria (APA). */
export const REF_IDS = (Object.keys(REFERENCIAS) as RefId[]).sort((a, b) => REFERENCIAS[a].apa.localeCompare(REFERENCIAS[b].apa, "pt-BR"));

export const semItalico = (s: string) => s.replaceAll("*", "");

export const cita = (id: RefId, onde?: string) => `(${REFERENCIAS[id].citacao}${onde ? `, ${onde}` : ""})`;

export const PERGUNTA =
  "Como a gestão algorítmica afeta a carga mental dos trabalhadores por aplicativo e de que forma os requisitos ergonômicos de projeto se diferenciam das regras jurídicas (trabalhistas) para mitigar esses impactos na interface humano-sistema?";

/** Objetivos da Entrega Parcial; o específico 2 foi reescrito, pois a regulação analisada não é só trabalhista. */
export const OBJETIVO_GERAL =
  "Analisar, sob a ótica da Ergonomia e dos Fatores Humanos, como a gestão algorítmica impacta a carga mental de trabalhadores de plataformas e propor diretrizes baseadas em requisitos ergonômicos de projeto para orientar a regulação do setor.";

export const OBJETIVOS_ESPECIFICOS = [
  "Identificar na literatura os principais mecanismos de controle algorítmico (metas, bloqueios, avaliação, distribuição) e seus efeitos diretos sobre a carga mental e a fadiga.",
  "Diferenciar, de forma prática e operacional, os requisitos ergonômicos de design da interação do que já preveem os textos normativos analisados.",
  "Propor requisitos ergonômicos concretos para o design e a governança das interfaces algorítmicas, focados no respeito aos limites cognitivos humanos.",
];

export const ENTREGADORES = `Em 2022, 589 mil pessoas trabalhavam por meio de aplicativos de entrega de comida e outros produtos no Brasil, segundo o IBGE em parceria com a Unicamp e o MPT; a estatística é experimental ${cita("ibge")}.`;

export const CONTEXTO = [
  `A literatura associa a gestão algorítmica a pressões psicossociais, em especial de tempo, e a mais estresse ${cita("bowdler")}.`,
  `Uma revisão de literatura descreve efeitos ambivalentes sobre o bem-estar ${cita("abramova")}, e a resenha de um livro brasileiro destaca precarização e vigilância algorítmica ${cita("delucca")}.`,
];

/** Dimensões do NASA-TLX, usadas só como referência para nomear exigências. */
export const TLX = ["demanda mental", "demanda física", "demanda temporal", "desempenho", "esforço", "frustração"] as const;

export const NASA_TLX = `O NASA-TLX é utilizado apenas como referência conceitual para descrever as exigências identificadas na literatura, a partir de suas seis dimensões: ${TLX.slice(0, -1).join(", ")} e ${TLX.at(-1)} (${REFERENCIAS.hart.citacao}). O instrumento não foi aplicado, nenhuma pontuação foi calculada, e o jogo não é uma versão dele nem mede carga mental.`;

/** Colunas da matriz de extração: cada linha da matriz é um estudo lido. */
export const MATRIZ: { dimensao: string; registrar: string }[] = [
  { dimensao: "Referência e tipo", registrar: "Autoria, ano e tipo: artigo, relatório, editorial ou resenha." },
  { dimensao: "Contexto e população", registrar: "País, atividade e amostra." },
  { dimensao: "Mecanismo de gestão", registrar: "Pressão de tempo, metas encadeadas ou opacidade e punição." },
  { dimensao: "Exigência gerada", registrar: "O que passa a ser exigido de quem trabalha, nomeado pelas dimensões do NASA-TLX." },
  { dimensao: "Evidência", registrar: "O que o estudo encontrou, com página ou seção." },
  { dimensao: "Sistema de trabalho", registrar: "Componente envolvido: trânsito, veículo, ambiente ou relações organizacionais." },
  { dimensao: "Melhoria", registrar: "Requisito de projeto que responde à exigência." },
  { dimensao: "Limitações", registrar: "O que o estudo não permite afirmar." },
];

export const RESSALVA_MATRIZ =
  "Passagens conferidas nas fontes em 28/11/2026. A classificação das exigências pelas dimensões do NASA-TLX e a coluna de sistema de trabalho são interpretação do grupo, aprovada por ele em 28/11/2026, e não pontuação do instrumento.";

export const METODO = [
  "Revisão integrativa da literatura e análise documental, sem coleta de dados primários com pessoas.",
  "Buscas em Google Acadêmico, SciELO, Periódicos CAPES, Scopus e anais da ABERGO.",
  "Termos: “gestão algorítmica”, “carga mental”, “fadiga”, “platform work”.",
  "Matriz de extração em oito dimensões, com uma linha por estudo e mecanismo.",
  "Análise de textos normativos, comparando o conteúdo antes de concluir.",
  `Fundamento: relatório ALMA-AI, da PEROSH, que trata a IA como nova forma de organização do trabalho ${cita("martin")}.`,
  NASA_TLX,
  "Resultado: requisitos ergonômicos concretos para o design das interfaces algorítmicas.",
];

export const MECANISMOS = [
  {
    n: "+1",
    t: "Pressão de tempo",
    d: `Aceitar uma corrida complexa com pouco tempo para decidir (${TEMPO_COMPLEXA_S} s no jogo).`,
    exigencia: "Decidir rápido, com informação incompleta, sem espaço para avaliar risco e ganho.",
    r: "Tempo útil de decisão proporcional à complexidade da tarefa.",
  },
  {
    n: "+2",
    t: "Metas encadeadas",
    d: "Corridas oferecidas em sequência, sem espaço para descanso.",
    exigencia: "Manter atenção e ritmo continuamente, sem recuperação entre uma demanda e outra.",
    r: "Limite para corridas encadeadas e pausa respeitada.",
  },
  {
    n: "+3",
    t: "Opacidade e punição",
    d: "Recusar por segurança e perder nota sem saber o motivo.",
    exigencia: "Decidir sem entender as regras do sistema, sob ameaça de penalidade não explicada.",
    r: "Feedback explicativo antes de qualquer punição.",
  },
] as const;

export const PORQUE_9S = `O limite de ${TEMPO_COMPLEXA_S} segundos das corridas complexas é uma escolha de projeto do jogo, feita para o visitante sentir o pouco tempo para decidir. Não é um valor da literatura nem uma medição.`;

export type Evidencia = { mecanismo: (typeof MECANISMOS)[number]["t"]; efeito: string; ref: RefId; onde: string };

export const LITERATURA: Evidencia[] = [
  {
    mecanismo: "Pressão de tempo",
    efeito: "Entregadores têm muito pouco tempo, de 10 a 40 segundos, para decidir se aceitam ou recusam um pedido.",
    ref: "rani",
    onde: "p. 20",
  },
  {
    mecanismo: "Pressão de tempo",
    efeito: "Os estudos revisados apontam intensificação das exigências, em especial pressão de tempo, desempenho e incerteza.",
    ref: "martin",
    onde: "p. 73",
  },
  {
    mecanismo: "Pressão de tempo",
    efeito:
      "Em simulação de entrega em laboratório, sob pressão de tempo, com 20 participantes, demanda temporal, demanda mental e esforço foram as dimensões dominantes da carga psicológica.",
    ref: "zhang",
    onde: "p. 31, resumo",
  },
  {
    mecanismo: "Metas encadeadas",
    efeito: "Bônus e metas levam a jornadas longas e alta intensidade; muitas vezes não há como pausar sem comprometer a meta.",
    ref: "rani",
    onde: "pp. 22–23",
  },
  {
    mecanismo: "Metas encadeadas",
    efeito: "Incentivos em formato de jogo, para assumir mais trabalhos nos horários de pico, podem aumentar o estresse.",
    ref: "vignola",
    onde: "seção 4.3",
  },
  {
    mecanismo: "Opacidade e punição",
    efeito:
      "Há relato de avaliação reduzida sem esclarecimento, e quase metade dos entregadores relata repercussões ao recusar ou cancelar pedidos, como multa, suspensão ou queda de avaliação.",
    ref: "rani",
    onde: "p. 23",
  },
  {
    mecanismo: "Opacidade e punição",
    efeito:
      "Mudanças unilaterais, muitas vezes sem explicação, fazem o algoritmo parecer uma autoridade arbitrária, e quem recusa repetidamente, inclusive por segurança, é punido.",
    ref: "vignola",
    onde: "seção 4.7",
  },
];

export const RESSALVA_LITERATURA = `A literatura descreve os mecanismos, não os números do jogo: ${TEMPO_COMPLEXA_S} s, 3 corridas seguidas e os pesos +1, +2 e +3 são escolhas do grupo. A pesquisa de ${REFERENCIAS.rani.citacao.split(",")[0]} ouviu entregadores de 11 países em desenvolvimento, sem incluir o Brasil.`;

/**
 * Mecanismo de gestão → exigência gerada → evidência encontrada → possibilidade de melhoria.
 * A síntese só resume linhas de LITERATURA; a lacuna diz o que as fontes lidas não mostram.
 */
export const SEQUENCIA = [
  {
    mecanismo: MECANISMOS[0].t,
    exigencia: MECANISMOS[0].exigencia,
    evidencia: `Entregadores têm muito pouco tempo para aceitar ou recusar um pedido, e os estudos revisados apontam intensificação da pressão de tempo (${REFERENCIAS.rani.citacao}, p. 20) (${REFERENCIAS.martin.citacao}, p. 73).`,
    lacuna: "Nas fontes lidas, não encontramos qual tempo de decisão seria suficiente.",
    melhoria: MECANISMOS[0].r,
  },
  {
    mecanismo: MECANISMOS[1].t,
    exigencia: MECANISMOS[1].exigencia,
    evidencia: `Bônus e metas se ligam a jornadas longas, alta intensidade e dificuldade de pausar, e incentivos em formato de jogo estimulam a assumir mais trabalhos (${REFERENCIAS.rani.citacao}, pp. 22–23) (${REFERENCIAS.vignola.citacao}, seção 4.3).`,
    lacuna: "Nenhuma fonte lida define um limite de corridas seguidas: as 3 do jogo são escolha do grupo.",
    melhoria: MECANISMOS[1].r,
  },
  {
    mecanismo: MECANISMOS[2].t,
    exigencia: MECANISMOS[2].exigencia,
    evidencia: `Há relato de avaliação reduzida sem esclarecimento, de punição por recusar pedidos, inclusive por segurança, e de mudanças sem explicação (${REFERENCIAS.rani.citacao}, p. 23) (${REFERENCIAS.vignola.citacao}, seção 4.7).`,
    lacuna: "A queda de nota logo após a recusa, como acontece no jogo, é uma simplificação.",
    melhoria: MECANISMOS[2].r,
  },
] as const;

export const SISTEMA_INTRO =
  "Na Ergonomia, o algoritmo não age sozinho: é um componente do sistema de trabalho, junto com a pessoa, a tarefa, o trânsito, o veículo, o ambiente e as relações organizacionais.";

export const SISTEMA: { componente: string; evidencia: string; pergunta: string; noJogo: string }[] = [
  {
    componente: "Trânsito",
    evidencia: `Entre 14 entregadores do Rio Grande do Sul, a pressão para ir mais rápido é constante (${REFERENCIAS.oliveira.citacao}). Um estudo de escopo relata violação de regras de trânsito para escapar de assaltos e de bloqueios por atraso (${REFERENCIAS.rodrigues.citacao}).`,
    pergunta: "O tempo para decidir e o prazo de entrega consideram o trânsito do momento?",
    noJogo: "Não representado.",
  },
  {
    componente: "Veículo",
    evidencia: `Os entregadores arcam com a manutenção, e os sons e falas do aplicativo distraem no trajeto (${REFERENCIAS.oliveira.citacao}). O peso da mochila de entrega pode desestabilizar o veículo (${REFERENCIAS.rodrigues.citacao}).`,
    pergunta: "A oferta considera o tipo de veículo, o volume da carga e quando o aviso chega a quem conduz?",
    noJogo: "Carta com pedido volumoso para moto.",
  },
  {
    componente: "Ambiente",
    evidencia: `Os 14 entrevistados citaram assaltos entre os maiores riscos; há também exposição ao clima e falta de abrigo para esperar pedidos (${REFERENCIAS.oliveira.citacao}). Condições das vias, como buracos e óleo (${REFERENCIAS.rodrigues.citacao}).`,
    pergunta: "Chuva, falta de iluminação e área de risco pesam na oferta e protegem quem recusa?",
    noJogo: "Cartas com chuva forte, rua sem iluminação e área de risco.",
  },
  {
    componente: "Relações organizacionais",
    evidencia: `Bloqueios cuja causa o entregador não sabe exatamente estão entre os maiores medos relatados (${REFERENCIAS.oliveira.citacao}).`,
    pergunta: "Quem explica uma decisão, a quem recorrer e como contestar?",
    noJogo: "Queda de nota sem explicação.",
  },
];

export const RESSALVA_SISTEMA =
  "Evidências de um estudo qualitativo brasileiro, com 14 entregadores, e de um estudo de escopo. Mostram que os componentes aparecem no trabalho, mas não medem o efeito de cada um nem permitem generalizar. As perguntas de projeto são do grupo.";

export type LinhaRegulacao = { tema: string; diretiva: string; plp: string; projeto: string; refs: RefId[] };

/** Diretiva: texto do Jornal Oficial (L, 11/11/2024). PLP: substitutivo do parecer de 07/04/2026, lido por inteiro. */
export const REGULACAO: LinhaRegulacao[] = [
  {
    tema: "Vínculo de trabalho",
    diretiva: "presunção legal de relação de emprego quando houver indícios de direção e controle (arts. 4º e 5º).",
    plp: "trabalho autônomo, sem vínculo empregatício, e a Justiça do Trabalho aprecia alegações de desvirtuamento (arts. 3º e 16).",
    projeto: "Não é um requisito de interface.",
    refs: ["ue", "brasil"],
  },
  {
    tema: "Contrato e remuneração",
    diretiva: "não comparado neste quadro.",
    plp: "contrato escrito (art. 8º), limites para as taxas no transporte (art. 10) e remuneração mínima na coleta e entrega (art. 11).",
    projeto: "Não é um requisito de interface.",
    refs: ["brasil"],
  },
  {
    tema: "Transparência",
    diretiva:
      "informar o uso de sistemas automatizados, os principais parâmetros e os motivos para restringir ou encerrar contas (art. 9º).",
    plp: "antes de aceitar, informações para entender riscos e benefícios do serviço (art. 12, II); fatores que influenciam as ofertas e critérios de avaliação e pontuação, respeitados os segredos de negócio (art. 13).",
    projeto: "Mostrar na própria interface, em linguagem clara, o que pesa na decisão e o que pode gerar penalidade.",
    refs: ["ue", "brasil"],
  },
  {
    tema: "Punição, explicação e revisão",
    diretiva:
      "decisão de restringir, suspender ou encerrar a conta é tomada por uma pessoa (art. 10); há explicação e pedido de revisão, e os motivos escritos chegam até a data em que a decisão passa a valer (art. 11).",
    plp: "comunicação prévia com os motivos (art. 17) e prazo de defesa antes da decisão (art. 18), com exceções, como a suspensão cautelar sem oitiva (art. 18, §§ 2º e 4º); revisão de decisões exclusivamente automatizadas a pedido (art. 12, I).",
    projeto: MECANISMOS[2].r,
    refs: ["ue", "brasil"],
  },
  {
    tema: "Recusa de serviços",
    diretiva: "não localizamos direito de recusar tarefas no texto consultado.",
    plp: "veda aceitação obrigatória e penalidade por recusar serviços ou ficar desconectado (art. 4º, II e III) e garante recusar sem penalidade (art. 12, V).",
    projeto: "Recusar por segurança sem perder nota nem acesso a ofertas.",
    refs: ["ue", "brasil"],
  },
  {
    tema: "Segurança e saúde",
    diretiva:
      "avaliar riscos, inclusive psicossociais e ergonômicos, e não usar sistemas automatizados de modo a exercer pressão indevida (art. 12).",
    plp: "incentivos não podem estimular o trabalhador a arriscar a saúde ou a integridade (art. 5º, parágrafo único); pontos de apoio para repouso, de forma progressiva (art. 14); seguro de vida e integridade física (art. 15).",
    projeto: "Transformar essas proteções gerais em parâmetros verificáveis, como os das duas linhas abaixo.",
    refs: ["ue", "brasil"],
  },
  {
    tema: "Tempo para decidir",
    diretiva: "não localizamos prazo mínimo para aceitar ou recusar uma tarefa no texto consultado.",
    plp: "exige informação antes do aceite (art. 12, II), mas não fixa prazo mínimo para decidir.",
    projeto: MECANISMOS[0].r,
    refs: ["ue", "brasil"],
  },
  {
    tema: "Corridas encadeadas",
    diretiva: "não localizamos limite de tarefas consecutivas nem pausa entre elas no texto consultado.",
    plp: "não fixa limite de serviços seguidos, de jornada nem pausa obrigatória; trata de pontos de apoio (art. 14).",
    projeto: MECANISMOS[1].r,
    refs: ["ue", "brasil"],
  },
];

export const RESSALVA_REGULACAO =
  "Paráfrases nossas. Diretiva: artigos conferidos no texto publicado no Jornal Oficial da União Europeia (série L, 11/11/2024), em inglês; retificações posteriores não foram conferidas. PLP: substitutivo do parecer do relator na Comissão Especial, de 07/04/2026; é texto em tramitação, ainda não é lei, e o projeto original não foi comparado. Em 28/11/2026, o grupo não encontrou versão mais recente.";

export const LINKS_NORMAS: { rotulo: string; url: string }[] = [
  { rotulo: "PLP 152/2025: ficha de tramitação na Câmara", url: REFERENCIAS.brasil.url },
  {
    rotulo: "Substitutivo consultado (parecer de 07/04/2026)",
    url: "https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=3109660&filename=Tramitacao-PLP+152/2025",
  },
  { rotulo: "Diretiva (UE) 2024/2831: EUR-Lex", url: REFERENCIAS.ue.url },
];

export const DEBATE =
  "A Diretiva (UE) 2024/2831 e o substitutivo do PLP 152/2025 vão além do vínculo: tratam de transparência, de decisões automatizadas e de punições. Nos dois, não localizamos prazo mínimo para aceitar uma tarefa nem limite de corridas encadeadas.";

export const OLHAR_ERGONOMIA =
  "Atua no design da tarefa: parâmetros operacionais pensados para o bem-estar cognitivo, como tempo útil de decisão, limite para corridas encadeadas e explicação antes de punir.";

export const LIMITES = [
  "Revisão integrativa e análise documental, sem coleta de dados com trabalhadores.",
  "Pontos fictícios, sem base em estudo ou medida humana: não medem fadiga nem carga mental.",
  "A pressão percebida de 1 a 5 é opinião do visitante, não medida científica.",
  "O NASA-TLX é referência conceitual e não foi aplicado.",
  "O jogo não substitui uma avaliação ergonômica real.",
  "Registros da Mostra são de amostra de conveniência: não permitem generalizar.",
  "A participação é voluntária: pode parar a qualquer momento.",
];

export const GRUPO = [
  "Anderson Rodrigues Alves",
  "Letícia Morais Faria Augusto",
  "Rafael Guerra Evangelista",
  "Samuel Rocha de Souza",
] as const;

export const DISCIPLINA =
  "Universidade Federal do ABC · Engenharia de Segurança do Trabalho: Ergonomia (ESGE006-23) · Turma NA1ESGE006-23SB · Profa. Giselle Ramirez Canedo";

export const AVISO_CURTO = "Pontos fictícios, sem base em estudo ou medida humana.";

export const AVISO_FICTICIO = `${AVISO_CURTO} Pontos de sobrecarga e nota são recurso didático, sem equivalência com medição de fadiga ou carga mental humana.`;

export const AVISO_AMOSTRA = "São percepções e jogadas de uma amostra de conveniência na Mostra, sem pretensão científica.";
