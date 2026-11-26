import { defineConfig, devices } from "@playwright/test";

const PORTA = 3100;
const servir = `npx serve out -l ${PORTA} --no-clipboard`;

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: { baseURL: `http://localhost:${PORTA}`, trace: "retain-on-failure" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } } }],
  webServer: {
    // o site é estático: constrói e serve a pasta out/ (na CI o build já foi feito antes)
    command: process.env.CI ? servir : `npm run build && ${servir}`,
    url: `http://localhost:${PORTA}/jogo/`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
