import Link from "next/link";
import { Mountain } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="flex items-center gap-2 text-sm font-extrabold text-amber-200">
            <span
              aria-hidden="true"
              className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-amber-400 to-terracota-500 text-stone-900"
            >
              <Mountain className="h-4 w-4" />
            </span>
            CamiñAndes · UNAMBA × USC
          </p>
          <p className="mt-3 max-w-md text-[13px] leading-relaxed text-amber-100/65">
            Apurímac Inmersivo es una web educativa y cultural sin fines
            comerciales: un museo digital y guía de exploración de la
            arqueología, naturaleza, gastronomía y tradiciones quechuas de
            Apurímac.
          </p>
          <p className="mt-3 text-xs text-amber-100/45">
            Mapa © Mapbox © OpenStreetMap · Relatos de tradición oral con fines
            pedagógicos · Coordenadas referenciales.
          </p>
        </div>
        <nav aria-label="Enlaces del sitio">
          <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-amber-300/80">
            Explorar
          </h2>
          <ul className="mt-3 space-y-1 text-sm">
            {[
              { href: "/#inicio", label: "Inicio" },
              { href: "/#explorar", label: "Explorar" },
              { href: "/#ruta-cultural", label: "Ruta Cultural" },
              { href: "/blog", label: "Blog" },
              { href: "/about", label: "Acerca de" },
            ].map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="inline-flex min-h-[36px] items-center rounded-md text-amber-100/75 hover:text-amber-300 hover:underline hover:underline-offset-4"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-amber-300/80">
            Proyecto
          </h2>
          <ul className="mt-3 space-y-1 text-sm text-amber-100/75">
            <li>Universidad Nacional Micaela Bastidas de Apurímac</li>
            <li>Universidade de Santiago de Compostela</li>
            <li className="pt-2 text-xs text-amber-100/50">
              © 2026 CamiñAndes. Contenido educativo abierto.
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
