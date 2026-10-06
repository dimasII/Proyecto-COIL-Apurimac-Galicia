"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  ChefHat,
  Landmark,
  Map as MapIcon,
  MapPin,
  Mountain,
  Sparkles,
  Tag,
  X,
} from "lucide-react";
import type { POI } from "@/types";
import { CATEGORIA_META } from "@/types";

type TabId = "historia" | "gastronomia" | "leyenda";
const TABS: Array<{ id: TabId; label: string; icon: React.ReactNode }> = [
  { id: "historia", label: "Historia", icon: <Landmark className="h-3.5 w-3.5" aria-hidden="true" /> },
  { id: "gastronomia", label: "Sabores", icon: <ChefHat className="h-3.5 w-3.5" aria-hidden="true" /> },
  { id: "leyenda", label: "Leyendas", icon: <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> },
];

interface Props {
  poi: POI;
  posicion: string;
  tourBadge?: string | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  onVerEnMapa?: () => void;
}

export default function SidebarDetail({ poi, posicion, tourBadge, onClose, onPrev, onNext, onVerEnMapa }: Props) {
  const [tab, setTab] = useState<TabId>("historia");
  const meta = CATEGORIA_META[poi.categoria];

  useEffect(() => {
    setTab("historia");
  }, [poi.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.getElementById("detalle-titulo")?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [poi.id, onClose]);

  return (
    <aside
      role="dialog"
      aria-modal="false"
      aria-labelledby="detalle-titulo"
      className="pointer-events-auto flex max-h-[52vh] w-full flex-col overflow-hidden rounded-2xl border border-white/20 bg-[#1a1207]/95 shadow-2xl backdrop-blur-md md:max-h-none md:h-full"
    >
      <div className="relative h-40 shrink-0 md:h-48">
        <Image
          src={poi.imagenUrl}
          alt={`Fotografía de ${poi.nombre}, ${poi.distrito}`}
          fill
          sizes="(max-width: 768px) 100vw, 360px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1207] via-[#1a1207]/30 to-transparent" aria-hidden="true" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar ficha del lugar"
          className="absolute right-3 top-3 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-black/60 text-white backdrop-blur btn-transition hover:bg-black/85"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
        <div className="absolute bottom-3 left-4 right-4">
          <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
            <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${meta.colorBg}`}>{meta.etiqueta}</span>
            {tourBadge && (
              <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-[11px] font-bold text-stone-900">{tourBadge}</span>
            )}
            <span className="rounded-full bg-black/55 px-2.5 py-0.5 text-[11px] font-semibold text-amber-100">{posicion}</span>
          </div>
          <h2 id="detalle-titulo" tabIndex={-1} className="text-xl font-extrabold leading-tight text-white">
            {poi.nombre}
          </h2>
          {poi.nombreQuechua && <p className="text-sm italic text-amber-200/90">«{poi.nombreQuechua}» · quechua</p>}
        </div>
      </div>

      <p className="flex items-center gap-4 border-b border-white/10 px-4 py-2.5 text-xs text-amber-100/85">
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
          {poi.distrito} · {poi.provincia}
        </span>
        <span className="flex items-center gap-1">
          <Mountain className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
          {poi.altitud.toLocaleString("es-PE")} m
        </span>
      </p>

      <div className="flex shrink-0 gap-1 border-b border-white/10 bg-black/20 p-2" role="tablist" aria-label={`Contenido de ${poi.nombre}`}>
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-xs font-bold btn-transition ${
              tab === t.id ? "bg-amber-400 text-stone-900 shadow" : "text-amber-100/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      <div className="apurimac-scroll min-h-0 flex-1 overflow-y-auto px-4 py-4 text-[15px] leading-relaxed text-amber-50/90" role="tabpanel">
        {tab === "historia" && (
          <div className="space-y-3">
            <p className="flex items-start gap-2 rounded-xl bg-white/5 p-3 text-sm italic text-amber-100/90">
              <BookOpenText className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
              {poi.descripcionCorta}
            </p>
            <p className="whitespace-pre-line">{poi.historiaDetallada}</p>
          </div>
        )}
        {tab === "gastronomia" && (
          <div className="space-y-3">
            {poi.gastronomiaLocal.map((plato, i) => (
              <article key={i} className="rounded-xl border border-amber-400/20 bg-gradient-to-br from-amber-400/10 to-transparent p-3">
                <h4 className="flex items-center gap-1.5 font-bold text-amber-200">
                  <ChefHat className="h-4 w-4" aria-hidden="true" />
                  {plato.nombre}
                </h4>
                <p className="mt-1 text-sm">{plato.descripcion}</p>
                {plato.ingredientesClave && (
                  <p className="mt-1.5 text-xs text-amber-100/65">
                    <strong className="text-amber-200/80">Ingredientes:</strong> {plato.ingredientesClave.join(" · ")}
                  </p>
                )}
                {plato.ocasion && (
                  <p className="mt-1 text-xs text-amber-100/65">
                    <strong className="text-amber-200/80">Cuándo:</strong> {plato.ocasion}
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
        {tab === "leyenda" && (
          <div className="space-y-3">
            <blockquote className="rounded-xl border-l-4 border-amber-400 bg-white/5 p-4 font-serif text-base italic leading-relaxed text-amber-100">
              “{poi.leyendaOMito}”
            </blockquote>
            <p className="text-xs text-amber-100/55">Relato de tradición oral con fines educativos. CamiñAndes UNAMBA × USC.</p>
          </div>
        )}
        <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-white/10 pt-3">
          <Tag className="h-3.5 w-3.5 text-amber-400/70" aria-hidden="true" />
          {poi.etiquetas.map((t) => (
            <span key={t} className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-amber-100/80">
              #{t}
            </span>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 border-t border-white/10 bg-black/30 p-2.5">
        <button
          type="button"
          onClick={onPrev}
          disabled={!onPrev}
          aria-label={onPrev ? "Ver lugar anterior" : "No hay lugar anterior"}
          className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1 rounded-xl bg-white/10 px-3 py-2 text-xs font-bold btn-transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Anterior
        </button>
        {onVerEnMapa && (
          <button
            type="button"
            onClick={onVerEnMapa}
            aria-label={`Centrar el mapa en ${poi.nombre}`}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1 rounded-xl border border-amber-300/40 px-3 py-2 text-xs font-bold text-amber-200 btn-transition hover:bg-white/10"
          >
            <MapIcon className="h-4 w-4" aria-hidden="true" /> Ver en mapa
          </button>
        )}
        <button
          type="button"
          onClick={onNext}
          disabled={!onNext}
          aria-label={onNext ? "Ver lugar siguiente" : "No hay lugar siguiente"}
          className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1 rounded-xl bg-amber-400 px-3 py-2 text-xs font-bold text-stone-900 btn-transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Siguiente <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
