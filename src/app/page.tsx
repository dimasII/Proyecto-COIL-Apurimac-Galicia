"use client";

/**
 * APURÍMAC INMERSIVO — CamiñAndes (UNAMBA × USC).
 * Atlas turístico editorial: mapa + lista conectados.
 */
import { useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type mapboxgl from "mapbox-gl";
import {
  ArrowRight,
  BookOpenText,
  Compass,
  Landmark,
  List,
  Map as MapIcon,
  Mountain,
  Play,
  Square,
  Users,
} from "lucide-react";
import HeroCinematic from "@/components/HeroCinematic";
import { POIS, RUTA_CULTURAL } from "@/data/apurimacData";
import { flyToPoi } from "@/components/Map/ApurimacMap";
import FilterBar from "@/components/UI/FilterBar";
import SidebarDetail from "@/components/UI/SidebarDetail";
import PlaceCard from "@/components/UI/PlaceCard";
import RutaCultural from "@/components/UI/RutaCultural";
import EmptyState from "@/components/UI/EmptyState";
import { APURIMAC_CENTER } from "@/types";
import type { FiltrosMapa, POI } from "@/types";

const ApurimacMap = dynamic(() => import("@/components/Map/ApurimacMap"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#0c141f] p-6" role="status" aria-label="Cargando el mapa">
      <Mountain className="h-10 w-10 animate-pulse text-sky-400" aria-hidden="true" />
      <p className="text-sm font-medium text-slate-300">Cargando los Andes apurimeños…</p>
      <div className="w-56" aria-hidden="true">
        <div className="skeleton h-2 rounded-full" />
        <div className="skeleton mt-2 h-2 w-2/3 rounded-full" />
      </div>
    </div>
  ),
});

type VistaMovil = "mapa" | "lista";

function scrollA(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [filtros, setFiltros] = useState<FiltrosMapa>({ busqueda: "", categoria: "todas", provincia: "todas" });
  const [selected, setSelected] = useState<POI | null>(null);
  const [tourIndex, setTourIndex] = useState<number | null>(null);
  const [explorados, setExplorados] = useState<Set<string>>(new Set());
  const [vista, setVista] = useState<VistaMovil>("mapa");
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const tarjetasRef = useRef<Record<string, HTMLElement | null>>({});

  const visibles = useMemo(() => {
    const q = filtros.busqueda.trim().toLowerCase();
    return POIS.filter((p) => {
      if (filtros.categoria !== "todas" && p.categoria !== filtros.categoria) return false;
      if (filtros.provincia !== "todas" && p.provincia !== filtros.provincia) return false;
      if (!q) return true;
      const platos = p.gastronomiaLocal.map((g) => g.nombre).join(" ");
      return [p.nombre, p.distrito, p.provincia, p.descripcionCorta, platos, ...(p.etiquetas ?? [])]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [filtros]);

  /** Marcador → tarjeta: selecciona y desplaza la tarjeta a la vista. */
  const elegirDesdeMapa = (poi: POI) => {
    setSelected(poi);
    setExplorados((prev) => new Set(prev).add(poi.id));
    requestAnimationFrame(() => {
      tarjetasRef.current[poi.id]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  };

  /** Tarjeta → mapa: selecciona y centra el mapa; en móvil salta a la vista de mapa. */
  const centrarEnMapa = (poi: POI) => {
    setSelected(poi);
    setExplorados((prev) => new Set(prev).add(poi.id));
    flyToPoi(mapRef.current, poi);
    if (typeof window !== "undefined" && window.innerWidth < 1024) setVista("mapa");
    scrollA("explorar");
  };

  const elegir = (poi: POI) => {
    setSelected(poi);
    setExplorados((prev) => new Set(prev).add(poi.id));
  };

  const elegirPorId = (id: string) => {
    const poi = POIS.find((p) => p.id === id);
    if (!poi) return;
    elegir(poi);
    flyToPoi(mapRef.current, poi);
    scrollA("explorar");
  };

  const indiceSeleccionado = selected ? visibles.findIndex((p) => p.id === selected.id) : -1;
  const posicion =
    indiceSeleccionado >= 0 ? `Lugar ${indiceSeleccionado + 1} de ${visibles.length}` : selected ? "Detalle del lugar" : "";
  const anterior = indiceSeleccionado > 0 ? visibles[indiceSeleccionado - 1] : null;
  const siguiente = indiceSeleccionado >= 0 && indiceSeleccionado < visibles.length - 1 ? visibles[indiceSeleccionado + 1] : null;

  const iniciarTour = () => {
    setTourIndex(0);
    const primera = RUTA_CULTURAL[0];
    elegir(primera);
    flyToPoi(mapRef.current, primera);
    scrollA("explorar");
  };
  const detenerTour = () => setTourIndex(null);
  const pasoTour = (dir: 1 | -1) => {
    if (tourIndex === null) return;
    const next = (tourIndex + dir + RUTA_CULTURAL.length) % RUTA_CULTURAL.length;
    setTourIndex(next);
    const poi = RUTA_CULTURAL[next];
    elegir(poi);
    flyToPoi(mapRef.current, poi);
  };
  const tourBadge = tourIndex !== null ? `Parada ${tourIndex + 1} de ${RUTA_CULTURAL.length}` : null;

  const volverInicio = () => {
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    try {
      mapRef.current?.flyTo({
        center: APURIMAC_CENTER,
        zoom: 8.5,
        pitch: 0,
        bearing: 0,
        duration: reduce ? 0 : 1400,
        essential: true,
      });
    } catch {
      /* mapa aún no listo */
    }
  };

  const provinciasUnicas = new Set(POIS.map((p) => p.provincia)).size;

  return (
    <div className="bg-[#05090e] text-slate-50">
      <div id="inicio" className="scroll-mt-16">
        <HeroCinematic />
      </div>

      {/* Cifras del proyecto sobre el video */}
      <section aria-label="Cifras del proyecto" className="relative z-10 mx-auto -mt-10 max-w-6xl px-4">
        <dl className="grid grid-cols-3 gap-2.5" aria-label="Cifras del proyecto">
          {[
            { n: `${POIS.length}`, l: "Lugares por descubrir" },
            { n: `${provinciasUnicas}`, l: "Provincias representadas" },
            { n: `${RUTA_CULTURAL.length}`, l: "Paradas en la Ruta" },
          ].map((s) => (
            <div key={s.l} className="glass-card rounded-2xl p-3 text-center">
              <dt className="order-2 mt-1 block text-[11px] uppercase tracking-wider text-slate-400">{s.l}</dt>
              <dd className="order-1 font-display text-xl font-black text-white md:text-2xl">{s.n}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ═══ ATLAS: MAPA + LISTA ═══ */}
      <section id="explorar" aria-labelledby="titulo-explorar" className="relative z-10 scroll-mt-16">
        <div className="mx-auto max-w-6xl px-4 pb-4 pt-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-400">Atlas interactivo</p>
          <h2 id="titulo-explorar" className="mt-1 font-display text-2xl font-black uppercase text-white md:text-3xl">
            Mapa y lugares, juntos
          </h2>
          <p className="mt-1 max-w-2xl text-[15px] font-light text-slate-400">
            Elige un punto en el mapa para resaltar su tarjeta, o usa el botón de navegación de una tarjeta para centrar el mapa.
            Los puntos cercanos se agrupan con un número: tócalos para acercar.
          </p>
        </div>

        <div className="mx-auto max-w-6xl px-4">
          <FilterBar filtros={filtros} onChange={setFiltros} totalVisibles={visibles.length} totalPOIs={POIS.length} />

          {/* Alternador móvil Mapa / Lista */}
          <div className="glass-card mt-3 flex rounded-2xl p-1 lg:hidden" role="tablist" aria-label="Alternar entre mapa y lista">
            {(
              [
                { id: "mapa", etiqueta: "Mapa", icono: <MapIcon className="h-4 w-4" aria-hidden="true" /> },
                { id: "lista", etiqueta: `Lista · ${visibles.length}`, icono: <List className="h-4 w-4" aria-hidden="true" /> },
              ] as Array<{ id: VistaMovil; etiqueta: string; icono: React.ReactNode }>
            ).map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={vista === t.id}
                onClick={() => setVista(t.id)}
                className={`inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl text-sm font-bold btn-transition ${
                  vista === t.id ? "bg-white text-[#0c141f] shadow" : "text-slate-300 hover:bg-white/10"
                }`}
              >
                {t.icono}
                {t.etiqueta}
              </button>
            ))}
          </div>

          <div className="mt-3 grid gap-4 lg:grid-cols-[400px_minmax(0,1fr)]">
            {/* ── Panel lista (escritorio siempre visible; móvil según pestaña) ── */}
            <div className={`${vista === "lista" ? "block" : "hidden"} lg:block`}>
              <div
                id="lugares"
                className="apurimac-scroll max-h-[70vh] scroll-mt-24 space-y-3 overflow-y-auto rounded-2xl border border-white/10 bg-[#0c141f]/60 p-3 backdrop-blur-md lg:max-h-[78vh]"
                role="region"
                aria-label={`Lista de lugares (${visibles.length} resultados)`}
                aria-live="polite"
              >
                <div className="flex flex-wrap items-center gap-2 px-1 pb-1">
                  <button
                    type="button"
                    onClick={volverInicio}
                    className="inline-flex min-h-[40px] items-center rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-slate-200 btn-transition hover:bg-white/10"
                  >
                    ⟲ Ver todo Apurímac
                  </button>
                  {tourIndex === null ? (
                    <button
                      type="button"
                      onClick={iniciarTour}
                      className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 px-3.5 py-1.5 text-xs font-bold text-white btn-transition hover:from-sky-600 hover:to-emerald-600"
                    >
                      <Play className="h-3.5 w-3.5" aria-hidden="true" /> Ruta Cultural
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={detenerTour}
                      className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-red-500 px-3.5 py-1.5 text-xs font-bold text-white btn-transition hover:bg-red-400"
                    >
                      <Square className="h-3.5 w-3.5" aria-hidden="true" /> Detener tour
                    </button>
                  )}
                </div>
                {visibles.length === 0 ? (
                  <EmptyState
                    titulo="Sin resultados para esos filtros."
                    descripcion="Prueba con “huatia”, “laguna” o “Saywite”, o cambia de categoría y provincia."
                    accionLabel="Mostrar todos los lugares"
                    onAccion={() => setFiltros({ busqueda: "", categoria: "todas", provincia: "todas" })}
                  />
                ) : (
                  visibles.map((p, i) => (
                    <PlaceCard
                      key={p.id}
                      ref={(el) => {
                        tarjetasRef.current[p.id] = el;
                      }}
                      poi={p}
                      index={i}
                      activo={selected?.id === p.id}
                      onSelect={elegir}
                      onFocusMap={centrarEnMapa}
                    />
                  ))
                )}
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Leyenda: los colores identifican Arqueología · Naturaleza · Gastronomía · Mitos y tradiciones. El nombre aparece al seleccionar un punto.
              </p>
            </div>

            {/* ── Panel mapa (escritorio sticky; móvil según pestaña) ── */}
            <div className={`${vista === "mapa" ? "block" : "hidden"} lg:block`}>
              <div className="relative h-[68vh] min-h-[480px] w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl lg:sticky lg:top-20 lg:h-[78vh]">
                <ApurimacMap pois={visibles} selectedId={selected?.id ?? null} onSelect={elegirDesdeMapa} mapRef={mapRef} tourIndex={tourIndex} />

                {selected && (
                  <div className="absolute bottom-3 left-3 right-3 z-10 md:bottom-4 md:left-auto md:right-4 md:top-4 md:w-[360px]">
                    <SidebarDetail
                      key={selected.id}
                      poi={selected}
                      posicion={posicion}
                      tourBadge={tourBadge}
                      onClose={() => {
                        setSelected(null);
                        setTourIndex(null);
                      }}
                      onPrev={anterior ? () => elegir(anterior) : undefined}
                      onNext={siguiente ? () => elegir(siguiente) : undefined}
                      onVerEnMapa={() => selected && flyToPoi(mapRef.current, selected)}
                    />
                    {tourIndex !== null && (
                      <div className="glass-card mt-2 flex items-center justify-between rounded-2xl p-2.5">
                        <button
                          type="button"
                          onClick={() => pasoTour(-1)}
                          className="inline-flex min-h-[44px] items-center gap-1 rounded-xl bg-white/10 px-3 py-2 text-xs font-bold text-white btn-transition hover:bg-white/20"
                        >
                          ← Anterior
                        </button>
                        <span className="text-xs font-bold text-sky-300" role="status">
                          {tourIndex + 1} / {RUTA_CULTURAL.length}
                        </span>
                        <button
                          type="button"
                          onClick={() => pasoTour(1)}
                          className="inline-flex min-h-[44px] items-center gap-1 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 px-3 py-2 text-xs font-bold text-white btn-transition hover:from-sky-600 hover:to-emerald-600"
                        >
                          Siguiente →
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {!selected && (
                  <p className="absolute bottom-3 left-1/2 z-10 w-max max-w-[94vw] -translate-x-1/2 rounded-full border border-white/10 bg-[#0c141f]/70 px-4 py-2 text-xs text-slate-200 backdrop-blur" role="status">
                    {visibles.length} lugares · elige un punto para ver su ficha
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ RUTA CULTURAL ═══ */}
      <section id="ruta-cultural" aria-labelledby="titulo-ruta" className="relative z-10 scroll-mt-16 border-t border-white/5 bg-[#0c141f]/30">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-400">Experiencia guiada · 7 paradas</p>
          <h2 id="titulo-ruta" className="mt-1 font-display text-2xl font-black uppercase text-white md:text-3xl">
            Tu recorrido por Apurímac
          </h2>
          <p className="mt-2 max-w-2xl text-[15px] font-light leading-relaxed text-slate-400">
            Del monolito de Saywite a la pirámide de Sóndor, pasando por la huatia, las termas y el cañón:
            una narrativa que une agua, tierra y memoria quechua. Marca tu progreso parada por parada.
          </p>
          <div className="mt-6">
            <RutaCultural explorados={explorados} onSelect={elegirPorId} onIniciar={iniciarTour} />
          </div>
        </div>
      </section>

      {/* ═══ ACERCA / AYUDA ═══ */}
      <section aria-labelledby="titulo-acerca" className="relative z-10 mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: <BookOpenText className="h-5 w-5" aria-hidden="true" />, t: "Para docentes", d: "Cada lugar reúne historia, gastronomía y leyenda con etiquetas y altitudes. Úsalo como aula viva: pide a tus estudiantes comparar dos paradas de la Ruta." },
            { icon: <Users className="h-5 w-5" aria-hidden="true" />, t: "Para estudiantes", d: "Empieza por Explorar el mapa, abre un lugar y sigue con Siguiente. Anota tres palabras en quechua que descubras en el recorrido." },
            { icon: <Compass className="h-5 w-5" aria-hidden="true" />, t: "Para viajeras", d: "Filtra por Naturaleza o Gastronomía, revisa distrito y altitud, y arma tu itinerario con las 7 paradas de la Ruta Cultural." },
          ].map((c) => (
            <div key={c.t} className="glass-card rounded-2xl p-5">
              <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-xl border border-sky-500/20 bg-sky-500/10 text-sky-400">{c.icon}</span>
              <h3 id={c.t === "Para docentes" ? "titulo-acerca" : undefined} className="mt-3 text-base font-extrabold text-white">{c.t}</h3>
              <p className="mt-1.5 text-sm font-light leading-relaxed text-slate-400">{c.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center">
          <a href="/about" className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-bold text-sky-300 hover:text-sky-200 hover:underline hover:underline-offset-4">
            Conoce más del proyecto CamiñAndes <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </p>
        <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-slate-500">
          <Landmark className="h-3.5 w-3.5" aria-hidden="true" />
          Museo digital y guía de exploración · UNAMBA × USC
        </p>
      </section>
    </div>
  );
}
