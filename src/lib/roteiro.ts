export type Bloco = { tempo: string; titulo: string; fala: string; acao?: string };

export const ABERTURA: Bloco[] = [
  {
    tempo: "0:00 · 10 s",
    titulo: "Convite",
    fala: "Oi, tudo bem? Quer testar três minutos de um dia de trabalho de entregador de aplicativo? Pode sentar aqui.",
    acao: "Sorrir, apontar a cadeira. A tela do visitante já está na tela de espera.",
  },
  {
    tempo: "0:10 · 30 s",
    titulo: "Contexto",
    fala: "Quem trabalha por aplicativo não tem um chefe de carne e osso na hora de decidir: quem distribui as corridas, cobra metas e pune é um algoritmo. Para a Ergonomia, esse algoritmo é o posto de trabalho dessas pessoas. A gente estuda como ele pesa na cabeça de quem trabalha.",
    acao: "Apontar o banner: “O algoritmo também é posto de trabalho.”",
  },
  {
    tempo: "0:40 · 30 s",
    titulo: "Regras",
    fala: "Eu sou o algoritmo. Vou te mandar corridas. Cada uma tem um tempo para você decidir, e você pode aceitar ou recusar. Do lado, está o placar de pontos de sobrecarga. Aviso importante: os pontos são fictícios, um recurso didático. Eles não medem você nem a fadiga de ninguém.",
    acao: "Mostrar a barra de pontos. Dizer que pode parar quando quiser.",
  },
  {
    tempo: "1:10 · 3 min",
    titulo: "Jogada",
    fala: "Aqui vai a primeira corrida… Valendo!",
    acao: "Operador: sortear, marcar a decisão (A, S ou R). Não explicar as regras durante a jogada: deixar o visitante sentir o ritmo.",
  },
  {
    tempo: "4:10 · 1 min",
    titulo: "Revelação",
    fala: "Olha o que fez os pontos subirem: pouco tempo para decidir, corridas seguidas sem pausa e, se você recusou por segurança, uma queda de nota sem explicação nenhuma. Agora aplica os requisitos ergonômicos aqui: tempo útil para decidir, limite de corridas encadeadas e explicação antes de punir. Os pontos caem.",
    acao: "Na tela, clicar em “Aplicar” em cada requisito. Mostrar o total caindo.",
  },
  {
    tempo: "5:10 · 20 s",
    titulo: "Fechamento",
    fala: "A lei discute vínculo, taxas e contrato, e isso é importante. A Ergonomia acrescenta outra pergunta: como o sistema precisa ser projetado para respeitar os limites da cabeça de quem trabalha com ele. Se quiser, de 1 a 5, quanta pressão você sentiu? É só a sua opinião, não é medida científica. Obrigado por jogar!",
    acao: "Operador registra a percepção. Oferecer o QR/link do projeto, se houver.",
  },
];

export const PITCH_30S =
  "Nosso projeto trata o algoritmo de aplicativo como posto de trabalho. Em vez de olhar só para contratos e taxas, olhamos para o projeto da interface: tempo para decidir, metas encadeadas e punições sem explicação. Fazemos uma revisão da literatura e uma análise documental, sem coleta com pessoas, e traduzimos os achados em requisitos ergonômicos. Na Mostra, o público joga uma simulação para sentir esse ritmo, com pontos fictícios que ensinam, e não medem.";

export const PERGUNTAS: { p: string; r: string }[] = [
  {
    p: "Isso mede a fadiga das pessoas?",
    r: "Não. Os pontos são fictícios e servem só para ensinar: mostram quais mecanismos do sistema pressionam a pessoa. A pressão que o visitante relata é opinião, não medida científica.",
  },
  {
    p: "De onde vêm esses 1, 2 e 3 pontos?",
    r: "São pesos de jogo, escolhidos para o recurso didático. Não vêm de estudo nem equivalem a nenhuma medida humana. O que vem da literatura são os mecanismos: pressão de tempo, metas encadeadas e opacidade.",
  },
  {
    p: "Por que não só criar uma lei?",
    r: "Regras trabalhistas são necessárias, mas dizem pouco sobre como a interface é projetada. A proposta é complementar com requisitos de projeto da interação.",
  },
  {
    p: "Vocês entrevistaram entregadores?",
    r: "Não. É revisão integrativa da literatura com análise documental de textos normativos, sem coleta de dados primários com pessoas.",
  },
  {
    p: "E o NASA-TLX?",
    r: "É uma referência da literatura para as dimensões da carga de trabalho (como demanda mental e temporal, esforço e frustração). O estudo não aplica o questionário em pessoas.",
  },
  {
    p: "O que é a recusa por segurança?",
    r: "Quando a pessoa recusa uma corrida de risco (chuva forte, rua sem luz) e o sistema derruba a nota sem dizer o motivo. É o exemplo de opacidade punitiva.",
  },
];

export const DICAS = [
  "Dois modos: com cartas (você opera) e sem cartas (as corridas aparecem na tela do visitante, ele decide ali e você só acompanha). No digital, deixe a tela do visitante aberta.",
  "Falar devagar e olhar para o visitante, não para a tela.",
  "Operador decide rápido: atalhos A (aceitar), S (recusar por segurança), R (recusar), N (próxima), P (pausa).",
  "Quem observa de fora pode ver a tela do visitante, boa para atrair público.",
  "Se o visitante ficar incomodado, encerrar na hora: a participação é voluntária.",
  "Revezar quem opera e quem explica. Todos devem saber responder às perguntas frequentes.",
];
