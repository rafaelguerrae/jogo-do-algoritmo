import { describe, expect, it } from "vitest";
import { BARALHO, brl, km, limiteMs, porId, TEMPO_COMPLEXA_S, TEMPO_SIMPLES_S } from "@/lib/deck";

describe("baralho", () => {
  it("tem 24 cartas com ids únicos de 1 a 24", () => {
    expect(BARALHO).toHaveLength(24);
    expect(new Set(BARALHO.map((c) => c.id)).size).toBe(24);
    expect(BARALHO.map((c) => c.id).sort((a, b) => a - b)).toEqual(Array.from({ length: 24 }, (_, i) => i + 1));
  });

  it("toda carta com risco também tem observação visível", () => {
    for (const c of BARALHO.filter((x) => x.risco)) expect(c.obs, `carta ${c.id}`).toBeTruthy();
  });

  it("mistura corridas complexas e simples, e tem corridas de risco", () => {
    expect(BARALHO.some((c) => c.complexa)).toBe(true);
    expect(BARALHO.some((c) => !c.complexa)).toBe(true);
    expect(BARALHO.filter((c) => c.risco).length).toBeGreaterThanOrEqual(3);
  });

  it("valores e distâncias são positivos", () => {
    for (const c of BARALHO) {
      expect(c.valor).toBeGreaterThan(0);
      expect(c.kmColeta).toBeGreaterThan(0);
      expect(c.kmEntrega).toBeGreaterThan(0);
    }
  });
});

describe("limites de tempo", () => {
  it("complexa = 9 s, simples = 20 s", () => {
    const complexa = BARALHO.find((c) => c.complexa);
    const simples = BARALHO.find((c) => !c.complexa);
    expect(complexa && limiteMs(complexa)).toBe(TEMPO_COMPLEXA_S * 1000);
    expect(simples && limiteMs(simples)).toBe(TEMPO_SIMPLES_S * 1000);
  });
});

describe("porId e formatadores", () => {
  it("porId devolve a carta e falha para id inexistente", () => {
    expect(porId(4).id).toBe(4);
    expect(() => porId(999)).toThrow(/inexistente/);
  });

  it("formata moeda e distância em pt-BR", () => {
    expect(brl(6.7)).toBe("6,70");
    expect(km(1.8)).toBe("1,8");
  });
});
