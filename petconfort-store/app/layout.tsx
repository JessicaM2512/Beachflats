import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PetConfort - Tapete Térmico para Pets",
  description: "Conforto térmico para o seu pet, em qualquer estação. Tapete térmico de alta qualidade para cães e gatos.",
  keywords: "tapete térmico, pet, cachorro, gato, conforto, aquecimento",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
