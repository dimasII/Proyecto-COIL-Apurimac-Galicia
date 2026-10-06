import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-[#03060a] px-6 pb-12 pt-16">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="flex items-center gap-2 font-display text-sm font-extrabold uppercase tracking-wider text-white">
            <Image
              src="/logo.png"
              alt="Logotipo CamiñAndes"
              width={32}
              height={32}
              loading="lazy"
              className="h-8 w-8 rounded-lg bg-white/5 object-contain p-0.5"
            />
            CamiñAndes · UNAMBA × USC
          </p>
          <p className="mt-3 max-w-md text-xs font-light leading-relaxed text-slate-400">
            Apurímac Inmersivo es una web educativa y cultural sin fines
            comerciales: un museo digital y guía de exploración de la
            arqueología, naturaleza, gastronomía y tradiciones quechuas de
            Apurímac.
          </p>
          <p className="mt-3 text-[11px] text-slate-500">
            Mapa © Mapbox © OpenStreetMap · Relatos de tradición oral con fines
            pedagógicos · Coordenadas referenciales.
          </p>
        </div>
        <nav aria-label="Enlaces del sitio">
          <h2 className="font-display text-xs font-bold uppercase tracking-wider text-white">
            Explorar
          </h2>
          <ul className="mt-3 space-y-1 text-xs font-light text-slate-400">
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
                  className="inline-flex min-h-[36px] items-center rounded-md transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="font-display text-xs font-bold uppercase tracking-wider text-white">
            Proyecto
          </h2>
          <ul className="mt-3 space-y-1 text-xs font-light text-slate-400">
            <li>Universidad Nacional Micaela Bastidas de Apurímac</li>
            <li>Universidade de Santiago de Compostela</li>
            <li className="pt-2 text-[10px] uppercase tracking-widest text-slate-500">
              © 2026 CamiñAndes. Contenido educativo abierto.
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
