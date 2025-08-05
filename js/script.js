document.addEventListener('DOMContentLoaded', function() {
    // --- Funcionalidad del menú hamburguesa ---
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.menu-mobile');

    if (hamburgerMenu && mobileMenu) {
        // Función para alternar las clases 'open' y controlar el scroll del body
        const toggleMenu = () => {
            hamburgerMenu.classList.toggle('open');
            mobileMenu.classList.toggle('open');
            if (mobileMenu.classList.contains('open')) {
                document.body.style.overflow = 'hidden'; // Evita el scroll del body cuando el menú está abierto
            } else {
                document.body.style.overflow = ''; // Restaura el scroll del body
            }
        };

        hamburgerMenu.addEventListener('click', toggleMenu);

        // Cerrar el menú móvil al hacer clic en un enlace
        const menuLinks = document.querySelectorAll('.menu-mobile nav ul li a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Solo cerrar el menú si está abierto
                if (mobileMenu.classList.contains('open')) {
                    toggleMenu(); // Usa la función toggle para cerrar y restaurar el scroll
                }
            });
        });
    }

    // --- Funcionalidad de Lightbox para ampliación de imágenes ---
    const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');
    let lightboxOverlay = document.querySelector('.lightbox-overlay'); // Intentar seleccionar si ya existe
    let lightboxContent;
    let lightboxImg;
    let lightboxCloseBtn;

    // Crear el lightbox dinámicamente si no existe en el HTML
    if (!lightboxOverlay) {
        lightboxOverlay = document.createElement('div');
        lightboxOverlay.classList.add('lightbox-overlay');
        lightboxOverlay.innerHTML = `
            <div class="lightbox-content">
                <img>
                <button class="lightbox-close">&times;</button>
            </div>
        `;
        document.body.appendChild(lightboxOverlay);
        // Volver a seleccionar los elementos una vez creados
        lightboxContent = lightboxOverlay.querySelector('.lightbox-content');
        lightboxImg = lightboxContent.querySelector('img');
        lightboxCloseBtn = lightboxOverlay.querySelector('.lightbox-close');
    } else {
        // Si el lightbox ya existe en el HTML, seleccionamos sus partes
        lightboxContent = lightboxOverlay.querySelector('.lightbox-content');
        lightboxImg = lightboxContent.querySelector('img');
        lightboxCloseBtn = lightboxOverlay.querySelector('.lightbox-close');
    }

    lightboxTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(event) {
            event.preventDefault(); // Evita que el navegador navegue a la imagen directamente

            const imageSrc = this.getAttribute('href'); // Obtiene la URL de la imagen del href del <a>
            lightboxImg.src = imageSrc; // Establece la fuente de la imagen en el lightbox

            lightboxOverlay.classList.add('active'); // Muestra el lightbox
            document.body.style.overflow = 'hidden'; // Evita el scroll de la página de fondo
        });
    });

    // Función para cerrar el lightbox
    function closeLightbox() {
        lightboxOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restaura el scroll de la página
        lightboxImg.src = ''; // Limpia la imagen para liberar memoria
    }

    // Cerrar el lightbox al hacer clic en el overlay o en el botón de cerrar
    lightboxOverlay.addEventListener('click', function(event) {
        // Cierra si se hace clic directamente en el overlay o en el botón de cerrar
        if (event.target === lightboxOverlay || event.target === lightboxCloseBtn) {
            closeLightbox();
        }
    });

    // Cerrar el lightbox con la tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && lightboxOverlay.classList.contains('active')) {
            closeLightbox();
        }
    });

    // Ajustes para el botón de WhatsApp
    const whatsappButton = document.querySelector('.btn-whatsapp');
    if (whatsappButton) {
        whatsappButton.addEventListener('mouseenter', () => {
            const tooltip = whatsappButton.querySelector('.tooltip-whatsapp');
            if (tooltip) tooltip.style.visibility = 'visible';
        });
        whatsappButton.addEventListener('mouseleave', () => {
            const tooltip = whatsappButton.querySelector('.tooltip-whatsapp');
            if (tooltip) tooltip.style.visibility = 'hidden';
        });
    }
});