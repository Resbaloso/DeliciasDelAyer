# Sabores del ayer 🍰✨
> **Tradición, nostalgia y repostería artesanal en Bucaramanga.**

Bienvenido a **Sabores del ayer**, una landing page diseñada exclusivamente para exponer y resaltar la tradición de los postres y tortas colombianos. El objetivo principal de este sistema es servir como vitrina interactiva de alta fidelidad, permitiendo a los usuarios explorar el catálogo y dejar reseñas reales, mientras que la administración gestiona el inventario en tiempo real sin tocar una sola línea de código.

---

## 📸 Capturas del Proyecto

Aquí puedes visualizar el diseño y la interfaz del sistema:

### 1. Presentación de la Marca (Hero Banner)
![Presentación de la Marca - Sabores del ayer](/IMG/Landing.png)
*Sección principal donde se evoca la nostalgia y la tradición de la repostería local.*

### 2. Módulo de Reseñas Dinámicas
![Módulo de Comentarios - Tarjetas JS](/IMG/ModuloReseñas.png)
*Formulario interactivo y visualización de opiniones en tiempo real generadas mediante JavaScript.*

### 3. Catálogo Sincronizado en Tiempo Real
![Catálogo Dinámico - Google Sheets API](/IMG/FiltroCatalogo.png)
*Vitrina de productos dividida por categorías, conectada directamente a un dataset externo.*

---

## 🛠️ Descripción Práctica de los Módulos

El proyecto está construido bajo una arquitectura modular (HTML5, CSS3 Nativo y JavaScript Moderno) dividida en los siguientes componentes clave:

### 🌟 1. Módulo de Navegación e Identidad (Navbar & Hero)
* **Funcionamiento:** Una barra de navegación fija (`position: fixed`) que garantiza una navegación fluida hacia el inicio o el catálogo mediante anclajes internos.
* **Identidad Visual:** Incorpora un banner temático con un eslogan enfocado en la nostalgia y las recetas tradicionales colombianas. Incluye un breve relato de la trayectoria del negocio en Bucaramanga, destacando su factor diferenciador: la producción 100% artesanal.

### 🎠 2. Módulo de Exhibición (Carrusel Infinito)
* **Funcionamiento:** Un carrusel dinámico que expone 6 imágenes de productos destacados en un bucle continuo de movimiento. 
* **Interactividad:** Utiliza animaciones de CSS controladas por JS para pausarse de forma fluida cuando el usuario posa el cursor sobre una imagen. Al hacer clic en cualquier producto, el sistema redirige automáticamente al usuario a la sección del catálogo.

### ✍️ 3. Módulo de Reseñas Colectivas (Sistema Antispam)
* **Funcionamiento:** Al presionar el botón de acción principal, se despliega una ventana modal con un formulario integrado que solicita: Nombre, Teléfono, Calificación (sistema de 1 a 5 estrellas), Comentario y una foto del producto obtenido.
* **Lógica Antispam:** El script valida los números de teléfono utilizando almacenamiento local (`localStorage`). Si un usuario intenta enviar un segundo comentario con el mismo número, el sistema frena la acción para evitar el spam de valoraciones falsas.
* **Renderizado Dinámico:** Las reseñas aprobadas se transforman inmediatamente en tarjetas adaptadas a la paleta de colores corporativa y se inyectan en el DOM mediante JS (las más recientes aparecen primero). Las fotos adjuntas se procesan localmente usando `FileReader`.

### 📊 4. Módulo de Catálogo Automatizado (Google Sheets en Vivo)
* **Funcionamiento:** Este módulo rompe el esquema estático tradicional consumiendo los datos de una hoja de cálculo pública de Google Sheets a través de la API `/gviz/tq` (Google Visualization).
* **Sincronización:** Cada 5 segundos, una función asíncrona (`fetch`) consulta el archivo de Sheets de forma remota, limpia la envoltura de seguridad de Google y genera dinámicamente tarjetas HTML idénticas para cada postre.
* **Campos Soportados:** Nombre, Descripción, Peso (g), Dulzura (escala 1-10), Tipo (Frío/Caliente) y URL de Imagen.
* **Filtros:** Incluye un menú desplegable interactivo que filtra instantáneamente las tarjetas del DOM según su temperatura (Fríos o Calientes).

### 💬 5. Módulo de Cierre y Cotización (WhatsApp Flotante)
* **Funcionamiento:** Dado que la página web es netamente expositiva y **no realiza ventas directas**, toda la acción comercial se canaliza a un botón flotante perenne de WhatsApp.
* **Interactividad:** Cuenta con un *tooltip* informativo visible que invita explícitamente a cotizar y notifica de manera clara que la empresa opera bajo **horarios de oficina**, optimizando las expectativas de atención del cliente.

---

## 🎨 Especificaciones de Diseño (Paleta de Colores)

Para mantener la estética dulce, artesanal y nostálgica, el proyecto utiliza estrictamente variables CSS basadas en la siguiente guía de estilo:

* **Color Principal:** `Rosa Pastel Dulce (#F4D7D4)`
* **Color de Acompañamiento:** `Crema Vainilla (#FDF6EC)`
* **Color de Contraste:** `Café Avellana / Tostado (#8C624E)`
* **Color de Acento:** `Trigo Suave (#EAD5C3)`

---

## 🚀 Instalación y Uso

1. Clona este repositorio o descarga los archivos fuente (`index.html`, `styles.css`, `script.js`).
2. Abre el archivo `index.html` en cualquier navegador web moderno.
3. Puedes modificar el catalogo desde este google sheet https://docs.google.com/spreadsheets/d/1jBVBe7FMg9jUbyVSlyezYXLSogS1lRinUnuVZ7ZUSMU/edit?usp=sharing
4. *¡Listo! El catálogo comenzará a actualizarse automáticamente con los datos del Google Sheet.*