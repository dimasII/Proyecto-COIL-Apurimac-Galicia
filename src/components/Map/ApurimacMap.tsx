"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import type { POI } from "@/types";
import {
  APURIMAC_BOUNDS,
  APURIMAC_CENTER,
  APURIMAC_ZOOM,
  CATEGORIA_META,
} from "@/types";

interface Props {
  pois: POI[];
  selectedId: string | null;
  onSelect: (poi: POI) => void;
  /** Ref compartido para que page.tsx pueda hacer flyTo / tour. */
  mapRef: React.MutableRefObject<mapboxgl.Map | null>;
  tourIndex: number | null;
}

/**
 * Mapa Mapbox GL centrado en Apurímac.
 * - Marcadores custom por categoría (div coloreado, sin imágenes externas).
 * - flyTo suave al seleccionar / tour.
 * - maxBounds para mantener el foco regional.
 */
export default function ApurimacMap({
  pois,
  selectedId,
  onSelect,
  mapRef,
  tourIndex,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  // Evita re-inicializar en StrictMode (doble efecto en dev).
  const initialized = useRef(false);

  // ── 1. Inicializar mapa una sola vez ──────────────────────
  useEffect(() => {
    if (initialized.current) return;
    if (!containerRef.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
      console.error(
        "[ApurimacMap] Falta NEXT_PUBLIC_MAPBOX_TOKEN en .env.local",
      );
      return;
    }
    initialized.current = true;
    mapboxgl.accessToken = token;

    const style =
      process.env.NEXT_PUBLIC_MAPBOX_STYLE ||
      "mapbox://styles/mapbox/outdoors-v12";

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style,
      center: APURIMAC_CENTER,
      zoom: APURIMAC_ZOOM,
      maxBounds: APURIMAC_BOUNDS,
      attributionControl: false,
    });

    mapRef.current = map;

    map.addControl(
      new mapboxgl.NavigationControl({ visualizePitch: true }),
      "bottom-right",
    );
    map.addControl(
      new mapboxgl.AttributionControl({ compact: true }),
      "bottom-left",
    );
    map.addControl(
      new mapboxgl.ScaleControl({ maxWidth: 120, unit: "metric" }),
      "bottom-left",
    );

    return () => {
      // No destruimos en dev-strict para conservar instancia;
      // en producción el unmount sí limpia:
      // map.remove(); mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── 2. Marcadores: reconstruir cuando cambian los POIs filtrados ──
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const renderMarkers = () => {
      // Limpiar anteriores
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      pois.forEach((poi) => {
        const el = document.createElement("button");
        el.className = `apurimac-marker ${selectedId === poi.id ? "is-active" : ""}`;
        el.style.setProperty("--mk", CATEGORIA_META[poi.categoria].color);
        el.title = poi.nombre;
        el.innerHTML = `<span class="apurimac-marker-dot"></span><span class="apurimac-marker-label">${poi.nombre}</span>`;
        el.addEventListener("click", (e) => {
          e.stopPropagation();
          onSelect(poi);
        });

        const marker = new mapboxgl.Marker({ element: el, anchor: "bottom" })
          .setLngLat(poi.coordenadas)
          .addTo(map);
        markersRef.current.push(marker);
      });
    };

    // Si el estilo aún no cargó, esperar al evento load.
    if (!map.loaded()) {
      map.once("load", renderMarkers);
    } else {
      renderMarkers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pois, selectedId]);

  // ── 3. Vuelo suave cuando se selecciona un POI externamente ──
  const lastFlown = useRef<string | null>(null);
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedId) return;
    if (lastFlown.current === selectedId && tourIndex === null) return;
    const poi = pois.find((p) => p.id === selectedId);
    // Buscar también fuera del filtro (tour puede incluir POI filtrado).
    if (!poi) return;
    lastFlown.current = selectedId;
    map.flyTo({
      center: poi.coordenadas,
      zoom: Math.max(map.getZoom(), 11.5),
      pitch: 45,
      bearing: -15,
      duration: 2200,
      essential: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  return (
    <div className="absolute inset-0">
      <div ref={containerRef} className="h-full w-full" />
      {/* Nota si falta token */}
      {!process.env.NEXT_PUBLIC_MAPBOX_TOKEN && (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-900 p-6 text-center text-sm text-white">
          Falta <code className="mx-1">NEXT_PUBLIC_MAPBOX_TOKEN</code> — revisa
          tu <code className="mx-1">.env.local</code>.
        </div>
      )}
    </div>
  );
}

/** Vuelo utilitario reutilizable (tour guiado). */
export function flyToPoi(
  map: mapboxgl.Map | null,
  poi: POI,
  zoom = 12,
) {
  if (!map) return;
  map.flyTo({
    center: poi.coordenadas,
    zoom,
    pitch: 55,
    bearing: -20,
    duration: 2800,
    curve: 1.4,
    essential: true,
  });
}
