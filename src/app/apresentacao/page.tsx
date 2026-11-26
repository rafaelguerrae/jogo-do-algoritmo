"use client";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { montarSlides } from "@/components/apresentacao/slides";
import { metricas } from "@/lib/metricas";
import { useSessoes } from "@/lib/store";

const LARGURA = 1600;
const ALTURA = 900;

export default function Apresentacao() {
  const sessoes = useSessoes();
  const slides = useMemo(() => montarSlides(metricas(sessoes)), [sessoes]);
  const [i, setI] = useState(0);
  const [escala, setEscala] = useState(0.5);
  const [notas, setNotas] = useState(false);
  const [ajuda, setAjuda] = useState(false);
  const raiz = useRef<HTMLDivElement>(null);
  const total = slides.length;

  const ir = useCallback(
    (n: number) => {
      const alvo = Math.max(0, Math.min(total - 1, n));
      setI(alvo);
      try {
        history.replaceState(null, "", `#${alvo + 1}`);
      } catch {
        /* sem histórico */
      }
    },
    [total],
  );

  // slide inicial pelo endereço (#3), mudanças do #n e escala do palco conforme a janela
  useEffect(() => {
    const doEndereco = () => {
      const n = Number.parseInt(window.location.hash.slice(1), 10);
      if (Number.isFinite(n)) setI(Math.max(0, Math.min(total - 1, n - 1)));
    };
    const medir = () => setEscala(Math.min(window.innerWidth / LARGURA, window.innerHeight / ALTURA));
    doEndereco();
    medir();
    window.addEventListener("hashchange", doEndereco);
    window.addEventListener("resize", medir);
    return () => {
      window.removeEventListener("hashchange", doEndereco);
      window.removeEventListener("resize", medir);
    };
  }, [total]);
  const tela = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void raiz.current?.requestFullscreen?.();
  };

  useEffect(() => {
    const f = (ev: KeyboardEvent) => {
      if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
      const k = ev.key;
      if (["ArrowRight", "ArrowDown", "PageDown", " ", "Enter"].includes(k)) ir(i + 1);
      else if (["ArrowLeft", "ArrowUp", "PageUp", "Backspace"].includes(k)) ir(i - 1);
      else if (k === "Home") ir(0);
      else if (k === "End") ir(total - 1);
      else if (k.toLowerCase() === "f") tela();
      else if (k.toLowerCase() === "n") setNotas((x) => !x);
      else if (k === "?") setAjuda((x) => !x);
      else return;
      ev.preventDefault();
    };
    window.addEventListener("keydown", f);
    return () => window.removeEventListener("keydown", f);
  }, [i, total, ir]);

  const s = slides[Math.min(i, total - 1)];

  return (
    <div className="ap-raiz" ref={raiz}>
      <div className="ap-palco" style={{ transform: `scale(${escala})`, width: LARGURA, height: ALTURA }}>
        <section className={`ap-slide ${s.escuro ? "escuro" : ""}`} aria-label={`Slide ${i + 1} de ${total}: ${s.titulo}`} key={s.id}>
          {s.corpo}
          <div className="ap-rodape">
            <span>Jogo do Algoritmo</span>
            <span>
              {i + 1} / {total}
            </span>
          </div>
        </section>
      </div>

      <div className="ap-barra" role="toolbar" aria-label="Controles da apresentação">
        <Link href="/" className="ap-ctl">
          Sair
        </Link>
        <button type="button" className="ap-ctl" onClick={() => ir(i - 1)} disabled={i === 0} aria-label="Slide anterior">
          ←
        </button>
        <label className="ap-sel">
          <span className="ap-so">Ir para o slide</span>
          <select value={i} onChange={(e) => ir(Number(e.target.value))}>
            {slides.map((x, n) => (
              <option key={x.id} value={n}>
                {n + 1}. {x.titulo}
              </option>
            ))}
          </select>
        </label>
        <button type="button" className="ap-ctl" onClick={() => ir(i + 1)} disabled={i === total - 1} aria-label="Próximo slide">
          →
        </button>
        <button type="button" className="ap-ctl" aria-pressed={notas} onClick={() => setNotas((x) => !x)}>
          Notas <kbd>N</kbd>
        </button>
        <button type="button" className="ap-ctl" onClick={tela}>
          Tela cheia <kbd>F</kbd>
        </button>
        <button type="button" className="ap-ctl" aria-pressed={ajuda} onClick={() => setAjuda((x) => !x)} aria-label="Atalhos">
          ?
        </button>
      </div>

      <div className="ap-progresso" aria-hidden="true">
        <i style={{ width: `${((i + 1) / total) * 100}%` }} />
      </div>

      {notas && (
        <aside className="ap-notas" aria-label="Notas do apresentador">
          <b>Notas · {s.titulo}</b>
          <p>{s.notas}</p>
        </aside>
      )}
      {ajuda && (
        <aside className="ap-notas ap-ajuda" aria-label="Atalhos de teclado">
          <b>Atalhos</b>
          <p>
            <kbd>→</kbd> <kbd>Espaço</kbd> próximo · <kbd>←</kbd> anterior · <kbd>Home</kbd>/<kbd>End</kbd> primeiro/último · <kbd>F</kbd>{" "}
            tela cheia · <kbd>N</kbd> notas · <kbd>?</kbd> esta ajuda
          </p>
        </aside>
      )}
    </div>
  );
}
