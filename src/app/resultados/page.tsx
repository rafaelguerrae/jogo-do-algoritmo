"use client";
import { useMemo, useRef } from "react";
import { modoDe, resolvidas, sessaoParaCsv, somaPor, tempoMedioDecisaoS } from "@/lib/game";
import { f1, MECANISMOS, metricas } from "@/lib/metricas";
import { limparSessoes, useSessoes } from "@/lib/store";

const NOMES = { tempo: "Pressão de tempo", encadeadas: "Metas encadeadas", opacidade: "Opacidade e punição" } as const;

export default function Resultados() {
  const todas = useSessoes();
  const lista = useMemo(() => [...todas].sort((a, b) => b.inicio - a.inicio), [todas]);
  const m = useMemo(() => metricas(lista), [lista]);
  const confirmar = useRef<HTMLDialogElement>(null);

  const baixar = () => {
    const blob = new Blob([`﻿${sessaoParaCsv(lista)}`], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `jogo-do-algoritmo-resultados-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const cartoes: [string, string][] = [
    ["Rodadas jogadas", String(m.rodadas)],
    ["Pontos por rodada (média)", f1(m.pontosMedia)],
    ["Pressão percebida 1–5 (média)", m.percepcaoMedia !== null ? f1(m.percepcaoMedia) : "–"],
    ["Rodadas com recusa por segurança", String(m.rodadasComRecusaSeguranca)],
    ["Tempo médio de decisão (s)", m.tempoMedioDecisaoS !== null ? f1(m.tempoMedioDecisaoS) : "–"],
    ["Cartas / digital", `${m.porModo.cartas} / ${m.porModo.digital}`],
  ];

  return (
    <main className="roteiro" style={{ maxWidth: 1100 }}>
      <h1 className="cond" style={{ fontSize: "min(72px,16vw)" }}>
        Resultados <span className="laranja">da Mostra</span>
      </h1>
      <p className="rotulo">
        Dados guardados só neste navegador (sem servidor). Exporte antes de trocar de computador. Percepção = opinião do visitante, não
        medida científica. Pontos são fictícios.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20 }}>
        {cartoes.map(([t, v]) => (
          <div key={t} className="painel">
            <div className="rotulo">{t}</div>
            <div className="cond laranja" style={{ fontSize: 64 }}>
              {v}
            </div>
          </div>
        ))}
      </div>

      <div className="painel">
        <h3>Pontos por mecanismo (soma de todas as rodadas)</h3>
        <table className="tab">
          <thead>
            <tr>
              <th>Mecanismo</th>
              <th>Pontos</th>
            </tr>
          </thead>
          <tbody>
            {MECANISMOS.map((f) => (
              <tr key={f}>
                <td>{NOMES[f]}</td>
                <td>{m.porMecanismo[f]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="painel">
        <h3>Rodadas</h3>
        {lista.length === 0 ? (
          <p>
            Nenhuma rodada ainda. Jogue uma em <b>Jogo</b>.
          </p>
        ) : (
          <table className="tab rodadas">
            <thead>
              <tr>
                <th>Hora</th>
                <th>Modo</th>
                <th>Visitante</th>
                <th>Corridas</th>
                <th>Pontos</th>
                <th>Tempo</th>
                <th>Seguidas</th>
                <th>Opacidade</th>
                <th>Decisão (s)</th>
                <th>Pressão 1–5</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((s) => {
                const t = tempoMedioDecisaoS(s);
                return (
                  <tr key={s.id}>
                    <td data-label="Hora">{new Date(s.inicio).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</td>
                    <td data-label="Modo">{modoDe(s) === "digital" ? "digital" : "cartas"}</td>
                    <td data-label="Visitante">{s.apelido || "–"}</td>
                    <td data-label="Corridas">{resolvidas(s)}</td>
                    <td data-label="Pontos">
                      <span className="pt">{s.pontos}</span>
                    </td>
                    <td data-label="Tempo">{somaPor(s, "tempo")}</td>
                    <td data-label="Seguidas">{somaPor(s, "encadeadas")}</td>
                    <td data-label="Opacidade">{somaPor(s, "opacidade")}</td>
                    <td data-label="Decisão (s)">{t !== null ? f1(t) : "–"}</td>
                    <td data-label="Pressão 1–5">{s.percepcao ?? "–"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <div className="acoes-resultados">
        <button className="btn" disabled={!lista.length} onClick={baixar}>
          Exportar CSV
        </button>
        <button className="btn claro" disabled={!lista.length} onClick={() => confirmar.current?.showModal()}>
          Apagar
        </button>
      </div>

      <dialog ref={confirmar} className="confirmar" aria-labelledby="confirmar-titulo" aria-describedby="confirmar-texto">
        <h2 id="confirmar-titulo">Apagar rodadas?</h2>
        <p id="confirmar-texto">Todas as rodadas salvas neste navegador serão apagadas. Não dá para desfazer.</p>
        <form method="dialog" className="acoes">
          <button type="submit" className="btn claro">
            Cancelar
          </button>
          <button type="submit" className="btn laranja" onClick={limparSessoes}>
            Apagar
          </button>
        </form>
      </dialog>
    </main>
  );
}
