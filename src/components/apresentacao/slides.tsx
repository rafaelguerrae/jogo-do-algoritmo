import type { ReactNode } from "react";
import { Italico } from "@/components/Citacao";
import {
  AVISO_AMOSTRA,
  AVISO_FICTICIO,
  cita,
  DEBATE,
  DISCIPLINA,
  ENTREGADORES,
  GRUPO,
  LIMITES,
  MATRIZ,
  MECANISMOS,
  METODO,
  NASA_TLX,
  OBJETIVO_GERAL,
  OBJETIVOS_ESPECIFICOS,
  OLHAR_ERGONOMIA,
  PERGUNTA,
  PORQUE_9S,
  REF_IDS,
  REFERENCIAS,
  SEQUENCIA,
  SISTEMA_INTRO,
  TLX,
} from "@/lib/conteudo";
import { TEMPO_COMPLEXA_S, TEMPO_SIMPLES_S } from "@/lib/deck";
import { ENCADEADAS, NOTA_INICIAL, PONTOS, QUEDA_NOTA } from "@/lib/game";
import { f1, type Metricas } from "@/lib/metricas";

export type Slide = {
  id: string;
  titulo: string;
  escuro?: boolean;
  /** Fala sugerida, visível no modo apresentador (tecla N). */
  notas: string;
  corpo: ReactNode;
};

const virg = (n: number) => n.toFixed(2).replace(".", ",");

const DEFINICOES = [
  {
    t: "Gestão algorítmica",
    d: "Uso de sistemas automatizados para distribuir tarefas, monitorar o desempenho e aplicar avaliações e sanções, no lugar (ou ao lado) da gestão humana.",
  },
  {
    t: "Carga mental de trabalho",
    d: "Quanto da capacidade de atenção, memória e decisão de uma pessoa a tarefa exige em determinado tempo. Depende da tarefa, do tempo e do contexto.",
  },
  {
    t: "Fadiga",
    d: "Redução da capacidade de trabalhar, física ou mental, associada à demanda prolongada ou sem recuperação. Aqui, é um efeito possível, não algo medido.",
  },
  {
    t: "Sistema de trabalho",
    d: SISTEMA_INTRO,
  },
];

/** No slide de método, o papel do NASA-TLX ganha um quadro próprio. */
const METODO_SEM_TLX = METODO.filter((t) => t !== NASA_TLX);

export function montarSlides(m: Metricas): Slide[] {
  return [
    {
      id: "capa",
      titulo: "Capa",
      escuro: true,
      notas:
        "Apresentar o grupo e o tema em uma frase: o algoritmo de aplicativo como posto de trabalho. Avisar que o jogo faz parte da apresentação.",
      corpo: (
        <>
          <div className="ap-rotulo">I Mostra de Ergonomia · UFABC · 01/12/2026 · Eixo V: IA em Ergonomia e Fatores Humanos</div>
          <h1 className="ap-capa">
            Jogo do
            <br />
            <span>Algoritmo</span>
          </h1>
          <p className="ap-lead">Gestão algorítmica e carga mental no trabalho por aplicativo.</p>
          <p className="ap-peq">{GRUPO.join(" · ")}</p>
          <p className="ap-peq">{DISCIPLINA}</p>
        </>
      ),
    },
    {
      id: "contexto",
      titulo: "Contexto",
      notas:
        "Plataformas digitais substituem boa parte da gestão humana por sistemas que distribuem tarefas, monitoram e punem. Para quem entrega, o algoritmo define ritmo, carga e ambiente de decisão. O número de entregadores é do IBGE (PNAD Contínua, 4º trimestre de 2022) e é estatística experimental.",
      corpo: (
        <>
          <div className="ap-rotulo">O problema</div>
          <h2>
            O algoritmo é o <em>posto de trabalho.</em>
          </h2>
          <div className="ap-cols">
            <p className="ap-lead">
              Plataformas digitais distribuem tarefas, monitoram o desempenho e aplicam punições. Quem entrega ou dirige decide dentro das
              regras que o sistema impõe.
            </p>
            <div className="ap-destaque">
              <b>589 mil</b>
              <span>{ENTREGADORES}</span>
            </div>
          </div>
          <p className="ap-peq">
            Opacidade, pressão de tempo e metas dinâmicas podem ignorar limites cognitivos e gerar sobrecarga mental e fadiga. A literatura
            associa esses sistemas a pressões psicossociais e a mais estresse {cita("bowdler")}.
          </p>
        </>
      ),
    },
    {
      id: "definicoes",
      titulo: "Definições",
      escuro: true,
      notas:
        "Alinhar o vocabulário antes de seguir. São definições de trabalho do grupo, a conferir com as referências no artigo. O NASA-TLX aparece só como referência das dimensões da carga na literatura: não aplicamos o questionário em ninguém.",
      corpo: (
        <>
          <div className="ap-rotulo">Definições de trabalho do grupo</div>
          <h2>
            Do que estamos <em>falando</em>
          </h2>
          <div className="ap-grade ap-g4">
            {DEFINICOES.map((x) => (
              <div className="ap-cartao" key={x.t}>
                <h3>{x.t}</h3>
                <p>{x.d}</p>
              </div>
            ))}
          </div>
          <p className="ap-peq">
            Referência conceitual para nomear exigências (NASA-TLX {cita("hart")}): {TLX.join(", ")}. O questionário não foi aplicado.
          </p>
        </>
      ),
    },
    {
      id: "pergunta",
      titulo: "Pergunta de pesquisa",
      notas:
        "Ler a pergunta devagar. A tese: lei e projeto de interface se complementam. A comparação do conteúdo dos documentos normativos é do artigo.",
      corpo: (
        <>
          <div className="ap-rotulo">Pergunta de pesquisa</div>
          <h2 className="ap-h2-largo">
            Lei <em>e</em> projeto da interface
          </h2>
          <p className="ap-lead ap-densa">{PERGUNTA}</p>
          <p className="ap-peq ap-densa">Objetivo geral: {OBJETIVO_GERAL}</p>
          <ul className="ap-lista ap-densa">
            {OBJETIVOS_ESPECIFICOS.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </>
      ),
    },
    {
      id: "metodo",
      titulo: "Método",
      escuro: true,
      notas:
        "Enfatizar: revisão integrativa e análise documental, sem coleta primária com pessoas. O jogo é ferramenta didática, não instrumento de pesquisa.",
      corpo: (
        <>
          <div className="ap-rotulo">Método</div>
          <h2 className="ap-h2-largo">
            Revisão integrativa e <em>análise documental</em>
          </h2>
          <div className="ap-cols">
            {[METODO_SEM_TLX.slice(0, 4), METODO_SEM_TLX.slice(4)].map((parte) => (
              <ul className="ap-lista ap-densa" key={parte[0]}>
                {parte.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            ))}
          </div>
          <p className="ap-aviso ap-densa">{NASA_TLX}</p>
          <p className="ap-peq ap-densa">Dimensões da matriz: {MATRIZ.map((x) => x.dimensao.toLowerCase()).join(" · ")}.</p>
        </>
      ),
    },
    {
      id: "fontes",
      titulo: "Fontes",
      notas:
        "Mostrar a base: artigos, relatório institucional, dados do IBGE e textos normativos. De Lucca é resenha de livro e Bowdler et al. é editorial. A lista também está na página do projeto.",
      corpo: (
        <>
          <div className="ap-rotulo">Fontes</div>
          <h2>
            O que <em>sustenta</em> o trabalho
          </h2>
          <ol className="ap-refs">
            {REF_IDS.map((id) => (
              <li key={id}>
                <Italico texto={REFERENCIAS[id].apa} /> {REFERENCIAS[id].url}
              </li>
            ))}
          </ol>
        </>
      ),
    },
    {
      id: "matriz",
      titulo: "Mecanismos e requisitos",
      escuro: true,
      notas:
        "Percorrer a linha de cada mecanismo: o que ele exige de quem trabalha, que evidência encontramos, o que ela não mostra e qual melhoria de projeto responde. A literatura sustenta os mecanismos, não os números do jogo.",
      corpo: (
        <>
          <div className="ap-rotulo">Três mecanismos, três requisitos</div>
          <h2 className="ap-h2-largo">
            Da regra ao <em>requisito</em>
          </h2>
          <table className="ap-tab ap-densa">
            <thead>
              <tr>
                <th>Mecanismo de gestão</th>
                <th>Exigência gerada</th>
                <th>Evidência encontrada</th>
                <th>Possibilidade de melhoria</th>
              </tr>
            </thead>
            <tbody>
              {SEQUENCIA.map((x) => (
                <tr key={x.mecanismo}>
                  <td>
                    <b>{x.mecanismo}</b>
                  </td>
                  <td>{x.exigencia}</td>
                  <td>{x.evidencia}</td>
                  <td>{x.melhoria}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="ap-peq ap-densa">Limites da evidência: {SEQUENCIA.map((x) => x.lacuna).join(" ")}</p>
        </>
      ),
    },
    {
      id: "regulacao",
      titulo: "Lei e projeto",
      notas:
        "Cuidado: a diretiva europeia não trata só de vínculo; ela tem capítulo de gestão algorítmica. O substitutivo do PLP 152/2025 também trata de transparência, recusa e punição, mas é texto em tramitação. Em nenhum dos dois localizamos prazo para aceitar tarefa nem limite de corridas encadeadas.",
      corpo: (
        <>
          <div className="ap-rotulo">Dois olhares complementares</div>
          <h2>
            Lei <em>+</em> projeto
          </h2>
          <div className="ap-grade ap-g2">
            <div className="ap-cartao">
              <h3>O debate regulatório</h3>
              <p>{DEBATE}</p>
            </div>
            <div className="ap-cartao">
              <h3>O olhar da Ergonomia</h3>
              <p>{OLHAR_ERGONOMIA}</p>
            </div>
          </div>
          <ul className="ap-lista ap-densa">
            <li>Diretiva, arts. 9º a 12: transparência, supervisão humana, explicação e revisão, segurança e saúde {cita("ue")}.</li>
            <li>
              Substitutivo do PLP, em tramitação: informação antes do aceite, recusa sem penalidade e defesa antes da sanção, com exceções
              (arts. 12, 13, 17 e 18) {cita("brasil")}.
            </li>
            <li>Nos dois: não localizamos prazo mínimo para decidir nem limite de corridas encadeadas.</li>
          </ul>
        </>
      ),
    },
    {
      id: "jogo",
      titulo: "O jogo",
      escuro: true,
      notas:
        "Explicar os dois modos. Com cartas: um de nós é o algoritmo e sorteia. Sem cartas: as corridas aparecem na tela e o visitante decide ali. Em ambos, a pessoa vive o ritmo e depois vê o que o produziu.",
      corpo: (
        <>
          <div className="ap-rotulo">Como funciona</div>
          <h2>
            Pouco tempo <em>para decidir</em>
          </h2>
          <div className="ap-grade ap-g2">
            <div className="ap-cartao">
              <h3>Com cartas</h3>
              <p>
                O grupo opera o “algoritmo”: sorteia corridas (24 cartas impressas ou sorteio na tela) e marca aceites e recusas. Contato
                direto com o visitante.
              </p>
            </div>
            <div className="ap-cartao">
              <h3>Sem cartas (digital)</h3>
              <p>
                As corridas aparecem sozinhas na tela do visitante, uma atrás da outra. Ele aceita ou recusa ali mesmo e pode pedir uma
                pausa simulada.
              </p>
            </div>
          </div>
          <ul className="ap-lista">
            <li>Pontos de sobrecarga sobem em tempo real; no fim, o visitante vê o que pesou.</li>
            <li>Ao aplicar os requisitos ergonômicos, os pontos daquele mecanismo caem.</li>
            <li>{PORQUE_9S}</li>
          </ul>
        </>
      ),
    },
    {
      id: "metricas",
      titulo: "Métricas do jogo",
      notas:
        "Ponto mais sensível da apresentação: as métricas são do jogo, não da pessoa. Pesos e limites foram escolhidos para ensinar. O que vem da literatura são os mecanismos, não os números.",
      corpo: (
        <>
          <div className="ap-rotulo">Métricas · todas fictícias, didáticas</div>
          <h2>
            O que o jogo <em>conta</em>
          </h2>
          <table className="ap-tab">
            <thead>
              <tr>
                <th>Métrica</th>
                <th>Regra</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <b>Pressão de tempo</b>
                </td>
                <td>Aceitar corrida complexa, com pouco tempo para decidir ({TEMPO_COMPLEXA_S} s no jogo)</td>
                <td>+{PONTOS.tempo}</td>
              </tr>
              <tr>
                <td>
                  <b>Metas encadeadas</b>
                </td>
                <td>A cada {ENCADEADAS} corridas aceitas seguidas, sem pausa de 5 min</td>
                <td>+{PONTOS.encadeadas}</td>
              </tr>
              <tr>
                <td>
                  <b>Opacidade e punição</b>
                </td>
                <td>Recusa por segurança com queda de nota sem explicação</td>
                <td>+{PONTOS.opacidade}</td>
              </tr>
              <tr>
                <td>
                  <b>Nota no app</b>
                </td>
                <td>
                  Começa em {virg(NOTA_INICIAL)} e cai {virg(QUEDA_NOTA)} a cada recusa por segurança
                </td>
                <td>fictícia</td>
              </tr>
              <tr>
                <td>
                  <b>Tempo de decisão</b>
                </td>
                <td>Corridas simples têm {TEMPO_SIMPLES_S} s e não pontuam</td>
                <td>registrado</td>
              </tr>
              <tr>
                <td>
                  <b>Pressão percebida</b>
                </td>
                <td>Pergunta de 1 a 5 ao fim: opinião do visitante</td>
                <td>não é medida</td>
              </tr>
            </tbody>
          </table>
          <p className="ap-aviso">{AVISO_FICTICIO}</p>
        </>
      ),
    },
    {
      id: "resultados",
      titulo: "Resultados da Mostra",
      escuro: true,
      notas:
        "Números ao vivo, só deste computador. Amostra de conveniência, sem pretensão científica: servem para conversar com o público sobre o que cada mecanismo pesou, não para concluir sobre pessoas.",
      corpo: (
        <>
          <div className="ap-rotulo">Ao vivo · dados deste navegador</div>
          <h2>
            O que o público <em>jogou</em>
          </h2>
          {m.rodadas === 0 ? (
            <p className="ap-lead">Resultados em consolidação.</p>
          ) : (
            <div className="ap-grade ap-g4">
              {(
                [
                  ["Rodadas", String(m.rodadas)],
                  ["Pontos por rodada (média)", f1(m.pontosMedia)],
                  ["Tempo médio de decisão (s)", m.tempoMedioDecisaoS !== null ? f1(m.tempoMedioDecisaoS) : "–"],
                  ["Pressão percebida 1–5 (média)", m.percepcaoMedia !== null ? f1(m.percepcaoMedia) : "–"],
                ] as const
              ).map(([t, v]) => (
                <div className="ap-cartao" key={t}>
                  <div className="ap-n">{v}</div>
                  <p>{t}</p>
                </div>
              ))}
            </div>
          )}
          {m.rodadas > 0 && (
            <p className="ap-peq">
              Pontos por mecanismo (soma): tempo {m.porMecanismo.tempo} · encadeadas {m.porMecanismo.encadeadas} · opacidade{" "}
              {m.porMecanismo.opacidade}. Rodadas com recusa por segurança: {m.rodadasComRecusaSeguranca}. Com cartas: {m.porModo.cartas} ·
              digital: {m.porModo.digital}. Respostas de pressão percebida: {m.percepcaoRespostas} (notas 1 a 5:{" "}
              {m.percepcaoDistribuicao.join(", ")}).
            </p>
          )}
          <p className="ap-aviso">
            {AVISO_AMOSTRA} {AVISO_FICTICIO}
          </p>
        </>
      ),
    },
    {
      id: "limites",
      titulo: "Limites e cuidados",
      notas: "Dizer com clareza o que o trabalho não faz. Isso protege a credibilidade do que ele faz.",
      corpo: (
        <>
          <div className="ap-rotulo">Limites e cuidados</div>
          <h2>
            O que isto <em>não é</em>
          </h2>
          <ul className="ap-lista" style={{ fontSize: 27 }}>
            {LIMITES.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </>
      ),
    },
    {
      id: "conclusao",
      titulo: "Conclusão",
      escuro: true,
      notas: "Fechar com os três requisitos como proposta prática e convidar o público a jogar. Agradecer.",
      corpo: (
        <>
          <div className="ap-rotulo">Proposta</div>
          <h2>
            Três requisitos <em>de projeto</em>
          </h2>
          <div className="ap-grade ap-g3">
            {MECANISMOS.map((x) => (
              <div className="ap-cartao" key={x.t}>
                <h3>{x.t}</h3>
                <p>{x.r}</p>
              </div>
            ))}
          </div>
          <p className="ap-lead">O algoritmo também é posto de trabalho. Quer sentir o ritmo? Sente-se e jogue.</p>
        </>
      ),
    },
    {
      id: "grupo",
      titulo: "Grupo 4",
      notas: "Agradecer à professora e à turma. Deixar o jogo disponível.",
      corpo: (
        <>
          <div className="ap-rotulo">Quem somos</div>
          <h2>
            Grupo <em>4</em>
          </h2>
          <div className="ap-grade ap-g4">
            {GRUPO.map((n) => (
              <div className="ap-cartao" key={n}>
                <h3>{n}</h3>
              </div>
            ))}
          </div>
          <p className="ap-peq">{DISCIPLINA}</p>
        </>
      ),
    },
  ];
}
