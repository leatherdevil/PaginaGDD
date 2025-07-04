document.addEventListener("DOMContentLoaded", function () {
  // ------- Menú hamburguesa ------- //
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.menu-navegacion');
  const cerrarMenu = document.querySelector('.cerrar-menu');

  function toggleMenu() {
    if (menu) {
      menu.classList.toggle('active');
    }
  }

  if (hamburger && cerrarMenu && menu) {
    hamburger.addEventListener('click', toggleMenu);
    cerrarMenu.addEventListener('click', toggleMenu);

    document.addEventListener('click', function(e) {
      if (
        menu.classList.contains('active') &&
        !e.target.closest('.menu-navegacion') &&
        !e.target.closest('.hamburger')
      ) {
        toggleMenu();
      }
    });
  }

  // ------- Carrusel de imágenes ------- //
  const imagenDestacada = document.getElementById("imagen-destacada");
  const miniaturas = document.querySelectorAll(".miniatura");
  const puntos = document.querySelectorAll(".punto");
  const flechaIzquierda = document.querySelector(".flecha-izquierda");
  const flechaDerecha = document.querySelector(".flecha-derecha");

  let imagenActual = 0;

  function cambiarImagen(index) {
    if (!miniaturas.length || !imagenDestacada || !puntos.length) return;

    imagenActual = (index + miniaturas.length) % miniaturas.length;
    imagenDestacada.src = miniaturas[imagenActual].src;

    puntos.forEach(punto => punto.classList.remove("activo"));
    puntos[imagenActual].classList.add("activo");
  }

  if (imagenDestacada && miniaturas.length > 0 && puntos.length > 0) {
    puntos.forEach((punto, index) => {
      punto.addEventListener("click", () => cambiarImagen(index));
    });

    imagenDestacada.addEventListener("click", () => {
      cambiarImagen(imagenActual + 1);
    });

    if (flechaIzquierda && flechaDerecha) {
      flechaIzquierda.addEventListener("click", (e) => {
        e.stopPropagation();
        cambiarImagen(imagenActual - 1);
      });

      flechaDerecha.addEventListener("click", (e) => {
        e.stopPropagation();
        cambiarImagen(imagenActual + 1);
      });
    }

    setInterval(() => cambiarImagen(imagenActual + 1), 5000);
  }

  // ------- Barra de búsqueda personalizada ------- //
  const productos = [
    { nombre: "Jabón Kuromi", link: "detalle-kuromi.html" },
    { nombre: "Jabón Melody", link: "detalle-melody.html" },
    { nombre: "Jabón Cinamoroll", link: "detalle-cinamoroll.html" },
    { nombre: "Jabón Hello Kitty", link: "detalle-hello-kitty.html" },
    { nombre: "Jabón Stitch", link: "detalle-stitch.html" },
    { nombre: "Jabón Carbón 150Gr", link: "detalle-carbon.html" },
    { nombre: "Jabón Arroz 150Gr", link: "detalle-arroz.html" },
    { nombre: "Jabón Caléndula 120Gr", link: "detalle-caléndula.html" },
    { nombre: "Jabón Café 150Gr", link: "detalle-cafe.html" },
    { nombre: "Jabón Lavanda 120Gr", link: "detalle-lavanda.html" },
    { nombre: "Jabón Aloe vera 150Gr", link: "detalle-aloe-vera.html" },
    { nombre: "Jabón Rosa mosqueta 120Gr", link: "detalle-rosa-mosqueta.html" },
    { nombre: "Jabón Avena y miel 120 Gr", link: "detalle-avena-miel.html" },
    { nombre: "Jabón Algas 150Gr", link: "detalle-algas.html" },
    { nombre: "Jabón Arcillas 120Gr", link: "detalle-arcillas.html" },
    { nombre: "Jabón Canela 150Gr", link: "detalle-canela.html" },
    { nombre: "Jabón Herbal 150Gr", link: "detalle-herbal.html" },
    { nombre: "Jabón Romero 150Gr", link: "detalle-romero.html" },
    { nombre: "Jabón Maracuyá 120Gr", link: "detalle-maracuyá.html" },
    { nombre: "Jabón Sandía 150Gr", link: "detalle-sandía.html" },
    { nombre: "Jabón Durazno 120Gr", link: "detalle-durazno.html" },
    { nombre: "Jabón Chontaduro 120Gr", link: "detalle-chontaduro.html" },
    { nombre: "Jabón Cúrcuma 150 Gr", link: "detalle-cúrcuma.html" },
    { nombre: "Kit Inicial", link: "detalle-kit-inicial.html" },
    { nombre: "Kit De temporada", link: "detalle-kit-de-temporada.html" },
    { nombre: "Kit Esencial", link: "detalle-kit-esencial.html" },
    { nombre: "Kit Aromas frutales", link: "detalle-kit-aromas-frutales.html" },
    { nombre: "Kit Medicinal", link: "detalle-kit-medicinal.html" },
    { nombre: "Kit Piel delicada", link: "detalle-kit-piel-delicada.html" },
    { nombre: "Sal Relajante Herbal", link: "detalle-sal-relajante-herbal.html" },
    { nombre: "Sal Relajante Lavanda", link: "detalle-sal-relajante-lavanda.html" },
    { nombre: "Sal Relajante Floral", link: "detalle-sal-relajante-floral.html" }
  ];

  const input = document.getElementById('buscador');
  const sugerenciasDiv = document.getElementById('sugerencias');

  if (input && sugerenciasDiv) {
    function normalizarTexto(texto) {
      return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    function filtrarProductos(query) {
      const q = normalizarTexto(query);
      return productos.filter(p => normalizarTexto(p.nombre).includes(q));
    }

    function mostrarSugerencias(lista) {
      sugerenciasDiv.innerHTML = '';

      if (lista.length === 0) {
        sugerenciasDiv.classList.remove('mostrar');
        return;
      }

      lista.forEach(p => {
        const div = document.createElement('div');
        div.textContent = p.nombre;
        div.classList.add('sugerencia');
        div.addEventListener('click', () => window.location.href = p.link);
        sugerenciasDiv.appendChild(div);
      });

      sugerenciasDiv.classList.add('mostrar');
    }

    input.addEventListener('input', () => {
      const texto = input.value.trim();
      if (texto.length < 2) {
        sugerenciasDiv.classList.remove('mostrar');
        return;
      }
      mostrarSugerencias(filtrarProductos(texto));
    });

    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const texto = input.value.trim();
        if (texto.length < 2) return;
        const resultados = filtrarProductos(texto);
        if (resultados.length > 0) window.location.href = resultados[0].link;
      }
      if (e.key === 'Escape') sugerenciasDiv.classList.remove('mostrar');
    });

    document.addEventListener('click', e => {
      if (!input.contains(e.target) && !sugerenciasDiv.contains(e.target)) {
        sugerenciasDiv.classList.remove('mostrar');
      }
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) sugerenciasDiv.classList.remove('mostrar');
    });
  }
});
