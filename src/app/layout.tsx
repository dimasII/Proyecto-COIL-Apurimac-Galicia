import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

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
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col bg-[#05090e] font-sans text-slate-50 antialiased selection:bg-sky-500 selection:text-white">
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
