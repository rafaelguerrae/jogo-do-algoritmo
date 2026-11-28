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
    fala: "As leis em discussão tratam do vínculo e já falam de transparência e de punição. A Ergonomia acrescenta outra pergunta: como o sistema precisa ser projetado para respeitar os limites da cabeça de quem trabalha com ele. Se quiser, de 1 a 5, quanta pressão você sentiu? É só a sua opinião, não é medida científica. Obrigado por jogar!",
    acao: "Operador registra a percepção. Oferecer o QR/link do projeto, se houver.",
  },
];

export const PITCH_30S =
  "Nosso projeto trata o algoritmo de aplicativo como posto de trabalho. Além das regras trabalhistas, olhamos para o projeto da interface: tempo para decidir, metas encadeadas e punições sem explicação. Fazemos uma revisão da literatura e uma análise documental, sem coleta com pessoas, e traduzimos os achados em requisitos ergonômicos. Na Mostra, o público joga uma simulação para sentir esse ritmo, com pontos fictícios que ensinam, e não medem.";

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
    r: "Regras jurídicas são necessárias. A diretiva europeia e o substitutivo do projeto brasileiro, o PLP 152/2025, já falam de transparência e de explicação sobre punições. Nos textos que consultamos, não localizamos prazo mínimo para aceitar uma corrida nem limite de corridas encadeadas. A proposta é complementar com requisitos de projeto da interação.",
  },
  {
    p: "Por que 9 segundos?",
    r: "É uma escolha de projeto do jogo, para o visitante sentir o pouco tempo para decidir. Não é um valor da literatura nem uma medição. A literatura relata de 10 a 40 segundos (Rani et al., 2022, p. 20).",
  },
  {
    p: "Vocês entrevistaram entregadores?",
    r: "Não. É revisão integrativa da literatura com análise documental de textos normativos, sem coleta de dados primários com pessoas.",
  },
  {
    p: "E o NASA-TLX?",
    r: "Usamos apenas como referência conceitual para nomear as exigências que a literatura descreve, pelas seis dimensões: demanda mental, física e temporal, desempenho, esforço e frustração. Não aplicamos o questionário, não calculamos pontuação e o jogo não mede carga mental.",
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
