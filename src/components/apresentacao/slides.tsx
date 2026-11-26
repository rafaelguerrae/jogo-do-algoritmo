import type { ReactNode } from "react";
import { AVISO_FICTICIO, DISCIPLINA, GRUPO, MECANISMOS, REFS } from "@/lib/conteudo";
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
    d: "Pessoa, tarefa, ferramentas, ambiente e organização, em conjunto. Na Ergonomia, o algoritmo é parte do sistema de trabalho: é projeto, e projeto pode ser melhorado.",
  },
];

const TLX = ["Demanda mental", "Demanda física", "Demanda temporal", "Desempenho", "Esforço", "Frustração"];

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
        "Plataformas digitais substituem boa parte da gestão humana por sistemas que distribuem tarefas, monitoram e punem. Para quem entrega, o algoritmo define ritmo, carga e ambiente de decisão. O número de entregadores é o citado no projeto (IBGE/Unicamp).",
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
              <b>~589 mil</b>
              <span>entregadores de aplicativo no Brasil, segundo dado citado no projeto (IBGE/Unicamp)</span>
            </div>
          </div>
          <p className="ap-peq">
            Opacidade, pressão de tempo e metas dinâmicas ignoram limites cognitivos humanos e podem gerar sobrecarga mental e fadiga.
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
            Referência de dimensões da carga na literatura (NASA-TLX): {TLX.join(", ")}. O estudo não aplica o questionário em pessoas.
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
          <h2>
            Lei <em>e</em> projeto da interface
          </h2>
          <p className="ap-lead">
            Como a gestão algorítmica afeta a carga mental dos trabalhadores por aplicativo e de que forma os requisitos ergonômicos de
            projeto se diferenciam das regras jurídicas (trabalhistas) para mitigar esses impactos na interface humano-sistema?
          </p>
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
          <h2>
            Revisão integrativa e <em>análise documental</em>
          </h2>
          <div className="ap-cols">
            <ul className="ap-lista">
              <li>Buscas em Google Acadêmico, SciELO, Periódicos CAPES, Scopus e anais da ABERGO.</li>
              <li>Termos: “gestão algorítmica”, “carga mental”, “fadiga”, “platform work”.</li>
              <li>Matriz de extração para organizar mecanismos de controle e efeitos.</li>
              <li>Análise de textos normativos, comparando o conteúdo antes de concluir.</li>
            </ul>
            <ul className="ap-lista">
              <li>Fundamento: relatório ALMA-AI (PEROSH), que trata a IA como nova forma de organização do trabalho.</li>
              <li>
                <b>Sem coleta de dados primários</b> com pessoas.
              </li>
              <li>Resultado: requisitos ergonômicos concretos para o design das interfaces algorítmicas.</li>
            </ul>
          </div>
        </>
      ),
    },
    {
      id: "fontes",
      titulo: "Fontes",
      notas:
        "Mostrar a base: artigos e relatórios revisados por pares ou institucionais. A lista completa está também na página do projeto.",
      corpo: (
        <>
          <div className="ap-rotulo">Fontes</div>
          <h2>
            O que <em>sustenta</em> o trabalho
          </h2>
          <ol className="ap-refs">
            {REFS.map((r) => (
              <li key={r}>{r}</li>
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
        "Percorrer a linha de cada mecanismo: o que ele pede de quem trabalha, como aparece no jogo e qual requisito de projeto o corrige. A evidência por mecanismo vem da matriz de extração do artigo, em elaboração.",
      corpo: (
        <>
          <div className="ap-rotulo">Três mecanismos, três requisitos</div>
          <h2>
            Da regra ao <em>requisito</em>
          </h2>
          <table className="ap-tab">
            <thead>
              <tr>
                <th>Mecanismo</th>
                <th>Exigência sobre quem trabalha</th>
                <th>No jogo</th>
                <th>Requisito ergonômico</th>
              </tr>
            </thead>
            <tbody>
              {MECANISMOS.map((x) => (
                <tr key={x.t}>
                  <td>
                    <b>{x.t}</b>
                  </td>
                  <td>{x.exigencia}</td>
                  <td>{x.d}</td>
                  <td>{x.r}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="ap-peq">Evidências por mecanismo: matriz de extração do artigo (em elaboração).</p>
        </>
      ),
    },
    {
      id: "regulacao",
      titulo: "Lei e projeto",
      notas:
        "Cuidado com a afirmação: o debate regulatório tem foco predominante em vínculo, remuneração e contratos. Não dizer que é exclusivo. A comparação documental completa é do artigo.",
      corpo: (
        <>
          <div className="ap-rotulo">Dois olhares complementares</div>
          <h2>
            Lei <em>+</em> projeto
          </h2>
          <div className="ap-grade ap-g2">
            <div className="ap-cartao">
              <h3>O debate regulatório</h3>
              <p>
                Projetos como o PLP 152/2025 e a diretiva europeia têm foco predominante em vínculo, remuneração e contratos. O artigo
                compara o conteúdo desses documentos para ver o que dizem sobre o design da tarefa.
              </p>
            </div>
            <div className="ap-cartao">
              <h3>O olhar da Ergonomia</h3>
              <p>
                Atua no design da tarefa: parâmetros operacionais pensados para o bem-estar cognitivo, como tempo útil de decisão antes de
                punições e limites para metas encadeadas.
              </p>
            </div>
          </div>
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
            Nove segundos <em>para decidir</em>
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
                <td>Corrida complexa (limite {TEMPO_COMPLEXA_S} s) aceita em menos de 10 s</td>
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
            <p className="ap-lead">Nenhuma rodada ainda. Jogue uma em /jogo e volte aqui.</p>
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
              digital: {m.porModo.digital}.
            </p>
          )}
          <p className="ap-aviso">Amostra de conveniência na Mostra, sem pretensão científica. {AVISO_FICTICIO}</p>
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
          <ul className="ap-lista ap-grande">
            <li>Não mede fadiga nem carga mental de ninguém: pontos e nota são fictícios.</li>
            <li>Não é pesquisa com pessoas: não há coleta primária; a pressão percebida é opinião.</li>
            <li>Não generaliza: a amostra da Mostra é de conveniência.</li>
            <li>Não esgota o tema: a comparação dos documentos normativos é do artigo.</li>
            <li>A participação é voluntária: pode parar a qualquer momento.</li>
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
