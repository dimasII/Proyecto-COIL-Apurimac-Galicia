import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/posts";

interface PostCardProps {
  post: Post;
}

function fechaCorta(iso: string) {
  try {
    return new Date(iso + "T12:00:00").toLocaleDateString("es-PE", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="glass-card group flex flex-col overflow-hidden rounded-2xl card-lift">
      <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/9] overflow-hidden" aria-label={`Leer: ${post.title}`}>
        <Image
          src={post.cover}
          alt={post.coverAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          loading="lazy"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-[#0c141f]">
          {post.category}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold text-slate-500">
          <time dateTime={post.date}>{fechaCorta(post.date)}</time>
          <span aria-hidden="true"> · </span>
          {post.author}
        </p>
        <h2 className="mt-1.5 text-lg font-extrabold leading-snug text-white">
          <Link href={`/blog/${post.slug}`} className="rounded-md hover:text-sky-300 hover:underline hover:underline-offset-4">
            {post.title}
          </Link>
        </h2>
        <p className="mt-2 line-clamp-2 text-sm font-light leading-relaxed text-slate-400">{post.excerpt}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-3 inline-flex min-h-[44px] w-fit items-center gap-1.5 text-sm font-bold text-sky-300 btn-transition hover:gap-2.5 hover:text-sky-200"
          aria-label={`Leer artículo completo: ${post.title}`}
        >
          Leer nota <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
