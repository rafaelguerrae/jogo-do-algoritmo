import type { Metadata, Viewport } from "next";
import Nav from "@/components/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jogo do Algoritmo",
  description: "Simulação didática sobre gestão algorítmica e carga mental no trabalho por aplicativo.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body cz-shortcut-listen="true">
        <Nav />
        {children}
      </body>
    </html>
  );
}
