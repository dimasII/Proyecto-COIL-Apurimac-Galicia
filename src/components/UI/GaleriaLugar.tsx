"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";
import type { POI } from "@/types";
import { descubrirFotosLocales } from "@/lib/fotos";

interface Props {
  poi: POI;
}

export default function GaleriaLugar({ poi }: Props) {
  const [fotos, setFotos] = useState<string[]>([poi.imagenUrl]);
  const [indice, setIndice] = useState(0);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let vivo = true;
    setIndice(0);
    setCargando(true);
    setFotos([poi.imagenUrl]);
    descubrirFotosLocales(poi.id, poi.imagenUrl).then((lista) => {
      if (!vivo) return;
      setFotos(lista);
      setCargando(false);
    });
    return () => {
      vivo = false;
    };
  }, [poi.id, poi.imagenUrl]);

  const total = fotos.length;
  const irA = useCallback(
    (n: number) => setIndice(((n % total) + total) % total),
    [total],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") irA(indice - 1);
      if (e.key === "ArrowRight") irA(indice + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [indice, irA]);

  const [toqueX, setToqueX] = useState<number | null>(null);

  const hayVarias = total > 1;

  return (
    <div
      className="relative h-48 w-full shrink-0 overflow-hidden md:h-56"
      role="group"
      aria-roledescription="carousel"
      aria-label={`Galería de fotos de ${poi.nombre}: ${total} fotos`}
      onTouchStart={(e) => setToqueX(e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (toqueX === null) return;
        const dx = e.changedTouches[0].clientX - toqueX;
        if (dx < -40) irA(indice + 1);
        else if (dx > 40) irA(indice - 1);
        setToqueX(null);
      }}
    >
      {fotos.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-300 ${i === indice ? "z-10 opacity-100" : "z-0 opacity-0"}`}
          aria-hidden={i !== indice}
        >
          <Image
            src={src}
            alt={i === 0 ? `Fotografía de ${poi.nombre}, ${poi.distrito}` : `Fotografía ${i + 1} de ${poi.nombre}`}
            fill
            sizes="(max-width: 768px) 100vw, 360px"
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/70 via-black/20 to-transparent" aria-hidden="true" />

      {/* Contador + estado */}
      <div className="absolute left-3 top-3 z-30 flex items-center gap-1.5">
        <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur">
          <Images className="h-3 w-3" aria-hidden="true" />
          {cargando ? "…" : `${indice + 1} / ${total}`}
        </span>
      </div>

      {hayVarias && (
        <>
          <button
            type="button"
            onClick={() => irA(indice - 1)}
            aria-label="Foto anterior"
            className="absolute left-2 top-1/2 z-30 inline-flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/85"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => irA(indice + 1)}
            aria-label="Foto siguiente"
            className="absolute right-2 top-1/2 z-30 inline-flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/85"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="absolute bottom-2 left-1/2 z-30 flex -translate-x-1/2 gap-1.5" role="tablist" aria-label="Elegir foto">
            {fotos.map((src, i) => (
              <button
                key={src}
                type="button"
                role="tab"
                aria-selected={i === indice}
                aria-label={`Ver foto ${i + 1}`}
                onClick={() => irA(i)}
                className={`h-2.5 min-w-[10px] rounded-full transition-all ${
                  i === indice ? "w-6 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
