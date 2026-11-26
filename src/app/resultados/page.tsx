"use client";
import { useMemo } from "react";
import { limparSessoes, useSessoes } from "@/lib/store";
import { resolvidas, sessaoParaCsv, somaPor } from "@/lib/game";

const media = (a: number[]) => (a.length ? a.reduce((s, x) => s + x, 0) / a.length : 0);
const f1 = (n: number) => n.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export default function Resultados() {
  const todas = useSessoes();
  const lista = useMemo(() => [...todas].sort((a, b) => b.inicio - a.inicio), [todas]);
  const percs = lista.map((s) => s.percepcao).filter((x): x is number => x !== null);

  const baixar = () => {
    const blob = new Blob(["﻿" + sessaoParaCsv(lista)], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `jogo-do-algoritmo-resultados-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const cartoes: [string, string][] = [
    ["Rodadas jogadas", String(lista.length)],
    ["Pontos por rodada (média)", f1(media(lista.map((s) => s.pontos)))],
    ["Pressão percebida 1–5 (média)", percs.length ? f1(media(percs)) : "–"],
    ["Rodadas com recusa por segurança", String(lista.filter((s) => somaPor(s, "opacidade") > 0).length)],
  ];

  return (
    <main className="roteiro" style={{ maxWidth: 1100 }}>
      <h1 className="cond" style={{ fontSize: 72 }}>Resultados <span className="laranja">da Mostra</span></h1>
      <p className="rotulo">Dados guardados só neste navegador (sem servidor). Exporte antes de trocar de computador. Percepção = opinião do visitante, não medida científica.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20 }}>
        {cartoes.map(([t, v]) => (
          <div key={t} className="painel"><div className="rotulo">{t}</div><div className="cond laranja" style={{ fontSize: 64 }}>{v}</div></div>
        ))}
      </div>

      <div className="painel">
        <h3>Pontos por mecanismo (soma de todas as rodadas)</h3>
        <table className="tab">
          <thead><tr><th>Mecanismo</th><th>Pontos</th></tr></thead>
          <tbody>
            {(["tempo", "encadeadas", "opacidade"] as const).map((f) => (
              <tr key={f}><td>{{ tempo: "Pressão de tempo", encadeadas: "Metas encadeadas", opacidade: "Opacidade e punição" }[f]}</td><td>{lista.reduce((s, x) => s + somaPor(x, f), 0)}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="painel">
        <h3>Rodadas</h3>
        {lista.length === 0 ? <p>Nenhuma rodada ainda. Jogue uma em <b>Jogo</b>.</p> : (
          <table className="tab">
            <thead><tr><th>Hora</th><th>Visitante</th><th>Corridas</th><th>Pontos</th><th>Tempo</th><th>Seguidas</th><th>Opacidade</th><th>Pressão 1–5</th></tr></thead>
            <tbody>
              {lista.map((s) => (
                <tr key={s.id}>
                  <td>{new Date(s.inicio).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</td>
                  <td>{s.apelido || "–"}</td><td>{resolvidas(s)}</td><td><span className="pt">{s.pontos}</span></td>
                  <td>{somaPor(s, "tempo")}</td><td>{somaPor(s, "encadeadas")}</td><td>{somaPor(s, "opacidade")}</td><td>{s.percepcao ?? "–"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        <button className="btn" disabled={!lista.length} onClick={baixar}>Exportar CSV</button>
        <button className="btn claro" disabled={!lista.length} onClick={() => { if (window.confirm("Apagar todas as rodadas salvas neste navegador?")) limparSessoes(); }}>Apagar tudo</button>
      </div>
    </main>
  );
}
