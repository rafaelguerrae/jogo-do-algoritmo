"use client";
import { type Estado, type Fonte, REQUISITOS, resolvidas, somaPor } from "@/lib/game";

export default function Resumo({ e, grande = false, alternar }: { e: Estado; grande?: boolean; alternar?: (f: Fonte) => void }) {
  const ativo = (f: Fonte) => (e.aplicados ?? []).includes(f);
  const restante = REQUISITOS.reduce((s, r) => s + (ativo(r.fonte) ? 0 : somaPor(e, r.fonte)), 0);
  return (
    <div className="painel" style={grande ? { fontSize: "clamp(13px,1.2vw,19px)" } : undefined}>
      <h2>O que fez os pontos subirem</h2>
      <p className="rotulo" style={{ marginBottom: 12 }}>
        {resolvidas(e)} corridas · {e.pontos} pontos (fictícios)
      </p>
      <table className="tab" style={grande ? { fontSize: "inherit" } : undefined}>
        <thead>
          <tr>
            <th>Mecanismo</th>
            <th>Pontos</th>
            <th>Requisito ergonômico</th>
            <th>{alternar ? "Aplicar" : "Aplicado?"}</th>
          </tr>
        </thead>
        <tbody>
          {REQUISITOS.map((r) => {
            const p = somaPor(e, r.fonte);
            return (
              <tr key={r.fonte}>
                <td>
                  <b>{r.titulo}</b>
                  <br />
                  <span className="cinza">{r.regra}</span>
                </td>
                <td>
                  <span className={`pt ${p === 0 || ativo(r.fonte) ? "zero" : ""}`}>{ativo(r.fonte) ? 0 : p}</span>
                </td>
                <td>{r.requisito}</td>
                {alternar && (
                  <td>
                    <button className="btn pequeno" onClick={() => alternar(r.fonte)} aria-pressed={ativo(r.fonte)}>
                      {ativo(r.fonte) ? "Aplicado" : "Aplicar"}
                    </button>
                  </td>
                )}
                {!alternar && <td>{ativo(r.fonte) ? "Sim" : "Não"}</td>}
              </tr>
            );
          })}
        </tbody>
      </table>
      <p style={{ marginTop: 14, fontWeight: 700 }} className="mono">
        Total com os requisitos aplicados: <span className="laranja">{restante} pts</span> (era {e.pontos})
      </p>
    </div>
  );
}
