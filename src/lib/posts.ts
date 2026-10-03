export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  content: string;
}

export const posts: Post[] = [
  {
    slug: "inicio-proyecto",
    title: "Inicio del Proyecto COIL Apurimac-Galicia",
    excerpt:
      "Damos comienzo a esta iniciativa de colaboración entre Apurímac y Galicia, promoviendo el intercambio cultural y educativo.",
    date: "2026-09-15",
    author: "Equipo COIL",
    content: `
# Inicio del Proyecto COIL Apurimac-Galicia

Este proyecto nace con el objetivo de fomentar la colaboración entre instituciones de Apurímac (Perú) y Galicia (España), creando espacios de intercambio cultural, educativo y profesional.

## Objetivos

- Promover el intercambio de conocimientos entre ambas regiones
- Fortalecer los lazos culturales y educativos
- Crear oportunidades de colaboración internacional

## Próximos pasos

En las próximas semanas estaremos publicando más contenido sobre las actividades y avances del proyecto.
    `,
  },
  {
    slug: "intercambio-cultural",
    title: "Intercambio Cultural: Puentes entre dos mundos",
    excerpt:
      "Descubrimos cómo el intercambio cultural enriquece a ambas comunidades y fortalece la identidad de cada región.",
    date: "2026-09-22",
    author: "María García",
    content: `
# Intercambio Cultural: Puentes entre dos mundos

El corazón de este proyecto late en el intercambio cultural. A través de actividades conjuntas, estudiantes y profesionales de Apurímac y Galicia comparten tradiciones, costumbres y saberes.

## Actividades destacadas

- Talleres de música tradicional
- Exposiciones de arte local
- Intercambio de gastronomía típica

Estas actividades no solo enriquecen a los participantes, sino que también fortalecen la identidad cultural de ambas regiones.
    `,
  },
  {
    slug: "educacion-global",
    title: "Educación Global para un Futuro Compartido",
    excerpt:
      "La educación global como herramienta para construir un futuro más conectado y colaborativo entre nuestras comunidades.",
    date: "2026-10-01",
    author: "Carlos Quispe",
    content: `
# Educación Global para un Futuro Compartido

La educación es el pilar fundamental de este proyecto. A través de metodologías innovadoras y colaborativas, buscamos preparar a los estudiantes para un mundo cada vez más interconectado.

## Metodología

- Aprendizaje basado en proyectos
- Colaboración virtual entre aulas
- Mentoría internacional

Creemos que la educación global es la clave para construir un futuro más justo y sostenible para todos.
    `,
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
