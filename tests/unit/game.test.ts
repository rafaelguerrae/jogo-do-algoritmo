import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BARALHO } from "@/lib/deck";
import {
  alternarAplicado,
  campoCsv,
  decidir,
  deveOferecer,
  ESTADO_INICIAL,
  type Estado,
  encerrar,
  INICIO_DIGITAL_MS,
  INTERVALO_DIGITAL_MS,
  iniciar,
  modoDe,
  NOTA_INICIAL,
  PAUSA_DIGITAL_MS,
  pausar,
  pontosEfetivos,
  proxima,
  QUEDA_NOTA,
  resolvidas,
  sessaoParaCsv,
  somaPor,
  tempoMedioDecisaoS,
} from "@/lib/game";

const COMPLEXA = BARALHO.find((c) => c.complexa && !c.risco)?.id as number;
const RISCO = BARALHO.find((c) => c.risco)?.id as number;
const SIMPLES = BARALHO.filter((c) => !c.complexa).map((c) => c.id);
const T0 = new Date("2026-12-01T12:00:00Z").getTime();

/** Oferece a corrida `id`, deixa passar `ms` e decide. */
function jogada(e: Estado, id: number, ms: number, d: Parameters<typeof decidir>[1]): Estado {
  const com = proxima(e, id);
  vi.advanceTimersByTime(ms);
  return decidir(com, d);
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(T0);
});
afterEach(() => vi.useRealTimers());

describe("iniciar", () => {
  it("começa jogando, com a fila embaralhada com todas as cartas", () => {
    const e = iniciar("  Ana ", 8);
    expect(e.status).toBe("jogando");
    expect(e.apelido).toBe("Ana");
    expect(e.fila).toHaveLength(BARALHO.length);
    expect([...e.fila].sort((a, b) => a - b)).toEqual(BARALHO.map((c) => c.id));
    expect(e.nota).toBe(NOTA_INICIAL);
    expect(modoDe(e)).toBe("cartas");
  });

  it("estados antigos, sem `modo`, valem como cartas", () => {
    expect(modoDe({ ...ESTADO_INICIAL, modo: undefined })).toBe("cartas");
  });
});

describe("regra 1: pressão de tempo", () => {
  it("corrida complexa aceita em menos de 10 s vale +1", () => {
    const e = jogada(iniciar("", 8), COMPLEXA, 4000, "aceitar");
    expect(e.pontos).toBe(1);
    expect(somaPor(e, "tempo")).toBe(1);
  });

  it("corrida simples aceita não pontua", () => {
    const e = jogada(iniciar("", 8), SIMPLES[0], 3000, "aceitar");
    expect(e.pontos).toBe(0);
  });

  it("o tempo é limitado ao limite da corrida", () => {
    const e = jogada(iniciar("", 8), COMPLEXA, 60_000, "aceitar");
    expect(e.eventos[0].tempoMs).toBe(9000);
  });
});

describe("regra 2: metas encadeadas", () => {
  it("a cada 3 corridas aceitas seguidas vale +2", () => {
    let e = iniciar("", 8);
    e = jogada(e, SIMPLES[0], 1000, "aceitar");
    e = jogada(e, SIMPLES[1], 1000, "aceitar");
    expect(somaPor(e, "encadeadas")).toBe(0);
    e = jogada(e, SIMPLES[2], 1000, "aceitar");
    expect(somaPor(e, "encadeadas")).toBe(2);
    expect(e.pontos).toBe(2);
  });

  it("a pausa zera a sequência", () => {
    let e = iniciar("", 8);
    e = jogada(e, SIMPLES[0], 1000, "aceitar");
    e = jogada(e, SIMPLES[1], 1000, "aceitar");
    e = pausar(e);
    expect(e.seguidas).toBe(0);
    e = jogada(e, SIMPLES[2], 1000, "aceitar");
    expect(somaPor(e, "encadeadas")).toBe(0);
  });

  it("recusar por outro motivo não zera a sequência nem pontua", () => {
    let e = iniciar("", 8);
    e = jogada(e, SIMPLES[0], 500, "aceitar");
    e = jogada(e, SIMPLES[1], 500, "recusar_outro");
    expect(e.seguidas).toBe(1);
    expect(e.pontos).toBe(0);
  });
});

describe("regra 3: opacidade e punição", () => {
  it("recusa por segurança vale +3 e derruba a nota em 0,15", () => {
    const e = jogada(iniciar("", 8), COMPLEXA, 2000, "recusar_seguranca");
    expect(e.pontos).toBe(3);
    expect(somaPor(e, "opacidade")).toBe(3);
    expect(e.nota).toBeCloseTo(NOTA_INICIAL - QUEDA_NOTA, 5);
  });

  it("tempo esgotado não pontua e não mexe na nota", () => {
    const e = jogada(iniciar("", 8), COMPLEXA, 9000, "expirar");
    expect(e.pontos).toBe(0);
    expect(e.nota).toBe(NOTA_INICIAL);
    expect(e.eventos[0].tipo).toBe("expirou");
  });
});

describe("fim da rodada", () => {
  it("encerra ao resolver todas as corridas", () => {
    let e = iniciar("", 2);
    e = jogada(e, SIMPLES[0], 500, "aceitar");
    expect(e.status).toBe("jogando");
    e = jogada(e, SIMPLES[1], 500, "aceitar");
    expect(e.status).toBe("fim");
    expect(e.fim).not.toBeNull();
    expect(resolvidas(e)).toBe(2);
  });

  it("pausa não conta como corrida resolvida", () => {
    expect(resolvidas(pausar(iniciar("", 5)))).toBe(0);
  });

  it("não aceita ações depois do fim", () => {
    const e = encerrar(iniciar("", 5));
    expect(proxima(e)).toBe(e);
    expect(pausar(e)).toBe(e);
    expect(decidir(e, "aceitar")).toBe(e);
  });

  it("aplicar requisito zera os pontos daquele mecanismo, e dá para desfazer", () => {
    let e = jogada(iniciar("", 8), COMPLEXA, 2000, "aceitar");
    e = jogada(e, RISCO, 1000, "recusar_seguranca");
    e = encerrar(e);
    expect(pontosEfetivos(e)).toBe(4);
    e = alternarAplicado(e, "opacidade");
    expect(pontosEfetivos(e)).toBe(1);
    e = alternarAplicado(e, "tempo");
    expect(pontosEfetivos(e)).toBe(0);
    e = alternarAplicado(e, "tempo");
    expect(pontosEfetivos(e)).toBe(1);
  });
});

describe("proxima", () => {
  it("usa a carta física pedida e a tira da fila", () => {
    const e = proxima(iniciar("", 8), 7);
    expect(e.corridaAtual?.id).toBe(7);
    expect(e.fila).not.toContain(7);
  });

  it("ignora carta que já saiu e sorteia da fila", () => {
    let e = jogada(iniciar("", 8), 7, 500, "aceitar");
    e = proxima(e, 7);
    expect(e.corridaAtual?.id).not.toBe(7);
  });

  it("não sorteia outra corrida enquanto há uma em andamento", () => {
    const e = proxima(iniciar("", 8));
    expect(proxima(e)).toBe(e);
  });
});

describe("modo digital", () => {
  it("agenda a primeira oferta e não oferece antes da hora", () => {
    const e = iniciar("", 5, "digital");
    expect(modoDe(e)).toBe("digital");
    expect(e.proximaEm).toBe(T0 + INICIO_DIGITAL_MS);
    expect(deveOferecer(e, T0 + INICIO_DIGITAL_MS - 1)).toBe(false);
    expect(deveOferecer(e, T0 + INICIO_DIGITAL_MS)).toBe(true);
  });

  it("depois de decidir, agenda a próxima oferta", () => {
    const e = jogada(iniciar("", 5, "digital"), SIMPLES[0], 1000, "aceitar");
    expect(e.proximaEm).toBe(Date.now() + INTERVALO_DIGITAL_MS);
  });

  it("a pausa adia a próxima oferta e zera a sequência", () => {
    let e = jogada(iniciar("", 5, "digital"), SIMPLES[0], 1000, "aceitar");
    e = pausar(e);
    expect(e.seguidas).toBe(0);
    expect(e.proximaEm).toBe(Date.now() + PAUSA_DIGITAL_MS);
  });

  it("não oferece com corrida em andamento, nem no modo cartas, nem fora de jogo", () => {
    const digital = iniciar("", 5, "digital");
    expect(deveOferecer(proxima(digital), T0 + 99_999)).toBe(false);
    expect(deveOferecer(iniciar("", 5), T0 + 99_999)).toBe(false);
    expect(deveOferecer(encerrar(digital), T0 + 99_999)).toBe(false);
  });

  it("oferecer limpa o agendamento", () => {
    expect(proxima(iniciar("", 5, "digital")).proximaEm).toBeNull();
  });

  it("não agenda nova oferta ao terminar a rodada", () => {
    const e = jogada(iniciar("", 1, "digital"), SIMPLES[0], 500, "aceitar");
    expect(e.status).toBe("fim");
    expect(deveOferecer(e, Date.now() + 99_999)).toBe(false);
  });
});

describe("tempo médio de decisão", () => {
  it("é nulo sem corridas e a média por corrida com elas", () => {
    expect(tempoMedioDecisaoS(iniciar("", 5))).toBeNull();
    let e = jogada(iniciar("", 8), COMPLEXA, 2000, "aceitar");
    e = jogada(e, SIMPLES[0], 4000, "aceitar");
    expect(tempoMedioDecisaoS(e)).toBeCloseTo(3, 5);
  });

  it("conta a corrida uma vez mesmo com vários eventos de pontos", () => {
    let e = jogada(iniciar("", 8), SIMPLES[0], 1000, "aceitar");
    e = jogada(e, SIMPLES[1], 1000, "aceitar");
    e = jogada(e, SIMPLES[2], 7000, "aceitar"); // gera também o evento de encadeadas
    expect(tempoMedioDecisaoS(e)).toBeCloseTo(3, 5);
  });
});

describe("exportação CSV", () => {
  it("campoCsv escapa aspas e neutraliza fórmulas", () => {
    expect(campoCsv('diz "oi"')).toBe('"diz ""oi"""');
    expect(campoCsv("=SOMA(A1)")).toBe(`"'=SOMA(A1)"`);
    expect(campoCsv("+1")).toBe(`"'+1"`);
    expect(campoCsv("-1")).toBe(`"'-1"`);
    expect(campoCsv("@x")).toBe(`"'@x"`);
    expect(campoCsv("visitante 12")).toBe('"visitante 12"');
  });

  it("gera cabeçalho e uma linha por rodada, com modo e requisitos aplicados", () => {
    let e = jogada(iniciar("Ana", 1, "digital"), COMPLEXA, 2000, "aceitar");
    e = alternarAplicado({ ...e, percepcao: 4 }, "tempo");
    const [cab, linha] = sessaoParaCsv([e]).split("\n");
    expect(cab).toContain("modo");
    expect(cab).toContain("tempo_medio_decisao_s");
    expect(linha).toContain("digital");
    expect(linha).toContain('"Ana"');
    expect(linha).toContain('"tempo"');
    expect(linha.split(",")).toHaveLength(cab.split(",").length);
  });
});

describe("resolvidas (regressão)", () => {
  it("o bônus de metas encadeadas não conta como corrida a mais", () => {
    let e = iniciar("", 4);
    for (const id of SIMPLES.slice(0, 3)) e = jogada(e, id, 500, "aceitar");
    expect(somaPor(e, "encadeadas")).toBe(2);
    expect(e.eventos).toHaveLength(4); // 3 aceites + 1 bônus
    expect(resolvidas(e)).toBe(3);
    expect(e.status).toBe("jogando");
    e = jogada(e, SIMPLES[3], 500, "aceitar");
    expect(resolvidas(e)).toBe(4);
    expect(e.status).toBe("fim");
  });
});
