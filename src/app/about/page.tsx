import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Compass, GraduationCap, Handshake, Mountain } from "lucide-react";

export const metadata = {
  title: "Acerca de | Apurímac Inmersivo · CamiñAndes",
  description:
    "Proyecto CamiñAndes UNAMBA × USC: museo digital y mapa cultural interactivo de Apurímac con fines educativos.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#0f0a04] text-amber-50">
      <div className="textil-andino h-1.5" aria-hidden="true" />
      {/* Hero editorial con fotografía protagonista */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000&auto=format&fit=crop"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-[#1a1207]/75 to-[#0f0a04]" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-4 pb-10 pt-12 md:pb-14 md:pt-16">
          <Link href="/#inicio" className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-4 text-sm font-bold text-amber-200 backdrop-blur hover:bg-black/60">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Volver al inicio
          </Link>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-black/40 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-amber-200">
            <Mountain className="h-3.5 w-3.5" aria-hidden="true" /> CamiñAndes · UNAMBA × USC
          </p>
          <h1 className="mt-3 font-display text-3xl font-black text-white md:text-5xl">Acerca del proyecto</h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-amber-100/85 md:text-base">
            <strong className="text-amber-200">Apurímac Inmersivo</strong> es una iniciativa de colaboración
            internacional (COIL) entre la Universidad Nacional Micaela Bastidas de Apurímac y la
            Universidade de Santiago de Compostela: museo digital, mapa cultural y guía de
            exploración de Apurímac.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10 md:py-12">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[.04] p-5">
            <GraduationCap className="h-6 w-6 text-amber-400" aria-hidden="true" />
            <h2 className="mt-2 text-lg font-extrabold text-white">Misión educativa</h2>
            <p className="mt-1.5 text-[15px] leading-relaxed text-amber-100/75">
              Crear puentes de colaboración entre Apurímac y Galicia, ofreciendo un recurso abierto
              para docentes y estudiantes: mapa interactivo, ruta cultural de 7 paradas y fichas con
              historia, gastronomía y leyenda.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[.04] p-5">
            <Handshake className="h-6 w-6 text-amber-400" aria-hidden="true" />
            <h2 className="mt-2 text-lg font-extrabold text-white">Cómo usar esta web</h2>
            <ul className="mt-1.5 list-disc space-y-1.5 pl-5 text-[15px] text-amber-100/75">
              <li>Explora el mapa y filtra por categoría y provincia.</li>
              <li>Abre un lugar y navega con Anterior / Siguiente.</li>
              <li>Completa la Ruta Cultural y sigue tu progreso.</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-amber-300/25 bg-gradient-to-br from-amber-400/10 to-transparent p-5">
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-white">
            <Compass className="h-5 w-5 text-amber-400" aria-hidden="true" />
            Atlas y ruta en una sola página
          </h2>
          <p className="mt-1.5 text-[15px] leading-relaxed text-amber-100/75">
            En el inicio encontrarás el mapa junto a la lista de lugares: lo que elijas en uno se
            refleja en el otro. En el móvil puedes alternar entre Mapa y Lista con los botones
            superiores.
          </p>
          <p className="mt-3">
            <Link href="/#explorar" className="inline-flex min-h-[44px] items-center rounded-full bg-amber-400 px-5 py-2.5 text-sm font-bold text-stone-900 btn-transition hover:bg-amber-300">
              Ir al atlas
            </Link>
          </p>
        </div>

        <h2 className="mt-8 text-xl font-extrabold text-white">Valores</h2>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[15px] text-amber-100/75">
          <li>Colaboración y trabajo en equipo</li>
          <li>Respeto por la diversidad cultural y la lengua quechua</li>
          <li>Educación abierta de calidad</li>
          <li>Innovación con responsabilidad territorial</li>
        </ul>
        <p className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-4 text-[13px] leading-relaxed text-amber-100/65">
          Web educativa y cultural sin fines comerciales. Los relatos son tradición oral con fines
          pedagógicos; las coordenadas son referenciales. Mapa © Mapbox © OpenStreetMap.
        </p>
      </div>
    </div>
  );
}
