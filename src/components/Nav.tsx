"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

/** /apresentacao, /roteiro e /banner ficam fora do menu de propósito: acesso só pelo endereço. */
const LINKS = [
  ["/", "Projeto"],
  ["/jogo", "Jogo"],
  ["/resultados", "Resultados"],
  ["/baralho", "Baralho"],
] as const;

/** Telas cheias, sem o menu: a do visitante (só volta ao projeto) e a apresentação. */
const SEM_NAV = new Set(["/tela", "/apresentacao"]);

export default function Nav() {
  const p = (usePathname() || "/").replace(/\/$/, "") || "/";
  if (SEM_NAV.has(p)) return null;
  return (
    <nav className="topo semprint" aria-label="Principal">
      <span className="marca">JOGO DO ALGORITMO</span>
      <div className="topo-links">
        {LINKS.map(([href, nome]) => (
          <Link key={href} href={href} aria-current={p === href ? "page" : undefined}>
            {nome}
          </Link>
        ))}
      </div>
      <Link className="topo-visitante" href="/tela">
        Visitante
      </Link>
    </nav>
  );
}
