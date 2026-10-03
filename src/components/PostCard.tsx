import Link from "next/link";
import type { Post } from "@/lib/posts";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <Link href={`/blog/${post.slug}`}>
        <h2 className="text-xl font-semibold mb-2 hover:text-blue-600">
          {post.title}
        </h2>
      </Link>
      <p className="text-gray-600 mb-4">{post.excerpt}</p>
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span>{post.author}</span>
        <span>{new Date(post.date).toLocaleDateString("es-ES")}</span>
      </div>
    </article>
  );
}
