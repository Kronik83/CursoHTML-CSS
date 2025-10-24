// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los headers del acordeón
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    // Agregar event listener a cada header
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const currentItem = this.parentElement;
            const currentContent = currentItem.querySelector('.accordion-content');
            const isActive = currentItem.classList.contains('active');
            
            // Cerrar todos los acordeones abiertos
            closeAllAccordions();
            
            // Si el acordeón actual no estaba activo, abrirlo
            if (!isActive) {
                openAccordion(currentItem, currentContent, this);
            }
        });
    });
    
    // Función para cerrar todos los acordeones
    function closeAllAccordions() {
        const allItems = document.querySelectorAll('.accordion-item');
        const allContents = document.querySelectorAll('.accordion-content');
        const allHeaders = document.querySelectorAll('.accordion-header');
        
        allItems.forEach(item => {
            item.classList.remove('active');
        });
        
        allContents.forEach(content => {
            content.classList.remove('active');
            content.style.display = 'none';
        });
        
        allHeaders.forEach(header => {
            header.classList.remove('active');
        });
    }
    
    // Función para abrir un acordeón específico
    function openAccordion(item, content, header) {
        // Agregar clases activas
        item.classList.add('active');
        header.classList.add('active');
        
        // Mostrar el contenido con animación
        content.style.display = 'block';
        
        // Pequeño delay para que la animación CSS funcione correctamente
        setTimeout(() => {
            content.classList.add('active');
        }, 10);
        
        // Scroll suave hacia el acordeón abierto
        setTimeout(() => {
            item.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 300);
    }
    
    // Función para abrir un módulo específico por número
    function openModule(moduleNumber) {
        const header = document.querySelector(`[data-module="${moduleNumber}"]`);
        if (header) {
            header.click();
        }
    }
    
    // Hacer la función disponible globalmente
    window.openModule = openModule;
    
    // Agregar funcionalidad de teclado para accesibilidad
    accordionHeaders.forEach(header => {
        // Hacer los headers focusables
        header.setAttribute('tabindex', '0');
        header.setAttribute('role', 'button');
        header.setAttribute('aria-expanded', 'false');
        
        // Agregar event listener para teclas
        header.addEventListener('keydown', function(e) {
            // Activar con Enter o Espacio
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Actualizar aria-expanded cuando se abra/cierre
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const header = mutation.target.querySelector('.accordion-header');
                if (header) {
                    const isActive = mutation.target.classList.contains('active');
                    header.setAttribute('aria-expanded', isActive.toString());
                }
            }
        });
    });
    
    // Observar cambios en las clases de los items del acordeón
    document.querySelectorAll('.accordion-item').forEach(item => {
        observer.observe(item, {
            attributes: true,
            attributeFilter: ['class']
        });
    });
    
    // Función para mostrar estadísticas del curso
    function showCourseStats() {
        const totalModules = accordionHeaders.length;
        const estimatedHours = totalModules * 2; // Estimación de 2 horas por módulo
        
        console.log(`📚 Estadísticas del Curso:`);
        console.log(`• Total de módulos: ${totalModules}`);
        console.log(`• Tiempo estimado: ${estimatedHours} horas`);
        console.log(`• Nivel: Principiante a Intermedio`);
        console.log(`• Tecnologías: HTML5, CSS3`);
    }
    
    // Mostrar estadísticas en consola
    showCourseStats();
    
    // Agregar indicador de progreso (opcional)
    function createProgressIndicator() {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';
        progressContainer.innerHTML = `
            <div class="progress-info">
                <span class="progress-text">Progreso del curso</span>
                <span class="progress-counter">0/${accordionHeaders.length}</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
        `;
        
        // Insertar después del header
        const header = document.querySelector('.header');
        header.insertAdjacentElement('afterend', progressContainer);
    }
    
    // Función para manejar el smooth scroll mejorado
    function smoothScrollToElement(element, offset = 100) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
    
    // Mejorar el scroll al abrir acordeones
    function improveScrollBehavior() {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                setTimeout(() => {
                    smoothScrollToElement(this.parentElement, 80);
                }, 350);
            });
        });
    }
    
    // Activar mejoras
    improveScrollBehavior();
    
    // Easter egg: Konami code para abrir todos los módulos
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        konamiCode = konamiCode.slice(-10);
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Abrir todos los módulos con delay
            accordionHeaders.forEach((header, index) => {
                setTimeout(() => {
                    if (!header.classList.contains('active')) {
                        header.click();
                    }
                }, index * 200);
            });
            
            console.log('🎉 ¡Código Konami activado! Todos los módulos se están abriendo...');
            konamiCode = [];
        }
    });
});