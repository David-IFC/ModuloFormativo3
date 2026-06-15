/* =========================================================
   REGISTRO DEL SERVICE WORKER · Acero y Honor
   Comprueba si el navegador admite service workers y, si es
   así, registra sw.js para activar el modo PWA / offline.
   ========================================================= */

/**
 * Registra el service worker cuando la página termina de cargar.
 * Se comprueba primero la compatibilidad del navegador.
 */
function registrarServiceWorker() {
  // No todos los navegadores admiten service workers (sin ternarios).
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then(function (registro) {
      console.log("[registro-sw] Service worker registrado con éxito. Ámbito:", registro.scope);
    }).catch(function (error) {
      console.error("[registro-sw] Error al registrar el service worker:", error);
    });
  } else {
    console.warn("[registro-sw] Este navegador no admite service workers.");
  }
}

// Registramos el SW una vez cargada la página para no ralentizar el arranque.
window.addEventListener("load", registrarServiceWorker);
