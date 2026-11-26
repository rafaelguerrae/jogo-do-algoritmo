"use client";
import { useSyncExternalStore } from "react";
import { ESTADO_INICIAL, type Estado } from "./game";

const K_ESTADO = "jda:estado";
const K_SESSOES = "jda:sessoes";
const canal = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel("jda") : null;

type Ouvinte = () => void;
const ouvintes = new Set<Ouvinte>();
let estado: Estado = ESTADO_INICIAL;
let sessoes: Estado[] = [];
let lido = false;

const ler = <T>(k: string, padrao: T): T => {
  try {
    const v = localStorage.getItem(k);
    return v ? (JSON.parse(v) as T) : padrao;
  } catch {
    return padrao;
  }
};
const gravar = (k: string, v: unknown) => {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch {
    /* sem armazenamento */
  }
};

function carregar() {
  if (lido || typeof window === "undefined") return;
  lido = true;
  estado = ler(K_ESTADO, ESTADO_INICIAL);
  sessoes = ler<Estado[]>(K_SESSOES, []);
  window.addEventListener("storage", (e) => {
    if (e.key === K_ESTADO || e.key === K_SESSOES) {
      estado = ler(K_ESTADO, ESTADO_INICIAL);
      sessoes = ler(K_SESSOES, []);
      avisar();
    }
  });
  if (canal) {
    canal.onmessage = () => {
      estado = ler(K_ESTADO, ESTADO_INICIAL);
      sessoes = ler(K_SESSOES, []);
      avisar();
    };
  }
}
const avisar = () => {
  for (const f of ouvintes) f();
};
const inscrever = (f: Ouvinte) => {
  carregar();
  ouvintes.add(f);
  return () => {
    ouvintes.delete(f);
  };
};

export function definirEstado(novo: Estado) {
  estado = novo;
  gravar(K_ESTADO, novo);
  canal?.postMessage("estado");
  // a rodada é salva sozinha ao terminar (e de novo se a percepção ou os requisitos mudarem)
  if (novo.status === "fim") salvarSessao(novo);
  else avisar();
}
export function salvarSessao(s: Estado) {
  sessoes = [...sessoes.filter((x) => x.id !== s.id), s];
  gravar(K_SESSOES, sessoes);
  canal?.postMessage("sessoes");
  avisar();
}
export function limparSessoes() {
  sessoes = [];
  gravar(K_SESSOES, sessoes);
  canal?.postMessage("sessoes");
  avisar();
}

const K_TELA = "jda:tela-viva";
/** A tela do visitante avisa que está aberta (usado no modo digital, em que ela conduz o relógio). */
export const marcarTelaViva = () => gravar(K_TELA, Date.now());
export const telaViva = (agora = Date.now()) => agora - ler<number>(K_TELA, 0) < 3000;

export const useEstado = () =>
  useSyncExternalStore(
    inscrever,
    () => estado,
    () => ESTADO_INICIAL,
  );
const VAZIO: Estado[] = [];
export const useSessoes = () =>
  useSyncExternalStore(
    inscrever,
    () => sessoes,
    () => VAZIO,
  );
