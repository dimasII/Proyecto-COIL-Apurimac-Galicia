import type { POI, Provincia } from "@/types";
export const PROVINCIAS: Provincia[] = [
  {
    nombre: "Abancay",
    capital: "Abancay",
    descripcion:
      "Capital regional, valle primaveral entre el Ampay y el Pachachaca. Puerta al Cañón del Apurímac y al Santuario Nacional del Ampay.",
    distritosDestacados: ["Abancay", "Curahuasi", "Huanipaca"],
  },
  {
    nombre: "Andahuaylas",
    capital: "Andahuaylas",
    descripcion:
      "Corazón chanka: lagunas altoandinas, el complejo de Sóndor y una de las cocinas más festivas de la sierra sur.",
    distritosDestacados: ["Andahuaylas", "Pacucha", "Talavera"],
  },
  {
    nombre: "Antabamba",
    capital: "Antabamba",
    descripcion:
      "Tierra altoandina de mineros, arrieros y apus. Paisajes de puna, aguas termales y carnavales de origen prehispánico.",
    distritosDestacados: ["Antabamba", "Oropesa", "Huaquirca"],
  },
  {
    nombre: "Aymaraes",
    capital: "Chalhuanca",
    descripcion:
      "Corredor del Camino Qhapaq Ñan hacia Cusco. Templos coloniales, andenerías y el abra de Tablón.",
    distritosDestacados: ["Chalhuanca", "Colcabamba", "Caraybamba"],
  },
  {
    nombre: "Cotabambas",
    capital: "Tambobamba",
    descripcion:
      "Territorio quechua vivo, cuna del tinkuy y del carnaval cotabambino. Paisajes de cañón y comunidades tejedoras.",
    distritosDestacados: ["Tambobamba", "Haquira", "Mara"],
  },
  {
    nombre: "Chincheros",
    capital: "Chincheros",
    descripcion:
      "Balcón frutícola de Apurímac: chirimoya, tara y el bosque de Chumbibamba. Chanka y hospitalaria.",
    distritosDestacados: ["Chincheros", "Uranmarca", "Ocobamba"],
  },
  {
    nombre: "Grau",
    capital: "Chuquibambilla",
    descripcion:
      "Tierra del héroe Miguel Grau y de Vilcabamba de Apurímac. Lagunas, chullpas y fiesta del agua (Yaku Raymi).",
    distritosDestacados: ["Chuquibambilla", "Vilcabamba", "Mamara"],
  },
];

export const POIS: POI[] = [
  {
    id: "sondor",
    nombre: "Complejo Arqueológico de Sóndor",
    nombreQuechua: "Suntur",
    provincia: "Andahuaylas",
    distrito: "Pacucha",
    categoria: "arqueologia",
    coordenadas: [-73.2833, -13.6167],
    altitud: 3350,
    descripcionCorta:
      "Centro ceremonial y militar chanka con pirámide escalonada (Muyu Muyu) frente a la laguna de Pacucha.",
    historiaDetallada:
      "Sóndor fue uno de los centros político-religiosos más importantes de la cultura Chanka (siglos XII–XIV). Su estructura central, el Muyu Muyu, es una pirámide circular escalonada de piedra donde se celebraba el Inti Raymi chanka y se tomaban decisiones de guerra. Desde su cima se domina la laguna de Pacucha. Estudios del Ministerio de Cultura muestran ocupación continua hasta la anexión incaica bajo Pachacútec (~1438), cuando se convirtió en tambo del Qhapaq Ñan. Cada junio se escenifica el Sondor Raymi con cientos de actores locales.",
    gastronomiaLocal: [
      {
        nombre: "Cuy chactado andahuaylino",
        descripcion:
          "Cuy crocante frito en piedra caliente, acompañado de papas nativas y uchucuta.",
        ingredientesClave: ["cuy", "papa huayro", "ají panca", "huacatay"],
        ocasion: "Fiestas patronales y Sondor Raymi",
      },
      {
        nombre: "Huatia chanka",
        descripcion:
          "Tubérculos y habas cocidos bajo tierra en horno de terrones calientes, tradición de cosecha.",
        ingredientesClave: ["papa", "oca", "mashua", "habas"],
        ocasion: "Temporada de cosecha (mayo–julio)",
      },
    ],
    leyendaOMito:
      "Dicen los ancianos de Pacucha que el Muyu Muyu es el ombligo donde el guerrero Ancco Huayllu enterró su honda de oro para que ningún invasor encontrara el corazón chanka. Quien sube en silencio al amanecer escucha aún los pututus llamando a la defensa de la laguna.",
    imagenUrl:
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1200&auto=format&fit=crop",
    etiquetas: ["chanka", "pirámide", "inti raymi", "qhapaq ñan", "mirador"],
    esEmblematico: true,
  },
  {
    id: "saywite",
    nombre: "Monolito de Saywite",
    nombreQuechua: "Saywiti",
    provincia: "Abancay",
    distrito: "Curahuasi",
    categoria: "arqueologia",
    coordenadas: [-72.8028, -13.5469],
    altitud: 3500,
    descripcionCorta:
      "Maqueta lítica inca de 4 m de diámetro con 200 figuras talladas: andenes, ríos, felinos y templos.",
    historiaDetallada:
      "La piedra de Saywite es considerada la 'maqueta del imperio inca': un bloque de granito de 11 m de circunferencia donde escultores incaicos (siglo XV) tallaron en miniatura el cosmos andino — andenes, canales, pumas, serpientes y recintos. Funcionó como centro de culto al agua y observatorio hidráulico: los sacerdotes vertían agua para predecir el riego. Está asociada a la hacienda-llacta de Saywite, tambo real entre Cusco y Abancay. Fue descrita por cronistas y estudiada por Federico Kauffmann Doig.",
    gastronomiaLocal: [
      {
        nombre: "Huatia curahuasina",
        descripcion:
          "La más famosa de Apurímac: papas, camote y queso fresco cocidos en horno de tierra con hierbas de anís.",
        ingredientesClave: ["papa peruanita", "queso fresco", "anís", "habas"],
        ocasion: "Fiesta de la Huatia (junio–agosto)",
      },
      {
        nombre: "Chicharrón con tallarín de casa",
        descripcion:
          "Cerdo crocante de Curahuasi —'capital del anís'— con mote y llatan.",
        ingredientesClave: ["cerdo", "mote", "rocoto", "anís"],
      },
    ],
    leyendaOMito:
      "La tradición cuenta que los amautas tallaron el mundo en la piedra para que el dios Pariacaca no se llevara el agua. Si un forastero toca al puma tallado con respeto, la lluvia llegará a tiempo; si lo hace con soberbia, el Apurímac rugirá y cerrará el camino.",
    imagenUrl:
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1200&auto=format&fit=crop",
    etiquetas: ["inca", "maqueta lítica", "culto al agua", "curahuasi", "anís"],
    esEmblematico: true,
  },
  {
    id: "ampay",
    nombre: "Santuario Nacional del Ampay",
    nombreQuechua: "Anpay",
    provincia: "Abancay",
    distrito: "Abancay",
    categoria: "naturaleza",
    coordenadas: [-72.8736, -13.5756],
    altitud: 3600,
    descripcionCorta:
      "Bosque de intimpa (Podocarpus glomeratus) único en el Perú, al pie del nevado Ampay, con lagunas glaciares.",
    historiaDetallada:
      "Creado en 1987, el Santuario protege 3 635 ha del único bosque de intimpa —conífera andina en peligro— y las lagunas Uspaqocha y Anqasqocha que abastecen de agua a Abancay. El nevado Ampay (5 235 m) es apu tutelar de la ciudad. El santuario alberga venados de cola blanca, pumas andinos y más de 100 especies de orquídeas. El circuito a la laguna grande (4–5 h) parte del centro de interpretación de Tamburco y es aula viva de la UNAMBA.",
    gastronomiaLocal: [
      {
        nombre: "Tallarenes de casa abanquinos",
        descripcion:
          "Fideos artesanales con estofado de gallina de corral y pebre de rocoto.",
        ingredientesClave: ["gallina", "fideo artesanal", "rocoto", "queso"],
        ocasion: "Domingos y fiesta del Señor de la Caída",
      },
      {
        nombre: "Ccapchi de habas",
        descripcion:
          "Crema fría de habas con queso fresco, leche y huacatay; plato de caminantes al Ampay.",
        ingredientesClave: ["habas", "queso", "huacatay", "leche"],
      },
    ],
    leyendaOMito:
      "El Ampay es un apu celoso: los abanquinos dicen que quien caza dentro del bosque o contamina sus lagunas verá nublarse la cumbre y perderá el camino. En cambio, el caminante que deja una ofrenda de coca y pide permiso en quechua recibe agua clara y buen clima.",
    imagenUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop",
    etiquetas: ["intimpa", "apu", "lagunas", "trekking", "área protegida"],
    esEmblematico: true,
  },
  {
    id: "pampachiri",
    nombre: "Bosque de Piedras de Pampachiri",
    nombreQuechua: "Pampachiri Rumi Sach'a",
    provincia: "Andahuaylas",
    distrito: "Pampachiri",
    categoria: "naturaleza",
    coordenadas: [-73.35, -14.1833],
    altitud: 3800,
    descripcionCorta:
      "Ciudad lítica de conos y hongos de piedra de origen volcánico, hogar de vizcachas y de la casa de los pitufos.",
    historiaDetallada:
      "Formado hace millones de años por flujos piroclásticos del complejo volcánico, el bosque de Pampachiri (también llamado Panqorumi) cubre 60 ha de esculturas naturales de hasta 10 m. La aldea cercana de Larcay conserva 'casas pitufas' de piedra pintada. Es hábitat de vizcachas, zorros andinos y queñuales. Junto a la zona de Ayamachay hay pinturas rupestres y chullpas preincaicas aún poco estudiadas.",
    gastronomiaLocal: [
      {
        nombre: "Puchero andahuaylino",
        descripcion:
          "Sopa contundente de carnes, col, garbanzo y papas para el frío de puna.",
        ingredientesClave: ["cordero", "res", "garbanzo", "papa"],
        ocasion: "Carnavales y faenas comunales",
      },
      {
        nombre: "Mazamorra de calabaza",
        descripcion:
          "Postre de calabaza, chancaca, canela y clavo; energía para caminantes de altura.",
        ingredientesClave: ["calabaza", "chancaca", "canela"],
      },
    ],
    leyendaOMito:
      "Los comuneros cuentan que las piedras son guerreros chankas petrificados por la achachila (abuela montaña) para proteger el pueblo de los invasores. Al atardecer, las vizcachas —almas de esos guerreros— salen a vigilar y silban si un extraño se acerca con malas intenciones.",
    imagenUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
    etiquetas: ["geología", "vizcachas", "fotografía", "puna", "familias"],
  },
  {
    id: "canon-apurimac",
    nombre: "Cañón del Apurímac",
    nombreQuechua: "Apurimaq",
    provincia: "Abancay",
    distrito: "Huanipaca",
    categoria: "naturaleza",
    coordenadas: [-72.65, -13.45],
    altitud: 2200,
    descripcionCorta:
      "Uno de los cañones más profundos del mundo (3 000 m), 'el dios que habla', cuna del rafting y del cóndor.",
    historiaDetallada:
      "El río Apurímac —'el gran hablador' en quechua— nace en el nevado Mismi (Arequipa) y talla un cañón de hasta 3 000 m de profundidad entre Apurímac y Cusco, considerado el origen más lejano del Amazonas. El mirador de Capuliyoc (Huanipaca) es la puerta a Choquequirao. El tramo del cañón ofrece rápidos de clase IV–V y es santuario del cóndor andino. Las comunidades de Huanipaca y Cachora gestionan turismo comunitario y conservan andenerías incas.",
    gastronomiaLocal: [
      {
        nombre: "Trucha frita del Pachachaca",
        descripcion:
          "Trucha dorada de río con yuca, mote y ensalada de palta de Huanipaca.",
        ingredientesClave: ["trucha", "yuca", "palta", "limón"],
      },
      {
        nombre: "Estofado de cabrito",
        descripcion:
          "Cabrito de valle cálido en chicha de jora con yucas y arroz.",
        ingredientesClave: ["cabrito", "chicha de jora", "yuca"],
      },
    ],
    leyendaOMito:
      "Apurimaq es un dios-oráculo: los antiguos le arrojaban ofrendas y escuchaban su rugido para adivinar la guerra y la cosecha. Dicen que antes de los grandes cambios el río 'habla más fuerte' y los cóndores trazan círculos sobre el cañón anunciando el mensaje del apu.",
    imagenUrl:
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=80&w=1200&auto=format&fit=crop",
    etiquetas: ["cañón", "rafting", "cóndor", "choquequirao", "mirador"],
    esEmblematico: true,
  },
  {
    id: "laguna-pacucha",
    nombre: "Laguna de Pacucha",
    nombreQuechua: "Paqucha Qucha",
    provincia: "Andahuaylas",
    distrito: "Pacucha",
    categoria: "naturaleza",
    coordenadas: [-73.3, -13.6],
    altitud: 3200,
    descripcionCorta:
      "Espejo de agua andina de 500 ha, ideal para paseos en bote, avistamiento de aves y la fiesta del pejerrey.",
    historiaDetallada:
      "La laguna de Pacucha, a minutos de Sóndor, es una de las más bellas de la sierra sur: 500 ha a 3 200 m rodeadas de totorales, eucaliptos y andenes. Alberga pejerrey, truchas y aves como la parihuana y el zambullidor. En sus orillas se celebra la fiesta del Yaku Raymi y competencias de botes. La ruta en malecón conecta miradores, restaurantes de trucha y el embarcadero artesanal gestionado por la comunidad.",
    gastronomiaLocal: [
      {
        nombre: "Pejerrey frito de Pacucha",
        descripcion:
          "Pejerrey crocante de la laguna con papas doradas, mote y ocopa.",
        ingredientesClave: ["pejerrey", "papa", "ají mirasol"],
        ocasion: "Festival del Pejerrey (septiembre)",
      },
      {
        nombre: "Trucha a la parrilla",
        descripcion: "Trucha fresca a la brasa con chimichurri andino.",
        ingredientesClave: ["trucha", "huacatay", "limón"],
      },
    ],
    leyendaOMito:
      "Cuenta la leyenda que la laguna nació de las lágrimas de la ñusta Paqucha, que lloró la partida de su amado guerrero chanka. Por eso sus aguas cambian de color con el ánimo del cielo, y quien se baña con respeto encuentra calma; quien lo hace con orgullo, siente el frío profundo del lago.",
    imagenUrl:
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=1200&auto=format&fit=crop",
    etiquetas: ["laguna", "aves", "bote", "familias", "mirador"],
  },
  {
    id: "cconoc",
    nombre: "Baños Termales de Cconoc",
    nombreQuechua: "Q'uñuq",
    provincia: "Abancay",
    distrito: "Curahuasi",
    categoria: "gastronomia",
    coordenadas: [-72.75, -13.55],
    altitud: 1800,
    descripcionCorta:
      "Aguas medicinales a 28 °C junto al Apurímac, entre paltas y frutales; parada de descanso y sabor de valle cálido.",
    historiaDetallada:
      "Cconoc (del quechua q'uñuq, 'caliente') es un complejo termal a orillas del Apurímac, en el valle cálido de Curahuasi. Sus pozas de 25–28 °C son apreciadas desde época prehispánica por sus propiedades para la piel y los huesos. Hoy cuenta con piscinas, hospedaje comunitario y restaurantes de trucha y palta. Es parada clásica en la ruta Abancay–Cusco y punto de aclimatación antes de subir a Saywite.",
    gastronomiaLocal: [
      {
        nombre: "Huatia de valle",
        descripcion:
          "Versión cálida de la huatia con camote morado, yuca y plátano asados en tierra.",
        ingredientesClave: ["camote", "yuca", "plátano"],
      },
      {
        nombre: "Palta rellena curahuasina",
        descripcion:
          "Palta fuerte de Curahuasi rellena de pollo, choclo y mayonesa de anís.",
        ingredientesClave: ["palta fuerte", "pollo", "choclo"],
      },
    ],
    leyendaOMito:
      "Los mayores dicen que las aguas de Cconoc son el sudor del apu Ampay cuando baja a bañarse al río. Bañarse al amanecer, en silencio, 'saca el cansancio del cuerpo y los malos pensamientos'; por eso los arrieros entraban primero a las pozas antes de seguir al Cusco.",
    imagenUrl:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop",
    etiquetas: ["termales", "descanso", "valle", "palta", "familias"],
  },
  {
    id: "huatia-fest",
    nombre: "Fiesta de la Huatia — Curahuasi",
    nombreQuechua: "Watiya Raymi",
    provincia: "Abancay",
    distrito: "Curahuasi",
    categoria: "gastronomia",
    coordenadas: [-72.7356, -13.5506],
    altitud: 2684,
    descripcionCorta:
      "Celebración ancestral de la cocina bajo tierra: hornos de terrones, danzas y feria de papas nativas.",
    historiaDetallada:
      "La Huatia (watiya) es una técnica preincaica de cocción en hornos cónicos de terrones (k'urpas) calentados con leña y bosta. En Curahuasi, autodenominada capital de la huatia, cada temporada de cosecha las familias y visitantes preparan papas, ocas, habas y quesos bajo tierra. La fiesta incluye concurso de hornos, danzas de tijeras, feria de agrobiodiversidad con más de 50 variedades de papa y el ritual de pago a la Pachamama antes de romper el horno.",
    gastronomiaLocal: [
      {
        nombre: "Huatia clásica",
        descripcion:
          "El plato central: tubérculos ahumados bajo tierra, servidos con ocopa y queso.",
        ingredientesClave: ["papa", "oca", "queso", "ocopa"],
        ocasion: "Watiya Raymi",
      },
      {
        nombre: "Chicha de jora curahuasina",
        descripcion: "Bebida sagrada de maíz germinado, fermentada en cántaros.",
        ingredientesClave: ["maíz", "chancaca"],
        ocasion: "Cosechas y matrimonios",
      },
    ],
    leyendaOMito:
      "La watiya nació, según los abuelos, cuando los primeros agricultores olvidaron unas papas junto a una fogata de ichu y la Pachamama las cocinó con su aliento caliente. Desde entonces, romper el horno es abrir el vientre de la madre tierra: se hace en círculo, compartiendo, y el primer bocado es siempre para la tierra.",
    imagenUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
    etiquetas: ["huatia", "fiesta", "pachamama", "papas nativas", "ritual"],
    esEmblematico: true,
  },
  {
    id: "muyuorcco",
    nombre: "Muyu Orcco y Carnaval Chanka",
    provincia: "Andahuaylas",
    distrito: "Andahuaylas",
    categoria: "mitos_tradiciones",
    coordenadas: [-73.3833, -13.6567],
    altitud: 2926,
    descripcionCorta:
      "Colina ceremonial y corazón del carnaval andahuaylino: comparsas, warak'ay y tinkuy festivo.",
    historiaDetallada:
      "El cerro Muyu Orcco domina Andahuaylas y fue ushnu chanka para ofrendas al sol. Hoy es mirador y escenario del carnaval más alegre de Apurímac (febrero–marzo): comparsas de los barrios, warak'ay (hondas), juegos con talco y serpentinas, y el tradicional pucllay. El carnaval chanka mezcla ritual de fertilidad prehispánico con fiesta patronal y culmina con el 'entierro del carnavalón'.",
    gastronomiaLocal: [
      {
        nombre: "Puchero de carnaval",
        descripcion: "Caldo festivo que repone fuerzas tras el pucllay.",
        ingredientesClave: ["carne", "col", "garbanzo", "arroz"],
        ocasion: "Carnavales",
      },
      {
        nombre: "Chicha de siete semillas",
        descripcion: "Bebida ritual de maíz, trigo, cebada y maní.",
        ingredientesClave: ["maíz", "trigo", "maní", "chancaca"],
      },
    ],
    leyendaOMito:
      "En Muyu Orcco habita un zorro de oro que solo aparece en carnaval: quien lo ve bailando entre las comparsas tendrá un año de buena cosecha, pero debe convidarle chicha derramando un poco a la tierra. Si lo persigue por codicia, el cerro lo envuelve en neblina.",
    imagenUrl:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop",
    etiquetas: ["carnaval", "danza", "mirador", "fiesta", "chanka"],
  },
  {
    id: "vilcabamba-grau",
    nombre: "Vilcabamba de Apurímac y Yaku Raymi",
    provincia: "Grau",
    distrito: "Vilcabamba",
    categoria: "mitos_tradiciones",
    coordenadas: [-72.8, -14.05],
    altitud: 3650,
    descripcionCorta:
      "Pueblo de altura con chullpas, lagunas y la fiesta del agua que honra a los apus y a los ingenieros del riego.",
    historiaDetallada:
      "Vilcabamba (Grau) conserva andenerías, chullpas funerarias y canales prehispánicos aún en uso. Su fiesta mayor, el Yaku Raymi (fiesta del agua, agosto–septiembre), reúne a comunidades para limpiar canales (faena del yarqa aspiy), ofrendar a los apus y danzar con los danzaq. Es territorio de pastores de alpacas y tejedores de ponchos de lana teñida con tintes naturales.",
    gastronomiaLocal: [
      {
        nombre: "Caldo de cordero de puna",
        descripcion: "Sopa de cordero, chuño y hierbas de altura.",
        ingredientesClave: ["cordero", "chuño", "muña"],
      },
      {
        nombre: "Queso frito con mote",
        descripcion: "Queso de altura dorado con mote y huacatay.",
        ingredientesClave: ["queso", "mote", "huacatay"],
      },
    ],
    leyendaOMito:
      "Los yaku kamayuq (guardianes del agua) cuentan que las lagunas de Vilcabamba están conectadas por venas subterráneas que laten como un corazón. Si la faena del agua se hace con alegría y sin peleas, el apu suelta el agua; si hay discordia, las lagunas se enturbian hasta que la comunidad se reconcilie.",
    imagenUrl:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop",
    etiquetas: ["yaku raymi", "agua", "alpacas", "tejido", "puna"],
  },
  {
    id: "talavera-nino",
    nombre: "Niño Jesús de Talavera y Dulces de Andahuaylas",
    provincia: "Andahuaylas",
    distrito: "Talavera",
    categoria: "mitos_tradiciones",
    coordenadas: [-73.4267, -13.6533],
    altitud: 2820,
    descripcionCorta:
      "Devoción sincrética al Niño Jesús de Talavera y capital de los dulces: suspiros, maicillos y rosquitas.",
    historiaDetallada:
      "Talavera de la Reyna, fundada en el siglo XVI, custodia al Niño Jesús de Talavera, imagen venerada cuyo santuario atrae peregrinos cada enero. La fiesta mezcla misa, procesión, danzas de negrillos y feria de dulces tradicionales —suspiros, maicillos, bienmesabe— elaborados por familias reposteras desde hace generaciones. Su templo colonial de adobe y su plaza de portales son patrimonio vivo.",
    gastronomiaLocal: [
      {
        nombre: "Suspiros talaverinos",
        descripcion: "Merenguitos crocantes de clara y azúcar, horneados en leña.",
        ingredientesClave: ["clara de huevo", "azúcar", "limón"],
      },
      {
        nombre: "Cuy en salsa de maní",
        descripcion: "Cuy dorado en salsa cremosa de maní con papas.",
        ingredientesClave: ["cuy", "maní", "ají"],
      },
    ],
    leyendaOMito:
      "Se dice que el Niño de Talavera se escapa de su urna en las noches de fiesta para jugar con los niños del pueblo, dejando sus zapatitos empolvados. Las reposteras le dejan suspiros en el atrio para que bendiga los hornos; si los dulces salen blancos y altos, es señal de su visita.",
    imagenUrl:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1200&auto=format&fit=crop",
    etiquetas: ["fiesta patronal", "dulces", "templo", "peregrinación"],
  },
  {
    id: "cotabambas-tinkuy",
    nombre: "Tinkuy y Carnaval de Tambobamba",
    provincia: "Cotabambas",
    distrito: "Tambobamba",
    categoria: "mitos_tradiciones",
    coordenadas: [-72.1756, -13.9494],
    altitud: 3250,
    descripcionCorta:
      "Encuentro ritual andino donde danza, canto quechua y duelo festivo renuevan el equilibrio de las comunidades.",
    historiaDetallada:
      "El tinkuy cotabambino es un encuentro ritual entre ayllus que combina canto quechua (wifala), danza en ronda y competencia festiva. Lejos del estereotipo violento, en Tambobamba se vive como reafirmación de identidad y equilibrio (yanantin). El carnaval de Cotabambas, declarado de interés cultural, reúne waripoleras, comparsas a caballo y contrapunteo de cantoras en quechua.",
    gastronomiaLocal: [
      {
        nombre: "Merenda cotabambina",
        descripcion:
          "Fiambre de viaje: mote, queso, cancha, charqui y rocoto molido en batán.",
        ingredientesClave: ["mote", "charqui", "cancha", "queso"],
        ocasion: "Carnaval y faenas",
      },
      {
        nombre: "Chicha de molle",
        descripcion: "Bebida fermentada de molle con chancaca, típica de carnaval.",
        ingredientesClave: ["molle", "chancaca"],
      },
    ],
    leyendaOMito:
      "Los ancianos enseñan que en el tinkuy no pelean los hombres, sino que dialogan los apus a través de ellos. Cuando el encuentro termina en abrazo y brindis de chicha, los cerros quedan en paz y la cosecha será pareja para ambas comunidades.",
    imagenUrl:
      "https://images.unsplash.com/photo-1518638150340-f706e86654de?q=80&w=1200&auto=format&fit=crop",
    etiquetas: ["tinkuy", "quechua", "carnaval", "danza", "ayllu"],
  },
];
export const RUTA_CULTURAL_IDS = [
  "saywite",
  "huatia-fest",
  "cconoc",
  "canon-apurimac",
  "ampay",
  "laguna-pacucha",
  "sondor",
] as const;

export const RUTA_CULTURAL: POI[] = RUTA_CULTURAL_IDS.map(
  (id) => POIS.find((p) => p.id === id)!,
).filter(Boolean);