"use client";
import { useEffect, useState } from "react";
import { brl, km, porId } from "@/lib/deck";
import type { Estado } from "@/lib/game";

export const useAgora = (ativo: boolean) => {
  const [t, setT] = useState(() => Date.now());
  useEffect(() => {
    if (!ativo) return;
    const i = setInterval(() => setT(Date.now()), 100);
    return () => clearInterval(i);
  }, [ativo]);
  return t;
};

export const restanteMs = (c: NonNullable<Estado["corridaAtual"]>, agora: number) => Math.max(0, c.inicio + c.limite - agora);
export const fmt = (ms: number) => `00:${String(Math.ceil(ms / 1000)).padStart(2, "0")}`;

export default function CartaCorrida({ corrida, agora }: { corrida: NonNullable<Estado["corridaAtual"]>; agora: number }) {
  const c = porId(corrida.id);
  const resta = restanteMs(corrida, agora);
  return (
    <div className="pilha">
      <div className="ticket">
        <div className="h"><span>CORRIDA Nº {String(c.id).padStart(4, "0")}</span><span>ENTREGA</span></div>
        <div className="row">
          <b>Coleta:</b> {c.origem} · {km(c.kmColeta)} km<br />
          <b>Destino:</b> {c.destino} · {km(c.kmEntrega)} km<br />
          <b>Valor:</b> R$ {brl(c.valor)}
        </div>
        {c.obs && <div className="obs">{c.obs}</div>}
        <div className="tw"><div className="lab">ACEITE<br />EM</div><div className={`t ${resta === 0 ? "fim" : ""}`}>{fmt(resta)}</div></div>
        <div className="aceitar">ACEITAR</div>
        <div className="recusar">recusar</div>
      </div>
    </div>
  );
}
