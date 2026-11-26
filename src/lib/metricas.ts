import { type Estado, type Fonte, modoDe, resolvidas, somaPor, tempoMedioDecisaoS } from "./game";

export const MECANISMOS: Fonte[] = ["tempo", "encadeadas", "opacidade"];

const media = (a: number[]) => (a.length ? a.reduce((s, x) => s + x, 0) / a.length : 0);

export type Metricas = {
  rodadas: number;
  porModo: { cartas: number; digital: number };
  corridas: number;
  pontosMedia: number;
  percepcaoMedia: number | null;
  percepcaoRespostas: number;
  rodadasComRecusaSeguranca: number;
  porMecanismo: Record<Fonte, number>;
  tempoMedioDecisaoS: number | null;
};

/** Métricas agregadas das rodadas salvas. Todos os pontos são fictícios (recurso didático). */
export function metricas(sessoes: Estado[]): Metricas {
  const percs = sessoes.map((s) => s.percepcao).filter((x): x is number => x !== null && x !== undefined);
  const tempos = sessoes.map(tempoMedioDecisaoS).filter((x): x is number => x !== null);
  return {
    rodadas: sessoes.length,
    porModo: {
      cartas: sessoes.filter((s) => modoDe(s) === "cartas").length,
      digital: sessoes.filter((s) => modoDe(s) === "digital").length,
    },
    corridas: sessoes.reduce((s, x) => s + resolvidas(x), 0),
    pontosMedia: media(sessoes.map((s) => s.pontos)),
    percepcaoMedia: percs.length ? media(percs) : null,
    percepcaoRespostas: percs.length,
    rodadasComRecusaSeguranca: sessoes.filter((s) => somaPor(s, "opacidade") > 0).length,
    porMecanismo: {
      tempo: sessoes.reduce((s, x) => s + somaPor(x, "tempo"), 0),
      encadeadas: sessoes.reduce((s, x) => s + somaPor(x, "encadeadas"), 0),
      opacidade: sessoes.reduce((s, x) => s + somaPor(x, "opacidade"), 0),
    },
    tempoMedioDecisaoS: tempos.length ? media(tempos) : null,
  };
}

export const f1 = (n: number) => n.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
