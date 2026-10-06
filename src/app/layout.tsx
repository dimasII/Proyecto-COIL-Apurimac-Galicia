import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Apurímac Inmersivo | CamiñAndes — UNAMBA × USC",
  description:
    "Explora la cultura, naturaleza, gastronomía y tradiciones de Apurímac mediante un mapa interactivo y una ruta cultural. Proyecto CamiñAndes UNAMBA × USC.",
  keywords: [
    "Apurímac",
    "CamiñAndes",
    "UNAMBA",
    "USC",
    "mapa cultural",
    "turismo Apurímac",
    "Sóndor",
    "Saywite",
    "huatia",
    "quechua",
  ],
  authors: [{ name: "CamiñAndes — UNAMBA × USC" }],
  openGraph: {
    title: "Apurímac Inmersivo | CamiñAndes — UNAMBA × USC",
    description:
      "Descubre los lugares, sabores, paisajes y tradiciones que cuentan la historia de Apurímac.",
    type: "website",
    locale: "es_PE",
    siteName: "Apurímac Inmersivo · CamiñAndes",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apurímac Inmersivo | CamiñAndes — UNAMBA × USC",
    description:
      "Mapa interactivo y ruta cultural de Apurímac: arqueología, naturaleza, gastronomía y mitos.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="flex min-h-screen flex-col bg-[#0f0a04] font-sans text-amber-50 antialiased">
        <a href="#contenido" className="skip-link">
          Saltar al contenido principal
        </a>
        <Header />
        <main id="contenido" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
