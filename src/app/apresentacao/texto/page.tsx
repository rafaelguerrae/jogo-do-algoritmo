import type { Metadata } from "next";
import Link from "next/link";
import { montarSlides } from "@/components/apresentacao/slides";
import { metricas } from "@/lib/metricas";

export const metadata: Metadata = { title: "Apresentação em texto · Jogo do Algoritmo" };

/** Conteúdo dos slides em texto corrido, gerado na construção do site (sem dados de rodadas). */
export default function ApresentacaoEmTexto() {
  const slides = montarSlides(metricas([]));
  return (
    <main className="ap-texto">
      <h1 className="cond" style={{ fontSize: "min(64px,14vw)" }}>
        Apresentação <span className="laranja">em texto</span>
      </h1>
      <Link className="btn claro pequeno" href="/apresentacao" style={{ alignSelf: "flex-start" }}>
        Abrir os slides
      </Link>
      {slides.map((s, i) => (
        <section key={s.id} aria-label={`Slide ${i + 1} de ${slides.length}: ${s.titulo}`}>
          <p className="rotulo">
            Slide {i + 1} de {slides.length} · {s.titulo}
          </p>
          {s.corpo}
        </section>
      ))}
    </main>
  );
}
