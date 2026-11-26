import type { Metadata, Viewport } from "next";
import Nav from "@/components/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jogo do Algoritmo · I Mostra de Ergonomia UFABC",
  description: "Simulação didática sobre gestão algorítmica e carga mental no trabalho por aplicativo. UFABC, ESGE006-23.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
