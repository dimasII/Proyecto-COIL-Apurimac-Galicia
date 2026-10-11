export const MAX_FOTOS_POR_LUGAR = 20;
export function rutaFotoLocal(id: string, n: number): string {
  const nn = String(n).padStart(2, "0");
  return `/lugares/${id}/${nn}.jpg`;
}

export function rutaPortadaLocal(id: string): string {
  return rutaFotoLocal(id, 1);
}

export async function descubrirFotosLocales(
  id: string,
  fallback: string,
  max = MAX_FOTOS_POR_LUGAR,
): Promise<string[]> {
  const encontradas: string[] = [];
  for (let n = 1; n <= max; n++) {
    const url = rutaFotoLocal(id, n);
    try {
      const res = await fetch(url, { method: "HEAD", cache: "force-cache" });
      if (!res.ok) break;
      encontradas.push(url);
    } catch {
      break;
    }
  }
  return encontradas.length > 0 ? encontradas : [fallback];
}
