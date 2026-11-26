"use client";
import { useEffect, useState } from "react";
import { ABERTURA, DICAS, PERGUNTAS, PITCH_30S } from "@/lib/roteiro";

export default function Roteiro() {
  const [seg, setSeg] = useState(0);
  const [rodando, setRodando] = useState(false);
  useEffect(() => {
    if (!rodando) return;
    const i = setInterval(() => setSeg((s) => s + 1), 1000);
    return () => clearInterval(i);
  }, [rodando]);
  const mm = `${Math.floor(seg / 60)}:${String(seg % 60).padStart(2, "0")}`;

  return (
    <main className="roteiro">
      <h1 className="cond" style={{ fontSize: 72 }}>
        Roteiro <span className="laranja">da apresentação</span>
      </h1>
      <p className="rotulo">Cerca de 5 minutos por visitante · uma pessoa opera, outra fala</p>

      <div className="painel" style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
        <span className="cond laranja" style={{ fontSize: 56 }}>
          {mm}
        </span>
        <button className="btn pequeno" onClick={() => setRodando(!rodando)}>
          {rodando ? "Pausar" : "Iniciar cronômetro"}
        </button>
        <button
          className="btn pequeno claro"
          onClick={() => {
            setSeg(0);
            setRodando(false);
          }}
        >
          Zerar
        </button>
      </div>

      <div className="bloco">
        <div className="tempo">PITCH DE 30 SEGUNDOS (para a professora ou para quem passar)</div>
        <p className="fala">{PITCH_30S}</p>
      </div>

      {ABERTURA.map((b) => (
        <div className="bloco" key={b.titulo}>
          <div className="tempo">{b.tempo}</div>
          <h3>{b.titulo}</h3>
          <p className="fala">“{b.fala}”</p>
          {b.acao && <p className="gesto">{b.acao}</p>}
        </div>
      ))}

      <div className="bloco">
        <h3>Perguntas que podem aparecer</h3>
        {PERGUNTAS.map((q) => (
          <p key={q.p} style={{ margin: "0 0 12px" }}>
            <b>{q.p}</b>
            <br />
            {q.r}
          </p>
        ))}
      </div>

      <div className="bloco">
        <h3>Dicas para o grupo</h3>
        <ul className="lista">
          {DICAS.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
