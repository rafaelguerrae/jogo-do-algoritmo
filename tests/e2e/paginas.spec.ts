import { expect, test } from "@playwright/test";

const ROTAS = ["/", "/apresentacao/", "/jogo/", "/tela/", "/resultados/", "/baralho/", "/banner/", "/roteiro/"];

for (const rota of ROTAS) {
  test(`carrega ${rota} sem erros no console`, async ({ page }) => {
    const erros: string[] = [];
    page.on("pageerror", (e) => erros.push(e.message));
    page.on("console", (m) => m.type() === "error" && erros.push(m.text()));
    const resposta = await page.goto(rota);
    expect(resposta?.status()).toBe(200);
    await expect(page.locator("body")).not.toBeEmpty();
    expect(erros).toEqual([]);
  });
}

test("a navegação principal liga todas as abas, menos nas telas cheias", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Principal" });
  for (const nome of ["Projeto", "Apresentação", "Jogo", "Tela do visitante", "Resultados", "Baralho", "Banner", "Roteiro"]) {
    await expect(nav.getByRole("link", { name: nome })).toBeVisible();
  }
  await page.goto("/tela/");
  await expect(page.getByRole("navigation", { name: "Principal" })).toHaveCount(0);
  await page.goto("/apresentacao/");
  await expect(page.getByRole("navigation", { name: "Principal" })).toHaveCount(0);
});

test("os avisos de que os pontos são fictícios aparecem na tela do visitante", async ({ page }) => {
  await page.goto("/tela/");
  await expect(page.getByText(/fictícios: recurso didático, sem equivalência com medição/)).toBeVisible();
});

test.describe("apresentação", () => {
  test("navega por teclado, abre notas e respeita o endereço #n", async ({ page }) => {
    await page.goto("/apresentacao/");
    await expect(page.getByRole("region", { name: /Slide 1 de/ })).toBeVisible();
    await page.keyboard.press("ArrowRight");
    await expect(page.getByRole("region", { name: /Slide 2 de/ })).toBeVisible();
    await page.keyboard.press("ArrowLeft");
    await expect(page.getByRole("region", { name: /Slide 1 de/ })).toBeVisible();
    await page.keyboard.press("End");
    await expect(page.getByRole("region", { name: /Grupo 4/ })).toBeVisible();
    await page.keyboard.press("n");
    await expect(page.getByRole("complementary", { name: "Notas do apresentador" })).toBeVisible();
    await page.goto("/apresentacao/#3");
    await expect(page.getByRole("region", { name: /Slide 3 de .*Definições/ })).toBeVisible();
  });

  test("tem os slides de definições, fontes, métricas e resultados ao vivo", async ({ page }) => {
    await page.goto("/apresentacao/");
    const titulos = await page.getByRole("combobox").locator("option").allTextContents();
    for (const t of ["Definições", "Fontes", "Métricas do jogo", "Resultados da Mostra"]) {
      expect(titulos.join("|")).toContain(t);
    }
  });
});

test.describe("banner", () => {
  test("oferece o PDF e a prévia para baixar, e os arquivos existem", async ({ page, request }) => {
    await page.goto("/banner/");
    const pdf = page.getByRole("link", { name: /PDF para gráfica/ });
    await expect(pdf).toHaveAttribute("download", "");
    const resposta = await request.get((await pdf.getAttribute("href")) ?? "");
    expect(resposta.status()).toBe(200);
    expect(resposta.headers()["content-type"]).toContain("pdf");
    const png = await request.get((await page.getByRole("link", { name: /PNG de prévia/ }).getAttribute("href")) ?? "");
    expect(png.status()).toBe(200);
  });
});

test.describe("baralho", () => {
  test("mostra 24 cartas e 24 versos de 63 × 88 mm", async ({ page }) => {
    await page.goto("/baralho/");
    await expect(page.locator(".carta:not(.costas)")).toHaveCount(24);
    await expect(page.locator(".carta.costas")).toHaveCount(24);
  });
});
