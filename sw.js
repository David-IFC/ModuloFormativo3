/* =========================================================
   SERVICE WORKER · Acero y Honor (Combate Medieval)
   Permite que la PWA funcione sin conexión guardando los
   archivos en caché (estrategia "cache-first").
   Nota: igual que en el resto del proyecto, se evitan los
   operadores ternarios; se usan if/else.
   ========================================================= */

// Nombre y versión de la caché. Cambiar la versión fuerza una actualización.
const NOMBRE_CACHE = "acero-y-honor-v2";

// Lista de archivos que se guardan para el uso offline.
const ARCHIVOS = [
  "./",
  "./index.html",
  "./css/estilos.css",
  "./js/datos.js",
  "./js/app.js",
  "./js/registro-sw.js",
  "./manifest.json",
  "./img/escudo.svg",
  "./img/guardia.svg",
  "./img/estocada.svg",
  "./img/escudo-defensa.svg",
  "./img/espada-arming.svg",
  "./img/espada-larga.svg",
  "./img/espada-bastarda.svg",
  "./img/mandoble.svg",
  "./img/estoque-arma.svg",
  "./img/sable.svg",
  "./img/cota-malla.svg",
  "./img/armadura-placas.svg",
  "./img/gambeson.svg",
  "./img/brigantina.svg",
  "./img/icono-192.svg",
  "./img/icono-512.svg",
  "./img/icono-192.png",
  "./img/icono-512.png"
];

/*
 * Evento INSTALL: se dispara al instalar el service worker.
 * Abrimos la caché y guardamos todos los archivos de la lista.
 */
self.addEventListener("install", function (evento) {
  console.log("[sw] Instalando service worker…");

  evento.waitUntil(
    caches.open(NOMBRE_CACHE).then(function (cache) {
      console.log("[sw] Guardando archivos en caché:", ARCHIVOS.length);
      return cache.addAll(ARCHIVOS);
    })
  );

  // Activa el nuevo service worker sin esperar a que se cierren las pestañas.
  self.skipWaiting();
});

/*
 * Evento ACTIVATE: se dispara al activarse.
 * Borramos cachés antiguas que ya no usamos.
 */
self.addEventListener("activate", function (evento) {
  console.log("[sw] Activando service worker…");

  evento.waitUntil(
    caches.keys().then(function (claves) {
      const borrados = [];

      for (let i = 0; i < claves.length; i++) {
        const clave = claves[i];

        // Si la caché no es la actual, la eliminamos (sin ternarios).
        if (clave !== NOMBRE_CACHE) {
          console.log("[sw] Eliminando caché antigua:", clave);
          borrados.push(caches.delete(clave));
        }
      }

      return Promise.all(borrados);
    })
  );

  // Toma el control de las páginas abiertas inmediatamente.
  self.clients.claim();
});

/*
 * Evento FETCH: intercepta las peticiones de red.
 * Estrategia "cache-first": si el archivo está en caché lo devolvemos;
 * si no, lo pedimos a la red.
 */
self.addEventListener("fetch", function (evento) {
  evento.respondWith(
    caches.match(evento.request).then(function (respuestaCache) {
      // Si encontramos el recurso en caché, lo devolvemos directamente.
      if (respuestaCache) {
        return respuestaCache;
      }

      // Si no está en caché, lo pedimos a la red.
      return fetch(evento.request).catch(function () {
        // Si falla la red (sin conexión), devolvemos la página principal
        // para las navegaciones; así la PWA no muestra el error del navegador.
        if (evento.request.mode === "navigate") {
          return caches.match("./index.html");
        }
      });
    })
  );
});
