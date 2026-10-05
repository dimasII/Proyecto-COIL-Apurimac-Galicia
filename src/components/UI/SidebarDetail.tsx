"use client";

import { useState } from "react";
import {
  BookOpenText,
  ChefHat,
  Landmark,
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
  { id: "historia", label: "Historia", icon: <Landmark className="h-3.5 w-3.5" /> },
  { id: "gastronomia", label: "Sabores", icon: <ChefHat className="h-3.5 w-3.5" /> },
  { id: "leyenda", label: "Leyendas", icon: <Sparkles className="h-3.5 w-3.5" /> },
];

interface Props {
  poi: POI | null;
  onClose: () => void;
  /** Índice dentro del tour (opcional): "Parada 3 de 7". */
  tourBadge?: string | null;
}

/**
 * Drawer lateral con pestañas: Historia / Gastronomía / Leyendas.
 * Se muestra cuando hay un POI seleccionado.
 */
export default function SidebarDetail({ poi, onClose, tourBadge }: Props) {
  const [tab, setTab] = useState<TabId>("historia");

  // Reset de tab al cambiar de POI (clave: usar key en el padre o efecto).
  // Aquí lo resolvemos con `key={poi?.id}` desde page.tsx.

  if (!poi) return null;
  const meta = CATEGORIA_META[poi.categoria];

  return (
    <aside className="pointer-events-auto flex max-h-[62vh] w-full flex-col overflow-hidden rounded-2xl border border-white/20 bg-[#1a1207]/92 shadow-2xl backdrop-blur-md md:max-h-none md:h-full md:w-[380px]">
      {/* Imagen cabecera */}
      <div className="relative h-44 shrink-0 md:h-52">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={poi.imagenUrl}
          alt={poi.nombre}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1207] via-[#1a1207]/30 to-transparent" />
        <button
          onClick={onClose}
          aria-label="Cerrar detalle"
          className="absolute right-3 top-3 rounded-full bg-black/60 p-2 text-white backdrop-blur transition hover:bg-black/80"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="absolute bottom-3 left-4 right-4">
          <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
            <span
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${meta.colorBg}`}
            >
              {meta.etiqueta}
            </span>
            {tourBadge && (
              <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-[11px] font-bold text-stone-900">
                {tourBadge}
              </span>
            )}
          </div>
          <h2 className="text-xl font-extrabold leading-tight text-white md:text-2xl">
            {poi.nombre}
          </h2>
          {poi.nombreQuechua && (
            <p className="text-sm italic text-amber-200/90">
              «{poi.nombreQuechua}» · quechua
            </p>
          )}
        </div>
      </div>

      {/* Meta: ubicación + altitud */}
      <div className="flex items-center gap-4 border-b border-white/10 px-4 py-2.5 text-xs text-amber-100/80">
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5 text-amber-400" />
          {poi.distrito} · {poi.provincia}
        </span>
        <span className="flex items-center gap-1">
          <Mountain className="h-3.5 w-3.5 text-amber-400" />
          {poi.altitud.toLocaleString("es-PE")} m s. n. m.
        </span>
      </div>

      {/* Tabs */}
      <div className="flex shrink-0 gap-1 border-b border-white/10 bg-black/20 p-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-xs font-bold transition-all ${
              tab === t.id
                ? "bg-amber-400 text-stone-900 shadow"
                : "text-amber-100/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* Contenido scrollable */}
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 text-sm leading-relaxed text-amber-50/90 apurimac-scroll">
        {tab === "historia" && (
          <div className="space-y-3">
            <p className="flex items-start gap-2 rounded-xl bg-white/5 p-3 text-[13px] italic text-amber-100/90">
              <BookOpenText className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              {poi.descripcionCorta}
            </p>
            <p className="whitespace-pre-line">{poi.historiaDetallada}</p>
          </div>
        )}

        {tab === "gastronomia" && (
          <div className="space-y-3">
            {poi.gastronomiaLocal.map((plato, i) => (
              <article
                key={i}
                className="rounded-xl border border-amber-400/20 bg-gradient-to-br from-amber-400/10 to-transparent p-3"
              >
                <h4 className="flex items-center gap-1.5 font-bold text-amber-200">
                  <ChefHat className="h-4 w-4" />
                  {plato.nombre}
                </h4>
                <p className="mt-1 text-[13px]">{plato.descripcion}</p>
                {plato.ingredientesClave && (
                  <p className="mt-1.5 text-xs text-amber-100/60">
                    <strong className="text-amber-200/80">Ingredientes:</strong>{" "}
                    {plato.ingredientesClave.join(" · ")}
                  </p>
                )}
                {plato.ocasion && (
                  <p className="mt-1 text-xs text-amber-100/60">
                    <strong className="text-amber-200/80">Cuándo:</strong>{" "}
                    {plato.ocasion}
                  </p>
                )}
              </article>
            ))}
          </div>
        )}

        {tab === "leyenda" && (
          <div className="space-y-3">
            <blockquote className="rounded-xl border-l-4 border-amber-400 bg-white/5 p-4 font-serif text-[15px] italic leading-relaxed text-amber-100">
              “{poi.leyendaOMito}”
            </blockquote>
            <p className="text-xs text-amber-100/50">
              Relato de tradición oral recopilado con fines educativos. Proyecto
              CamiñAndes UNAMBA × USC.
            </p>
          </div>
        )}

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5 border-t border-white/10 pt-3">
          <Tag className="h-3.5 w-3.5 text-amber-400/70" />
          {poi.etiquetas.map((t) => (
            <span
              key={t}
              className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-amber-100/80"
            >
              #{t}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
