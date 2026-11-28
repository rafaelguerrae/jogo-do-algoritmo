import Link from "next/link";
import { GRUPO, MECANISMOS, REFS } from "@/lib/conteudo";

export default function Projeto() {
  return (
    <main className="slides">
      <section className="slide" id="inicio">
        <div className="rotulo">I Mostra de Ergonomia · UFABC · ESGE006-23 · 01/12/2026</div>
        <h1 className="cond" style={{ fontSize: "clamp(min(72px,18vw),14vw,220px)" }}>
          Jogo do
          <br />
          <span className="laranja">Algoritmo</span>
        </h1>
        <p className="lead">
          Gestão algorítmica e carga mental no trabalho por aplicativo. Uma simulação para sentir o ritmo que o algoritmo impõe.
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Link className="btn" href="/jogo">
            Jogar agora
          </Link>
        </div>
        <p className="nota-rodape">
          Eixo V: Inteligência Artificial em Ergonomia e Fatores Humanos · Engenharia de Segurança do Trabalho: Ergonomia
        </p>
      </section>

      <section className="slide escuro" id="problema">
        <div className="rotulo">O problema</div>
        <h2>
          O algoritmo é o <em>posto de trabalho.</em>
        </h2>
        <p className="lead">
          Plataformas digitais substituem boa parte da gestão humana por algoritmos que distribuem tarefas, monitoram o desempenho e aplicam
          punições. Para entregadores e motoristas, é ele quem define o ritmo, a carga e o ambiente de decisão.
        </p>
        <p className="lead">
          Opacidade, pressão de tempo e metas dinâmicas ignoram limites cognitivos humanos, e isso pode gerar sobrecarga mental e fadiga.
        </p>
        <p className="nota-rodape">
          Segundo o projeto, o Brasil tem cerca de 589 mil entregadores de aplicativo (IBGE/Unicamp), uma população amplamente exposta a
          esses riscos.
        </p>
      </section>

      <section className="slide" id="pergunta">
        <div className="rotulo">Pergunta de pesquisa</div>
        <h2>
          Lei <em>e</em> projeto da interface
        </h2>
        <p className="lead">
          Como a gestão algorítmica afeta a carga mental dos trabalhadores por aplicativo e de que forma os requisitos ergonômicos de
          projeto se diferenciam das regras jurídicas (trabalhistas) para mitigar esses impactos na interface humano-sistema?
        </p>
        <div className="cols">
          <div className="cartao">
            <h3>O debate regulatório</h3>
            <p>
              Projetos de lei como o PLP 152/2025 e a diretiva europeia têm foco predominante em vínculo, remuneração e contratos. O artigo
              compara o conteúdo desses documentos para ver o que dizem sobre o design da tarefa.
            </p>
          </div>
          <div className="cartao">
            <h3>O olhar da Ergonomia</h3>
            <p>
              Atua no design da tarefa: parâmetros operacionais pensados para o bem-estar cognitivo, como tempo útil de decisão antes de
              punições e limites para metas encadeadas.
            </p>
          </div>
        </div>
      </section>

      <section className="slide escuro" id="mecanismos">
        <div className="rotulo">Três mecanismos, três requisitos</div>
        <h2>
          O que o jogo <em>mostra</em>
        </h2>
        <div className="grade">
          {MECANISMOS.map((m) => (
            <div className="cartao" key={m.t}>
              <div className="n">{m.n}</div>
              <h3>{m.t}</h3>
              <p>{m.d}</p>
              <div className="req">
                <b>Requisito:</b> {m.r}
              </div>
            </div>
          ))}
        </div>
        <p className="nota-rodape">
          Os pontos (+1, +2, +3) são pesos de jogo, fictícios. Não medem fadiga nem carga mental de ninguém. O que a literatura sustenta são
          os mecanismos, não os números.
        </p>
      </section>

      <section className="slide" id="jogo">
        <div className="rotulo">Como jogar</div>
        <h2>
          Nove segundos <em>para decidir</em>
        </h2>
        <ul className="lista" style={{ maxWidth: 760 }}>
          <li>O visitante assume o papel de trabalhador de aplicativo.</li>
          <li>O grupo opera o “algoritmo”: sorteia corridas e registra aceites e recusas.</li>
          <li>A tela mostra os pontos de sobrecarga subindo em tempo real.</li>
          <li>No fim, o visitante vê quais mecanismos pesaram e aplica os requisitos ergonômicos para ver os pontos caírem.</li>
        </ul>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Link className="btn" href="/jogo">
            Abrir o jogo
          </Link>
          <Link className="btn claro" href="/baralho">
            Baralho para imprimir
          </Link>
        </div>
      </section>

      <section className="slide escuro" id="metodo">
        <div className="rotulo">Método</div>
        <h2>
          Revisão integrativa e <em>análise documental</em>
        </h2>
        <div className="cols">
          <ul className="lista">
            <li>Buscas em Google Acadêmico, SciELO, Periódicos CAPES, Scopus e anais da ABERGO.</li>
            <li>Termos: “gestão algorítmica”, “carga mental”, “fadiga”, “platform work”.</li>
            <li>Matriz de extração para organizar mecanismos de controle e efeitos.</li>
            <li>Análise de textos normativos, comparando o conteúdo antes de concluir.</li>
          </ul>
          <ul className="lista">
            <li>Fundamento: relatório ALMA-AI (PEROSH), que trata a IA como nova forma de organização do trabalho.</li>
            <li>Sem coleta de dados primários com pessoas.</li>
            <li>O NASA-TLX é referência de dimensões da carga de trabalho na literatura; o estudo não o aplica a pessoas.</li>
            <li>Resultado: requisitos ergonômicos concretos para o design das interfaces algorítmicas.</li>
          </ul>
        </div>
      </section>

      <section className="slide" id="grupo">
        <div className="rotulo">Quem somos</div>
        <h2>
          Grupo <em>4</em>
        </h2>
        <div className="grade">
          {GRUPO.map((n) => (
            <div className="cartao" key={n}>
              <h3>{n}</h3>
            </div>
          ))}
        </div>
        <p className="lead" style={{ fontSize: 20 }}>
          Universidade Federal do ABC · Engenharia de Segurança do Trabalho: Ergonomia (ESGE006-23) · Turma NA1ESGE006-23SB · Profa. Giselle
          Ramirez Canedo
        </p>
        <details>
          <summary className="rotulo" style={{ cursor: "pointer" }}>
            Referências
          </summary>
          <div className="refs" style={{ marginTop: 14 }}>
            {REFS.map((r) => (
              <p key={r}>{r}</p>
            ))}
          </div>
        </details>
      </section>
    </main>
  );
}
