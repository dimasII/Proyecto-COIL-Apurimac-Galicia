"use client";

import Image from "next/image";
import { ArrowRight, CheckCircle2, Circle, MapPin, Play } from "lucide-react";
import { RUTA_CULTURAL } from "@/data/apurimacData";
import { CATEGORIA_META } from "@/types";

interface Props {
  explorados: Set<string>;
  onSelect: (id: string) => void;
  onIniciar: () => void;
}

export default function RutaCultural({ explorados, onSelect, onIniciar }: Props) {
  const total = RUTA_CULTURAL.length;
  const hechos = RUTA_CULTURAL.filter((p) => explorados.has(p.id)).length;
  const pct = Math.round((hechos / total) * 100);

  return (
    <div>
      {/* Progreso */}
      <div className="rounded-andina border border-white/10 bg-white/[.04] p-4 md:p-5" role="status" aria-live="polite" aria-label={`Progreso de la ruta: ${hechos} de ${total} lugares explorados`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-bold text-white">
            {hechos} de {total} lugares explorados
          </p>
          <p className="text-xs font-semibold text-amber-300">{pct} % del recorrido</p>
        </div>
        <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-valuenow={hechos} aria-valuemin={0} aria-valuemax={total} aria-label="Progreso de la Ruta Cultural">
          <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-terracota-500 transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
        <button
          type="button"
          onClick={onIniciar}
          className="mt-3 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-sm font-bold text-stone-900 btn-transition hover:bg-amber-300"
        >
          <Play className="h-4 w-4" aria-hidden="true" />
          {hechos > 0 ? "Continuar recorrido" : "Comenzar recorrido"}
        </button>
      </div>

      {/* Timeline */}
      <ol className="mt-6 space-y-0">
        {RUTA_CULTURAL.map((p, i) => {
          const meta = CATEGORIA_META[p.categoria];
          const visto = explorados.has(p.id);
          const ultimo = i === total - 1;
          return (
            <li key={p.id} className="relative flex gap-4 pb-6 last:pb-0">
              {/* Línea + número */}
              <div className="flex flex-col items-center" aria-hidden="true">
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-black ${visto ? "bg-amber-400 text-stone-900" : "border-2 border-amber-400/50 bg-[#1a1207] text-amber-300"}`}>
                  {visto ? <CheckCircle2 className="h-5 w-5" /> : i + 1}
                </span>
                {!ultimo && <span className="mt-1 w-0.5 flex-1 rounded bg-gradient-to-b from-amber-400/60 to-white/10" />}
              </div>
              <div className={`flex-1 rounded-andina border p-3 card-lift md:p-4 ${visto ? "border-amber-400/40 bg-amber-400/[.06]" : "border-white/10 bg-white/[.04] hover:border-amber-300/30"}`}>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl sm:w-40">
                    <Image src={p.imagenUrl} alt={`Fotografía de ${p.nombre}`} fill sizes="160px" loading="lazy" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-amber-300/80">
                      Parada {i + 1} · {meta.etiqueta}
                    </p>
                    <h3 className="mt-0.5 text-base font-extrabold text-white">{p.nombre}</h3>
                    <p className="mt-1 line-clamp-2 text-[13px] text-amber-100/70">{p.descripcionCorta}</p>
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-amber-200/80">
                      <MapPin className="h-3 w-3" aria-hidden="true" />
                      {p.distrito} · {p.provincia} · {p.altitud.toLocaleString("es-PE")} m
                    </p>
                    <button
                      type="button"
                      onClick={() => onSelect(p.id)}
                      className="mt-2 inline-flex min-h-[40px] items-center gap-1.5 text-[13px] font-bold text-amber-300 btn-transition hover:gap-2.5 hover:text-amber-200"
                      aria-label={`Ir a la parada ${i + 1}: ${p.nombre}`}
                    >
                      {visto ? "Volver a visitar" : "Visitar parada"}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                {!visto && (
                  <span className="sr-only">
                    <Circle className="h-3 w-3" />
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
