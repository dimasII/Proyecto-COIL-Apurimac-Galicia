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
    <article className="max-w-3xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-gray-600">
          <span>{post.author}</span>
          <span>{new Date(post.date).toLocaleDateString("es-ES")}</span>
        </div>
      </header>

      <div className="prose prose-lg max-w-none">
        {post.content.split("\n").map((paragraph, index) => {
          if (paragraph.startsWith("# ")) {
            return (
              <h1 key={index} className="text-3xl font-bold mt-8 mb-4">
                {paragraph.replace("# ", "")}
              </h1>
            );
          }
          if (paragraph.startsWith("## ")) {
            return (
              <h2 key={index} className="text-2xl font-semibold mt-6 mb-3">
                {paragraph.replace("## ", "")}
              </h2>
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
          return (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          );
        })}
      </div>
    </article>
  );
}
