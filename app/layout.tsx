import "./globals.css";
import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
const head = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-head" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const code = JetBrains_Mono({ subsets: ["latin"], variable: "--font-code" });
export const metadata: Metadata = {
  title: "Maria Pereira | Desenvolvedora Full Stack",
  description: "Portfólio de Maria Pereira, desenvolvedora Full Stack em Recife.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${head.variable} ${body.variable} ${code.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
