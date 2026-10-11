import Link from "next/link";
import { ArrowLeft, Mountain } from "lucide-react";
import PostCard from "@/components/PostCard";
import { posts } from "@/lib/posts";

export default function BlogPage() {
  return (
    <div className="relative z-10 bg-[#05090e]">
      <div className="textil-andino h-1.5" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <Link href="/#inicio" className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-bold text-sky-300 hover:text-sky-200">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Volver al inicio
        </Link>
        <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-sky-300">
          <Mountain className="h-3.5 w-3.5" aria-hidden="true" /> Diario del proyecto
        </p>
        <h1 className="mt-3 font-display text-2xl font-extrabold uppercase text-white sm:text-3xl md:text-4xl">Blog COIL</h1>
        <p className="mt-2 max-w-2xl text-[15px] font-light text-slate-400">
          Notas de intercambio entre Apurímac y Galicia. El mapa cultural sigue en la{" "}
          <a href="/#explorar" className="font-bold text-sky-300 hover:underline">
            página principal
          </a>
          .
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
