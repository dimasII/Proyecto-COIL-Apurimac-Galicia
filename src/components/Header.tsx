"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

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
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0c141f]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <Link
          href="/#inicio"
          className="flex min-h-[44px] items-center gap-2.5 rounded-lg"
          aria-label="CamiñAndes — inicio"
        >
          <Image
            src="/logo.png"
            alt="Logotipo CamiñAndes"
            width={40}
            height={40}
            priority
            className="h-10 w-10 rounded-xl bg-white/5 object-contain p-0.5"
          />
          <span className="leading-tight">
            <span className="block bg-gradient-to-r from-white to-white/70 bg-clip-text font-display text-[15px] font-extrabold uppercase tracking-wider text-transparent">
              CamiñAndes
            </span>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
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
                    className={`inline-flex min-h-[44px] items-center rounded-full px-4 text-xs font-semibold uppercase tracking-[0.15em] btn-transition ${
                      isActive
                        ? "bg-white text-[#0c141f] shadow-lg"
                        : "text-slate-300 hover:text-sky-400"
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
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 md:hidden"
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
          className="border-t border-white/5 bg-[#0c141f] px-4 pb-4 pt-2 md:hidden"
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
                        ? "bg-white text-[#0c141f]"
                        : "text-slate-300 hover:bg-white/5"
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
