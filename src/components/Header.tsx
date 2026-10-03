import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-900">
          COIL Apurimac-Galicia
        </Link>
        <nav className="flex gap-6">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Inicio
          </Link>
          <Link href="/blog" className="text-gray-600 hover:text-gray-900">
            Blog
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-gray-900">
            Acerca de
          </Link>
        </nav>
      </div>
    </header>
  );
}
