# Banner 90 × 120 cm

A fonte do banner é `public/banner/banner.html` (900 × 1200 px de projeto, 1 px = 1 mm), com as fontes ao lado.
Os arquivos prontos ficam na página `/banner` do site.

```bash
npx playwright install chromium   # uma vez
npm run banner:build              # gera PDF 900 × 1200 mm e PNG de prévia em public/banner/
```

O PDF sai vetorial (o layout é ampliado por CSS, sem rasterizar) e em **RGB, sem sangria**: confirme formato e prova de cor com a gráfica.
No GitHub, o fluxo "Banner" gera os mesmos arquivos como artefato.
