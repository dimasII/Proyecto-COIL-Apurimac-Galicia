"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import type { POI } from "@/types";
import { APURIMAC_BOUNDS, APURIMAC_CENTER, APURIMAC_ZOOM, CATEGORIA_META } from "@/types";
import { APURIMAC_FIT_BOUNDS, APURIMAC_POLYGON } from "@/data/apurimacRegion";

interface Props {
  pois: POI[];
  selectedId: string | null;
  onSelect: (poi: POI) => void;
  mapRef: React.MutableRefObject<mapboxgl.Map | null>;
  tourIndex?: number | null;
}

const SOURCE_ID = "apurimac-pois";
const L_CLUSTER = "apurimac-cluster";
const L_COUNT = "apurimac-cluster-count";
const L_POINT = "apurimac-point";
const L_LABEL = "apurimac-label";
const L_ALT = "apurimac-altitud";
const SRC_REGION = "apurimac-region";
const SRC_MASK = "apurimac-mask";
const L_MASK = "apurimac-mask-fill";
const L_REGION_FILL = "apurimac-region-fill";
const L_REGION_LINE = "apurimac-region-line";
const SRC_DEM = "mapbox-dem";

type EstiloBase = "relieve" | "satelite" | "claro";

const ESTILOS: Record<EstiloBase, { etiqueta: string; url: string }> = {
  relieve: { etiqueta: "Relieve", url: "mapbox://styles/mapbox/outdoors-v12" },
  satelite: { etiqueta: "Satélite", url: "mapbox://styles/mapbox/satellite-streets-v12" },
  claro: { etiqueta: "Claro", url: "mapbox://styles/mapbox/light-v11" },
};

/** Color por categoría — misma fuente que las tarjetas (no se inventa nada). */
function colorDe(categoria: string): string {
  return CATEGORIA_META[categoria as keyof typeof CATEGORIA_META]?.color ?? "#b45309";
}

function aGeoJSON(pois: POI[], selectedId: string | null) {
  return {
    type: "FeatureCollection" as const,
    features: pois.map((p) => ({
      type: "Feature" as const,
      geometry: { type: "Point" as const, coordinates: p.coordenadas },
      properties: {
        id: p.id,
        nombre: p.nombre,
        categoria: p.categoria,
        color: colorDe(p.categoria),
        altitud: p.altitud,
        seleccionada: p.id === selectedId ? 1 : 0,
      },
    })),
  };
}

function geoRegion() {
  return {
    type: "FeatureCollection" as const,
    features: [
      {
        type: "Feature" as const,
        geometry: { type: "Polygon" as const, coordinates: [APURIMAC_POLYGON] },
        properties: {},
      },
    ],
  };
}

/** Mundo entero con un hueco = Apurímac → atenúa todo lo que NO es la región. */
function geoMascara() {
  const mundo: Array<[number, number]> = [
    [-180, -85],
    [180, -85],
    [180, 85],
    [-180, 85],
    [-180, -85],
  ];
  return {
    type: "FeatureCollection" as const,
    features: [
      {
        type: "Feature" as const,
        geometry: { type: "Polygon" as const, coordinates: [mundo, APURIMAC_POLYGON] },
        properties: {},
      },
    ],
  };
}

export default function ApurimacMap({ pois, selectedId, onSelect, mapRef }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;
  const poisRef = useRef(pois);
  poisRef.current = pois;
  const selRef = useRef(selectedId);
  selRef.current = selectedId;

  const [noDisponible, setNoDisponible] = useState(false);
  const [estilo, setEstilo] = useState<EstiloBase>("relieve");
  const [terreno3D, setTerreno3D] = useState(true);
  const [verAltitud, setVerAltitud] = useState(true);
  const [panelCapas, setPanelCapas] = useState(false);
  const estiloRef = useRef(estilo);
  estiloRef.current = estilo;
  const terrenoRef = useRef(terreno3D);
  terrenoRef.current = terreno3D;
  const altitudRef = useRef(verAltitud);
  altitudRef.current = verAltitud;
  const listoRef = useRef(false);

  const encuadrarApurimac = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;
    try {
      map.fitBounds(APURIMAC_FIT_BOUNDS, { padding: 30, duration: 1200, essential: true });
    } catch {
      /* mapa aún cargando */
    }
  }, [mapRef]);

  const vista3D = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;
    if (!terrenoRef.current) setTerreno3D(true);
    try {
      map.easeTo({ pitch: 65, bearing: -20, duration: 1200, essential: true });
    } catch {
      /* sin vista 3D */
    }
  }, [mapRef]);

  const vistaCenital = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;
    try {
      map.easeTo({ pitch: 0, bearing: 0, duration: 900, essential: true });
    } catch {
      /* sin cambio */
    }
  }, [mapRef]);

  // ── Añade DEM + región + POIs (se re-ejecuta tras cada cambio de estilo) ──
  const agregarCapasPropias = useCallback(
    (map: mapboxgl.Map) => {
      // 1) Terreno 3D (Mapbox Terrain-DEM, incluido en la cuenta gratuita).
      if (!map.getSource(SRC_DEM)) {
        try {
          map.addSource(SRC_DEM, {
            type: "raster-dem",
            url: "mapbox://mapbox.mapbox-terrain-dem-v1",
            tileSize: 512,
            maxzoom: 14,
          });
        } catch {
        }
      }
      try {
        map.setTerrain(terrenoRef.current ? { source: SRC_DEM, exaggeration: 1.4 } : null);
      } catch {
      }
      if (!map.getLayer("cielo-apurimac")) {
        try {
          map.addLayer({
            id: "cielo-apurimac",
            type: "sky",
            paint: {
              "sky-type": "gradient",
              "sky-gradient": [
                "interpolate",
                ["linear"],
                ["sky-atmosphere-sun-intensity"],
                0,
                "rgba(12,20,31,1)",
                0.7,
                "rgba(56,130,190,1)",
                1,
                "rgba(135,206,235,1)",
              ],
            },
          });
        } catch {
        }
      }

      if (!map.getSource(SRC_MASK)) {
        map.addSource(SRC_MASK, { type: "geojson", data: geoMascara() as unknown as GeoJSON.FeatureCollection });
      }
      if (!map.getLayer(L_MASK)) {
        map.addLayer({
          id: L_MASK,
          type: "fill",
          source: SRC_MASK,
          paint: { "fill-color": "#05090e", "fill-opacity": 0.55 },
        });
      }

      if (!map.getSource(SRC_REGION)) {
        map.addSource(SRC_REGION, { type: "geojson", data: geoRegion() as unknown as GeoJSON.FeatureCollection });
      }
      if (!map.getLayer(L_REGION_FILL)) {
        map.addLayer({
          id: L_REGION_FILL,
          type: "fill",
          source: SRC_REGION,
          paint: { "fill-color": "#38bdf8", "fill-opacity": 0.06 },
        });
      }
      if (!map.getLayer(L_REGION_LINE)) {
        map.addLayer({
          id: L_REGION_LINE,
          type: "line",
          source: SRC_REGION,
          paint: { "line-color": "#38bdf8", "line-width": 2.5, "line-opacity": 0.9, "line-dasharray": [2, 1] },
        });
      }

      // 4) POIs con clústeres.
      if (!map.getSource(SOURCE_ID)) {
        map.addSource(SOURCE_ID, {
          type: "geojson",
          data: aGeoJSON(poisRef.current, selRef.current) as unknown as GeoJSON.FeatureCollection,
          cluster: true,
          clusterMaxZoom: 12,
          clusterRadius: 48,
        });
      }

      if (!map.getLayer(L_CLUSTER)) {
        map.addLayer({
          id: L_CLUSTER,
          type: "circle",
          source: SOURCE_ID,
          filter: ["has", "point_count"],
          paint: {
            "circle-color": "#f59e0b",
            "circle-radius": ["step", ["get", "point_count"], 20, 4, 26, 8, 32],
            "circle-stroke-width": 3,
            "circle-stroke-color": "#ffffff",
          },
        });
      }
      if (!map.getLayer(L_COUNT)) {
        map.addLayer({
          id: L_COUNT,
          type: "symbol",
          source: SOURCE_ID,
          filter: ["has", "point_count"],
          layout: {
            "text-field": ["get", "point_count"],
            "text-size": 13,
            "text-font": ["DIN Pro Medium", "Arial Unicode MS Bold"],
          },
          paint: { "text-color": "#2b1d0e" },
        });
      }

      // Punto individual: color por categoría y tamaño según altitud
      // (1800 m → 8 px … 3800 m → 12 px: las cumbres se ven más grandes).
      if (!map.getLayer(L_POINT)) {
        map.addLayer({
          id: L_POINT,
          type: "circle",
          source: SOURCE_ID,
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": ["get", "color"],
            "circle-radius": [
              "case",
              ["==", ["get", "seleccionada"], 1],
              13,
              ["interpolate", ["linear"], ["get", "altitud"], 1800, 8, 3800, 12],
            ],
            "circle-stroke-width": ["case", ["==", ["get", "seleccionada"], 1], 4, 3],
            "circle-stroke-color": ["case", ["==", ["get", "seleccionada"], 1], "#1f7a4d", "#ffffff"],
          },
        });
      }

      // Etiqueta SOLO del lugar seleccionado.
      if (!map.getLayer(L_LABEL)) {
        map.addLayer({
          id: L_LABEL,
          type: "symbol",
          source: SOURCE_ID,
          filter: ["all", ["!", ["has", "point_count"]], ["==", ["get", "seleccionada"], 1]],
          layout: {
            "text-field": ["get", "nombre"],
            "text-size": 12,
            "text-offset": [0, 1.6],
            "text-anchor": "top",
            "text-max-width": 10,
          },
          paint: {
            "text-color": "#2b1d0e",
            "text-halo-color": "rgba(255,255,255,0.95)",
            "text-halo-width": 1.5,
          },
        });
      }

      // Etiquetas de altitud de cada lugar (capa conmutable).
      if (!map.getLayer(L_ALT)) {
        map.addLayer({
          id: L_ALT,
          type: "symbol",
          source: SOURCE_ID,
          filter: ["!", ["has", "point_count"]],
          layout: {
            "text-field": ["concat", ["to-string", ["get", "altitud"]], " m"],
            "text-size": 11,
            "text-offset": [0, -1.7],
            "text-anchor": "bottom",
            "text-font": ["DIN Pro Medium", "Arial Unicode MS Bold"],
            "text-allow-overlap": false,
            "text-optional": true,
          },
          paint: {
            "text-color": "#ffffff",
            "text-halo-color": "rgba(5,9,14,0.9)",
            "text-halo-width": 1.5,
          },
        });
      }
      try {
        map.setLayoutProperty(L_ALT, "visibility", altitudRef.current ? "visible" : "none");
      } catch {
        /* capa aún no lista */
      }
    },
    [],
  );

  // ── Inicializar mapa una sola vez ──────────────────────────────
  useEffect(() => {
    if (listoRef.current) return;
    if (!containerRef.current) return;
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
      setNoDisponible(true);
      return;
    }
    listoRef.current = true;
    mapboxgl.accessToken = token;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: ESTILOS[estiloRef.current].url,
      center: APURIMAC_CENTER,
      zoom: APURIMAC_ZOOM,
      minZoom: 7.2,
      maxZoom: 16,
      maxBounds: APURIMAC_BOUNDS,
      pitch: 0,
      bearing: 0,
      attributionControl: false,
      fadeDuration: 200,
    });
    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), "bottom-right");
    map.addControl(new mapboxgl.AttributionControl({ compact: true }), "bottom-left");
    map.addControl(new mapboxgl.ScaleControl({ maxWidth: 120, unit: "metric" }), "bottom-left");

    // ── Errores NO fatales: la telemetría bloqueada por adblockers y el
    // terreno deshabilitado en navegación privada NO deben tumbar el mapa.
    // Solo el fallo de estilo/token (401/403) marca el mapa como no disponible.
    map.on("error", (e) => {
      const err = e?.error as { status?: number; message?: string; url?: string } | undefined;
      const url = String(err?.url ?? "");
      const msg = String(err?.message ?? e ?? "");
      if (url.includes("events.mapbox.com")) return; // adblocker: inofensivo
      if (/fingerprint|canvas2d|terrain|hillshade/i.test(msg)) {
        // Navegación privada: degradar a mapa plano sin tumbar nada.
        setTerreno3D(false);
        try {
          map.setTerrain(null);
        } catch {
          /* sin terreno */
        }
        return;
      }
      if (err?.status === 401 || err?.status === 403 || /access token|unauthorized|forbidden/i.test(msg)) {
        setNoDisponible(true);
      }
      // Cualquier otro error de tesela se ignora: el mapa sigue usable.
    });

    map.on("load", () => {
      try {
        map.resize();
      } catch {
        /* sin resize */
      }
      agregarCapasPropias(map);
      // Encuadre inicial ceñido a la región (efecto "solo Apurímac").
      try {
        map.fitBounds(APURIMAC_FIT_BOUNDS, { padding: 30, duration: 0 });
      } catch {
        /* encuadre por defecto */
      }

      const expandirGrupo = (e: mapboxgl.MapMouseEvent & { features?: mapboxgl.GeoJSONFeature[] }) => {
        const f = e.features?.[0];
        if (!f) return;
        const clusterId = (f.properties as { cluster_id: number })?.cluster_id;
        const src = map.getSource(SOURCE_ID) as mapboxgl.GeoJSONSource;
        src.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) return;
          map.easeTo({ center: e.lngLat, zoom: (zoom ?? 10) + 0.5, duration: 600 });
        });
      };

      const elegirPunto = (e: mapboxgl.MapMouseEvent & { features?: mapboxgl.GeoJSONFeature[] }) => {
        const id = (e.features?.[0]?.properties as { id?: string } | undefined)?.id;
        if (!id) return;
        const poi = poisRef.current.find((p) => p.id === id);
        if (poi) onSelectRef.current(poi);
      };

      map.on("click", L_CLUSTER, expandirGrupo);
      map.on("click", L_POINT, elegirPunto);
      map.on("mouseenter", L_CLUSTER, () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", L_CLUSTER, () => {
        map.getCanvas().style.cursor = "";
      });
      map.on("mouseenter", L_POINT, () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", L_POINT, () => {
        map.getCanvas().style.cursor = "";
      });
    });

    // Tras cada cambio de estilo base, Mapbox vacía las capas: reponerlas.
    map.on("style.load", () => {
      if (!listoRef.current) return;
      agregarCapasPropias(map);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Cambio de estilo base ──────────────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map || noDisponible) return;
    const url = ESTILOS[estilo].url;
    try {
      if (map.getStyle()?.sprite !== undefined) map.setStyle(url);
      else map.setStyle(url);
    } catch {
      /* estilo aún cargando */
    }
  }, [estilo, noDisponible, mapRef]);

  // ── Terreno 3D on/off ──────────────────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map || noDisponible) return;
    try {
      if (map.getSource(SRC_DEM)) map.setTerrain(terreno3D ? { source: SRC_DEM, exaggeration: 1.4 } : null);
      if (!terreno3D) map.easeTo({ pitch: 0, duration: 600 });
    } catch {
      /* estilo aún cargando */
    }
  }, [terreno3D, noDisponible, mapRef]);

  // ── Etiquetas de altitud on/off ────────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map || noDisponible) return;
    try {
      if (map.getLayer(L_ALT)) map.setLayoutProperty(L_ALT, "visibility", verAltitud ? "visible" : "none");
    } catch {
      /* capa aún no lista */
    }
  }, [verAltitud, noDisponible, mapRef]);

  // ── Sincronizar datos + selección (sin recrear el mapa) ─────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map || noDisponible) return;
    const src = map.getSource(SOURCE_ID) as mapboxgl.GeoJSONSource | undefined;
    if (!src) return;
    src.setData(aGeoJSON(pois, selectedId) as unknown as GeoJSON.FeatureCollection);
  }, [pois, selectedId, noDisponible, mapRef]);

  // ── Vuelo suave al seleccionar ──────────────────────────────────
  const ultimoVuelo = useRef<string | null>(null);
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedId || noDisponible) return;
    if (ultimoVuelo.current === selectedId) return;
    const poi = pois.find((p) => p.id === selectedId);
    if (!poi) return;
    ultimoVuelo.current = selectedId;
    const reduce =
      typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    try {
      map.flyTo({
        center: poi.coordenadas,
        zoom: Math.max(map.getZoom(), 10.5),
        pitch: terrenoRef.current ? map.getPitch() : 0,
        bearing: map.getBearing(),
        duration: reduce ? 0 : 1400,
        essential: true,
      });
    } catch {
      /* mapa aún cargando: sin vuelo */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  // ── Alternativa editorial si el mapa no carga (sin tecnicismos) ──
  if (noDisponible) {
    return (
      <div className="apurimac-scroll absolute inset-0 overflow-y-auto bg-[#0c141f] p-4 md:p-5" role="status" aria-label="Explora los lugares sin mapa">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-sky-400">Atlas sin mapa interactivo</p>
        <p className="mt-1 text-sm font-bold text-white">Explora los lugares en esta lista</p>
        <p className="mt-1 text-[13px] font-light text-slate-400">
          El mapa no pudo cargarse ahora mismo, pero tienes delante todo el contenido: elige un lugar para leer su historia.
        </p>
        <ul className="mt-4 space-y-2">
          {pois.slice(0, 12).map((p) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => onSelect(p)}
                aria-current={selectedId === p.id ? "true" : undefined}
                className={`btn-transition flex min-h-[48px] w-full items-center gap-3 rounded-xl border p-2 text-left ${
                  selectedId === p.id ? "border-sky-400 bg-sky-400/10" : "border-white/10 bg-white/5 hover:border-sky-400/30"
                }`}
              >
                <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: colorDe(p.categoria) }} aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-bold text-white">{p.nombre}</span>
                  <span className="block text-xs text-slate-400">
                    {p.distrito} · {p.provincia} · {p.altitud.toLocaleString("es-PE")} m
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      <div
        ref={containerRef}
        className="h-full w-full"
        role="application"
        aria-label="Mapa interactivo de Apurímac. Los puntos cercanos se agrupan con un número; amplía o elige un punto para ver su nombre."
      />

      {/* ── Panel de capas: estilos base + 3D + altitud ── */}
      <div className="absolute left-3 top-3 z-10 w-[210px]">
        <button
          type="button"
          onClick={() => setPanelCapas((v) => !v)}
          aria-expanded={panelCapas}
          aria-controls="panel-capas-apurimac"
          className="btn-transition inline-flex min-h-[44px] w-full items-center justify-between rounded-xl border border-white/10 bg-[#0c141f]/85 px-3 py-2 text-xs font-bold text-white shadow-xl backdrop-blur hover:bg-[#0c141f]"
        >
          <span>🗻 Capas · Solo Apurímac</span>
          <span aria-hidden="true">{panelCapas ? "▾" : "▸"}</span>
        </button>

        {panelCapas && (
          <div id="panel-capas-apurimac" className="mt-2 space-y-3 rounded-xl border border-white/10 bg-[#0c141f]/90 p-3 shadow-2xl backdrop-blur">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Vista de la región</p>
              <div className="mt-1.5 grid grid-cols-3 gap-1" role="group" aria-label="Estilo base del mapa">
                {(Object.keys(ESTILOS) as EstiloBase[]).map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setEstilo(k)}
                    aria-pressed={estilo === k}
                    className={`min-h-[40px] rounded-lg px-1 py-2 text-[11px] font-bold btn-transition ${
                      estilo === k ? "bg-sky-400 text-[#0c141f]" : "bg-white/10 text-slate-200 hover:bg-white/20"
                    }`}
                  >
                    {ESTILOS[k].etiqueta}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => setTerreno3D((v) => !v)}
                aria-pressed={terreno3D}
                className="btn-transition flex min-h-[40px] w-full items-center justify-between rounded-lg bg-white/5 px-2.5 py-1.5 text-left text-xs font-semibold text-slate-200 hover:bg-white/10"
              >
                <span>⛰️ Terreno 3D (montañas)</span>
                <span aria-hidden="true" className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${terreno3D ? "bg-emerald-400 text-[#0c141f]" : "bg-white/10 text-slate-400"}`}>
                  {terreno3D ? "ON" : "OFF"}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setVerAltitud((v) => !v)}
                aria-pressed={verAltitud}
                className="btn-transition flex min-h-[40px] w-full items-center justify-between rounded-lg bg-white/5 px-2.5 py-1.5 text-left text-xs font-semibold text-slate-200 hover:bg-white/10"
              >
                <span>📏 Altitud de cada lugar</span>
                <span aria-hidden="true" className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${verAltitud ? "bg-emerald-400 text-[#0c141f]" : "bg-white/10 text-slate-400"}`}>
                  {verAltitud ? "ON" : "OFF"}
                </span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-1">
              <button
                type="button"
                onClick={vista3D}
                className="btn-transition min-h-[40px] rounded-lg bg-gradient-to-r from-sky-500 to-emerald-500 px-2 py-2 text-[11px] font-bold text-white hover:from-sky-600 hover:to-emerald-600"
              >
                Ver montañas 3D
              </button>
              <button
                type="button"
                onClick={vistaCenital}
                className="btn-transition min-h-[40px] rounded-lg bg-white/10 px-2 py-2 text-[11px] font-bold text-white hover:bg-white/20"
              >
                Vista plana
              </button>
            </div>

            <button
              type="button"
              onClick={encuadrarApurimac}
              className="btn-transition min-h-[40px] w-full rounded-lg border border-sky-400/30 bg-sky-400/10 px-2 py-2 text-[11px] font-bold text-sky-200 hover:bg-sky-400/20"
            >
              ⟲ Encuadrar solo Apurímac
            </button>
            <p className="text-[10px] leading-snug text-slate-500">
              El mapa está limitado a Apurímac: el exterior se atenúa, el tamaño del punto crece con la altitud y la etiqueta muestra los m s. n. m.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function flyToPoi(map: mapboxgl.Map | null, poi: POI, zoom = 11) {
  if (!map) return;
  const reduce =
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  try {
    map.flyTo({
      center: poi.coordenadas,
      zoom,
      pitch: map.getPitch(),
      bearing: map.getBearing(),
      duration: reduce ? 0 : 1400,
      essential: true,
    });
  } catch {
    /* mapa aún no listo */
  }
}
