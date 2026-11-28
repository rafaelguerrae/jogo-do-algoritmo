import { expect, test } from "@playwright/test";

const ROTAS = ["/", "/apresentacao/", "/apresentacao/texto/", "/jogo/", "/tela/", "/resultados/", "/baralho/", "/banner/", "/roteiro/"];

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

test("a navegação principal liga as abas do menu e some nas telas cheias", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Principal" });
  for (const nome of ["Projeto", "Jogo", "Resultados", "Visitante"]) {
    await expect(nav.getByRole("link", { name: nome })).toBeVisible();
  }
  // acesso só pelo endereço
  for (const nome of ["Apresentação", "Roteiro", "Banner", "Baralho"]) {
    await expect(nav.getByRole("link", { name: nome })).toHaveCount(0);
  }
  await page.goto("/tela/");
  await expect(page.getByRole("navigation", { name: "Principal" })).toHaveCount(0);
  await page.goto("/apresentacao/");
  await expect(page.getByRole("navigation", { name: "Principal" })).toHaveCount(0);
});

test("o botão Projeto da tela do visitante volta para a página inicial", async ({ page }) => {
  await page.goto("/tela/");
  await page.getByRole("link", { name: "Projeto" }).click();
  await expect(page).toHaveURL(/:\d+\/$/);
});

test("o menu cabe em tela de celular, com alvos de toque de 44 px", async ({ page }) => {
  for (const largura of [320, 375, 430]) {
    await page.setViewportSize({ width: largura, height: 700 });
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Principal" });
    for (const link of await nav.getByRole("link").all()) {
      const caixa = await link.boundingBox();
      expect(caixa?.height).toBeGreaterThanOrEqual(44);
      expect(caixa?.width).toBeGreaterThanOrEqual(44);
      expect((caixa?.x ?? 0) + (caixa?.width ?? 0)).toBeLessThanOrEqual(largura);
    }
    // o botão Visitante encosta na borda direita
    const botao = await nav.getByRole("link", { name: "Visitante" }).boundingBox();
    expect((botao?.x ?? 0) + (botao?.width ?? 0)).toBeCloseTo(largura, 0);
  }
});

test("o aviso de pontos fictícios aparece no jogo, na tela do visitante e nos resultados", async ({ page }) => {
  for (const rota of ["/jogo/", "/tela/", "/resultados/"]) {
    await page.goto(rota);
    await expect(page.getByText(/Pontos fictícios, sem base em estudo ou medida humana\./).first()).toBeVisible();
  }
});

test("a página do projeto mostra literatura, regulação, limites e referências", async ({ page }) => {
  await page.goto("/");
  for (const titulo of [/O que a literatura mostra/, /Regras jurídicas/, /O que isto não é/, /Referências/]) {
    await expect(page.getByRole("heading", { name: titulo })).toBeVisible();
  }
  await expect(page.getByRole("link", { name: /PLP 152\/2025: ficha/ })).toHaveAttribute("href", /camara\.leg\.br/);
  await expect(page.getByRole("link", { name: /EUR-Lex/ }).first()).toHaveAttribute("href", /eur-lex\.europa\.eu/);
  await expect(page.getByRole("rowheader", { name: "Exigência gerada" })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Do mecanismo à melhoria/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Objetivo geral" })).toBeVisible();
  for (const nome of ["Trânsito", "Veículo", "Ambiente", "Relações organizacionais"]) {
    await expect(page.getByRole("rowheader", { name: nome })).toBeVisible();
  }
  await expect(page.getByText(/O instrumento não foi aplicado, nenhuma pontuação foi calculada/)).toBeVisible();
});

test("a matriz preenchida abre na página do projeto, sem rolagem lateral no celular", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto("/");
  await page.getByText(/Ver a matriz preenchida/).click();
  await expect(page.getByRole("heading", { name: "Oliveira & Junges, 2023" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
});

test("no celular a página do projeto não rola para o lado", async ({ page }) => {
  for (const width of [320, 375]) {
    await page.setViewportSize({ width, height: 700 });
    for (const rota of ["/", "/apresentacao/texto/", "/resultados/", "/jogo/"]) {
      await page.goto(rota);
      expect(await page.evaluate(() => document.documentElement.scrollWidth), `${rota} em ${width}`).toBeLessThanOrEqual(width);
    }
  }
});

test("os slides têm versão em texto, com os 14 slides", async ({ page }) => {
  await page.goto("/apresentacao/texto/");
  await expect(page.getByRole("region")).toHaveCount(14);
  await expect(page.getByRole("region", { name: /Método/ })).toContainText("não foi aplicado");
});

test("os slides cabem no palco de 1600 x 900", async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 900 });
  await page.goto("/apresentacao/");
  const seletor = page.getByRole("combobox");
  const total = await seletor.locator("option").count();
  const estouraram: string[] = [];
  for (let i = 0; i < total; i++) {
    await seletor.selectOption(String(i));
    const sobra = await page.locator(".ap-slide").evaluate((s) => {
      const base = s.getBoundingClientRect();
      const rodape = s.querySelector(".ap-rodape");
      const limite = (rodape?.getBoundingClientRect().top ?? base.bottom) + 2;
      const filhos = [...s.children].filter((c) => c !== rodape).map((c) => c.getBoundingClientRect());
      return filhos.some((r) => r.top < base.top - 2 || r.bottom > limite || r.right > base.right + 2);
    });
    if (sobra) estouraram.push((await seletor.locator("option").nth(i).textContent()) ?? String(i));
  }
  expect(estouraram).toEqual([]);
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

test("sem registros, os resultados ficam em consolidação, sem números", async ({ page }) => {
  await page.goto("/resultados/");
  await expect(page.getByText("Resultados em consolidação")).toBeVisible();
  await expect(page.getByText("Rodadas registradas (n)")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Exportar CSV" })).toBeDisabled();
});

test.describe("resultados", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/resultados/");
    await page.evaluate(() => {
      const rodada = { id: "1", inicio: Date.now(), fim: Date.now(), status: "fim", apelido: "visitante 12", eventos: [], pontos: 7 };
      localStorage.setItem("jda:sessoes", JSON.stringify([rodada]));
    });
    await page.reload();
  });

  test("no celular a rodada aparece inteira e os botões ficam na mesma linha", async ({ page }) => {
    for (const width of [320, 375]) {
      await page.setViewportSize({ width, height: 700 });
      for (const celula of await page.locator("table.rodadas td").all()) {
        const caixa = await celula.boundingBox();
        expect((caixa?.x ?? 0) + (caixa?.width ?? 0)).toBeLessThanOrEqual(width);
      }
      const exportar = await page.getByRole("button", { name: "Exportar CSV" }).boundingBox();
      const apagar = await page.getByRole("button", { name: "Apagar" }).boundingBox();
      expect(apagar?.y).toBe(exportar?.y);
      expect((apagar?.x ?? 0) + (apagar?.width ?? 0)).toBeLessThanOrEqual(width);
    }
  });

  test("apagar só depois de confirmar no diálogo", async ({ page }) => {
    const dialogo = page.getByRole("dialog", { name: "Apagar rodadas?" });
    await page.getByRole("button", { name: "Apagar" }).click();
    await dialogo.getByRole("button", { name: "Cancelar" }).click();
    await expect(dialogo).toBeHidden();
    await expect(page.getByRole("cell", { name: "visitante 12" })).toBeVisible();

    await page.getByRole("button", { name: "Apagar" }).click();
    await dialogo.getByRole("button", { name: "Apagar" }).click();
    await expect(page.getByText("Resultados em consolidação")).toBeVisible();
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

test("o rótulo dos botões da página inicial contrasta com o fundo", async ({ page }) => {
  await page.goto("/");
  for (const nome of ["Jogar agora", "Abrir o jogo", "Baralho para imprimir"]) {
    const botao = page.getByRole("link", { name: nome });
    const { cor, fundo } = await botao.evaluate((b) => ({ cor: getComputedStyle(b).color, fundo: getComputedStyle(b).backgroundColor }));
    expect(cor, nome).not.toBe(fundo);
  }
});
