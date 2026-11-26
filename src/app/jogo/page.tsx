"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import CartaCorrida, { restanteMs, useAgora } from "@/components/CartaCorrida";
import Medidor from "@/components/Medidor";
import Resumo from "@/components/Resumo";
import { BARALHO, porId } from "@/lib/deck";
import { ESTADO_INICIAL, pontosEfetivos, decidir, encerrar, iniciar, pausar, proxima, resolvidas, type Decisao } from "@/lib/game";
import { definirEstado, salvarSessao, useEstado } from "@/lib/store";

export default function Jogo() {
  const e = useEstado();
  const agora = useAgora(e.status === "jogando" && !!e.corridaAtual);
  const [apelido, setApelido] = useState("");
  const [total, setTotal] = useState(8);
  const [carta, setCarta] = useState("");
  const eRef = useRef(e);
  eRef.current = e;

  const agir = (d: Decisao) => definirEstado(decidir(eRef.current, d));
  const next = (id?: number) => definirEstado(proxima(eRef.current, id));

  // tempo esgotado
  useEffect(() => {
    if (e.corridaAtual && restanteMs(e.corridaAtual, agora) === 0) agir("expirar");
  }, [agora, e.corridaAtual]); // eslint-disable-line react-hooks/exhaustive-deps

  // salva a rodada ao terminar (e de novo se a percepção for marcada)
  useEffect(() => {
    if (e.status === "fim") salvarSessao(e);
  }, [e.status, e.percepcao, e.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // atalhos de teclado
  useEffect(() => {
    const f = (ev: KeyboardEvent) => {
      const alvo = ev.target as HTMLElement;
      if (alvo?.tagName === "INPUT" || alvo?.tagName === "SELECT" || ev.metaKey || ev.ctrlKey) return;
      const s = eRef.current;
      if (s.status !== "jogando") return;
      const k = ev.key.toLowerCase();
      if (s.corridaAtual) {
        if (k === "a") agir("aceitar");
        if (k === "s") agir("recusar_seguranca");
        if (k === "r") agir("recusar_outro");
      } else {
        if (k === "n") next();
        if (k === "p") definirEstado(pausar(s));
      }
    };
    window.addEventListener("keydown", f);
    return () => window.removeEventListener("keydown", f);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const atual = e.corridaAtual ? porId(e.corridaAtual.id) : null;
  const feitas = resolvidas(e);

  return (
    <main className="operador">
      <div className="col">
        {e.status === "espera" && (
          <div className="painel">
            <h2>Nova rodada</h2>
            <p style={{ marginBottom: 16 }}>Você é o <b>algoritmo</b>. Sorteie corridas, marque o que o visitante decidir e acompanhe os pontos de sobrecarga.</p>
            <div className="acoes" style={{ alignItems: "flex-end", marginBottom: 20 }}>
              <label className="campo">Apelido do visitante (opcional)
                <input value={apelido} onChange={(x) => setApelido(x.target.value)} maxLength={24} placeholder="ex.: visitante 12" />
              </label>
              <label className="campo">Corridas na rodada
                <select value={total} onChange={(x) => setTotal(Number(x.target.value))}>
                  {[5, 6, 8, 10, 12].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </label>
            </div>
            <div className="acoes">
              <button className="btn" onClick={() => definirEstado(iniciar(apelido, total))}>Iniciar rodada</button>
              <Link className="btn claro" href="/tela" target="_blank">Abrir tela do visitante</Link>
            </div>
            <p className="nota" style={{ marginTop: 18, fontSize: 14 }}>
              Dica: abra a tela do visitante, arraste para o monitor ou TV e use F11 para tela cheia. As duas janelas se sincronizam sozinhas, sem internet.
            </p>
          </div>
        )}

        {e.status === "jogando" && (
          <>
            <div className="painel">
              <div className="rotulo">Rodada de {e.apelido || "visitante"} · corrida {Math.min(feitas + (e.corridaAtual ? 1 : 1), e.totalCorridas)} de {e.totalCorridas} · seguidas sem pausa: {e.seguidas}</div>
              {e.corridaAtual && atual ? (
                <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 22, alignItems: "flex-start" }}>
                  <CartaCorrida corrida={e.corridaAtual} agora={agora} />
                  <div className="acoes">
                    <button className="btn" onClick={() => agir("aceitar")}>Aceitar<kbd>A</kbd></button>
                    <button className="btn laranja" onClick={() => agir("recusar_seguranca")}>Recusar por segurança<kbd>S</kbd></button>
                    <button className="btn claro" onClick={() => agir("recusar_outro")}>Recusar (outro motivo)<kbd>R</kbd></button>
                  </div>
                  <div className="rotulo">{atual.risco ? "Esta corrida tem risco: recusar por segurança aplica a regra 3." : "Sem risco aparente: recusar por segurança só se o visitante alegar."}</div>
                </div>
              ) : (
                <div style={{ marginTop: 18 }}>
                  <p style={{ marginBottom: 14 }}>{e.ultimo ? e.ultimo.texto : "Pronto para a primeira corrida."}</p>
                  <div className="acoes" style={{ alignItems: "flex-end" }}>
                    <button className="btn" onClick={() => next()}>Sortear próxima<kbd>N</kbd></button>
                    <button className="btn claro" onClick={() => definirEstado(pausar(e))}>Pausa de 5 min (simulada)<kbd>P</kbd></button>
                    <label className="campo" style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>ou carta nº
                      <input style={{ width: 90 }} type="number" min={1} max={BARALHO.length} value={carta} onChange={(x) => setCarta(x.target.value)} />
                    </label>
                    <button className="btn claro pequeno" disabled={!e.fila.includes(Number(carta))} onClick={() => { next(Number(carta)); setCarta(""); }}>Usar carta</button>
                  </div>
                </div>
              )}
            </div>
            <div className="acoes">
              <button className="btn claro pequeno" onClick={() => definirEstado(encerrar(e))}>Encerrar rodada agora</button>
              <button className="btn claro pequeno" onClick={() => definirEstado(ESTADO_INICIAL)}>Cancelar sem salvar</button>
              <Link className="btn claro pequeno" href="/tela" target="_blank">Abrir tela do visitante</Link>
            </div>
          </>
        )}

        {e.status === "fim" && (
          <>
            <Resumo e={e} alternar={(f) => definirEstado({ ...e, aplicados: (e.aplicados ?? []).includes(f) ? e.aplicados.filter((x) => x !== f) : [...(e.aplicados ?? []), f] })} />
            <div className="painel">
              <h3>Percepção do visitante (opcional)</h3>
              <p style={{ marginBottom: 12 }}>“De 1 a 5, quanta pressão você sentiu?” Opinião do visitante. <b>Não é medida científica.</b></p>
              <div className="acoes">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} className={`btn ${e.percepcao === n ? "" : "claro"}`} onClick={() => definirEstado({ ...e, percepcao: n })}>{n}</button>
                ))}
              </div>
              <p className="rotulo" style={{ marginTop: 12 }}>Rodada salva automaticamente em Resultados.</p>
            </div>
            <div className="acoes">
              <button className="btn" onClick={() => definirEstado(ESTADO_INICIAL)}>Nova rodada</button>
              <Link className="btn claro" href="/resultados">Ver resultados</Link>
            </div>
          </>
        )}

        {e.eventos.length > 0 && (
          <div className="painel">
            <h3>Registro da rodada</h3>
            <table className="tab">
              <thead><tr><th>#</th><th>O que aconteceu</th><th>Pts</th></tr></thead>
              <tbody>
                {e.eventos.map((v, i) => (
                  <tr key={i}><td>{i + 1}</td><td>{v.texto}</td><td><span className={`pt ${v.pontos === 0 ? "zero" : ""}`}>+{v.pontos}</span></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <aside className="col">
        <div className="painel"><Medidor pontos={pontosEfetivos(e)} /></div>
        <div className="painel">
          <div className="rotulo">Nota fictícia no app</div>
          <div className="mono" style={{ fontSize: 40, fontWeight: 700 }}>{e.nota.toFixed(2).replace(".", ",")}</div>
        </div>
      </aside>
    </main>
  );
}
