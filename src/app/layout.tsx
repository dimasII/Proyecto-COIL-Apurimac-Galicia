import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Apurímac Inmersivo · CamiñAndes UNAMBA × USC",
  description:
    "Mapa interactivo cultural de Apurímac: arqueología chanka e inca, paisajes sagrados, huatia y mitos andinos. Proyecto CamiñAndes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col bg-white text-gray-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
