"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Mountain, X } from "lucide-react";

const NAV = [
  { href: "/#inicio", label: "Inicio", match: "inicio" },
  { href: "/#explorar", label: "Explorar", match: "explorar" },
  { href: "/#ruta-cultural", label: "Ruta Cultural", match: "ruta-cultural" },
  { href: "/blog", label: "Blog", match: "blog" },
  { href: "/about", label: "Acerca de", match: "about" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("inicio");
  const pathname = usePathname();

  // Observa secciones visibles para estado activo (Nielsen #1).
  useEffect(() => {
    if (pathname !== "/") {
      setActive(pathname.includes("about") ? "about" : pathname.includes("blog") ? "blog" : "");
      return;
    }
    const ids = ["inicio", "explorar", "ruta-cultural"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0f0a04]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <Link
          href="/#inicio"
          className="flex min-h-[44px] items-center gap-2.5 rounded-lg"
          aria-label="CamiñAndes — inicio"
        >
          <span
            aria-hidden="true"
            className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-amber-400 to-terracota-500 text-stone-900 shadow-lg"
          >
            <Mountain className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block text-[15px] font-extrabold tracking-tight text-white">
              CamiñAndes
            </span>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-300/80">
              UNAMBA × USC
            </span>
          </span>
        </Link>

        {/* Desktop */}
        <nav aria-label="Navegación principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => {
              const isActive = active === item.match;
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`inline-flex min-h-[44px] items-center rounded-full px-4 text-sm font-semibold btn-transition ${
                      isActive
                        ? "bg-amber-400 text-stone-900 shadow-lg shadow-amber-500/20"
                        : "text-amber-100/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Móvil */}
        <button
          type="button"
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-white/15 bg-white/5 text-amber-100 md:hidden"
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav
          id="menu-movil"
          aria-label="Navegación móvil"
          className="border-t border-white/10 bg-[#0f0a04] px-4 pb-4 pt-2 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV.map((item) => {
              const isActive = active === item.match;
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex min-h-[48px] items-center rounded-xl px-4 text-[15px] font-semibold ${
                      isActive
                        ? "bg-amber-400 text-stone-900"
                        : "text-amber-100 hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
