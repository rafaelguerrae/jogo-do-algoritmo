import { beforeEach, describe, expect, it, vi } from "vitest";
import { decidir, type Estado, encerrar, iniciar, proxima } from "@/lib/game";

/** localStorage mínimo, em memória. */
class Memoria {
  private d = new Map<string, string>();
  getItem = (k: string) => this.d.get(k) ?? null;
  setItem = (k: string, v: string) => void this.d.set(k, v);
  removeItem = (k: string) => void this.d.delete(k);
  clear = () => this.d.clear();
}

async function carregarStore() {
  vi.resetModules();
  vi.stubGlobal("localStorage", new Memoria());
  vi.stubGlobal("window", { addEventListener: vi.fn() });
  return import("@/lib/store");
}

function rodadaTerminada(): Estado {
  const e = decidir(proxima(iniciar("t", 1), 1), "aceitar");
  return encerrar(e);
}

beforeEach(() => {
  vi.unstubAllGlobals();
});

describe("store", () => {
  it("salva a rodada sozinho ao terminar, sem duplicar quando o estado muda de novo", async () => {
    const { definirEstado } = await carregarStore();
    const fim = rodadaTerminada();
    definirEstado(fim);
    definirEstado({ ...fim, percepcao: 3 });
    const salvas = JSON.parse(localStorage.getItem("jda:sessoes") ?? "[]") as Estado[];
    expect(salvas).toHaveLength(1);
    expect(salvas[0].percepcao).toBe(3);
  });

  it("não salva rodada em andamento", async () => {
    const { definirEstado } = await carregarStore();
    definirEstado(iniciar("t", 5));
    expect(localStorage.getItem("jda:sessoes")).toBeNull();
    expect(JSON.parse(localStorage.getItem("jda:estado") ?? "{}").status).toBe("jogando");
  });

  it("limparSessoes apaga o histórico", async () => {
    const { definirEstado, limparSessoes } = await carregarStore();
    definirEstado(rodadaTerminada());
    limparSessoes();
    expect(JSON.parse(localStorage.getItem("jda:sessoes") ?? "[]")).toEqual([]);
  });

  it("a tela do visitante é considerada viva por 3 s", async () => {
    const { marcarTelaViva, telaViva } = await carregarStore();
    expect(telaViva()).toBe(false);
    marcarTelaViva();
    expect(telaViva()).toBe(true);
    expect(telaViva(Date.now() + 3500)).toBe(false);
  });
});
