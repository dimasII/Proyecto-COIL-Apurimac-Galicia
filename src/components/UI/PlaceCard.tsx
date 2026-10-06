"use client";

import { forwardRef } from "react";
import Image from "next/image";
import { ArrowRight, MapPin, Mountain, Navigation } from "lucide-react";
import type { POI } from "@/types";
import { CATEGORIA_META } from "@/types";

interface Props {
  poi: POI;
  activo: boolean;
  index: number;
  onSelect: (poi: POI) => void;
  onFocusMap: (poi: POI) => void;
}

const PlaceCard = forwardRef<HTMLElement, Props>(function PlaceCard(
  { poi, activo, index, onSelect, onFocusMap },
  ref,
) {
  const meta = CATEGORIA_META[poi.categoria];
  return (
    <article
      ref={ref as React.Ref<HTMLElement>}
      id={`tarjeta-${poi.id}`}
      aria-current={activo ? "true" : undefined}
      className={`group flex scroll-mt-24 flex-col overflow-hidden rounded-2xl border glass-card card-lift ${
        activo
          ? "border-sky-400 shadow-[0_0_0_2px_#38bdf8,0_25px_50px_-12px_rgba(56,189,248,.45)]"
          : "hover:border-sky-400/20"
      }`}
      style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
    >
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden">
        <Image
          src={poi.imagenUrl}
          alt={`Fotografía de ${poi.nombre}, distrito de ${poi.distrito}, provincia de ${poi.provincia}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 400px"
          loading="lazy"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" aria-hidden="true" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-stone-800 shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full" style={{ background: meta.color }} aria-hidden="true" />
            {meta.etiqueta}
          </span>
          {poi.esEmblematico && (
            <span className="rounded-full bg-terracota-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
              Ruta Cultural
            </span>
          )}
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-[17px] font-extrabold leading-snug text-white drop-shadow-md">{poi.nombre}</h3>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs font-semibold text-white drop-shadow">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" aria-hidden="true" />
              {poi.distrito} · {poi.provincia}
            </span>
            <span className="inline-flex items-center gap-1">
              <Mountain className="h-3 w-3" aria-hidden="true" />
              {poi.altitud.toLocaleString("es-PE")} m
            </span>
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="line-clamp-2 text-sm font-light leading-relaxed text-slate-400">{poi.descripcionCorta}</p>
        <p className="mt-2 truncate text-xs text-slate-500">
          Sabor local: <span className="font-semibold text-slate-300">{poi.gastronomiaLocal[0]?.nombre ?? "Tradición viva"}</span>
        </p>
        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onSelect(poi)}
            aria-pressed={activo}
            aria-label={`Abrir ficha de ${poi.nombre}`}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-white px-3 py-2 text-sm font-bold text-[#0c141f] btn-transition hover:bg-sky-400 hover:text-white"
          >
            Abrir ficha
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onFocusMap(poi)}
            aria-label={`Centrar el mapa en ${poi.nombre}`}
            title={`Centrar el mapa en ${poi.nombre}`}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-200 btn-transition hover:bg-white/10"
          >
            <Navigation className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
});

export default PlaceCard;
