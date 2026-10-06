"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type RevealId = "horizons" | "ecosystem" | "vantage" | "expeditions";

export default function HeroCinematic() {
  const [revealed, setRevealed] = useState<Set<RevealId>>(new Set());
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const leaves = useMemo(
    () => [
      { left: "10%", anim: "animate-leaf-fall-slow", color: "text-emerald-400 opacity-40", size: "text-3xl rotate-45", delay: "0s" },
      { left: "40%", anim: "animate-leaf-fall-fast", color: "text-emerald-500 opacity-30", size: "text-2xl -rotate-12", delay: "2s" },
      { left: "70%", anim: "animate-leaf-fall-slow", color: "text-amber-400 opacity-20", size: "text-4xl rotate-90", delay: "4s" },
      { left: "85%", anim: "animate-leaf-fall-fast", color: "text-emerald-300 opacity-40", size: "text-xl rotate-180", delay: "1s" },
    ],
    []
  );

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const onScroll = () => {
      const y = window.scrollY;
      const progress = Math.min(Math.max(y / window.innerHeight, 0), 1);
      if (videoRef.current) {
        videoRef.current.style.transform = `scale(${1.05 + progress * 0.15}) translateY(${progress * 40}px)`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setRevealed((prev) => {
          const next = new Set(prev);
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute("data-reveal-id") as RevealId | null;
              if (id) next.add(id);
              observer.unobserve(entry.target);
            }
          }
          return next;
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    document.querySelectorAll("[data-reveal-id]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const revealClass = (id: RevealId) => (revealed.has(id) ? "reveal-up active" : "reveal-up");

  const scrollA = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative">
      {/* Fondo video fijo */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/poster-apurimac.jpg"
          className="h-full w-full object-cover opacity-60 transition-transform duration-1000 ease-out"
          style={{ willChange: "transform" }}
        >
          <source src="/video-apurimac.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 cinematic-vignette" />
        {leaves.map((leaf, i) => (
          <div key={i} className={`leaf-particle ${leaf.anim} ${leaf.color}`} style={{ top: "0", left: leaf.left, animationDelay: leaf.delay }}>
            <Icon icon="ph:leaf-fill" className={leaf.size} />
          </div>
        ))}
      </div>

      <div className="relative z-10">
        {/* HERO */}
        <section className="mx-auto flex min-h-screen max-w-7xl items-center justify-start px-6 pt-20">
          <div className="max-w-3xl space-y-8">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-sky-300 backdrop-blur">
              <Image src="/logo.png" alt="" width={20} height={20} className="h-5 w-5 rounded-full object-contain" />
              CamiñAndes · UNAMBA × USC
            </p>
            <h1 className="font-display text-5xl font-black uppercase leading-[0.9] tracking-tight sm:text-7xl text-gradient-sun">
              Donde los Andes <br />
              <span className="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
                se vuelven memoria.
              </span>
            </h1>
            <p className="max-w-xl text-base font-light leading-relaxed text-slate-300/80 sm:text-lg">
              De Saywite a Sóndor: mapa cultural, fichas con historia, sabores y leyendas quechuas, y una ruta de 7 paradas entre valles, lagunas y apus.
            </p>
            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <button
                type="button"
                onClick={() => scrollA("explorar")}
                className="rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 px-8 py-4 text-center text-xs font-bold uppercase tracking-widest text-white shadow-xl shadow-sky-500/10 transition-all duration-300 hover:from-sky-600 hover:to-emerald-600"
              >
                Explorar el mapa
              </button>
              <button
                type="button"
                onClick={() => scrollA("ruta-cultural")}
                className="flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-white/10"
              >
                <Icon icon="ph:play-fill" className="text-base text-emerald-400" />
                Ver la Ruta Cultural
              </button>
            </div>
          </div>
        </section>

        {/* HORIZONS → anatomía de Apurímac */}
        <section id="horizons" data-reveal-id="horizons" className={`${revealClass("horizons")} mx-auto max-w-7xl px-6 py-32`}>
          <div className="mb-20 grid items-end gap-12 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-7">
              <span className="block text-xs font-bold uppercase tracking-[0.4em] text-sky-400">Vast Dimensions</span>
              <h2 className="font-display text-4xl font-extrabold uppercase text-white sm:text-5xl">La anatomía de Apurímac</h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm font-light leading-relaxed text-slate-400">
                Cada valle combina arqueología viva, agua y comunidad: monolitos que miran al cielo, cañones profundos y lagunas que reflejan los apus.
              </p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: "ph:mountains-fill", border: "border-sky-500/20", bg: "bg-sky-500/10", text: "text-sky-400", t: "Apus y monolitos", d: "Saywite, Sóndor y andenerías: piedra tallada que ordena el agua y la memoria quechua." },
              { icon: "ph:waves-fill", border: "border-emerald-500/20", bg: "bg-emerald-500/10", text: "text-emerald-400", t: "Lagunas espejo", d: "Pacucha y espejos de altura que reflejan nubes, cumbres y ciclos del agua." },
              { icon: "ph:wind-fill", border: "border-amber-500/20", bg: "bg-amber-500/10", text: "text-amber-400", t: "Vientos y huatia", d: "Hornos de tierra, termas y cañón: el viento avisa la cosecha y la fiesta." },
            ].map((c) => (
              <div key={c.t} className="glass-card group rounded-3xl p-8 transition-all duration-500">
                <div className={`mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border ${c.border} ${c.bg} transition-transform group-hover:scale-110`}>
                  <Icon icon={c.icon} className={`text-2xl ${c.text}`} />
                </div>
                <h3 className="font-display mb-3 text-xl font-bold uppercase text-white">{c.t}</h3>
                <p className="text-sm font-light leading-relaxed text-slate-400">{c.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ECOSYSTEM */}
        <section id="ecosystem" data-reveal-id="ecosystem" className={`${revealClass("ecosystem")} relative overflow-hidden border-y border-white/5 bg-[#0c141f]/30 py-20`}>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-sky-600/5 to-emerald-500/5" />
          <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <Icon icon="ph:tree-evergreen-fill" className="text-lg text-emerald-400" />
              </div>
              <h2 className="font-display text-4xl font-extrabold uppercase leading-tight text-white sm:text-5xl">
                Territorio <br /> que enseña
              </h2>
              <p className="font-light leading-relaxed text-slate-300">
                El atlas funciona como el territorio: el mapa y la lista se hablan, la ruta marca tu progreso y cada ficha une historia, sabor y leyenda para el aula viva.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="border-l-2 border-emerald-500 pl-4">
                  <div className="font-display text-2xl font-bold text-white">7 paradas</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-slate-400">Ruta cultural guiada</div>
                </div>
                <div className="border-l-2 border-sky-400 pl-4">
                  <div className="font-display text-2xl font-bold text-white">4 mundos</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-slate-400">Arqueología · Agua · Sabor · Mito</div>
                </div>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="group relative h-80 w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-tr from-sky-600/20 to-emerald-500/20 p-6 shadow-2xl backdrop-blur-xl">
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-transparent to-[#0c141f]" />
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 animate-ping rounded-full bg-sky-400" />
                    <span className="font-mono text-xs text-sky-300">Señal Apurímac en vivo</span>
                  </div>
                  <Icon icon="ph:activity-fill" className="animate-pulse text-slate-400" />
                </div>
                <div className="relative z-20 space-y-4 font-mono text-xs text-slate-400">
                  <div className="rounded-xl border border-white/5 bg-black/40 p-3">
                    <span className="text-emerald-400">camino@andes:~$</span> explorar --saywite
                    <p className="mt-1 text-slate-500">Monolito orientado: agua y cosmos en una piedra</p>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-black/40 p-3">
                    <span className="text-emerald-400">camino@andes:~$</span> ruta --estado
                    <p className="mt-1 text-sky-400">Tu progreso se guarda parada por parada</p>
                  </div>
                  <div className="animate-pulse rounded-xl border border-white/5 bg-black/40 p-3 text-center text-[10px] font-bold uppercase tracking-widest text-amber-400">
                    Apus en calma · buen momento para viajar
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VANTAGE */}
        <section id="vantage" data-reveal-id="vantage" className={`${revealClass("vantage")} mx-auto max-w-7xl px-6 py-32`}>
          <div className="mx-auto mb-20 max-w-2xl space-y-4 text-center">
            <span className="block text-xs font-bold uppercase tracking-[0.4em] text-emerald-400">Miradores curados</span>
            <h2 className="font-display text-4xl font-extrabold uppercase text-white sm:text-5xl">Puntos de altura</h2>
            <p className="text-sm font-light text-slate-400">Cuatro paradas para calibrar la mirada: piedra, agua, sabor y mito.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { sector: "Parada 01", title: "Saywite", description: "Monolito cósmico entre Abancay y Curahuasi: el agua esculpida en piedra.", coords: "13.5° S, 72.8° W", accent: "text-sky-400" },
              { sector: "Parada 02", title: "Sóndor", description: "Pirámide escalonada chanka sobre Pacucha: poder y laguna frente a frente.", coords: "13.6° S, 73.3° W", accent: "text-emerald-400" },
              { sector: "Parada 03", title: "Cañón Apurímac", description: "Viento, cóndor y abismo: el dios hablador que une Cusco y Apurímac.", coords: "13.4° S, 72.6° W", accent: "text-amber-400" },
              { sector: "Parada 04", title: "Huatia", description: "Horno de tierra y papa nativa: sabor que se cocina bajo el suelo.", coords: "13.7° S, 73.0° W", accent: "text-white/40" },
            ].map((item) => (
              <div key={item.title} className="glass-card flex h-96 flex-col justify-between overflow-hidden rounded-2xl p-6 transition-all duration-300">
                <div>
                  <div className={`mb-1 text-[10px] font-bold uppercase tracking-widest ${item.accent}`}>{item.sector}</div>
                  <h3 className="font-display mb-2 text-xl font-bold uppercase text-white">{item.title}</h3>
                  <p className="text-xs font-light leading-relaxed text-slate-400">{item.description}</p>
                </div>
                <div className="flex items-center justify-between border-t border-white/5 pt-6">
                  <span className="font-mono text-xs text-slate-500">{item.coords}</span>
                  <button type="button" onClick={() => scrollA("explorar")} aria-label={`Ir a ${item.title} en el mapa`} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white transition-all hover:bg-white hover:text-[#0c141f]">
                    <Icon icon="ph:arrow-up-right-bold" className="text-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPEDITIONS */}
        <section id="expeditions" data-reveal-id="expeditions" className={`${revealClass("expeditions")} relative overflow-hidden bg-[#0c141f]/20 py-20`}>
          <div className="relative z-10 mx-auto max-w-5xl space-y-8 px-6 text-center">
            <div className="mx-auto flex h-12 w-12 animate-bounce items-center justify-center rounded-full border border-white/10 bg-white/5">
              <Icon icon="ph:sketch-logo-fill" className="text-xl text-sky-400" />
            </div>
            <h2 className="font-display mx-auto max-w-3xl text-4xl font-black uppercase leading-tight text-white sm:text-6xl">
              Sintoniza con <br /> el corazón andino.
            </h2>
            <p className="mx-auto max-w-xl text-base font-light leading-relaxed text-slate-400">
              Recibe la ruta completa, relatos quechuas y fichas para el aula. Sin spam: solo Apurímac.
            </p>
            <div className="mx-auto max-w-md pt-4">
              <form className="flex flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  required
                  placeholder="tu-correo@ejemplo.pe"
                  aria-label="Correo para recibir la ruta"
                  className="w-full rounded-full border border-white/10 bg-[#0c141f]/60 px-6 py-4 text-xs text-white backdrop-blur-md placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
                />
                <button type="submit" className="rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#0c141f] shadow-lg transition-all duration-300 hover:bg-sky-400 hover:text-white">
                  Quiero la ruta
                </button>
              </form>
            </div>
          </div>
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-40 w-full max-w-5xl -translate-x-1/2 bg-gradient-to-t from-sky-500/10 to-transparent blur-3xl" />
        </section>
      </div>
    </div>
  );
}
