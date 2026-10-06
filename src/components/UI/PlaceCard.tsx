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
      className={`group flex scroll-mt-24 flex-col overflow-hidden rounded-2xl border bg-[#171006] card-lift ${
        activo
          ? "border-amber-400 shadow-[0_0_0_2px_#fbbf24,0_16px_40px_-16px_rgba(251,191,36,.45)]"
          : "border-white/10 hover:border-amber-300/35"
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
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur">
            <span className="h-2 w-2 rounded-full" style={{ background: meta.color }} aria-hidden="true" />
            {meta.etiqueta}
          </span>
          {poi.esEmblematico && (
            <span className="rounded-full bg-amber-400 px-2.5 py-1 text-[11px] font-bold text-stone-900">
              Ruta Cultural
            </span>
          )}
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-[17px] font-extrabold leading-snug text-white">{poi.nombre}</h3>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-amber-200">
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
        <p className="line-clamp-2 text-sm leading-relaxed text-amber-50/85">{poi.descripcionCorta}</p>
        <p className="mt-2 truncate text-xs text-amber-100/60">
          Sabor local: <span className="font-semibold text-amber-100/85">{poi.gastronomiaLocal[0]?.nombre ?? "Tradición viva"}</span>
        </p>
        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onSelect(poi)}
            aria-pressed={activo}
            aria-label={`Abrir ficha de ${poi.nombre}`}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-amber-400 px-3 py-2 text-sm font-bold text-stone-900 btn-transition hover:bg-amber-300"
          >
            Abrir ficha
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onFocusMap(poi)}
            aria-label={`Centrar el mapa en ${poi.nombre}`}
            title={`Centrar el mapa en ${poi.nombre}`}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-amber-300/40 px-3 py-2 text-amber-200 btn-transition hover:bg-white/10"
          >
            <Navigation className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
});

export default PlaceCard;
