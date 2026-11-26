"use client";
import type { Estado } from "@/lib/game";
import { definirEstado } from "@/lib/store";

/** Percepção de pressão (1 a 5): opinião do visitante, não medida científica. */
export default function Percepcao({ e, grande = false }: { e: Estado; grande?: boolean }) {
  return (
    <div className="painel" style={grande ? { fontSize: "clamp(13px,1.2vw,19px)" } : undefined}>
      <h3>Percepção do visitante (opcional)</h3>
      <p style={{ marginBottom: 12 }}>
        “De 1 a 5, quanta pressão você sentiu?” Opinião do visitante. <b>Não é medida científica.</b>
      </p>
      <div className="acoes">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            className={`btn ${e.percepcao === n ? "" : "claro"}`}
            aria-pressed={e.percepcao === n}
            onClick={() => definirEstado({ ...e, percepcao: n })}
          >
            {n}
          </button>
        ))}
      </div>
      <p className="rotulo" style={{ marginTop: 12 }}>
        Rodada salva automaticamente em Resultados.
      </p>
    </div>
  );
}
