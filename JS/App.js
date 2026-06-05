document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    //1. CONTROL DEL CARRUSEL (Scroll Infinito Fluido)
       //==========================================================================
    const carruselTrack = document.querySelector('.carrusel-track');
    if (carruselTrack) {
        // Clonamos los items del carrusel para asegurar que el scroll infinito no tenga saltos visuales
        const items = Array.from(carruselTrack.children);
        items.forEach(item => {
            const clon = item.cloneNode(true);
            carruselTrack.appendChild(clon);
        });
    }

    // ==========================================================================
    //2. GESTIÓN DEL MODAL DE RESEÑAS
       //==========================================================================

    const modal = document.getElementById('modal-formulario');
    const btnAbrir = document.getElementById('btn-abrir-formulario');
    const btnCerrar = document.querySelector('.btn-cerrar');
    const formReseña = document.getElementById('form-reseña');
    const fotoInput = document.getElementById('foto-producto');
    const fileNameSpan = document.getElementById('file-name');
    const contenedorReseñas = document.getElementById('contenedor-reseñas');

    // Base de datos local simulada en LocalStorage para evitar spam de teléfonos
    let telefonosRegistrados = JSON.parse(localStorage.getItem('telefonos_reseñas')) || [];
    let listaReseñas = JSON.parse(localStorage.getItem('lista_reseñas')) || [];

    // Mostrar nombre del archivo seleccionado en el input file
    if (fotoInput) {
        fotoInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                fileNameSpan.textContent = e.target.files[0].name;
            } else {
                fileNameSpan.textContent = "Ningún archivo seleccionado";
            }
        });
    }

    // Abrir y cerrar Modal
    if (btnAbrir && modal && btnCerrar) {
        btnAbrir.addEventListener('click', () => modal.style.display = 'flex');
        btnCerrar.addEventListener('click', () => cerrarModal());
        window.addEventListener('click', (e) => {
            if (e.target === modal) cerrarModal();
        });
    }

    function cerrarModal() {
        modal.style.display = 'none';
        formReseña.reset();
        fileNameSpan.textContent = "Ningún archivo seleccionado";
    }

    // Renderizar una tarjeta de reseña
    function renderizarReseña(reseña) {
        const tarjeta = document.createElement('article');
        tarjeta.classList.add('tarjeta-reseña');

        // Generar las estrellas doradas según la calificación
        let estrellasHTML = '';
        for (let i = 1; i <= 5; i++) {
            estrellasHTML += i <= reseña.calificacion 
                ? '<i class="fa-solid fa-star"></i>' 
                : '<i class="fa-regular fa-star"></i>';
        }

        // Estructura interna de la tarjeta
        tarjeta.innerHTML = `
            <h4 class="usuario-nombre">${reseña.nombre}</h4>
            <div class="estrellas">${estrellasHTML}</div>
            <p class="comentario-texto">"${reseña.comentario}"</p>
            ${reseña.foto ? `<img src="${reseña.foto}" alt="Producto reseñado por ${reseña.nombre}" class="foto-adjunta">` : ''}
        `;

        // Añadir al inicio del contenedor para mostrar primero las más recientes
        contenedorReseñas.insertBefore(tarjeta, contenedorReseñas.firstChild);
    }

    // Cargar reseñas guardadas al iniciar la página
    listaReseñas.forEach(reseña => renderizarReseña(reseña));

    // Procesar el envío del Formulario
    if (formReseña) {
        formReseña.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const calificacion = formReseña.elements['estrellas'].value;
            const comentario = document.getElementById('comentario').value.trim();
            const archivoFoto = fotoInput.files[0];

            // VALIDACIÓN ANTISPAM: Verificar si el teléfono ya comentó
            if (telefonosRegistrados.includes(telefono)) {
                alert('Lo sentimos, este número de teléfono ya ha registrado una reseña. ¡Agradecemos tu participación!');
                return;
            }

            // Función para guardar y estructurar la reseña final
            const guardarReseña = (fotoBase64 = null) => {
                const nuevaReseña = {
                    nombre,
                    calificacion: parseInt(calificacion),
                    comentario,
                    foto: fotoBase64
                };

                // Actualizar base de datos local
                telefonosRegistrados.push(telefono);
                listaReseñas.push(nuevaReseña);
                localStorage.setItem('telefonos_reseñas', JSON.stringify(telefonosRegistrados));
                localStorage.setItem('lista_reseñas', JSON.stringify(listaReseñas));

                // Pintar en pantalla y cerrar
                renderizarReseña(nuevaReseña);
                cerrarModal();
            };

            // Leer archivo de imagen si existe
            if (archivoFoto) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    guardarReseña(reader.result); // Pasa la imagen codificada en Base64
                };
                reader.readAsDataURL(archivoFoto);
            } else {
                guardarReseña();
            }
        });
    }

    // ==========================================================================
// ==========================================================================
    // 3. INTEGRACIÓN CON GOOGLE SHEETS & RENDER DINÁMICO DEL CATÁLOGO (POR ÍNDICES)
    // ==========================================================================
    const gridCatalogo = document.getElementById('grid-catalogo');
    const filtroTemperatura = document.getElementById('filtro-temperatura');
  

    // Función optimizada para traer los datos por posición de columna
    async function obtenerDatosSheets(){
        const url = "https://docs.google.com/spreadsheets/d/1jBVBe7FMg9jUbyVSlyezYXLSogS1lRinUnuVZ7ZUSMU/gviz/tq?tqx=out.json&gid=0";
     
        const res = await fetch(url);
        const text = await res.text();
     
        // Limpiar wrapper de Google
        const jsonString = text.replace("/*O_o*/\n", "") 
                               .replace("google.visualization.Query.setResponse(", "")
                               .slice(0, -2);
     
        const json = JSON.parse(jsonString);
     
        // Mapeamos las filas usando el índice de la celda en lugar del label de texto
        return json.table.rows.map(row => {
            return {
                nombre:      row.c[0] ? row.c[0].v : "Postre sin nombre",
                descripcion: row.c[1] ? row.c[1].v : "Sin descripción disponible.",
                peso:        row.c[2] ? row.c[2].v : null,
                dulzura:     row.c[3] ? row.c[3].v : 5,
                tipo:        row.c[4] ? row.c[4].v : "Frío",
                imagen:      row.c[5] ? row.c[5].v : "ejemplo-postre.jpg"
            };
        });
    }

    // Función encargada de pintar las tarjetas en el HTML
    function renderizarCatalogo(productos) {
        gridCatalogo.innerHTML = '';

        if(productos.length === 0) {
            gridCatalogo.innerHTML = '<p class="no-products">Cargando delicias de antaño...</p>';
            return;
        }

        productos.forEach(producto => {
            // Ahora las propiedades están limpias y normalizadas gracias al paso anterior
            const nombre = producto.nombre;
            const descripcion = producto.descripcion;
            const peso = producto.peso ? `${producto.peso}g` : "Tamaño familiar";
            const dulzura = parseInt(producto.dulzura) || 5;
            const tipo = producto.tipo.toLowerCase().trim();
            const imagenUrl = producto.imagen;

            const tarjeta = document.createElement('article');
            tarjeta.classList.add('tarjeta-producto');
            
            // Evaluamos rigurosamente si el texto contiene "caliente" o "cali" por si hay acentos
            const esCaliente = tipo.includes('caliente') || tipo.includes('cali');
            tarjeta.setAttribute('data-temperatura', esCaliente ? 'caliente' : 'frio');
            tarjeta.setAttribute('data-dulzura', dulzura);

            tarjeta.innerHTML = `
                <div class="producto-img-container">
                    <img src="${imagenUrl}" alt="${nombre}" onerror="this.src='ejemplo-postre.jpg';">
                </div>
                <div class="producto-info">
                    <h3 class="producto-titulo">${nombre}</h3>
                    <span class="producto-peso">${peso}</span>
                    <p class="producto-descripcion">${descripcion}</p>
                    <div class="producto-tags">
                        <span>${esCaliente ? 'Caliente' : 'Frío'}</span>
                        <span>Dulzura: ${dulzura}/10</span>
                    </div>
                    <button class="btn-contacto">Contáctanos</button>
                </div>
            `;

            gridCatalogo.appendChild(tarjeta);
        });

        // Aplicar filtros vigentes
        aplicarFiltros();
    }

    // Lógica de filtrado
    function aplicarFiltros() {
        const catSelected = filtroTemperatura.value; // 'todos', 'frio', 'caliente'
        const tarjetas = document.querySelectorAll('.tarjeta-producto');

        tarjetas.forEach(tarjeta => {
            const temp = tarjeta.getAttribute('data-temperatura');

            // Condición única de Temperatura
            const pasaTemperatura = (catSelected === 'todos' || temp === catSelected);

            if (pasaTemperatura) {
                tarjeta.style.display = 'flex';
            } else {
                tarjeta.style.display = 'none';
            }
        });
    }

    // Escuchador de eventos actualizado solo para la temperatura
    if (filtroTemperatura) {
        filtroTemperatura.addEventListener('change', aplicarFiltros);
    }

    async function cargarYActualizar() {
        try {
            datos = await obtenerDatosSheets();
            renderizarCatalogo(datos);
            console.log("Catálogo sincronizado mediante índices correctamente.");
        } catch(err) {
            console.error("Error al sincronizar el catálogo: ", err);
        }
    }

    cargarYActualizar();
    setInterval(cargarYActualizar, 5000);

}); // Fin del DOMContentLoaded