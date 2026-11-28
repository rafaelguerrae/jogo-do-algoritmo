"use client";
import { BARALHO, brl, type Corrida, km, TEMPO_COMPLEXA_S, TEMPO_SIMPLES_S } from "@/lib/deck";

const Frente = ({ c }: { c: Corrida }) => (
  <div className="carta">
    <div className="top">
      <span>CORRIDA</span>
      <span className="no">{c.id}</span>
    </div>
    <div className="l">
      <b>Coleta:</b> {c.origem} · {km(c.kmColeta)} km
      <br />
      <b>Destino:</b> {c.destino} · {km(c.kmEntrega)} km
      <br />
      <b>Valor:</b> R$ {brl(c.valor)}
    </div>
    {c.obs && <div className="o">{c.obs}</div>}
    <div className="rel">
      <small>
        ACEITE
        <br />
        EM
      </small>
      <span>00:{String(c.complexa ? TEMPO_COMPLEXA_S : TEMPO_SIMPLES_S).padStart(2, "0")}</span>
    </div>
    <div className="bt">ACEITAR</div>
  </div>
);
const Costas = () => (
  <div className="carta costas">
    <div className="p" />
    <div style={{ position: "relative" }}>
      <div className="j">
        Jogo do
        <br />
        <span>Algoritmo</span>
      </div>
      <div className="s">UFABC · ESGE006-23</div>
    </div>
  </div>
);

const paginas = Array.from({ length: Math.ceil(BARALHO.length / 9) }, (_, i) => BARALHO.slice(i * 9, i * 9 + 9));

export default function Baralho() {
  return (
    <main>
      <div className="semprint" style={{ maxWidth: 800, margin: "0 auto", padding: "28px 24px" }}>
        <h1 className="cond" style={{ fontSize: 64 }}>
          Baralho <span className="laranja">para imprimir</span>
        </h1>
        <p style={{ margin: "12px 0 16px" }}>
          {BARALHO.length} cartas-corrida em formato 63 × 88 mm, 9 por folha A4. Imprima em escala 100%, sem “ajustar à página”. As folhas
          de verso seguem a ordem espelhada, para impressão frente e verso (virar pela borda longa). Corte nas linhas tracejadas.
        </p>
        <p className="rotulo" style={{ marginBottom: 16 }}>
          Cartas “complexas” dão pouco tempo para decidir ({TEMPO_COMPLEXA_S} s no jogo, regra 1). Cartas com observação de risco permitem
          recusar por segurança (regra 3).
        </p>
        <button className="btn" onClick={() => window.print()}>
          Imprimir
        </button>
      </div>
      {paginas.map((pg, i) => (
        <div key={`f${i}`}>
          <div className="folha">
            {pg.map((c) => (
              <Frente key={c.id} c={c} />
            ))}
          </div>
          <div className="folha verso">
            {pg.map((c) => (
              <Costas key={c.id} />
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
