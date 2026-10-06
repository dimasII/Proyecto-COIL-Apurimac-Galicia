import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug, posts } from "@/lib/posts";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-[#0f0a04]">
      <div className="textil-andino h-1.5" aria-hidden="true" />
      <article className="mx-auto max-w-3xl px-4 py-12">
        <Link href="/blog" className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-bold text-amber-300 hover:text-amber-200">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Volver al blog
        </Link>
        <header className="mt-4">
          <p className="inline-flex items-center gap-2">
            <span className="rounded-full bg-amber-400 px-2.5 py-1 text-[11px] font-bold text-stone-900">{post.category}</span>
            <span className="text-xs font-semibold text-amber-200/80">
              <time dateTime={post.date}>{new Date(post.date + "T12:00:00").toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" })}</time>
              {" · "}
              {post.author}
            </span>
          </p>
          <h1 className="mt-3 font-display text-3xl font-black leading-tight text-white md:text-4xl">{post.title}</h1>
          <p className="mt-2 text-[15px] italic leading-relaxed text-amber-100/75">{post.excerpt}</p>
        </header>

        <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10">
          <Image src={post.cover} alt={post.coverAlt} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" priority />
        </div>

        <div className="mt-8 max-w-none space-y-4 text-base leading-relaxed text-amber-50/90">
          {post.content.split("\n").map((paragraph, index) => {
            if (paragraph.startsWith("# ")) {
              return (
                <h2 key={index} className="mt-8 font-display text-2xl font-black text-white">
                  {paragraph.replace("# ", "")}
                </h2>
              );
            }
            if (paragraph.startsWith("## ")) {
              return (
                <h3 key={index} className="mt-6 text-xl font-extrabold text-amber-200">
                  {paragraph.replace("## ", "")}
                </h3>
              );
            }
            if (paragraph.startsWith("- ")) {
              return (
                <li key={index} className="ml-4">
                  {paragraph.replace("- ", "")}
                </li>
              );
            }
            if (paragraph.trim() === "") {
              return null;
            }
            return <p key={index}>{paragraph}</p>;
          })}
        </div>

        <footer className="mt-10 rounded-2xl border border-white/10 bg-white/[.04] p-5">
          <p className="text-sm font-bold text-white">Sigue explorando</p>
          <p className="mt-1 text-sm text-amber-100/70">
            Vuelve al <a href="/#explorar" className="font-bold text-amber-300 hover:underline">mapa cultural</a> o a la{" "}
            <a href="/#ruta-cultural" className="font-bold text-amber-300 hover:underline">Ruta Cultural de 7 paradas</a>.
          </p>
        </footer>
      </article>
    </div>
  );
}
