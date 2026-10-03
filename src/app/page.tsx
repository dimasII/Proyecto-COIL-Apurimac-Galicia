import PostCard from "@/components/PostCard";
import { posts } from "@/lib/posts";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">COIL Apurimac-Galicia</h1>
        <p className="text-xl text-gray-600">
          Blog y sitio de contenido del proyecto de colaboración internacional
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Últimos artículos</h2>
        <div className="grid gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
