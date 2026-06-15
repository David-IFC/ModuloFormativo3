/* =========================================================
   DATOS · Acero y Honor (Combate Medieval)
   Aquí se centraliza toda la información que la web muestra.
   Separar los datos de la lógica hace el código más mantenible.
   ========================================================= */

/*
 * Tarjetas resumen de la sección de introducción.
 * Cada objeto describe uno de los tres pilares del guerrero.
 */
const TARJETAS_RESUMEN = [
  {
    icono: "img/espada-larga.svg",
    alt: "Icono de espada larga",
    titulo: "Armas",
    texto: "Espadas de corte, de punta y de dos manos para cada situación de combate."
  },
  {
    icono: "img/armadura-placas.svg",
    alt: "Icono de armadura de placas",
    titulo: "Protección",
    texto: "Desde la cota de malla hasta la armadura de placas que detenía casi todo."
  },
  {
    icono: "img/escudo-defensa.svg",
    alt: "Icono de defensa con escudo",
    titulo: "Técnica",
    texto: "Guardias, estocadas y bloqueos que marcaban la diferencia en la batalla."
  }
];

/*
 * Listado de espadas.
 * La propiedad "categoria" se usa para los filtros:
 * "una-mano", "dos-manos" o "estoque".
 */
const ESPADAS = [
  {
    nombre: "Espada de armas (arming sword)",
    categoria: "una-mano",
    imagen: "img/espada-arming.svg",
    alt: "Espada de armas de una mano con hoja recta",
    descripcion: "La espada de caballero por excelencia: ligera, equilibrada y usada junto a un escudo.",
    epoca: "Siglos XI–XIV",
    longitud: "90 cm",
    peso: "1,1 kg"
  },
  {
    nombre: "Espada bastarda (mano y media)",
    categoria: "una-mano",
    imagen: "img/espada-bastarda.svg",
    alt: "Espada bastarda de empuñadura larga",
    descripcion: "Empuñadura algo más larga que permite usarla con una o con dos manos según convenga.",
    epoca: "Siglos XIV–XVI",
    longitud: "110 cm",
    peso: "1,5 kg"
  },
  {
    nombre: "Espada larga (longsword)",
    categoria: "dos-manos",
    imagen: "img/espada-larga.svg",
    alt: "Espada larga de dos manos con hoja recta",
    descripcion: "Hoja recta y empuñadura para dos manos, base de la esgrima histórica europea.",
    epoca: "Siglos XIV–XVI",
    longitud: "120 cm",
    peso: "1,6 kg"
  },
  {
    nombre: "Mandoble (espadón)",
    categoria: "dos-manos",
    imagen: "img/mandoble.svg",
    alt: "Mandoble o espadón de gran tamaño a dos manos",
    descripcion: "Espada enorme empleada para romper formaciones de picas y combatir en campo abierto.",
    epoca: "Siglos XV–XVI",
    longitud: "170 cm",
    peso: "3,2 kg"
  },
  {
    nombre: "Estoque",
    categoria: "estoque",
    imagen: "img/estoque-arma.svg",
    alt: "Estoque de hoja estrecha y rígida",
    descripcion: "Hoja rígida y estrecha diseñada para perforar entre las juntas de la armadura.",
    epoca: "Siglos XIV–XVI",
    longitud: "100 cm",
    peso: "1,3 kg"
  },
  {
    nombre: "Sable medieval",
    categoria: "una-mano",
    imagen: "img/sable.svg",
    alt: "Sable medieval de hoja curva",
    descripcion: "Hoja curva pensada para cortes potentes, frecuente en la caballería ligera.",
    epoca: "Siglos XIII–XV",
    longitud: "95 cm",
    peso: "1,0 kg"
  }
];

/*
 * Listado de armaduras, ordenadas aproximadamente por nivel de protección.
 */
const ARMADURAS = [
  {
    nombre: "Gambesón",
    imagen: "img/gambeson.svg",
    alt: "Gambesón acolchado de tela",
    descripcion: "Prenda acolchada de tela que amortigua golpes. Se usaba sola o bajo otra armadura.",
    proteccion: "Baja",
    movilidad: "Alta",
    peso: "3 kg"
  },
  {
    nombre: "Cota de malla",
    imagen: "img/cota-malla.svg",
    alt: "Cota de malla de anillos metálicos entrelazados",
    descripcion: "Miles de anillas entrelazadas que detienen cortes, aunque no los impactos contundentes.",
    proteccion: "Media",
    movilidad: "Media",
    peso: "10 kg"
  },
  {
    nombre: "Brigantina",
    imagen: "img/brigantina.svg",
    alt: "Brigantina con placas remachadas a la tela",
    descripcion: "Placas metálicas remachadas al interior de una prenda de tela o cuero.",
    proteccion: "Media-alta",
    movilidad: "Media",
    peso: "9 kg"
  },
  {
    nombre: "Armadura de placas",
    imagen: "img/armadura-placas.svg",
    alt: "Armadura de placas completa de acero",
    descripcion: "Conjunto completo de placas de acero que cubre todo el cuerpo. La cima de la protección medieval.",
    proteccion: "Muy alta",
    movilidad: "Baja",
    peso: "25 kg"
  }
];

// Mensaje de comprobación en consola para confirmar que los datos se han cargado.
console.log("[datos] Datos cargados:", ESPADAS.length, "espadas y", ARMADURAS.length, "armaduras.");
