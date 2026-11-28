import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BARALHO } from "@/lib/deck";
import { decidir, type Estado, encerrar, iniciar, proxima } from "@/lib/game";
import { metricas } from "@/lib/metricas";

const COMPLEXA = BARALHO.find((c) => c.complexa && !c.risco)?.id as number;
const RISCO = BARALHO.find((c) => c.risco)?.id as number;

function rodada(modo: "cartas" | "digital", percepcao: number | null): Estado {
  let e = proxima(iniciar("x", 3, modo), COMPLEXA);
  vi.advanceTimersByTime(2000);
  e = proxima(decidir(e, "aceitar"), RISCO);
  vi.advanceTimersByTime(4000);
  e = decidir(e, "recusar_seguranca");
  return { ...encerrar(e), percepcao };
}

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe("metricas", () => {
  it("sem rodadas, tudo zerado e sem médias inventadas", () => {
    const m = metricas([]);
    expect(m.rodadas).toBe(0);
    expect(m.pontosMedia).toBe(0);
    expect(m.percepcaoMedia).toBeNull();
    expect(m.tempoMedioDecisaoS).toBeNull();
    expect(m.porMecanismo).toEqual({ tempo: 0, encadeadas: 0, opacidade: 0 });
  });

  it("agrega rodadas, modos, mecanismos e tempo médio", () => {
    const m = metricas([rodada("cartas", 4), rodada("digital", 2)]);
    expect(m.rodadas).toBe(2);
    expect(m.porModo).toEqual({ cartas: 1, digital: 1 });
    expect(m.corridas).toBe(4);
    expect(m.pontosMedia).toBe(4); // +1 (tempo) e +3 (opacidade) por rodada
    expect(m.porMecanismo).toEqual({ tempo: 2, encadeadas: 0, opacidade: 6 });
    expect(m.rodadasComRecusaSeguranca).toBe(2);
    expect(m.tempoMedioDecisaoS).toBeCloseTo(3, 5);
  });

  it("a percepção só entra na média de quem respondeu", () => {
    const m = metricas([rodada("cartas", 4), rodada("cartas", null), rodada("cartas", 2)]);
    expect(m.percepcaoRespostas).toBe(2);
    expect(m.percepcaoMedia).toBe(3);
    expect(m.percepcaoDistribuicao).toEqual([0, 1, 0, 1, 0]);
  });
});
