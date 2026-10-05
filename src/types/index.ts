/**
 * Tipos centrales de "Apurímac Inmersivo".
 * Proyecto CamiñAndes — alianza UNAMBA × USC.
 */

/** Categorías de puntos de interés. */
export type CategoriaPOI =
  | "arqueologia"
  | "naturaleza"
  | "gastronomia"
  | "mitos_tradiciones";

/** Plato típico asociado a un distrito / POI. */
export interface PlatoTipico {
  nombre: string;
  descripcion: string;
  ingredientesClave?: string[];
  ocasion?: string;
}

/** Punto de interés cultural / natural. */
export interface POI {
  id: string;
  nombre: string;
  /** Nombre en quechua, si aplica. */
  nombreQuechua?: string;
  provincia: string;
  distrito: string;
  categoria: CategoriaPOI;
  /** [longitud, latitud] — orden GeoJSON / Mapbox. */
  coordenadas: [number, number];
  /** msnm */
  altitud: number;
  descripcionCorta: string;
  historiaDetallada: string;
  gastronomiaLocal: PlatoTipico[];
  leyendaOMito: string;
  imagenUrl: string;
  etiquetas: string[];
  /** Si true, forma parte de la "Ruta Cultural" guiada. */
  esEmblematico?: boolean;
}

export interface Provincia {
  nombre: string;
  capital: string;
  descripcion: string;
  distritosDestacados: string[];
}

/** Filtros controlados por FilterBar. */
export interface FiltrosMapa {
  busqueda: string;
  categoria: CategoriaPOI | "todas";
  provincia: string | "todas";
}

/** Centro inicial del mapa. */
export const APURIMAC_CENTER: [number, number] = [-72.8814, -13.6339];
export const APURIMAC_ZOOM = 8.5;

/** Límites para no perder el foco en Apurímac (SW → NE). */
export const APURIMAC_BOUNDS: [[number, number], [number, number]] = [
  [-74.6, -14.8],
  [-71.2, -12.6],
];

export const CATEGORIA_META: Record<
  CategoriaPOI,
  { etiqueta: string; color: string; colorBg: string }
> = {
  arqueologia: {
    etiqueta: "Arqueología",
    color: "#b45309",
    colorBg: "bg-amber-100 text-amber-900",
  },
  naturaleza: {
    etiqueta: "Naturaleza",
    color: "#15803d",
    colorBg: "bg-emerald-100 text-emerald-900",
  },
  gastronomia: {
    etiqueta: "Gastronomía",
    color: "#c026d3",
    colorBg: "bg-fuchsia-100 text-fuchsia-900",
  },
  mitos_tradiciones: {
    etiqueta: "Mitos y tradiciones",
    color: "#4f46e5",
    colorBg: "bg-indigo-100 text-indigo-900",
  },
};
