import { BARALHO, limiteMs, porId } from "./deck";

/** Pontos de sobrecarga são FICTÍCIOS: recurso didático, sem equivalência com medição humana. */
export const PONTOS = { tempo: 1, encadeadas: 2, opacidade: 3 } as const;
export const LIMITE_BARRA = 10;
export const ENCADEADAS = 3;
export const NOTA_INICIAL = 4.95;
export const QUEDA_NOTA = 0.15;

/** Intervalo (ms) entre a decisão e a próxima oferta no modo digital. */
export const INTERVALO_DIGITAL_MS = 2800;
/** Espera (ms) da primeira oferta no modo digital. */
export const INICIO_DIGITAL_MS = 4000;
/** Pausa de 5 min simulada: a próxima oferta demora este tempo (ms) no modo digital. */
export const PAUSA_DIGITAL_MS = 6000;

/** "cartas": o operador conduz com cartas físicas. "digital": as corridas aparecem no próprio jogo. */
export type Modo = "cartas" | "digital";
export type Fonte = "tempo" | "encadeadas" | "opacidade";
export type TipoEvento = "aceite" | "recusa_seguranca" | "recusa_outro" | "expirou" | "pausa";

export type Evento = {
  t: number;
  tipo: TipoEvento;
  corridaId?: number;
  tempoMs?: number;
  pontos: number;
  fonte?: Fonte;
  texto: string;
};

export type Estado = {
  id: string;
  /** Ausente em rodadas salvas antes do modo digital: tratar como "cartas" (ver `modoDe`). */
  modo?: Modo;
  /** Modo digital: instante (ms) em que a próxima corrida é oferecida sozinha. */
  proximaEm?: number | null;
  status: "espera" | "jogando" | "fim";
  apelido: string;
  totalCorridas: number;
  fila: number[];
  corridaAtual: { id: number; inicio: number; limite: number } | null;
  seguidas: number;
  pontos: number;
  nota: number;
  eventos: Evento[];
  /** Último evento, usado pela tela do visitante para dar o retorno visual. */
  ultimo: Evento | null;
  percepcao: number | null;
  /** Requisitos ergonômicos aplicados na revelação final (sincronizado com a tela). */
  aplicados: Fonte[];
  inicio: number;
  fim: number | null;
};

export const ESTADO_INICIAL: Estado = {
  id: "",
  status: "espera",
  apelido: "",
  modo: "cartas",
  proximaEm: null,
  totalCorridas: 8,
  fila: [],
  corridaAtual: null,
  seguidas: 0,
  pontos: 0,
  nota: NOTA_INICIAL,
  eventos: [],
  ultimo: null,
  percepcao: null,
  aplicados: [],
  inicio: 0,
  fim: null,
};

const embaralhar = <T>(a: T[]) => {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
};

export const modoDe = (e: Estado): Modo => e.modo ?? "cartas";

export function iniciar(apelido: string, totalCorridas: number, modo: Modo = "cartas"): Estado {
  const agora = Date.now();
  return {
    ...ESTADO_INICIAL,
    id: `${agora}`,
    modo,
    status: "jogando",
    apelido: apelido.trim(),
    totalCorridas,
    fila: embaralhar(BARALHO.map((x) => x.id)),
    proximaEm: modo === "digital" ? agora + INICIO_DIGITAL_MS : null,
    inicio: agora,
  };
}

/** Corridas resolvidas: conta cada corrida uma vez, mesmo quando ela gera mais de um evento (ex.: bônus de metas encadeadas). */
export const resolvidas = (e: Estado) =>
  new Set(e.eventos.filter((v) => v.tipo !== "pausa" && v.corridaId !== undefined).map((v) => v.corridaId)).size;

/** Sorteia a próxima da fila, ou usa o número de uma carta física. */
export function proxima(e: Estado, id?: number): Estado {
  if (e.status !== "jogando" || e.corridaAtual) return e;
  let fila = e.fila;
  let escolhida: number;
  if (id && fila.includes(id)) {
    escolhida = id;
    fila = fila.filter((x) => x !== id);
  } else {
    [escolhida, ...fila] = fila;
  }
  if (escolhida === undefined) return e;
  return {
    ...e,
    fila,
    corridaAtual: { id: escolhida, inicio: Date.now(), limite: limiteMs(porId(escolhida)) },
    ultimo: null,
    proximaEm: null,
  };
}

function registrar(e: Estado, ev: Omit<Evento, "t">[]): Estado {
  const novos = ev.map((v) => ({ ...v, t: Date.now() }));
  const pontos = e.pontos + novos.reduce((s, v) => s + v.pontos, 0);
  const nota = e.nota - novos.filter((v) => v.fonte === "opacidade").length * QUEDA_NOTA;
  const eventos = [...e.eventos, ...novos];
  const prox = { ...e, eventos, pontos, nota, ultimo: novos[novos.length - 1] ?? e.ultimo };
  return prox;
}

function fecharSeAcabou(e: Estado): Estado {
  if (resolvidas(e) >= e.totalCorridas) return { ...e, status: "fim", fim: Date.now(), corridaAtual: null };
  return e;
}

export type Decisao = "aceitar" | "recusar_seguranca" | "recusar_outro" | "expirar";

export function decidir(e: Estado, d: Decisao): Estado {
  if (e.status !== "jogando" || !e.corridaAtual) return e;
  const { id, inicio } = e.corridaAtual;
  const corrida = porId(id);
  const tempoMs = Math.min(Date.now() - inicio, e.corridaAtual.limite);
  const base = { corridaId: id, tempoMs };
  const evs: Omit<Evento, "t">[] = [];
  let seguidas = e.seguidas;

  if (d === "aceitar") {
    seguidas += 1;
    if (corrida.complexa && tempoMs < 10000) {
      evs.push({
        ...base,
        tipo: "aceite",
        pontos: PONTOS.tempo,
        fonte: "tempo",
        texto: `Corrida ${id} aceita em ${(tempoMs / 1000).toFixed(1)} s, sem tempo para analisar`,
      });
    } else {
      evs.push({ ...base, tipo: "aceite", pontos: 0, texto: `Corrida ${id} aceita` });
    }
    if (seguidas % ENCADEADAS === 0) {
      evs.push({
        ...base,
        tipo: "aceite",
        pontos: PONTOS.encadeadas,
        fonte: "encadeadas",
        texto: `${ENCADEADAS} corridas seguidas sem pausa de 5 min`,
      });
    }
  } else if (d === "recusar_seguranca") {
    evs.push({
      ...base,
      tipo: "recusa_seguranca",
      pontos: PONTOS.opacidade,
      fonte: "opacidade",
      texto: `Corrida ${id} recusada por segurança: score caiu, sem explicação`,
    });
  } else if (d === "recusar_outro") {
    evs.push({ ...base, tipo: "recusa_outro", pontos: 0, texto: `Corrida ${id} recusada` });
  } else {
    evs.push({ ...base, tipo: "expirou", pontos: 0, texto: `Tempo esgotado na corrida ${id}` });
  }
  const proximaEm = modoDe(e) === "digital" ? Date.now() + INTERVALO_DIGITAL_MS : null;
  return fecharSeAcabou({ ...registrar({ ...e, corridaAtual: null, seguidas, proximaEm }, evs) });
}

/** Modo digital: já passou da hora de oferecer a próxima corrida? */
export const deveOferecer = (e: Estado, agora: number) =>
  modoDe(e) === "digital" && e.status === "jogando" && !e.corridaAtual && !!e.proximaEm && agora >= e.proximaEm;

/** Pausa de 5 minutos (simulada): zera a sequência de corridas. */
export function pausar(e: Estado): Estado {
  if (e.status !== "jogando" || e.corridaAtual) return e;
  const proximaEm = modoDe(e) === "digital" ? Date.now() + PAUSA_DIGITAL_MS : (e.proximaEm ?? null);
  return registrar({ ...e, seguidas: 0, proximaEm }, [{ tipo: "pausa", pontos: 0, texto: "Pausa de 5 min (simulada): sequência zerada" }]);
}

export function encerrar(e: Estado): Estado {
  if (e.status !== "jogando") return e;
  return { ...e, status: "fim", fim: Date.now(), corridaAtual: null };
}

export const somaPor = (e: Estado, f: Fonte) => e.eventos.filter((v) => v.fonte === f).reduce((s, v) => s + v.pontos, 0);

/** Pontos exibidos: ao fim da rodada, descontam os requisitos ergonômicos aplicados. */
export const pontosEfetivos = (e: Estado) =>
  e.status === "fim"
    ? e.eventos.filter((v) => !v.fonte || !(e.aplicados ?? []).includes(v.fonte)).reduce((s, v) => s + v.pontos, 0)
    : e.pontos;

/** Marca ou desmarca um requisito ergonômico na revelação final. */
export const alternarAplicado = (e: Estado, f: Fonte): Estado => {
  const atual = e.aplicados ?? [];
  return { ...e, aplicados: atual.includes(f) ? atual.filter((x) => x !== f) : [...atual, f] };
};

/** Tempo médio de decisão (s) nas corridas resolvidas; `null` se não houve nenhuma. */
export const tempoMedioDecisaoS = (e: Estado): number | null => {
  const ts = e.eventos.filter((v) => v.tempoMs !== undefined && v.tipo !== "pausa");
  const unicos = new Map(ts.map((v) => [v.corridaId, v.tempoMs as number]));
  if (!unicos.size) return null;
  return [...unicos.values()].reduce((s, x) => s + x, 0) / unicos.size / 1000;
};

export const REQUISITOS: { fonte: Fonte; titulo: string; regra: string; requisito: string }[] = [
  {
    fonte: "tempo",
    titulo: "Pressão de tempo",
    regra: "Menos de 10 s para decidir uma corrida complexa",
    requisito: "Tempo útil de decisão proporcional à complexidade da tarefa",
  },
  {
    fonte: "encadeadas",
    titulo: "Metas encadeadas",
    regra: "3 corridas seguidas, sem pausa de 5 min",
    requisito: "Limite para corridas encadeadas e pausa respeitada antes da próxima oferta",
  },
  {
    fonte: "opacidade",
    titulo: "Opacidade e punição",
    regra: "Recusa por segurança com queda de score sem explicação",
    requisito: "Feedback explicativo antes de qualquer punição, e recusa por segurança sem penalidade",
  },
];

/** Campo de texto seguro para CSV: aspas escapadas e sem início de fórmula (=, +, -, @). */
export const campoCsv = (t: string) => {
  const limpo = /^[=+\-@\t\r]/.test(t) ? `'${t}` : t;
  return `"${limpo.replace(/"/g, '""')}"`;
};

export const sessaoParaCsv = (lista: Estado[]) => {
  const cab = [
    "id",
    "data",
    "modo",
    "apelido",
    "corridas",
    "pontos_total",
    "tempo",
    "encadeadas",
    "opacidade",
    "requisitos_aplicados",
    "percepcao_1a5",
    "tempo_medio_decisao_s",
    "duracao_s",
  ];
  const linhas = lista.map((s) =>
    [
      s.id,
      new Date(s.inicio).toISOString(),
      modoDe(s),
      campoCsv(s.apelido),
      resolvidas(s),
      s.pontos,
      somaPor(s, "tempo"),
      somaPor(s, "encadeadas"),
      somaPor(s, "opacidade"),
      `"${(s.aplicados ?? []).join(" ")}"`,
      s.percepcao ?? "",
      tempoMedioDecisaoS(s)?.toFixed(1) ?? "",
      s.fim ? Math.round((s.fim - s.inicio) / 1000) : "",
    ].join(","),
  );
  return [cab.join(","), ...linhas].join("\n");
};
