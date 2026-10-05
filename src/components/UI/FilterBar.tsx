"use client";

import { Landmark, Leaf, Search, Sparkles, UtensilsCrossed, X } from "lucide-react";
import { PROVINCIAS } from "@/data/apurimacData";
import type { CategoriaPOI, FiltrosMapa } from "@/types";
import { CATEGORIA_META } from "@/types";

/** Props del filtro superior. */
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
  if (id === "arqueologia") return <Landmark className="h-3.5 w-3.5" />;
  if (id === "naturaleza") return <Leaf className="h-3.5 w-3.5" />;
  if (id === "gastronomia") return <UtensilsCrossed className="h-3.5 w-3.5" />;
  if (id === "mitos_tradiciones") return <Sparkles className="h-3.5 w-3.5" />;
  return null;
}

/**
 * Barra de búsqueda + filtros por categoría y provincia.
 * 100% controlada: el estado vive en page.tsx.
 */
export default function FilterBar({
  filtros,
  onChange,
  totalVisibles,
  totalPOIs,
}: FilterBarProps) {
  return (
    <div className="pointer-events-auto w-full rounded-2xl border border-white/20 bg-[#1a1207]/85 p-3 shadow-2xl backdrop-blur-md md:p-4">
      {/* Buscador */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-200/70" />
        <input
          value={filtros.busqueda}
          onChange={(e) => onChange({ ...filtros, busqueda: e.target.value })}
          placeholder="Buscar lugares, Huatia, Saywite, laguna…"
          className="w-full rounded-xl border border-white/10 bg-white/10 py-2.5 pl-9 pr-9 text-sm text-amber-50 placeholder:text-amber-100/40 focus:border-amber-400/60 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
        />
        {filtros.busqueda && (
          <button
            onClick={() => onChange({ ...filtros, busqueda: "" })}
            aria-label="Limpiar búsqueda"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-amber-100/60 hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Categorías */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {CATEGORIAS.map((c) => {
          const activa = filtros.categoria === c.id;
          return (
            <button
              key={c.id}
              onClick={() =>
                onChange({ ...filtros, categoria: c.id as FiltrosMapa["categoria"] })
              }
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                activa
                  ? "bg-amber-400 text-stone-900 shadow-lg shadow-amber-500/20"
                  : "bg-white/10 text-amber-50/90 hover:bg-white/20"
              }`}
            >
              {iconoCategoria(c.id)}
              {c.label}
            </button>
          );
        })}
      </div>

      {/* Provincia + contador */}
      <div className="mt-3 flex items-center gap-2">
        <select
          value={filtros.provincia}
          onChange={(e) => onChange({ ...filtros, provincia: e.target.value })}
          className="flex-1 cursor-pointer rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs font-medium text-amber-50 focus:border-amber-400/60 focus:outline-none [&>option]:text-stone-900"
        >
          <option value="todas">Todas las provincias</option>
          {PROVINCIAS.map((p) => (
            <option key={p.nombre} value={p.nombre}>
              {p.nombre}
            </option>
          ))}
        </select>
        <span className="whitespace-nowrap rounded-full bg-white/10 px-2.5 py-1.5 text-[11px] font-semibold text-amber-100">
          {totalVisibles}/{totalPOIs}
        </span>
      </div>

      {/* Leyenda de colores */}
      <div className="mt-2.5 hidden flex-wrap gap-x-3 gap-y-1 border-t border-white/10 pt-2.5 md:flex">
        {(Object.keys(CATEGORIA_META) as CategoriaPOI[]).map((k) => (
          <span
            key={k}
            className="flex items-center gap-1.5 text-[11px] text-amber-100/70"
          >
            <span
              className="h-2.5 w-2.5 rounded-full ring-2 ring-white/30"
              style={{ background: CATEGORIA_META[k].color }}
            />
            {CATEGORIA_META[k].etiqueta}
          </span>
        ))}
      </div>
    </div>
  );
}
