"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  ["/", "Projeto"],
  ["/apresentacao", "Apresentação"],
  ["/jogo", "Jogo"],
  ["/tela", "Tela do visitante"],
  ["/resultados", "Resultados"],
  ["/baralho", "Baralho"],
  ["/banner", "Banner"],
  ["/roteiro", "Roteiro"],
] as const;

/** Telas cheias, sem navegação: a do visitante e a apresentação. */
const SEM_NAV = new Set(["/tela", "/apresentacao"]);

export default function Nav() {
  const p = (usePathname() || "/").replace(/\/$/, "") || "/";
  if (SEM_NAV.has(p)) return null;
  return (
    <nav className="topo semprint" aria-label="Principal">
      <span className="marca">JOGO DO ALGORITMO</span>
      {LINKS.map(([href, nome]) => (
        <Link key={href} href={href} aria-current={p === href ? "page" : undefined}>
          {nome}
        </Link>
      ))}
    </nav>
  );
}
