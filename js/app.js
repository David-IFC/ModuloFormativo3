/* =========================================================
   LÓGICA PRINCIPAL · Acero y Honor (Combate Medieval)
   Genera el contenido dinámico, gestiona filtros, menú,
   contador de entrenamiento y estado de conexión.
   Nota: se evitan los operadores ternarios (?:) a propósito;
   se usan if/else y bucles for en su lugar.
   ========================================================= */

/* ---------------------------------------------------------
   1. TARJETAS RESUMEN (sección de introducción)
   --------------------------------------------------------- */

/**
 * Crea y pinta las tres tarjetas resumen dentro del contenedor #tarjetasResumen.
 * Recorre el array TARJETAS_RESUMEN definido en datos.js.
 */
function crearTarjetasResumen() {
  const contenedor = document.getElementById("tarjetasResumen");

  // Si el contenedor no existe, salimos para evitar errores.
  if (contenedor === null) {
    console.warn("[app] No se encontró el contenedor de tarjetas resumen.");
    return;
  }

  for (let i = 0; i < TARJETAS_RESUMEN.length; i++) {
    const dato = TARJETAS_RESUMEN[i];

    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta-resumen";

    // Imagen del icono (siempre con alt relleno, como pide el requisito).
    const imagen = document.createElement("img");
    imagen.src = dato.icono;
    imagen.alt = dato.alt;
    imagen.className = "tarjeta-resumen__icono";
    imagen.width = 64;
    imagen.height = 64;

    const titulo = document.createElement("h3");
    titulo.textContent = dato.titulo;

    const texto = document.createElement("p");
    texto.textContent = dato.texto;

    tarjeta.appendChild(imagen);
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(texto);
    contenedor.appendChild(tarjeta);
  }

  console.log("[app] Tarjetas resumen generadas:", TARJETAS_RESUMEN.length);
}

/* ---------------------------------------------------------
   2. ESPADAS (rejilla + filtros)
   --------------------------------------------------------- */

/**
 * Construye el elemento HTML de una carta de espada.
 * @param {Object} espada - Objeto con los datos de la espada.
 * @returns {HTMLElement} El artículo (carta) listo para insertar.
 */
function crearCartaEspada(espada) {
  const carta = document.createElement("article");
  carta.className = "carta";

  // Imagen de la espada con su atributo alt obligatorio.
  const imagen = document.createElement("img");
  imagen.src = espada.imagen;
  imagen.alt = espada.alt;
  imagen.className = "carta__imagen";
  imagen.loading = "lazy";

  const cuerpo = document.createElement("div");
  cuerpo.className = "carta__cuerpo";

  const titulo = document.createElement("h3");
  titulo.className = "carta__titulo";
  titulo.textContent = espada.nombre;

  // Etiqueta legible según la categoría. Se traduce con if/else (sin ternarios).
  const etiqueta = document.createElement("span");
  etiqueta.className = "carta__etiqueta";
  if (espada.categoria === "una-mano") {
    etiqueta.textContent = "Una mano";
  } else if (espada.categoria === "dos-manos") {
    etiqueta.textContent = "Dos manos";
  } else if (espada.categoria === "estoque") {
    etiqueta.textContent = "Estoque";
  } else {
    etiqueta.textContent = "Otra";
  }

  const texto = document.createElement("p");
  texto.className = "carta__texto";
  texto.textContent = espada.descripcion;

  // Lista de datos técnicos (época, longitud, peso).
  const datos = document.createElement("ul");
  datos.className = "carta__datos";
  datos.appendChild(crearFilaDato("Época", espada.epoca));
  datos.appendChild(crearFilaDato("Longitud", espada.longitud));
  datos.appendChild(crearFilaDato("Peso", espada.peso));

  cuerpo.appendChild(titulo);
  cuerpo.appendChild(etiqueta);
  cuerpo.appendChild(texto);
  cuerpo.appendChild(datos);

  carta.appendChild(imagen);
  carta.appendChild(cuerpo);

  return carta;
}

/**
 * Crea una fila <li> con una etiqueta y su valor para las listas de datos.
 * @param {string} etiqueta - Nombre del dato (ej. "Peso").
 * @param {string} valor - Valor del dato (ej. "1,6 kg").
 * @returns {HTMLElement} El elemento <li> formado.
 */
function crearFilaDato(etiqueta, valor) {
  const fila = document.createElement("li");
  const nombre = document.createElement("span");
  nombre.textContent = etiqueta;
  const dato = document.createElement("strong");
  dato.textContent = valor;
  fila.appendChild(nombre);
  fila.appendChild(dato);
  return fila;
}

/**
 * Pinta las espadas en la rejilla aplicando un filtro de categoría.
 * @param {string} filtro - "todas", "una-mano", "dos-manos" o "estoque".
 */
function renderEspadas(filtro) {
  const rejilla = document.getElementById("rejillaEspadas");
  if (rejilla === null) {
    return;
  }

  // Limpiamos la rejilla antes de volver a pintarla.
  rejilla.innerHTML = "";

  let mostradas = 0;

  for (let i = 0; i < ESPADAS.length; i++) {
    const espada = ESPADAS[i];

    // Decidimos si la espada debe mostrarse según el filtro (sin ternarios).
    let debeMostrarse = false;
    if (filtro === "todas") {
      debeMostrarse = true;
    } else if (espada.categoria === filtro) {
      debeMostrarse = true;
    }

    if (debeMostrarse === true) {
      const carta = crearCartaEspada(espada);
      rejilla.appendChild(carta);
      mostradas = mostradas + 1;
    }
  }

  console.log("[app] Espadas mostradas con el filtro '" + filtro + "':", mostradas);
}

/**
 * Configura los botones de filtro de espadas.
 * Al pulsar uno, marca el botón como activo y vuelve a pintar la rejilla.
 */
function configurarFiltros() {
  const contenedorFiltros = document.getElementById("filtrosEspadas");
  if (contenedorFiltros === null) {
    return;
  }

  const botones = contenedorFiltros.querySelectorAll(".filtro");

  for (let i = 0; i < botones.length; i++) {
    const boton = botones[i];

    boton.addEventListener("click", function () {
      // Quitamos la clase activa de todos los botones.
      for (let j = 0; j < botones.length; j++) {
        botones[j].classList.remove("filtro--activo");
      }
      // Marcamos como activo el botón pulsado.
      boton.classList.add("filtro--activo");

      const filtroSeleccionado = boton.getAttribute("data-filtro");
      console.log("[app] Filtro seleccionado:", filtroSeleccionado);
      renderEspadas(filtroSeleccionado);
    });
  }
}

/* ---------------------------------------------------------
   3. ARMADURAS (rejilla)
   --------------------------------------------------------- */

/**
 * Construye la carta HTML de una armadura.
 * @param {Object} armadura - Objeto con los datos de la armadura.
 * @returns {HTMLElement} La carta lista para insertar.
 */
function crearCartaArmadura(armadura) {
  const carta = document.createElement("article");
  carta.className = "carta";

  const imagen = document.createElement("img");
  imagen.src = armadura.imagen;
  imagen.alt = armadura.alt;
  imagen.className = "carta__imagen";
  imagen.loading = "lazy";

  const cuerpo = document.createElement("div");
  cuerpo.className = "carta__cuerpo";

  const titulo = document.createElement("h3");
  titulo.className = "carta__titulo";
  titulo.textContent = armadura.nombre;

  const texto = document.createElement("p");
  texto.className = "carta__texto";
  texto.textContent = armadura.descripcion;

  const datos = document.createElement("ul");
  datos.className = "carta__datos";
  datos.appendChild(crearFilaDato("Protección", armadura.proteccion));
  datos.appendChild(crearFilaDato("Movilidad", armadura.movilidad));
  datos.appendChild(crearFilaDato("Peso", armadura.peso));

  cuerpo.appendChild(titulo);
  cuerpo.appendChild(texto);
  cuerpo.appendChild(datos);

  carta.appendChild(imagen);
  carta.appendChild(cuerpo);

  return carta;
}

/**
 * Pinta todas las armaduras en su rejilla.
 */
function renderArmaduras() {
  const rejilla = document.getElementById("rejillaArmaduras");
  if (rejilla === null) {
    return;
  }

  rejilla.innerHTML = "";

  for (let i = 0; i < ARMADURAS.length; i++) {
    const carta = crearCartaArmadura(ARMADURAS[i]);
    rejilla.appendChild(carta);
  }

  console.log("[app] Armaduras generadas:", ARMADURAS.length);
}

/* ---------------------------------------------------------
   4. MENÚ RESPONSIVE (botón hamburguesa)
   --------------------------------------------------------- */

/**
 * Activa el botón hamburguesa para abrir y cerrar el menú en móvil.
 */
function configurarMenu() {
  const boton = document.getElementById("menuBoton");
  const navegacion = document.getElementById("navegacion");

  if (boton === null || navegacion === null) {
    return;
  }

  boton.addEventListener("click", function () {
    const estaAbierto = navegacion.classList.toggle("navegacion--abierta");

    // Actualizamos el atributo de accesibilidad aria-expanded (sin ternarios).
    if (estaAbierto === true) {
      boton.setAttribute("aria-expanded", "true");
      console.log("[app] Menú abierto.");
    } else {
      boton.setAttribute("aria-expanded", "false");
      console.log("[app] Menú cerrado.");
    }
  });

  // Al pulsar un enlace del menú, lo cerramos (útil en móvil).
  const enlaces = navegacion.querySelectorAll("a");
  for (let i = 0; i < enlaces.length; i++) {
    enlaces[i].addEventListener("click", function () {
      navegacion.classList.remove("navegacion--abierta");
      boton.setAttribute("aria-expanded", "false");
    });
  }
}

/* ---------------------------------------------------------
   5. CONTADOR DE ENTRENAMIENTO
   --------------------------------------------------------- */

/**
 * Configura el contador interactivo de golpes de entrenamiento.
 * Usa una variable propia para llevar la cuenta.
 */
function configurarContador() {
  const marcador = document.getElementById("contadorGolpes");
  const botonGolpe = document.getElementById("botonGolpe");
  const botonReset = document.getElementById("botonReset");

  if (marcador === null || botonGolpe === null || botonReset === null) {
    return;
  }

  let golpes = 0;

  // Sumar un golpe.
  botonGolpe.addEventListener("click", function () {
    golpes = golpes + 1;
    marcador.textContent = golpes;

    // Mensaje motivador cada 10 golpes (ejemplo de uso de if).
    if (golpes % 10 === 0) {
      console.log("[app] ¡Buen ritmo! Llevas " + golpes + " golpes.");
    }
  });

  // Reiniciar el contador a cero.
  botonReset.addEventListener("click", function () {
    golpes = 0;
    marcador.textContent = golpes;
    console.log("[app] Contador de golpes reiniciado.");
  });
}

/* ---------------------------------------------------------
   6. ESTADO DE CONEXIÓN
   --------------------------------------------------------- */

/**
 * Muestra en el pie si el usuario está conectado o sin conexión.
 * Importante de cara a la Parte 3 (PWA con funcionamiento offline).
 */
function configurarEstadoConexion() {
  const estado = document.getElementById("estadoConexion");
  if (estado === null) {
    return;
  }

  // Función interna que actualiza el texto y las clases según navigator.onLine.
  function actualizarEstado() {
    if (navigator.onLine === true) {
      estado.textContent = "Estado de conexión: en línea";
      estado.classList.add("pie__estado--online");
      estado.classList.remove("pie__estado--offline");
      console.log("[app] Conexión: en línea.");
    } else {
      estado.textContent = "Estado de conexión: sin conexión (modo offline)";
      estado.classList.add("pie__estado--offline");
      estado.classList.remove("pie__estado--online");
      console.log("[app] Conexión: sin conexión.");
    }
  }

  // Comprobamos al cargar y cada vez que cambia la conexión.
  actualizarEstado();
  window.addEventListener("online", actualizarEstado);
  window.addEventListener("offline", actualizarEstado);
}

/* ---------------------------------------------------------
   7. AÑO ACTUAL EN EL PIE
   --------------------------------------------------------- */

/**
 * Escribe el año actual en el pie de página de forma automática.
 */
function ponerAnioActual() {
  const elemento = document.getElementById("anioActual");
  if (elemento === null) {
    return;
  }
  const anio = new Date().getFullYear();
  elemento.textContent = anio;
}

/* ---------------------------------------------------------
   8. ARRANQUE
   --------------------------------------------------------- */

/**
 * Función de inicio: se ejecuta cuando el DOM está listo.
 * Llama a todas las funciones de configuración y renderizado.
 */
function iniciar() {
  console.log("[app] Iniciando la aplicación Acero y Honor…");

  crearTarjetasResumen();
  renderEspadas("todas"); // Al cargar mostramos todas las espadas.
  renderArmaduras();
  configurarFiltros();
  configurarMenu();
  configurarContador();
  configurarEstadoConexion();
  ponerAnioActual();

  console.log("[app] Aplicación lista.");
}

// Esperamos a que el HTML esté completamente cargado antes de manipularlo.
document.addEventListener("DOMContentLoaded", iniciar);
