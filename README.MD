# Sabores del ayer 🍰✨
> **Tradición, nostalgia y repostería artesanal en Bucaramanga.**

Bienvenido a **Sabores del ayer**, una landing page diseñada exclusivamente para exponer y resaltar la tradición de los postres y tortas colombianos. El objetivo principal de este sistema es servir como vitrina interactiva de alta fidelidad, permitiendo a los usuarios explorar el catálogo y dejar reseñas reales, mientras que la administración gestiona el inventario en tiempo real sin tocar una sola línea de código.

---

## 💻 PROMPT INICIAL PARA LA CREACIÓN DEL PROYECTO USANDO LA INTELIGENCIA ARTIFICIAL STITCH:

`Requiero un prototipo de pagina web para mostrar a un cliente.
El nombre de su negocio es "Delicias del ayer", es una panadería ubicada en Bucaramanga centrada en tortas y postres. Quiero que tengas muy presente que el cliente busca más bien una pagina para mostrar y exponer sus productos, no una pagina para vender desde ella. No quiere colores corporativos, más bien tonos calidos y pasteles para su paleta de colores. Requiere un logo, todo este proyecto busca evocar sensaciones en las personas.
La estructura es la de una landing page, debe tener una barra de navegación que permita ir al inicio y al catalogo.
En el inicio debe haber un icono del logo en la esquina superior izquierda, más abajo en la pagina un banner temático que tenga un slogan que se relacione con el nombre, la nostalgia y la tradición en la creación de postres y tortas colombianos.
Más abajo un breve texto que narre su trayectoria, sus años de experiencia y un factor diferenciador.
Seguido de ello se requiere un carrusel que muestre algunos productos en movimiento, dichos productos deben ser coherentes con la marca y lo que representa. La marca maneja postres y tortas tradicionales de Colombia, quiero que tengas este contexto cada que debas añadir productos. Además al clickear estos productos, debe redirigir a la pestaña de catalogo, la misma de la barra de navegación.
A continuación quiere un botón que sea notable y que incite a la acción. La función de este botón es abrir un formulario que permita dejar una reseña del negocio, con estrellas del 1 al 5. Quiere asegurarse de que estas reseñas se vean reales y que se vayan generando a medida que la gente comente, esto en forma de tarjetas respetando la paleta de colores y el estilo de la pagina. El formulario pedirá a la persona, un nombre, un numero de teléfono que debe verificarse para comentar y que no se puede repetir en más comentarios para evitar el spam y permitir adjuntar una foto del producto comentado. Debe permitir añadir fotos del producto reseñado de 1 a 3 maximo. Me gustaría que ya estén implementados al menos 3 comentarios y que las imagenes de estas reseñas generadas tengan fotos del producto que se vean como las que una persona normal pueda tomar en su día a día en una visita a la panadería.
Quisiera un botón flotante que permita redirigir inmediatamente al whatsapp de la empresa, y que diga "Para cotizar click aquí" o algo que incite a la acción. Puesto que los pedidos se reciben por whatsapp. Y que indique que los horarios manejados por la empresa, son horarios de oficina.
Y en la parte final, un footer con el nombre de la empresa el copyright y las redes sociales, instagram, facebook, whatsapp y tik tok.
Para la pestaña de catalogo, no se quieren precios en sus artículos así pues, las descripciones de los productos deben generar sensaciones (No se quieren descripciones simples de ingredientes sin más. Se quieren descripciones que evoquen deseo, recuerdos y sensaciones), los productos estar clasificados entre fríos y calientes. Y contener una sub clasificación en la descripción individual de cada producto que dicte del 1 al 5 con iconos qué tan dulce, salado o ácido es el postre, también en el catalogo de productos debe haber un filtro que permita filtrar qué tan dulce o salado y acido sean los postres. Los postres y tortas requieren decir su tamaño en libras en el caso de torta y gramos en caso de postres más pequeños. `

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
