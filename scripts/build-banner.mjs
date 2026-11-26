// Gera o banner 90 x 120 cm a partir de public/banner/banner.html.
// Uso: pnpm banner:build   (precisa do Chromium do Playwright: pnpm exec playwright install chromium)
// Saída (em public/banner/): PDF vetorial em 900 x 1200 mm e PNG de prévia em 2700 x 3600 px.
import { mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "@playwright/test";

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pasta = join(raiz, "public", "banner");
const fonte = pathToFileURL(join(pasta, "banner.html")).href;
const PDF = join(pasta, "Banner_Jogo_do_Algoritmo_90x120cm.pdf");
const PNG = join(pasta, "Banner_Jogo_do_Algoritmo_previa.png");

// O projeto é desenhado em 900 x 1200 px (1 px = 1 mm). Em CSS, 1 mm = 96 / 25,4 px.
const PX_POR_MM = 96 / 25.4;

mkdirSync(pasta, { recursive: true });
const navegador = await chromium.launch();
try {
  const pagina = await navegador.newPage({ viewport: { width: 900, height: 1200 }, deviceScaleFactor: 3 });
  await pagina.goto(fonte);
  await pagina.evaluate(() => document.fonts.ready);
  await pagina.screenshot({ path: PNG });
  // zoom amplia o layout inteiro sem rasterizar: o PDF continua vetorial.
  // O @page do HTML está em px (900 x 1200); aqui ele é refeito em mm, senão o zoom estoura a página e o conteúdo sai cortado.
  // O overflow:hidden no html faz o corte do body valer (sem ele vai para a viewport) e a trama de pontos, que passa da borda,
  // não aumenta a largura da página: o Chromium encolheria tudo no PDF para caber (as barras pretas não chegavam à borda).
  await pagina.addStyleTag({ content: `@page{size:900mm 1200mm;margin:0}html{zoom:${PX_POR_MM};overflow:hidden}` });
  await pagina.pdf({ path: PDF, width: "900mm", height: "1200mm", printBackground: true, preferCSSPageSize: true, pageRanges: "1" });
} finally {
  await navegador.close();
}
console.log(`Banner gerado:\n  ${PDF}\n  ${PNG}`);
