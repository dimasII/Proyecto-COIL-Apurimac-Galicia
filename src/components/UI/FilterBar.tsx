"use client";

import { Landmark, Leaf, Search, Sparkles, UtensilsCrossed, X } from "lucide-react";
import { PROVINCIAS } from "@/data/apurimacData";
import type { CategoriaPOI, FiltrosMapa } from "@/types";
import { CATEGORIA_META } from "@/types";

interface FilterBarProps {
  filtros: FiltrosMapa;
  onChange: (f: FiltrosMapa) => void;
  totalVisibles: number;
  totalPOIs: number;
}

const CATEGORIAS: Array<{ id: CategoriaPOI | "todas"; label: string }> = [
  { id: "todas", label: "Todo" },
  { id: "arqueologia", label: "Arqueología" },
  { id: "naturaleza", label: "Naturaleza" },
  { id: "gastronomia", label: "Gastronomía" },
  { id: "mitos_tradiciones", label: "Mitos" },
];

function iconoCategoria(id: string) {
  if (id === "arqueologia") return <Landmark className="h-3.5 w-3.5" aria-hidden="true" />;
  if (id === "naturaleza") return <Leaf className="h-3.5 w-3.5" aria-hidden="true" />;
  if (id === "gastronomia") return <UtensilsCrossed className="h-3.5 w-3.5" aria-hidden="true" />;
  if (id === "mitos_tradiciones") return <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />;
  return null;
}

export default function FilterBar({ filtros, onChange, totalVisibles, totalPOIs }: FilterBarProps) {
  return (
    <div className="pointer-events-auto w-full rounded-andina border border-white/20 bg-[#1a1207]/90 p-3 shadow-2xl backdrop-blur-md md:p-4">
      <div role="search" aria-label="Buscar lugares de Apurímac" className="relative">
        <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-200/70" />
        <label htmlFor="buscar-lugares" className="sr-only">
          Buscar lugares, Huatia, Saywite, laguna
        </label>
        <input
          id="buscar-lugares"
          type="search"
          autoComplete="off"
          value={filtros.busqueda}
          onChange={(e) => onChange({ ...filtros, busqueda: e.target.value })}
          placeholder="Buscar lugares, Huatia, Saywite, laguna…"
          className="w-full rounded-xl border border-white/10 bg-white/10 py-2.5 pl-9 pr-9 text-sm text-amber-50 placeholder:text-amber-100/45 focus:border-amber-400/60 focus:outline-none focus:ring-2 focus:ring-amber-400/30 [&::-webkit-search-cancel-button]:hidden"
        />
        {filtros.busqueda && (
          <button
            type="button"
            onClick={() => onChange({ ...filtros, busqueda: "" })}
            aria-label="Limpiar búsqueda"
            className="absolute right-2 top-1/2 min-h-[32px] min-w-[32px] -translate-y-1/2 rounded-full p-1 text-amber-100/60 btn-transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>

      <div
        role="group"
        aria-label="Filtrar por categoría"
        className="no-scrollbar -mx-1 mt-3 flex gap-1.5 overflow-x-auto px-1 pb-1 md:flex-wrap"
      >
        {CATEGORIAS.map((c) => {
          const activa = filtros.categoria === c.id;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={activa}
              onClick={() => onChange({ ...filtros, categoria: c.id as FiltrosMapa["categoria"] })}
              className={`inline-flex min-h-[36px] shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold btn-transition ${
                activa
                  ? "bg-amber-400 text-stone-900 shadow-lg shadow-amber-500/25"
                  : "bg-white/10 text-amber-50/90 hover:bg-white/20"
              }`}
            >
              {activa && <span aria-hidden="true">✓</span>}
              {iconoCategoria(c.id)}
              {c.label}
            </button>
          );
        })}
      </div>

      <div className="mt-2 flex items-center gap-2">
        <label htmlFor="filtro-provincia" className="sr-only">
          Filtrar por provincia
        </label>
        <select
          id="filtro-provincia"
          value={filtros.provincia}
          onChange={(e) => onChange({ ...filtros, provincia: e.target.value })}
          className="min-h-[40px] flex-1 cursor-pointer rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs font-medium text-amber-50 focus:border-amber-400/60 focus:outline-none [&>option]:text-stone-900"
        >
          <option value="todas">Todas las provincias</option>
          {PROVINCIAS.map((p) => (
            <option key={p.nombre} value={p.nombre}>
              {p.nombre}
            </option>
          ))}
        </select>
        <span
          role="status"
          aria-live="polite"
          className="whitespace-nowrap rounded-full bg-white/10 px-2.5 py-2 text-[11px] font-semibold text-amber-100"
        >
          {totalVisibles}/{totalPOIs}
        </span>
      </div>

      <div className="mt-2.5 hidden flex-wrap gap-x-3 gap-y-1 border-t border-white/10 pt-2.5 md:flex" aria-label="Leyenda de categorías">
        {(Object.keys(CATEGORIA_META) as CategoriaPOI[]).map((k) => (
          <span key={k} className="flex items-center gap-1.5 text-[11px] text-amber-100/70">
            <span className="h-2.5 w-2.5 rounded-full ring-2 ring-white/30" style={{ background: CATEGORIA_META[k].color }} aria-hidden="true" />
            {CATEGORIA_META[k].etiqueta}
          </span>
        ))}
      </div>
    </div>
  );
}
