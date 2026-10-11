"use client";

import { useEffect, useState } from "react";
import GaleriaLugar from "./GaleriaLugar";
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
      className="pointer-events-auto flex max-h-[60vh] w-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0c141f]/95 shadow-2xl backdrop-blur-xl md:max-h-none md:h-full"
    >
      <div className="relative shrink-0">
        <GaleriaLugar poi={poi} />
        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/70 via-black/20 to-transparent" aria-hidden="true" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar ficha del lugar"
          className="absolute right-3 top-3 z-40 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-black/60 text-white backdrop-blur btn-transition hover:bg-black/85"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
        <div className="absolute bottom-3 left-4 right-4 z-30">
          <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
            <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${meta.colorBg}`}>{meta.etiqueta}</span>
            {tourBadge && (
              <span className="rounded-full bg-terracota-500 px-2.5 py-1 text-xs font-bold text-white">{tourBadge}</span>
            )}
            <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-stone-700">{posicion}</span>
          </div>
          <h2 id="detalle-titulo" tabIndex={-1} className="text-2xl font-extrabold leading-tight text-white drop-shadow-md">
            {poi.nombre}
          </h2>
          {poi.nombreQuechua && <p className="text-base italic text-white/90">«{poi.nombreQuechua}» · quechua</p>}
        </div>
      </div>

      <p className="flex items-center gap-4 border-b border-white/5 bg-white/[.02] px-4 py-3 text-sm font-semibold text-slate-200">
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5 text-sky-400" aria-hidden="true" />
          {poi.distrito} · {poi.provincia}
        </span>
        <span className="flex items-center gap-1">
          <Mountain className="h-3.5 w-3.5 text-sky-400" aria-hidden="true" />
          {poi.altitud.toLocaleString("es-PE")} m
        </span>
      </p>

      <div className="flex shrink-0 gap-1 border-b border-white/5 bg-black/20 p-2" role="tablist" aria-label={`Contenido de ${poi.nombre}`}>
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`flex min-h-[48px] flex-1 items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-sm font-bold btn-transition ${
              tab === t.id ? "bg-white text-[#0c141f] shadow" : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      <div className="apurimac-scroll min-h-0 flex-1 overflow-y-auto bg-transparent px-4 py-4 text-base font-normal leading-relaxed text-slate-200" role="tabpanel">
        {tab === "historia" && (
          <div className="space-y-3">
            <p className="flex items-start gap-2 rounded-xl border border-white/5 bg-white/5 p-3 text-base italic text-slate-200">
              <BookOpenText className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" aria-hidden="true" />
              {poi.descripcionCorta}
            </p>
            <p className="whitespace-pre-line">{poi.historiaDetallada}</p>
          </div>
        )}
        {tab === "gastronomia" && (
          <div className="space-y-3">
            {poi.gastronomiaLocal.map((plato, i) => (
              <article key={i} className="rounded-xl border border-white/5 bg-white/5 p-3">
                <h4 className="flex items-center gap-1.5 font-bold text-white">
                  <ChefHat className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                  {plato.nombre}
                </h4>
                <p className="mt-1 text-sm">{plato.descripcion}</p>
                {plato.ingredientesClave && (
                  <p className="mt-1.5 text-xs text-slate-400">
                    <strong className="text-slate-200">Ingredientes:</strong> {plato.ingredientesClave.join(" · ")}
                  </p>
                )}
                {plato.ocasion && (
                  <p className="mt-1 text-xs text-slate-400">
                    <strong className="text-slate-200">Cuándo:</strong> {plato.ocasion}
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
        {tab === "leyenda" && (
          <div className="space-y-3">
            <blockquote className="rounded-xl border-l-4 border-amber-400 bg-white/5 p-4 font-serif text-base italic leading-relaxed text-slate-200">
              “{poi.leyendaOMito}”
            </blockquote>
            <p className="text-xs text-slate-500">Relato de tradición oral con fines educativos. CamiñAndes UNAMBA × USC.</p>
          </div>
        )}
        <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-white/5 pt-3">
          <Tag className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
          {poi.etiquetas.map((t) => (
            <span key={t} className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-slate-400">
              #{t}
            </span>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 border-t border-white/5 bg-black/30 p-2.5">
        <button
          type="button"
          onClick={onPrev}
          disabled={!onPrev}
          aria-label={onPrev ? "Ver lugar anterior" : "No hay lugar anterior"}
          className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1 rounded-xl bg-white/10 px-3 py-2 text-xs font-bold text-white btn-transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Anterior
        </button>
        {onVerEnMapa && (
          <button
            type="button"
            onClick={onVerEnMapa}
            aria-label={`Centrar el mapa en ${poi.nombre}`}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-slate-200 btn-transition hover:bg-white/10"
          >
            <MapIcon className="h-4 w-4" aria-hidden="true" /> Ver en mapa
          </button>
        )}
        <button
          type="button"
          onClick={onNext}
          disabled={!onNext}
          aria-label={onNext ? "Ver lugar siguiente" : "No hay lugar siguiente"}
          className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1 rounded-xl bg-white px-3 py-2 text-xs font-bold text-[#0c141f] btn-transition hover:bg-sky-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Siguiente <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
