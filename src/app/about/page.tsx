export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Acerca del Proyecto</h1>

      <div className="prose prose-lg max-w-none">
        <p className="mb-4">
          El proyecto <strong>COIL Apurimac-Galicia</strong> es una iniciativa de
          colaboración internacional que busca fomentar el intercambio cultural,
          educativo y profesional entre las regiones de Apurímac (Perú) y Galicia
          (España).
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Misión</h2>
        <p className="mb-4">
          Crear puentes de colaboración entre ambas regiones, promoviendo el
          entendimiento mutuo y el desarrollo compartido a través de la educación
          y la cultura.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Visión</h2>
        <p className="mb-4">
          Ser un referente de colaboración internacional, demostrando que la
          educación y la cultura son herramientas poderosas para construir un
          futuro más conectado y sostenible.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Valores</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>Colaboración y trabajo en equipo</li>
          <li>Respeto por la diversidad cultural</li>
          <li>Compromiso con la educación de calidad</li>
          <li>Innovación y creatividad</li>
          <li>Sostenibilidad y responsabilidad social</li>
        </ul>
      </div>
    </div>
  );
}
