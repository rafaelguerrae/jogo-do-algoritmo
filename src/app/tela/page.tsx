"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import CartaCorrida, { restanteMs, useAgora } from "@/components/CartaCorrida";
import Medidor from "@/components/Medidor";
import Percepcao from "@/components/Percepcao";
import Resumo from "@/components/Resumo";
import { AVISO_FICTICIO } from "@/lib/conteudo";
import { alternarAplicado, type Decisao, decidir, deveOferecer, modoDe, pausar, pontosEfetivos, proxima, resolvidas } from "@/lib/game";
import { definirEstado, marcarTelaViva, useEstado } from "@/lib/store";

export default function Tela() {
  const e = useEstado();
  const digital = modoDe(e) === "digital";
  const agora = useAgora(e.status === "jogando" && (digital || !!e.corridaAtual));
  const eRef = useRef(e);
  eRef.current = e;

  // O visitante decide aqui nos dois modos. No modo cartas, relógio e ofertas continuam com o operador.
  const agir = (d: Decisao) => {
    const c = eRef.current.corridaAtual;
    // sem tempo restante, a decisão não vale: conta como expirada
    definirEstado(decidir(eRef.current, c && restanteMs(c, Date.now()) === 0 ? "expirar" : d));
  };

  useEffect(() => {
    marcarTelaViva();
    const i = setInterval(marcarTelaViva, 1000);
    return () => clearInterval(i);
  }, []);

  // No modo digital a tela do visitante conduz o jogo: ela controla o relógio e as ofertas.
  useEffect(() => {
    if (!digital) return;
    if (e.corridaAtual && restanteMs(e.corridaAtual, agora) === 0) agir("expirar");
    else if (deveOferecer(e, agora)) definirEstado(proxima(eRef.current));
  }, [agora]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const f = (ev: KeyboardEvent) => {
      const s = eRef.current;
      if (s.status !== "jogando" || ev.metaKey || ev.ctrlKey) return;
      const k = ev.key.toLowerCase();
      if (s.corridaAtual) {
        if (k === "a") agir("aceitar");
        if (k === "s") agir("recusar_seguranca");
        if (k === "r") agir("recusar_outro");
      } else if (k === "p" && modoDe(s) === "digital") definirEstado(pausar(s));
    };
    window.addEventListener("keydown", f);
    return () => window.removeEventListener("keydown", f);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // eventos da última decisão (mesma corrida)
  const grupo = e.ultimo ? e.eventos.filter((v) => v.corridaId === e.ultimo?.corridaId && v.tipo !== "pausa") : [];
  const opaco = grupo.some((v) => v.fonte === "opacidade");
  const nota = e.nota.toFixed(2).replace(".", ",");
  const emPausa = e.ultimo?.tipo === "pausa";
  const faltaS = digital && e.proximaEm ? Math.max(0, Math.ceil((e.proximaEm - agora) / 1000)) : null;

  return (
    <div className="tela">
      <header className="faixa">
        <span className="marca">JOGO DO ALGORITMO</span>
        <Link href="/">Projeto</Link>
      </header>

      <div className="miolo">
        <div className="centro">
          {e.status === "espera" && (
            <>
              <h1>
                Jogo do
                <br />
                <span>Algoritmo</span>
              </h1>
              <p className="fala">
                Pouco tempo para decidir: <u>9 segundos</u> para aceitar a corrida.
              </p>
              <div className="aviso">Sente-se. O algoritmo vai começar a mandar corridas.</div>
            </>
          )}

          {e.status === "jogando" && e.corridaAtual && (
            <CartaCorrida
              corrida={e.corridaAtual}
              agora={agora}
              decisoes={{
                aceitar: () => agir("aceitar"),
                recusarSeguranca: () => agir("recusar_seguranca"),
                recusar: () => agir("recusar_outro"),
              }}
            />
          )}

          {e.status === "jogando" && !e.corridaAtual && (
            <>
              <p className="fala">{emPausa ? "Pausa de 5 minutos (simulada)." : e.ultimo ? "Corrida resolvida." : "Prepare-se."}</p>
              {grupo.map((v, i) => (
                <div key={i} className={`aviso ${v.fonte === "opacidade" ? "opaco" : ""}`}>
                  {v.fonte === "opacidade"
                    ? "Sua nota no app caiu. Motivo: não informado."
                    : v.pontos > 0
                      ? `+${v.pontos} ponto${v.pontos > 1 ? "s" : ""} de sobrecarga: ${v.texto}`
                      : v.texto}
                </div>
              ))}
              <div className="aviso">
                {digital && faltaS !== null ? `Próxima corrida em ${faltaS} s…` : "Aguardando a próxima corrida…"}
              </div>
              {digital && !emPausa && (
                <button className="btn claro" onClick={() => definirEstado(pausar(e))}>
                  Fazer pausa de 5 min (simulada) <kbd>P</kbd>
                </button>
              )}
            </>
          )}

          {e.status === "fim" && (
            <>
              <p className="fala">Rodada encerrada. Veja o que fez os pontos subirem.</p>
              <Resumo e={e} grande alternar={digital ? (f) => definirEstado(alternarAplicado(eRef.current, f)) : undefined} />
              {digital && <Percepcao e={e} grande />}
            </>
          )}
        </div>

        <div className="lado">
          <Medidor pontos={pontosEfetivos(e)} grande />
          {e.status !== "espera" && (
            <div className="aviso" style={{ boxShadow: opaco ? "8px 8px 0 var(--laranja)" : "8px 8px 0 var(--tinta)" }}>
              Nota no app: <b className={opaco ? "laranja" : ""}>{nota}</b>
              <div style={{ fontSize: "0.7em", fontWeight: 500 }}>
                Corrida {Math.min(resolvidas(e) + (e.corridaAtual ? 1 : 0), e.totalCorridas)} de {e.totalCorridas}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="rodape">{AVISO_FICTICIO} Participação voluntária; pode parar quando quiser.</div>
    </div>
  );
}
