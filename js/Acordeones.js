document.addEventListener('DOMContentLoaded', function() {
    // Acordeones para partes principales
    const partes = document.querySelectorAll('.gdd-parte .parte-header');
    
    partes.forEach(parte => {
        parte.addEventListener('click', () => {
            const parteContenido = parte.parentElement;
            parteContenido.classList.toggle('activo');
            
            // Cerrar otros acordeones si se desea
            // document.querySelectorAll('.gdd-parte').forEach(p => {
            //     if (p !== parteContenido) p.classList.remove('activo');
            // });
        });
    });
    
    // Acordeones para subsecciones
    const subsecciones = document.querySelectorAll('.subseccion .subseccion-header');
    
    subsecciones.forEach(sub => {
        sub.addEventListener('click', () => {
            const subContenido = sub.parentElement;
            subContenido.classList.toggle('activo');
        });
    });
    
    // Abrir la parte actual en el hash de la URL
    if (window.location.hash) {
        const parteActual = document.querySelector(window.location.hash);
        if (parteActual) {
            parteActual.classList.add('activo');
            
            // Asegurar que el padre también esté abierto si es una subsección
            if (parteActual.closest('.parte-contenido')) {
                parteActual.closest('.gdd-parte').classList.add('activo');
            }
        }
    }
});