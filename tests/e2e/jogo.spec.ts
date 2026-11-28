import { expect, type Page, test } from "@playwright/test";

async function iniciar(page: Page, modo: "cartas" | "digital", corridas: number, apelido = "e2e") {
  await page.goto("/jogo/");
  await page.getByText(modo === "digital" ? "Sem cartas (digital)" : "Com cartas", { exact: true }).click();
  await page.getByLabel(/Apelido do visitante/).fill(apelido);
  await page.getByLabel("Corridas na rodada").selectOption(String(corridas));
  await page.getByRole("button", { name: "Iniciar rodada" }).click();
}

test.beforeEach(async ({ context }) => {
  await context.clearCookies();
});

test.describe("modo com cartas", () => {
  test("rodada completa: regras, tela do visitante, aplicar requisitos e resultados", async ({ page, context }) => {
    await iniciar(page, "cartas", 5, "e2e-cartas");
    const tela = await context.newPage();
    await tela.goto("/tela/");

    // corrida 4 (complexa, 9 s) aceita logo: +1 pressão de tempo
    await page.getByLabel("ou carta nº").fill("4");
    await page.getByRole("button", { name: "Usar carta" }).click();
    await page.keyboard.press("a");
    await expect(page.getByText(/Corrida 4 aceita em .* s, com pouco tempo para decidir/).first()).toBeVisible();

    // corrida 17 (risco): recusa por segurança = +3 e a nota cai
    await page.getByLabel("ou carta nº").fill("17");
    await page.getByRole("button", { name: "Usar carta" }).click();
    await page.keyboard.press("s");
    await expect(page.getByText("4,80")).toBeVisible();
    await expect(tela.getByText(/Sua nota no app caiu. Motivo: não informado./)).toBeVisible();

    // mais três corridas simples aceitas: a 3ª aceita seguida dá +2 (encadeadas)
    for (const id of [2, 3, 5]) {
      await page.getByLabel("ou carta nº").fill(String(id));
      await page.getByRole("button", { name: "Usar carta" }).click();
      await page.keyboard.press("a");
    }
    await expect(page.getByText("Total com os requisitos aplicados")).toBeVisible();
    await expect(page.getByText(/5 corridas · 6 pontos/)).toBeVisible();

    // aplicar os requisitos reduz o total
    await page.getByRole("button", { name: "Aplicar" }).first().click();
    await expect(page.getByText(/Total com os requisitos aplicados: 5 pts \(era 6\)/)).toBeVisible();

    await page.getByRole("button", { name: "4", exact: true }).click();
    await page.goto("/resultados/");
    await expect(page.getByRole("cell", { name: "e2e-cartas" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "cartas", exact: true })).toBeVisible();
  });

  test("o visitante também decide na própria tela e o operador acompanha", async ({ page, context }) => {
    await iniciar(page, "cartas", 8);
    const tela = await context.newPage();
    await tela.goto("/tela/");
    for (const [id, botao] of [
      [2, /^ACEITAR/],
      [3, /^recusar R/],
      [17, /recusar por segurança/],
    ] as const) {
      await page.getByLabel("ou carta nº").fill(String(id));
      await page.getByRole("button", { name: "Usar carta" }).click();
      await tela.getByRole("button", { name: botao }).click();
      await expect(tela.getByRole("button", { name: /^ACEITAR/ })).toHaveCount(0);
    }
    await expect(page.getByText(/Corrida 17 recusada por segurança/).first()).toBeVisible();
  });

  test("a corrida cabe na tela do celular", async ({ page }) => {
    await iniciar(page, "cartas", 8);
    await page.keyboard.press("n");
    for (const [width, height] of [
      [320, 640],
      [375, 667],
    ]) {
      await page.setViewportSize({ width, height });
      await page.goto("/tela/");
      for (const nome of [/^ACEITAR/, /^recusar R/, /recusar por segurança/]) {
        const caixa = await page.getByRole("button", { name: nome }).boundingBox();
        expect(caixa?.height).toBeGreaterThanOrEqual(44);
        expect((caixa?.x ?? 0) + (caixa?.width ?? 0)).toBeLessThanOrEqual(width);
        expect((caixa?.y ?? 0) + (caixa?.height ?? 0)).toBeLessThanOrEqual(height);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    }
  });

  test("pausa simulada zera a sequência", async ({ page }) => {
    await iniciar(page, "cartas", 8);
    await page.keyboard.press("n");
    await page.keyboard.press("a");
    await page.keyboard.press("p");
    await expect(page.getByText("Pausa de 5 min (simulada): sequência zerada").first()).toBeVisible();
    await expect(page.getByText(/seguidas sem pausa: 0/)).toBeVisible();
  });
});

test.describe("modo sem cartas (digital)", () => {
  test.setTimeout(90_000);

  test("o visitante joga na própria tela: corridas aparecem sozinhas e ele decide ali", async ({ page, context }) => {
    await iniciar(page, "digital", 5, "e2e-digital");
    await expect(page.getByText(/Modo digital/).first()).toBeVisible();

    const tela = await context.newPage();
    await tela.goto("/tela/");
    await expect(page.getByText(/Tela do visitante conectada/)).toBeVisible();

    // o operador não tem botões de decisão: só acompanha
    await expect(page.getByRole("button", { name: /Aceitar/ })).toHaveCount(0);

    // cinco corridas, oferecidas sozinhas; a primeira é recusada por segurança
    for (let n = 0; n < 5; n++) {
      const aceitar = tela.getByRole("button", { name: /^ACEITAR/ });
      await expect(aceitar).toBeVisible({ timeout: 15_000 });
      if (n === 0) await tela.getByRole("button", { name: /recusar por segurança/ }).click();
      else await aceitar.click();
    }

    await expect(tela.getByText("Rodada encerrada. Veja o que fez os pontos subirem.")).toBeVisible();
    await expect(tela.getByText(/Nota no app:/)).toContainText("4,80");

    // revelação e percepção também na tela do visitante
    await tela.getByRole("button", { name: "Aplicar" }).first().click();
    await tela.getByRole("button", { name: "3", exact: true }).click();

    await page.goto("/resultados/");
    await expect(page.getByRole("cell", { name: "e2e-digital" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "digital", exact: true })).toBeVisible();
  });

  test("pausa na tela do visitante adia a próxima corrida", async ({ page, context }) => {
    await iniciar(page, "digital", 5);
    const tela = await context.newPage();
    await tela.goto("/tela/");
    await tela.getByRole("button", { name: /^ACEITAR/ }).click({ timeout: 15_000 });
    await tela.getByRole("button", { name: /Fazer pausa de 5 min/ }).click();
    await expect(tela.getByText("Pausa de 5 minutos (simulada).")).toBeVisible();
    await expect(tela.getByText(/Próxima corrida em [3-6] s/)).toBeVisible();
  });

  test("sem a tela do visitante aberta, o operador é avisado", async ({ page }) => {
    await iniciar(page, "digital", 5);
    await expect(page.getByText(/Tela do visitante não detectada/)).toBeVisible({ timeout: 10_000 });
  });
});
