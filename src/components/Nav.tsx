"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  ["/", "Projeto"], ["/jogo", "Jogo"], ["/tela", "Tela do visitante"], ["/resultados", "Resultados"], ["/baralho", "Baralho"], ["/roteiro", "Roteiro"],
] as const;

export default function Nav() {
  const p = (usePathname() || "/").replace(/\/$/, "") || "/";
  if (p === "/tela") return null;
  return (
    <nav className="topo semprint" aria-label="Principal">
      <span className="marca">JOGO DO ALGORITMO · <b>UFABC</b></span>
      {LINKS.map(([href, nome]) => (
        <Link key={href} href={href} aria-current={p === href ? "page" : undefined}>{nome}</Link>
      ))}
    </nav>
  );
}
