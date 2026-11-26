# Banner 90 × 120 cm

`banner.html` é a fonte do banner da Mostra (900 × 1200 px de projeto, 1 px = 1 mm).
Para gerar o PDF: `pip install playwright pypdf && playwright install chromium && python render.py`, depois
ampliar `base.pdf` para 900 × 1200 mm sem perder o vetor:

```python
from pypdf import PdfReader, PdfWriter
r = PdfReader("base.pdf"); pg = r.pages[0]
pg.scale_by(2551.97 / float(pg.mediabox.width))
w = PdfWriter(); w.add_page(pg); w.write("Banner_Jogo_do_Algoritmo_90x120cm.pdf")
```
O PDF é RGB e sem sangria; confirme formato e prova de cor com a gráfica.
