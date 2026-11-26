import { BARALHO, limiteMs, porId } from "./deck";

/** Pontos de sobrecarga são FICTÍCIOS: recurso didático, sem equivalência com medição humana. */
export const PONTOS = { tempo: 1, encadeadas: 2, opacidade: 3 } as const;
export const LIMITE_BARRA = 10;
export const ENCADEADAS = 3;
export const NOTA_INICIAL = 4.95;
export const QUEDA_NOTA = 0.15;

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
  id: "", status: "espera", apelido: "", totalCorridas: 8, fila: [], corridaAtual: null,
  seguidas: 0, pontos: 0, nota: NOTA_INICIAL, eventos: [], ultimo: null, percepcao: null, aplicados: [], inicio: 0, fim: null,
};

const embaralhar = <T,>(a: T[]) => {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
};

export function iniciar(apelido: string, totalCorridas: number): Estado {
  return {
    ...ESTADO_INICIAL,
    id: `${Date.now()}`,
    status: "jogando",
    apelido: apelido.trim(),
    totalCorridas,
    fila: embaralhar(BARALHO.map((x) => x.id)),
    inicio: Date.now(),
  };
}

export const resolvidas = (e: Estado) => e.eventos.filter((v) => v.tipo !== "pausa").length;

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
  return { ...e, fila, corridaAtual: { id: escolhida, inicio: Date.now(), limite: limiteMs(porId(escolhida)) }, ultimo: null };
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
  let evs: Omit<Evento, "t">[] = [];
  let seguidas = e.seguidas;

  if (d === "aceitar") {
    seguidas += 1;
    if (corrida.complexa && tempoMs < 10000) {
      evs.push({ ...base, tipo: "aceite", pontos: PONTOS.tempo, fonte: "tempo", texto: `Corrida ${id} aceita em ${(tempoMs / 1000).toFixed(1)} s, sem tempo para analisar` });
    } else {
      evs.push({ ...base, tipo: "aceite", pontos: 0, texto: `Corrida ${id} aceita` });
    }
    if (seguidas % ENCADEADAS === 0) {
      evs.push({ ...base, tipo: "aceite", pontos: PONTOS.encadeadas, fonte: "encadeadas", texto: `${ENCADEADAS} corridas seguidas sem pausa de 5 min` });
    }
  } else if (d === "recusar_seguranca") {
    evs.push({ ...base, tipo: "recusa_seguranca", pontos: PONTOS.opacidade, fonte: "opacidade", texto: `Corrida ${id} recusada por segurança: score caiu, sem explicação` });
  } else if (d === "recusar_outro") {
    evs.push({ ...base, tipo: "recusa_outro", pontos: 0, texto: `Corrida ${id} recusada` });
  } else {
    evs.push({ ...base, tipo: "expirou", pontos: 0, texto: `Tempo esgotado na corrida ${id}` });
  }
  return fecharSeAcabou({ ...registrar({ ...e, corridaAtual: null, seguidas }, evs) });
}

/** Pausa de 5 minutos (simulada): zera a sequência de corridas. */
export function pausar(e: Estado): Estado {
  if (e.status !== "jogando" || e.corridaAtual) return e;
  return registrar({ ...e, seguidas: 0 }, [{ tipo: "pausa", pontos: 0, texto: "Pausa de 5 min (simulada): sequência zerada" }]);
}

export function encerrar(e: Estado): Estado {
  if (e.status !== "jogando") return e;
  return { ...e, status: "fim", fim: Date.now(), corridaAtual: null };
}

export const somaPor = (e: Estado, f: Fonte) => e.eventos.filter((v) => v.fonte === f).reduce((s, v) => s + v.pontos, 0);

/** Pontos exibidos: ao fim da rodada, descontam os requisitos ergonômicos aplicados. */
export const pontosEfetivos = (e: Estado) =>
  e.status === "fim" ? e.eventos.filter((v) => !v.fonte || !(e.aplicados ?? []).includes(v.fonte)).reduce((s, v) => s + v.pontos, 0) : e.pontos;

export const REQUISITOS: { fonte: Fonte; titulo: string; regra: string; requisito: string }[] = [
  { fonte: "tempo", titulo: "Pressão de tempo", regra: "Menos de 10 s para decidir uma corrida complexa", requisito: "Tempo útil de decisão proporcional à complexidade da tarefa" },
  { fonte: "encadeadas", titulo: "Metas encadeadas", regra: "3 corridas seguidas, sem pausa de 5 min", requisito: "Limite para corridas encadeadas e pausa respeitada antes da próxima oferta" },
  { fonte: "opacidade", titulo: "Opacidade e punição", regra: "Recusa por segurança com queda de score sem explicação", requisito: "Feedback explicativo antes de qualquer punição, e recusa por segurança sem penalidade" },
];

export const sessaoParaCsv = (lista: Estado[]) => {
  const cab = ["id", "data", "apelido", "corridas", "pontos_total", "tempo", "encadeadas", "opacidade", "percepcao_1a5", "duracao_s"];
  const linhas = lista.map((s) => [
    s.id, new Date(s.inicio).toISOString(), `"${s.apelido.replace(/"/g, "'")}"`, resolvidas(s), s.pontos,
    somaPor(s, "tempo"), somaPor(s, "encadeadas"), somaPor(s, "opacidade"), s.percepcao ?? "",
    s.fim ? Math.round((s.fim - s.inicio) / 1000) : "",
  ].join(","));
  return [cab.join(","), ...linhas].join("\n");
};
