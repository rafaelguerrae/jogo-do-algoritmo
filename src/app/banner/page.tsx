const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
const ARQUIVOS = {
  pdf: `${BASE}/banner/Banner_Jogo_do_Algoritmo_90x120cm.pdf`,
  png: `${BASE}/banner/Banner_Jogo_do_Algoritmo_previa.png`,
  html: `${BASE}/banner/banner.html`,
};

export default function Banner() {
  return (
    <main className="roteiro" style={{ maxWidth: 1100 }}>
      <h1 className="cond" style={{ fontSize: 72 }}>
        Banner <span className="laranja">90 × 120 cm</span>
      </h1>
      <p className="rotulo">PDF vetorial em RGB, sem sangria. Confirme formato e prova de cor com a gráfica antes de imprimir.</p>

      <div className="banner-grade">
        <div className="painel">
          <h3>Baixar</h3>
          <div className="acoes" style={{ flexDirection: "column", alignItems: "flex-start" }}>
            <a className="btn" href={ARQUIVOS.pdf} download>
              PDF para gráfica (900 × 1200 mm)
            </a>
            <a className="btn claro" href={ARQUIVOS.png} download>
              PNG de prévia (2700 × 3600 px)
            </a>
            <a className="btn claro" href={ARQUIVOS.html} target="_blank" rel="noreferrer">
              Abrir fonte HTML
            </a>
          </div>
          <h3 style={{ marginTop: 24 }}>Gerar de novo (build)</h3>
          <p style={{ marginBottom: 10 }}>Depois de editar o banner em public/banner/banner.html, gere os arquivos com:</p>
          <pre className="codigo">npm run banner:build</pre>
          <p className="nota" style={{ fontSize: 14 }}>
            Precisa do Chromium do Playwright (npx playwright install chromium). No GitHub, o fluxo “Banner” gera os arquivos como artefato
            do PR.
          </p>
        </div>

        <div className="painel banner-previa">
          {/* biome-ignore lint/performance/noImgElement: site estático sem otimização de imagem */}
          <img src={ARQUIVOS.png} alt="Prévia do banner Jogo do Algoritmo" width={450} height={600} />
        </div>
      </div>
    </main>
  );
}
