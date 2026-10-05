"use client";

/**
 * APURÍMAC INMERSIVO — página principal.
 * Proyecto CamiñAndes (UNAMBA × USC).
 *
 * Layout:
 *  - Hero editorial superior
 *  - Sección mapa full-bleed: FilterBar + ApurimacMap + SidebarDetail + Tour
 *  - Tarjetas de lugares + footer cultural
 *
 * El mapa se carga con `ssr: false` vía next/dynamic para evitar
 * errores de Mapbox GL en el servidor.
 */
import { useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type mapboxgl from "mapbox-gl";
import {
  ChevronLeft,
  ChevronRight,
  Landmark,
  Leaf,
  MapPin,
  Mountain,
  Play,
  Sparkles,
  Square,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { POIS, RUTA_CULTURAL } from "@/data/apurimacData";
import { flyToPoi } from "@/components/Map/ApurimacMap";
import FilterBar from "@/components/UI/FilterBar";
import SidebarDetail from "@/components/UI/SidebarDetail";
import { APURIMAC_CENTER } from "@/types";
import type { FiltrosMapa, POI } from "@/types";
import { CATEGORIA_META } from "@/types";

// Carga dinámica: sin SSR (Mapbox necesita window/document).
const ApurimacMap = dynamic(
  () => import("@/components/Map/ApurimacMap"),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#1a1207] text-amber-100">
        <Mountain className="h-10 w-10 animate-pulse text-amber-400" />
        <p className="text-sm font-medium">
          Cargando los Andes apurimeños…
        </p>
      </div>
    ),
  },
);

const ICONO_CAT: Record<string, React.ReactNode> = {
  arqueologia: <Landmark className="h-3 w-3" />,
  naturaleza: <Leaf className="h-3 w-3" />,
  gastronomia: <UtensilsCrossed className="h-3 w-3" />,
  mitos_tradiciones: <Sparkles className="h-3 w-3" />,
};

export default function Home() {
  const [filtros, setFiltros] = useState<FiltrosMapa>({
    busqueda: "",
    categoria: "todas",
    provincia: "todas",
  });
  const [selected, setSelected] = useState<POI | null>(null);
  // Tour guiado: índice en RUTA_CULTURAL o null si está detenido.
  const [tourIndex, setTourIndex] = useState<number | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  // ── Filtrado en tiempo real (lugares + comidas) ──
  const visibles = useMemo(() => {
    const q = filtros.busqueda.trim().toLowerCase();
    return POIS.filter((p) => {
      if (filtros.categoria !== "todas" && p.categoria !== filtros.categoria)
        return false;
      if (filtros.provincia !== "todas" && p.provincia !== filtros.provincia)
        return false;
      if (!q) return true;
      const platos = p.gastronomiaLocal.map((g) => g.nombre).join(" ");
      return [p.nombre, p.distrito, p.provincia, p.descripcionCorta, platos, ...(p.etiquetas ?? [])]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [filtros]);

  const elegir = (poi: POI) => setSelected(poi);

  // ── Tour virtual guiado ──────────────────────────
  const iniciarTour = () => {
    setTourIndex(0);
    const primera = RUTA_CULTURAL[0];
    setSelected(primera);
    flyToPoi(mapRef.current, primera);
  };
  const detenerTour = () => setTourIndex(null);
  const pasoTour = (dir: 1 | -1) => {
    if (tourIndex === null) return;
    const next =
      (tourIndex + dir + RUTA_CULTURAL.length) % RUTA_CULTURAL.length;
    setTourIndex(next);
    const poi = RUTA_CULTURAL[next];
    setSelected(poi);
    flyToPoi(mapRef.current, poi);
  };
  const tourBadge =
    tourIndex !== null
      ? `Parada ${tourIndex + 1} de ${RUTA_CULTURAL.length}`
      : null;

  const volverInicio = () => {
    mapRef.current?.flyTo({
      center: APURIMAC_CENTER,
      zoom: 8.5,
      pitch: 0,
      bearing: 0,
      duration: 2000,
      essential: true,
    });
  };

  return (
    <div className="bg-[#0f0a04] text-amber-50">
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2000&auto=format&fit=crop)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#1a1207]/70 to-[#0f0a04]" />
        <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-14 md:pb-14 md:pt-20">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-black/40 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-amber-200 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            CamiñAndes · UNAMBA × USC
          </p>
          <h1 className="max-w-3xl text-4xl font-black leading-[1.05] md:text-6xl">
            Apurímac
            <span className="block bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400 bg-clip-text text-transparent">
              Inmersivo
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-amber-100/85 md:text-lg">
            Arqueología chanka e inca, paisajes sagrados, la huatia cocida bajo
            la tierra y los mitos que aún hablan en quechua. Explora el mapa,
            filtra por sabores y déjate guiar por la Ruta Cultural.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <a
              href="#mapa"
              className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-sm font-bold text-stone-900 shadow-xl shadow-amber-500/25 transition hover:bg-amber-300"
            >
              <MapPin className="h-4 w-4" />
              Explorar el mapa
            </a>
            <button
              onClick={iniciarTour}
              className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-white/10 px-5 py-2.5 text-sm font-bold text-amber-100 backdrop-blur transition hover:bg-white/20"
            >
              <Play className="h-4 w-4" />
              Iniciar Ruta Cultural
            </button>
          </div>
          {/* Stats */}
          <div className="mt-8 grid max-w-2xl grid-cols-3 gap-2.5">
            {[
              { n: `${POIS.length}`, l: "lugares vivos" },
              { n: "7", l: "provincias" },
              { n: `${RUTA_CULTURAL.length} paradas`, l: "ruta guiada" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-2xl border border-white/10 bg-black/40 p-3 text-center backdrop-blur"
              >
                <p className="text-xl font-black text-amber-300 md:text-2xl">
                  {s.n}
                </p>
                <p className="text-[11px] uppercase tracking-wider text-amber-100/70">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MAPA ═══ */}
      <section id="mapa" className="relative scroll-mt-16">
        <div className="relative h-[88vh] min-h-[620px] w-full overflow-hidden md:h-[82vh]">
          <ApurimacMap
            pois={visibles}
            selectedId={selected?.id ?? null}
            onSelect={elegir}
            mapRef={mapRef}
            tourIndex={tourIndex}
          />

          {/* Controles superiores: filtros */}
          <div className="pointer-events-none absolute left-3 right-3 top-3 z-10 md:left-6 md:right-auto md:top-6 md:w-[340px]">
            <FilterBar
              filtros={filtros}
              onChange={setFiltros}
              totalVisibles={visibles.length}
              totalPOIs={POIS.length}
            />
            <div className="pointer-events-auto mt-2 flex gap-2">
              <button
                onClick={volverInicio}
                className="rounded-full border border-white/15 bg-[#1a1207]/85 px-3.5 py-1.5 text-xs font-semibold text-amber-100 backdrop-blur transition hover:bg-[#1a1207]"
              >
                ⟲ Volver a Apurímac
              </button>
              {tourIndex === null ? (
                <button
                  onClick={iniciarTour}
                  className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3.5 py-1.5 text-xs font-bold text-stone-900 shadow-lg transition hover:bg-amber-300"
                >
                  <Play className="h-3.5 w-3.5" /> Ruta Cultural
                </button>
              ) : (
                <button
                  onClick={detenerTour}
                  className="inline-flex items-center gap-1.5 rounded-full bg-red-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-lg transition hover:bg-red-400"
                >
                  <Square className="h-3.5 w-3.5" /> Detener tour
                </button>
              )}
            </div>
          </div>

          {/* Drawer detalle */}
          {selected && (
            <div className="absolute bottom-3 left-3 right-3 z-10 md:bottom-6 md:left-auto md:right-6 md:top-6 md:w-[380px]">
              <SidebarDetail
                key={selected.id}
                poi={selected}
                onClose={() => {
                  setSelected(null);
                  setTourIndex(null);
                }}
                tourBadge={tourBadge}
              />
              {/* Controles del tour */}
              {tourIndex !== null && (
                <div className="pointer-events-auto mt-2 flex items-center justify-between rounded-2xl border border-amber-300/30 bg-[#1a1207]/90 p-2.5 backdrop-blur">
                  <button
                    onClick={() => pasoTour(-1)}
                    className="inline-flex items-center gap-1 rounded-xl bg-white/10 px-3 py-2 text-xs font-bold hover:bg-white/20"
                  >
                    <ChevronLeft className="h-4 w-4" /> Anterior
                  </button>
                  <span className="text-xs font-bold text-amber-300">
                    {tourIndex + 1} / {RUTA_CULTURAL.length}
                  </span>
                  <button
                    onClick={() => pasoTour(1)}
                    className="inline-flex items-center gap-1 rounded-xl bg-amber-400 px-3 py-2 text-xs font-bold text-stone-900 hover:bg-amber-300"
                  >
                    Siguiente <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Leyenda flotante inferior (móvil) */}
          {!selected && (
            <div className="absolute bottom-3 left-1/2 z-10 w-max max-w-[94vw] -translate-x-1/2 overflow-x-auto rounded-full border border-white/15 bg-black/60 px-4 py-1.5 text-[11px] text-amber-100/80 backdrop-blur md:hidden">
              {visibles.length} lugares · toca un punto del mapa
            </div>
          )}
        </div>
      </section>

      {/* ═══ TARJETAS ═══ */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black md:text-3xl">
              Lugares que hablan quechua
            </h2>
            <p className="mt-1 text-sm text-amber-100/70">
              {visibles.length} resultados
              {filtros.busqueda && (
                <>
                  {" "}
                  para “<em>{filtros.busqueda}</em>”
                  <button
                    onClick={() =>
                      setFiltros({ ...filtros, busqueda: "" })
                    }
                    className="ml-2 inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-xs hover:bg-white/20"
                  >
                    <X className="h-3 w-3" /> limpiar
                  </button>
                </>
              )}
            </p>
          </div>
        </div>

        {visibles.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/20 p-10 text-center text-sm text-amber-100/70">
            Sin resultados. Prueba con “huatia”, “laguna” o “Saywite”.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibles.map((p) => {
              const meta = CATEGORIA_META[p.categoria];
              const activo = selected?.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => elegir(p)}
                  className={`group overflow-hidden rounded-2xl border text-left transition-all ${
                    activo
                      ? "border-amber-400 shadow-xl shadow-amber-500/20"
                      : "border-white/10 bg-white/5 hover:border-amber-300/40 hover:bg-white/10"
                  }`}
                >
                  <div className="relative h-40 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.imagenUrl}
                      alt={p.nombre}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: meta.color }}
                      />
                      {meta.etiqueta}
                    </span>
                    <span className="absolute bottom-3 left-3 right-3">
                      <span className="block truncate text-base font-extrabold text-white">
                        {p.nombre}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-amber-200/90">
                        <MapPin className="h-3 w-3" />
                        {p.distrito} · {p.provincia} ·{" "}
                        {p.altitud.toLocaleString("es-PE")} m
                      </span>
                    </span>
                  </div>
                  <div className="p-3.5">
                    <p className="line-clamp-2 text-[13px] leading-relaxed text-amber-50/80">
                      {p.descripcionCorta}
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-amber-100/80">
                        {ICONO_CAT[p.categoria]}
                        {p.gastronomiaLocal[0]?.nombre ?? "Tradición viva"}
                      </span>
                      {p.esEmblematico && (
                        <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-[11px] font-bold text-amber-300">
                          ★ Ruta Cultural
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* ═══ FOOTER CULTURAL ═══ */}
      <footer className="border-t border-white/10 bg-black/40 px-4 py-8">
        <div className="mx-auto max-w-6xl text-center text-xs leading-relaxed text-amber-100/60">
          <p className="text-sm font-bold text-amber-200">
            Apurímac Inmersivo · CamiñAndes — UNAMBA × USC
          </p>
          <p className="mx-auto mt-2 max-w-2xl">
            Web educativa y cultural sin fines comerciales. Los relatos son
            tradición oral con fines pedagógicos; las coordenadas son
            referenciales. Mapa © Mapbox © OpenStreetMap.
          </p>
        </div>
      </footer>
    </div>
  );
}
