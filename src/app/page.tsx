import Link from "next/link";
import { ComCitacoes, Italico } from "@/components/Citacao";
import {
  CONTEXTO,
  DEBATE,
  ENTREGADORES,
  GRUPO,
  LIMITES,
  LINKS_NORMAS,
  LITERATURA,
  MATRIZ,
  MECANISMOS,
  METODO,
  OBJETIVO_GERAL,
  OBJETIVOS_ESPECIFICOS,
  OLHAR_ERGONOMIA,
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
import { ESTUDOS, FORA_DA_MATRIZ, linhasDoEstudo, MATRIZ_PREENCHIDA } from "@/lib/matriz";

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
          Opacidade, pressão de tempo e metas dinâmicas podem ignorar limites cognitivos humanos e gerar sobrecarga mental e fadiga.
        </p>
        {CONTEXTO.map((t) => (
          <p className="nota-rodape" key={t}>
            <ComCitacoes texto={t} />
          </p>
        ))}
        <p className="nota-rodape">
          <ComCitacoes texto={ENTREGADORES} />
        </p>
      </section>

      <section className="slide" id="pergunta">
        <div className="rotulo">Pergunta de pesquisa</div>
        <h2>
          Lei <em>e</em> projeto da interface
        </h2>
        <p className="lead">{PERGUNTA}</p>
        <h3 className="rotulo">Objetivo geral</h3>
        <p style={{ maxWidth: "80ch" }}>{OBJETIVO_GERAL}</p>
        <h3 className="rotulo">Objetivos específicos</h3>
        <ul className="lista" style={{ maxWidth: 900 }}>
          {OBJETIVOS_ESPECIFICOS.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="cols">
          <div className="cartao">
            <h3>O debate regulatório</h3>
            <p>{DEBATE}</p>
          </div>
          <div className="cartao">
            <h3>O olhar da Ergonomia</h3>
            <p>{OLHAR_ERGONOMIA}</p>
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
          Os pontos de sobrecarga (+1, +2, +3) são pesos de jogo, fictícios, sem base em estudo ou medida humana. Não medem fadiga nem carga
          mental de ninguém. O que a literatura sustenta são os mecanismos, não os números.
        </p>
      </section>

      <section className="slide" id="literatura">
        <div className="rotulo">Evidência por mecanismo</div>
        <h2>
          O que a literatura <em>mostra</em>
        </h2>
        <table className="quadro">
          <thead>
            <tr>
              <th>Mecanismo</th>
              <th>Efeito descrito</th>
              <th>Fonte</th>
            </tr>
          </thead>
          <tbody>
            {LITERATURA.map((l) => (
              <tr key={l.efeito}>
                <th scope="row">{l.mecanismo}</th>
                <td data-label="Efeito descrito">{l.efeito}</td>
                <td data-label="Fonte">
                  <ComCitacoes texto={`${REFERENCIAS[l.ref].citacao}, ${l.onde}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="nota-rodape">{RESSALVA_LITERATURA}</p>
      </section>

      <section className="slide escuro" id="requisitos">
        <div className="rotulo">Como cada requisito é fundamentado</div>
        <h2>
          Do mecanismo <em>à melhoria</em>
        </h2>
        <table className="quadro">
          <thead>
            <tr>
              <th>Mecanismo de gestão</th>
              <th>Exigência gerada</th>
              <th>Evidência encontrada</th>
              <th>Possibilidade de melhoria</th>
            </tr>
          </thead>
          <tbody>
            {SEQUENCIA.map((l) => (
              <tr key={l.mecanismo}>
                <th scope="row">{l.mecanismo}</th>
                <td data-label="Exigência gerada">{l.exigencia}</td>
                <td data-label="Evidência encontrada">
                  <ComCitacoes texto={l.evidencia} /> <b>Limite:</b> {l.lacuna}
                </td>
                <td data-label="Possibilidade de melhoria">{l.melhoria}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="slide" id="sistema">
        <div className="rotulo">Sistema de trabalho</div>
        <h2>
          O algoritmo <em>não age sozinho</em>
        </h2>
        <p className="lead">{SISTEMA_INTRO}</p>
        <table className="quadro">
          <thead>
            <tr>
              <th>Componente</th>
              <th>Evidência encontrada</th>
              <th>Pergunta de projeto</th>
              <th>No jogo</th>
            </tr>
          </thead>
          <tbody>
            {SISTEMA.map((l) => (
              <tr key={l.componente}>
                <th scope="row">{l.componente}</th>
                <td data-label="Evidência encontrada">
                  <ComCitacoes texto={l.evidencia} />
                </td>
                <td data-label="Pergunta de projeto">{l.pergunta}</td>
                <td data-label="No jogo">{l.noJogo}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="nota-rodape">{RESSALVA_SISTEMA}</p>
      </section>

      <section className="slide escuro" id="regulacao">
        <div className="rotulo">Análise documental</div>
        <h2>
          Regras jurídicas × <em>requisitos ergonômicos</em>
        </h2>
        <table className="quadro">
          <thead>
            <tr>
              <th>Tema</th>
              <th>O que o texto normativo trata</th>
              <th>O que o projeto da interface exige</th>
            </tr>
          </thead>
          <tbody>
            {REGULACAO.map((l) => (
              <tr key={l.tema}>
                <th scope="row">{l.tema}</th>
                <td data-label="O que o texto normativo trata">
                  <b>Diretiva:</b> {l.diretiva}
                  <br />
                  <b>PLP:</b> {l.plp}{" "}
                  {l.refs.map((id) => (
                    <span key={id}>
                      (<ComCitacoes texto={REFERENCIAS[id].citacao} />)
                    </span>
                  ))}
                </td>
                <td data-label="O que o projeto da interface exige">{l.projeto}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ul className="lista">
          {LINKS_NORMAS.map((l) => (
            <li key={l.url}>
              <a href={l.url} target="_blank" rel="noreferrer">
                {l.rotulo}
              </a>
            </li>
          ))}
        </ul>
        <p className="nota-rodape">{RESSALVA_REGULACAO}</p>
      </section>

      <section className="slide" id="jogo">
        <div className="rotulo">Como jogar</div>
        <h2>
          Pouco tempo <em>para decidir</em>
        </h2>
        <ul className="lista" style={{ maxWidth: 760 }}>
          <li>O visitante assume o papel de trabalhador de aplicativo.</li>
          <li>O grupo opera o “algoritmo”: sorteia corridas e registra aceites e recusas.</li>
          <li>A tela mostra os pontos de sobrecarga (fictícios) subindo em tempo real.</li>
          <li>No fim, o visitante vê quais mecanismos pesaram e aplica os requisitos ergonômicos para ver os pontos caírem.</li>
        </ul>
        <p className="nota-rodape">
          <ComCitacoes
            texto={`${PORQUE_9S} Para comparação, a literatura relata de 10 a 40 segundos para decidir (${REFERENCIAS.rani.citacao}, p. 20).`}
          />
        </p>
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
        <ul className="lista duas">
          {METODO.map((t) => (
            <li key={t}>
              <ComCitacoes texto={t} />
            </li>
          ))}
        </ul>
        <h3 className="rotulo">Matriz de extração: oito dimensões</h3>
        <table className="quadro">
          <thead>
            <tr>
              <th>Dimensão</th>
              <th>O que registrar</th>
            </tr>
          </thead>
          <tbody>
            {MATRIZ.map((m) => (
              <tr key={m.dimensao}>
                <th scope="row">{m.dimensao}</th>
                <td data-label="O que registrar">{m.registrar}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="nota-rodape">{RESSALVA_MATRIZ}</p>
        <details className="matriz">
          <summary className="rotulo">
            Ver a matriz preenchida: {ESTUDOS.length} estudos, {MATRIZ_PREENCHIDA.length} linhas
          </summary>
          {ESTUDOS.map((e) => (
            <article key={e.ref}>
              <h3>
                <ComCitacoes texto={REFERENCIAS[e.ref].citacao} />
              </h3>
              <p>
                <b>Tipo:</b> {e.tipo}. <b>Contexto:</b> {e.contexto} <b>Limitações:</b> {e.limitacoes}
              </p>
              <table className="quadro">
                <thead>
                  <tr>
                    <th>Mecanismo</th>
                    <th>Exigência gerada</th>
                    <th>Evidência</th>
                    <th>Sistema de trabalho</th>
                    <th>Melhoria</th>
                  </tr>
                </thead>
                <tbody>
                  {linhasDoEstudo(e).map((l) => (
                    <tr key={l.nome}>
                      <th scope="row">{l.nome}</th>
                      <td data-label="Exigência gerada">{l.exigencia}</td>
                      <td data-label="Evidência">{l.evidencia}</td>
                      <td data-label="Sistema de trabalho">{l.sistema}</td>
                      <td data-label="Melhoria">{l.melhoria}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
          ))}
          <p className="nota-rodape">{FORA_DA_MATRIZ}</p>
        </details>
      </section>

      <section className="slide" id="limites">
        <div className="rotulo">Limites e cuidados</div>
        <h2>
          O que isto <em>não é</em>
        </h2>
        <ul className="lista" style={{ maxWidth: 900 }}>
          {LIMITES.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>

      <section className="slide escuro" id="grupo">
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
      </section>

      <section className="slide" id="referencias">
        <div className="rotulo">APA 7 · ordem alfabética</div>
        <h2>Referências</h2>
        <div className="refs">
          {REF_IDS.map((id) => (
            <p key={id} id={`ref-${id}`}>
              <Italico texto={REFERENCIAS[id].apa} />{" "}
              <a href={REFERENCIAS[id].url} target="_blank" rel="noreferrer">
                {REFERENCIAS[id].url}
              </a>
            </p>
          ))}
        </div>
      </section>
    </main>
  );
}
