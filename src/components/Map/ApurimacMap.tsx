"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import type { POI } from "@/types";
import { APURIMAC_BOUNDS, APURIMAC_CENTER, APURIMAC_ZOOM, CATEGORIA_META } from "@/types";

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
        seleccionada: p.id === selectedId ? 1 : 0,
      },
    })),
  };
}

export default function ApurimacMap({ pois, selectedId, onSelect, mapRef }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;
  const poisRef = useRef(pois);
  poisRef.current = pois;
  const [noDisponible, setNoDisponible] = useState(false);
  const listoRef = useRef(false);

  // ── Inicializar mapa una sola vez ──────────────────────────────
  useEffect(() => {
    if (listoRef.current) return;
    if (!containerRef.current) return;
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
      // Sin secretos en consola ni en UI: mensaje genérico.
      setNoDisponible(true);
      return;
    }
    listoRef.current = true;
    mapboxgl.accessToken = token;
    const style = process.env.NEXT_PUBLIC_MAPBOX_STYLE || "mapbox://styles/mapbox/outdoors-v12";
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style,
      center: APURIMAC_CENTER,
      zoom: APURIMAC_ZOOM,
      maxBounds: APURIMAC_BOUNDS,
      attributionControl: false,
    });
    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), "bottom-right");
    map.addControl(new mapboxgl.AttributionControl({ compact: true }), "bottom-left");
    map.addControl(new mapboxgl.ScaleControl({ maxWidth: 120, unit: "metric" }), "bottom-left");

    map.on("error", () => setNoDisponible(true));

    map.on("load", () => {
      map.addSource(SOURCE_ID, {
        type: "geojson",
        data: aGeoJSON(poisRef.current, null),
        cluster: true,
        clusterMaxZoom: 12,
        clusterRadius: 48,
      });

      // Grupo: círculo dorado sobrio con borde noche.
      map.addLayer({
        id: L_CLUSTER,
        type: "circle",
        source: SOURCE_ID,
        filter: ["has", "point_count"],
        paint: {
          "circle-color": "#fbbf24",
          "circle-radius": ["step", ["get", "point_count"], 20, 4, 26, 8, 32],
          "circle-stroke-width": 3,
          "circle-stroke-color": "#1a1207",
        },
      });
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
        paint: { "text-color": "#1a1207" },
      });

      // Punto individual: color por categoría + forma sobria (borde). Sin etiqueta.
      map.addLayer({
        id: L_POINT,
        type: "circle",
        source: SOURCE_ID,
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": ["get", "color"],
          "circle-radius": ["case", ["==", ["get", "seleccionada"], 1], 13, 9],
          "circle-stroke-width": ["case", ["==", ["get", "seleccionada"], 1], 4, 3],
          "circle-stroke-color": ["case", ["==", ["get", "seleccionada"], 1], "#fbbf24", "#ffffff"],
        },
      });

      // Etiqueta SOLO del lugar seleccionado → adiós superposición.
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
          "text-color": "#fff",
          "text-halo-color": "rgba(26,18,7,0.92)",
          "text-halo-width": 1.5,
        },
      });

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
      map.on("mouseenter", L_CLUSTER, () => { map.getCanvas().style.cursor = "pointer"; });
      map.on("mouseleave", L_CLUSTER, () => { map.getCanvas().style.cursor = ""; });
      map.on("mouseenter", L_POINT, () => { map.getCanvas().style.cursor = "pointer"; });
      map.on("mouseleave", L_POINT, () => { map.getCanvas().style.cursor = ""; });
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Sincronizar datos + selección (sin recrear el mapa) ─────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map || noDisponible) return;
    const src = map.getSource(SOURCE_ID) as mapboxgl.GeoJSONSource | undefined;
    if (!src) return; // aún no cargó el estilo; el siguiente cambio lo sincroniza
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
        pitch: 0,
        bearing: 0,
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
      <div className="absolute inset-0 overflow-y-auto bg-[#1a1207] p-4 apurimac-scroll md:p-5" role="status" aria-label="Explora los lugares sin mapa">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-300/80">Atlas sin mapa interactivo</p>
        <p className="mt-1 text-sm font-bold text-white">Explora los lugares en esta lista</p>
        <p className="mt-1 text-[13px] text-amber-100/70">
          El mapa no pudo cargarse ahora mismo, pero tienes delante todo el contenido: elige un lugar para leer su historia.
        </p>
        <ul className="mt-4 space-y-2">
          {pois.slice(0, 12).map((p) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => onSelect(p)}
                aria-current={selectedId === p.id ? "true" : undefined}
                className={`flex min-h-[48px] w-full items-center gap-3 rounded-xl border p-2 text-left btn-transition ${
                  selectedId === p.id ? "border-amber-400 bg-amber-400/10" : "border-white/10 bg-white/5 hover:border-amber-300/40"
                }`}
              >
                <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: colorDe(p.categoria) }} aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-bold text-white">{p.nombre}</span>
                  <span className="block text-xs text-amber-100/65">
                    {p.distrito} · {p.provincia}
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
    </div>
  );
}

export function flyToPoi(map: mapboxgl.Map | null, poi: POI, zoom = 11) {
  if (!map) return;
  const reduce =
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  try {
    map.flyTo({ center: poi.coordenadas, zoom, pitch: 0, bearing: 0, duration: reduce ? 0 : 1400, essential: true });
  } catch {
    /* mapa aún no listo */
  }
}
