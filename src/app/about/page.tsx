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
    <div className="relative z-10 bg-[#05090e] text-slate-50">
      <div className="textil-andino h-1.5" aria-hidden="true" />
      {/* Hero editorial con fotografía protagonista */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000&auto=format&fit=crop"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-60"
            priority
          />
        </div>
        <div className="absolute inset-0 cinematic-vignette" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-4 pb-10 pt-12 md:pb-14 md:pt-16">
          <Link href="/#inicio" className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 text-sm font-bold text-slate-200 backdrop-blur hover:bg-white/10">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Volver al inicio
          </Link>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-sky-300">
            <Mountain className="h-3.5 w-3.5" aria-hidden="true" /> CamiñAndes · UNAMBA × USC
          </p>
          <h1 className="mt-3 font-display text-3xl font-black uppercase text-white md:text-5xl">Acerca del proyecto</h1>
          <p className="mt-3 max-w-2xl text-[15px] font-light leading-relaxed text-slate-300 md:text-base">
            <strong className="text-white">Apurímac Inmersivo</strong> es una iniciativa de colaboración
            internacional (COIL) entre la Universidad Nacional Micaela Bastidas de Apurímac y la
            Universidade de Santiago de Compostela: museo digital, mapa cultural y guía de
            exploración de Apurímac.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10 md:py-12">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="glass-card rounded-2xl p-5">
            <GraduationCap className="h-6 w-6 text-sky-400" aria-hidden="true" />
            <h2 className="mt-2 text-lg font-extrabold text-white">Misión educativa</h2>
            <p className="mt-1.5 text-[15px] font-light leading-relaxed text-slate-400">
              Crear puentes de colaboración entre Apurímac y Galicia, ofreciendo un recurso abierto
              para docentes y estudiantes: mapa interactivo, ruta cultural de 7 paradas y fichas con
              historia, gastronomía y leyenda.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-5">
            <Handshake className="h-6 w-6 text-emerald-400" aria-hidden="true" />
            <h2 className="mt-2 text-lg font-extrabold text-white">Cómo usar esta web</h2>
            <ul className="mt-1.5 list-disc space-y-1.5 pl-5 text-[15px] font-light text-slate-400">
              <li>Explora el mapa y filtra por categoría y provincia.</li>
              <li>Abre un lugar y navega con Anterior / Siguiente.</li>
              <li>Completa la Ruta Cultural y sigue tu progreso.</li>
            </ul>
          </div>
        </div>

        <div className="glass-card mt-6 rounded-2xl p-5">
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-white">
            <Compass className="h-5 w-5 text-sky-400" aria-hidden="true" />
            Atlas y ruta en una sola página
          </h2>
          <p className="mt-1.5 text-[15px] font-light leading-relaxed text-slate-400">
            En el inicio encontrarás el mapa junto a la lista de lugares: lo que elijas en uno se
            refleja en el otro. En el móvil puedes alternar entre Mapa y Lista con los botones
            superiores.
          </p>
          <p className="mt-3">
            <Link href="/#explorar" className="inline-flex min-h-[44px] items-center rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#0c141f] btn-transition hover:bg-sky-400 hover:text-white">
              Ir al atlas
            </Link>
          </p>
        </div>

        <h2 className="mt-8 font-display text-xl font-extrabold uppercase text-white">Valores</h2>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[15px] font-light text-slate-400">
          <li>Colaboración y trabajo en equipo</li>
          <li>Respeto por la diversidad cultural y la lengua quechua</li>
          <li>Educación abierta de calidad</li>
          <li>Innovación con responsabilidad territorial</li>
        </ul>
        <p className="glass-card mt-6 rounded-2xl p-4 text-[13px] font-light leading-relaxed text-slate-400">
          Web educativa y cultural sin fines comerciales. Los relatos son tradición oral con fines
          pedagógicos; las coordenadas son referenciales. Mapa © Mapbox © OpenStreetMap.
        </p>
      </div>
    </div>
  );
}
