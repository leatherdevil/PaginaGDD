document.addEventListener('DOMContentLoaded', function() {
    // Menú hamburguesa (código existente)
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu-navegacion');
    const cerrarMenu = document.querySelector('.cerrar-menu');
    const body = document.body;
    
    function toggleMenu() {
        menu.classList.toggle('active');
        body.classList.toggle('body-no-scroll');
        
        const lines = document.querySelectorAll('.hamburger-line');
        if(menu.classList.contains('active')) {
            lines[0].style.transform = 'rotate(45deg)';
            lines[1].style.opacity = '0';
            lines[2].style.transform = 'rotate(-45deg)';
        } else {
            lines[0].style.transform = 'rotate(0)';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'rotate(0)';
        }
    }
    
    hamburger.addEventListener('click', toggleMenu);
    cerrarMenu.addEventListener('click', toggleMenu);
    
    document.addEventListener('click', function(e) {
        if(menu.classList.contains('active') && 
           !e.target.closest('.menu-navegacion') && 
           !e.target.closest('.hamburger')) {
            toggleMenu();
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const imagenes = [
        "../media/imagenes/carousel1.jpg",
        "../media/imagenes/carousel2.jpg",
        "../media/imagenes/carousel3.jpg"
    ];
    
    const imagenDestacada = document.getElementById('imagen-destacada');
    const puntos = document.querySelectorAll('.punto');
    const flechaIzquierda = document.querySelector('.flecha-izquierda');
    const flechaDerecha = document.querySelector('.flecha-derecha');
    let imagenActual = 0;
    
    function cambiarImagen(n) {
        imagenActual = (n + imagenes.length) % imagenes.length;
        imagenDestacada.src = imagenes[imagenActual];
        
        puntos.forEach((punto, index) => {
            if (index === imagenActual) {
                punto.classList.add('activo');
            } else {
                punto.classList.remove('activo');
            }
        });
    }
    
    // Eventos para los puntos
    puntos.forEach((punto, index) => {
        punto.addEventListener('click', () => cambiarImagen(index));
    });
    
    // Evento para la imagen
    imagenDestacada.addEventListener('click', () => cambiarImagen(imagenActual + 1));
    
    // Eventos para las flechas
    flechaIzquierda.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita que el click llegue a la imagen
        cambiarImagen(imagenActual - 1);
    });
    
    flechaDerecha.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita que el click llegue a la imagen
        cambiarImagen(imagenActual + 1);
    });
    
    // Cambio automático (opcional)
    setInterval(() => cambiarImagen(imagenActual + 1), 5000);
});

document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                // Forzamos un reflow antes de aplicar la animación
                void entry.target.offsetWidth;
                entry.target.classList.add('animar-visible');
            } else {
                entry.target.classList.remove('animar-visible');
            }
        });
    }, {threshold: 0.1});

    document.querySelectorAll('.animar-titulo, .animar-item').forEach(el => {
        observer.observe(el);
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Resetear animación
                entry.target.style.animation = 'none';
                void entry.target.offsetWidth; // Trigger reflow
                entry.target.style.animation = '';
                
                entry.target.classList.add('animar-visible');
            }
        });
    }, {threshold: 0.05});

    // Observar tanto el título como las tarjetas
    const elementosAnimables = [
        ...document.querySelectorAll('.animar-titulo'),
        ...document.querySelectorAll('.animar-item')
    ];
    
    elementosAnimables.forEach(el => observer.observe(el));
});

