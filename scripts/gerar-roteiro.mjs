// Gera docs/ROTEIRO.md a partir de src/lib/roteiro.ts (rodar: node scripts/gerar-roteiro.mjs)
import { readFileSync, writeFileSync } from "node:fs";

const src = readFileSync("src/lib/roteiro.ts", "utf8")
  .replace(/export type[^\n]*\n/g, "")
  .replace(/: Bloco\[\]|: \{ p: string; r: string \}\[\]/g, "")
  .replace(/export const/g, "const");
const { ABERTURA, PITCH_30S, PERGUNTAS, DICAS } = new Function(`${src}\nreturn {ABERTURA,PITCH_30S,PERGUNTAS,DICAS}`)();
let md =
  "# Roteiro da apresentação: Jogo do Algoritmo\n\nCerca de 5 minutos por visitante. Uma pessoa opera, outra fala.\n\n## Pitch de 30 segundos\n\n" +
  PITCH_30S +
  "\n\n## Passo a passo\n\n";
for (const b of ABERTURA) md += `### ${b.titulo} (${b.tempo})\n\n> “${b.fala}”\n\n${b.acao ? `*Ação:* ${b.acao}\n\n` : ""}`;
md +=
  "## Perguntas que podem aparecer\n\n" +
  PERGUNTAS.map((q) => `**${q.p}**\n${q.r}\n`).join("\n") +
  "\n## Dicas para o grupo\n\n" +
  DICAS.map((d) => `- ${d}`).join("\n") +
  "\n";
writeFileSync("docs/ROTEIRO.md", md);
