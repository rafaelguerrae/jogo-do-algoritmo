"use client";
import CartaCorrida, { useAgora } from "@/components/CartaCorrida";
import Medidor from "@/components/Medidor";
import Resumo from "@/components/Resumo";
import { pontosEfetivos, resolvidas } from "@/lib/game";
import { useEstado } from "@/lib/store";

export default function Tela() {
  const e = useEstado();
  const agora = useAgora(!!e.corridaAtual);

  // eventos da última decisão (mesma corrida)
  const grupo = e.ultimo ? e.eventos.filter((v) => v.corridaId === e.ultimo!.corridaId && v.tipo !== "pausa") : [];
  const opaco = grupo.some((v) => v.fonte === "opacidade");
  const nota = e.nota.toFixed(2).replace(".", ",");

  return (
    <div className="tela">
      <div className="faixa"><span>I MOSTRA DE ERGONOMIA · UFABC</span><span><b>JOGO DO ALGORITMO</b> · simulação didática</span></div>

      <div className="miolo">
        <div className="centro">
          {e.status === "espera" && (
            <>
              <h1>Jogo do<br /><span>Algoritmo</span></h1>
              <p className="fala">Você tem <u>9 segundos</u> para aceitar a corrida.</p>
              <div className="aviso">Sente-se. O algoritmo vai começar a mandar corridas.</div>
            </>
          )}

          {e.status === "jogando" && e.corridaAtual && <CartaCorrida corrida={e.corridaAtual} agora={agora} />}

          {e.status === "jogando" && !e.corridaAtual && (
            <>
              <p className="fala">{e.ultimo ? "Corrida resolvida." : "Prepare-se."}</p>
              {grupo.map((v, i) => (
                <div key={i} className={`aviso ${v.fonte === "opacidade" ? "opaco" : ""}`}>
                  {v.fonte === "opacidade" ? "Sua nota no app caiu. Motivo: não informado." : v.pontos > 0 ? `+${v.pontos} ponto${v.pontos > 1 ? "s" : ""} de sobrecarga: ${v.texto}` : v.texto}
                </div>
              ))}
              <div className="aviso">Aguardando a próxima corrida…</div>
            </>
          )}

          {e.status === "fim" && (
            <>
              <p className="fala">Rodada encerrada. Veja o que fez os pontos subirem.</p>
              <Resumo e={e} grande />
            </>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 420 }}>
          <Medidor pontos={pontosEfetivos(e)} grande />
          {e.status !== "espera" && (
            <div className="aviso" style={{ boxShadow: opaco ? "8px 8px 0 var(--laranja)" : "8px 8px 0 var(--tinta)" }}>
              Nota no app: <b className={opaco ? "laranja" : ""}>{nota}</b>
              <div style={{ fontSize: "0.7em", fontWeight: 500 }}>Corrida {Math.min(resolvidas(e) + (e.corridaAtual ? 1 : 0), e.totalCorridas)} de {e.totalCorridas}</div>
            </div>
          )}
        </div>
      </div>

      <div className="rodape">Pontos de sobrecarga e nota são fictícios: recurso didático, sem equivalência com medição de fadiga ou carga mental humana. Participação voluntária; pode parar quando quiser.</div>
    </div>
  );
}
