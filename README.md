# Acero y Honor · Combate Medieval (PWA)
URL de la pagina de GitHubPages: https://david-ifc.github.io/ModuloFormativo3/
Aplicación web tipo **PWA** (Progressive Web App) sobre combate medieval:
tipos de **espadas**, **armaduras** y **técnicas de combate**. Está construida
únicamente con **HTML, CSS y JavaScript puro** (sin frameworks ni librerías).

---

## ✨ Características

- **Diseño responsive** (enfoque *mobile first*) adaptado a móvil, tablet y escritorio.
- **Contenido dinámico** generado con JavaScript a partir de un fichero de datos.
- **Filtros** de espadas por tipo (una mano, dos manos, estoque).
- **Contador de entrenamiento** interactivo.
- **Indicador de estado de conexión** (en línea / sin conexión).
- **Instalable como app** y con **funcionamiento offline** gracias al service worker.
- Código **comentado**, con `console.log` en los puntos importantes y sin operadores ternarios (se usan `if/else` y bucles `for`).
- Todas las imágenes incluyen el atributo `alt` (los SVG usan `aria-label`).

---

## 📁 Estructura del proyecto

```
ModuloFormativo3/
├── index.html              # Estructura y contenido de la página
├── manifest.json           # Configuración de la PWA (nombre, iconos, colores)
├── sw.js                   # Service worker (caché y modo offline)
├── css/
│   └── estilos.css         # Estilos y diseño responsive
├── js/
│   ├── datos.js            # Datos de espadas, armaduras y tarjetas resumen
│   ├── app.js              # Lógica principal (render, filtros, menú, contador…)
│   └── registro-sw.js      # Registro del service worker
└── img/                    # Imágenes e iconos en formato SVG
```

---

## ⚙️ Cómo funciona

### 1. Estructura (HTML) — `index.html`
Define las secciones de la web: cabecera con menú, portada (*hero*),
introducción, espadas, armaduras y técnicas de combate. Las zonas de contenido
dinámico están vacías en el HTML y se rellenan con JavaScript; cada una tiene un
`id` (por ejemplo `rejillaEspadas` o `rejillaArmaduras`) que el código usa para
localizarlas.

### 2. Estilos (CSS) — `css/estilos.css`
Aplica el diseño con una paleta medieval (tonos oscuros, dorado y acero).
Usa **variables CSS** para los colores y un enfoque **mobile first**: primero se
definen los estilos para móvil y luego, mediante `@media (min-width: …)`, se
adaptan a tablet (≥600px) y escritorio (≥900px). En escritorio el menú
hamburguesa se oculta y la navegación se muestra en horizontal.

### 3. Datos — `js/datos.js`
Centraliza la información en arrays de objetos (`ESPADAS`, `ARMADURAS` y
`TARJETAS_RESUMEN`). Separar los datos de la lógica permite añadir o modificar
contenido sin tocar el resto del código.

### 4. Lógica — `js/app.js`
Cuando el documento está listo (`DOMContentLoaded`), la función `iniciar()`:

1. Genera las **tarjetas resumen** de la introducción.
2. Pinta las **espadas** y las **armaduras** creando los elementos del DOM.
3. Activa los **filtros** de espadas (al pulsar uno, se vuelve a pintar la rejilla).
4. Configura el **menú hamburguesa** para móvil.
5. Pone en marcha el **contador de entrenamiento**.
6. Muestra el **estado de conexión** y escribe el **año actual** en el pie.

Toda la lógica condicional usa `if/else` y los recorridos usan bucles `for`
(sin operadores ternarios), y hay mensajes `console.log` en los puntos clave.

### 5. PWA — `manifest.json`, `sw.js` y `js/registro-sw.js`
- `manifest.json` describe la app (nombre, iconos, colores) para que el
  navegador permita **instalarla**.
- `registro-sw.js` registra el service worker si el navegador lo admite.
- `sw.js` usa una estrategia **cache-first**: en la instalación guarda todos los
  archivos en caché y, en cada petición, los sirve desde la caché. Así la web
  **funciona sin conexión**.

---

## ▶️ Cómo ejecutar el proyecto

> ⚠️ El service worker **necesita servirse por HTTP(S)**; no funciona abriendo el
> archivo con doble clic (`file://`).

1. Abre una terminal en la carpeta del proyecto.
2. Lanza un servidor local. Por ejemplo, con Python:
   ```bash
   python -m http.server 8000
   ```
   O con Node.js:
   ```bash
   npx serve
   ```
3. Abre el navegador en `http://localhost:8000`.

### Probar el modo offline
1. Abre las **DevTools** (F12) → pestaña **Application**.
2. Comprueba que el **Service Worker** está activo y que existe el **Manifest**.
3. Marca la casilla **Offline** y recarga: la web seguirá funcionando.

---

## 🛠️ Tecnologías

- HTML5
- CSS3 (variables, grid, flexbox, media queries)
- JavaScript (ES5/ES6 sin frameworks)
- PWA: Web App Manifest + Service Worker

---

## 📚 Nota

Proyecto educativo desarrollado para el **Módulo Formativo 3**. El contenido
histórico es divulgativo y está simplificado con fines didácticos.
