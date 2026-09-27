document.addEventListener('DOMContentLoaded', () => {

    // ===== SELLO / CARTA =====
    const sello = document.getElementById('sello');
    const carta = document.getElementById('carta');
    const invitacion = document.getElementById('invitacion');

    sello.addEventListener('click', () => {
        sello.classList.add('roto');
        carta.classList.add('cerrando');
        invitacion.classList.add('visible');

        setTimeout(() => {
            carta.style.display = 'none';
        }, 800);
    });

    // ===== MÚSICA DE FONDO =====
    const musica = document.getElementById('musica-fondo');
    const btnMusica = document.getElementById('btn-musica');

    sello.addEventListener('click', () => {
        musica.play().catch((error) => {
            console.log('No se pudo reproducir automáticamente:', error);
        });
        btnMusica.classList.add('visible');
    });

    btnMusica.addEventListener('click', () => {
        if (musica.paused) {
            musica.play();
            btnMusica.textContent = '🔊';
        } else {
            musica.pause();
            btnMusica.textContent = '🔇';
        }
    });

    // ===== COUNTDOWN =====
    const fechaBoda = new Date(2027, 3, 7, 15, 0, 0);

    function actualizarCountdown() {
        const ahora = new Date();
        const diferencia = fechaBoda - ahora;

        if (diferencia <= 0) {
            document.getElementById('dias').textContent = '00';
            document.getElementById('horas').textContent = '00';
            document.getElementById('minutos').textContent = '00';
            document.getElementById('segundos').textContent = '00';
            clearInterval(intervalo);
            return;
        }

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        document.getElementById('dias').textContent = String(dias).padStart(2, '0');
        document.getElementById('horas').textContent = String(horas).padStart(2, '0');
        document.getElementById('minutos').textContent = String(minutos).padStart(2, '0');
        document.getElementById('segundos').textContent = String(segundos).padStart(2, '0');
    }

    actualizarCountdown();
    const intervalo = setInterval(actualizarCountdown, 1000);

    // ===== SLIDESHOW DE FONDO =====
    const slides = document.querySelectorAll('.slide');
    let slideActual = 0;

    if (slides.length > 0) {
        setInterval(() => {
            slides[slideActual].classList.remove('activa');
            slideActual = (slideActual + 1) % slides.length;
            slides[slideActual].classList.add('activa');
        }, 4000);
    }

    // ===== PARALLAX POLAROIDS =====
    const polaroids = document.querySelectorAll('.polaroid');
    const seccionHistoria = document.getElementById('historia');

    if (polaroids.length > 0 && seccionHistoria) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const inicioSeccion = seccionHistoria.offsetTop;

            polaroids.forEach((polaroid) => {
                const velocidad = parseFloat(polaroid.dataset.velocidad);
                const desplazamiento = (scrollY - inicioSeccion) * velocidad;
                const rotacion = polaroid.classList.contains('polaroid-1') ? '-8deg' : '6deg';
                polaroid.style.transform = `translateY(${desplazamiento}px) rotate(${rotacion})`;
            });
        });
    }

    // ===== ESCARCHA CAYENDO =====
    const contenedorEscarcha = document.getElementById('escarcha-container');
    const cantidadParticulas = 40;

    for (let i = 0; i < cantidadParticulas; i++) {
        const particula = document.createElement('div');
        particula.classList.add('particula-escarcha');

        const tamano = Math.random() * 5 + 3;
        const posicionInicial = Math.random() * 100;
        const duracion = Math.random() * 6 + 5;
        const retraso = Math.random() * 8;

        particula.style.width = `${tamano}px`;
        particula.style.height = `${tamano}px`;
        particula.style.left = `${posicionInicial}%`;
        particula.style.animationDuration = `${duracion}s`;
        particula.style.animationDelay = `${retraso}s`;

        contenedorEscarcha.appendChild(particula);
    }

    // ===== ANIMACIÓN DE ÍCONOS AL HACER SCROLL =====
    const iconosAnimados = document.querySelectorAll('.icono-animado');

    if (iconosAnimados.length > 0 && 'IntersectionObserver' in window) {
        const observador = new IntersectionObserver((entradas) => {
            entradas.forEach((entrada, index) => {
                if (entrada.isIntersecting) {
                    // Pequeño retraso escalonado para que no aparezcan todos a la vez
                    setTimeout(() => {
                        entrada.target.classList.add('animar');
                    }, index * 80);
                    observador.unobserve(entrada.target);
                }
            });
        }, { threshold: 0.4 });

        iconosAnimados.forEach((icono) => observador.observe(icono));
    } else {
        // Si el navegador no soporta IntersectionObserver, se muestran directamente
        iconosAnimados.forEach((icono) => icono.classList.add('animar'));
    }

    // ===== FORMULARIO RSVP =====
    const URL_SCRIPT = 'https://script.google.com/macros/s/AKfycbz8C_rmtfn-2Q9NRt363q7vU-I3ceACKdj5RPwLo2s5-Ag1OzmcTuaGKCM09SeYYr8t/exec';

    const formRsvp = document.getElementById('form-rsvp');
    const mensajeRsvp = document.getElementById('mensaje-rsvp');

    let enviandoRsvp = false;

    formRsvp.addEventListener('submit', async (evento) => {
        evento.preventDefault();

        if (enviandoRsvp) return;

        const nombre = document.getElementById('nombre').value.trim();
        const apellido = document.getElementById('apellido').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const acompanantes = document.getElementById('acompanantes').value;

        if (!nombre || !apellido || !telefono || acompanantes === '') {
            mensajeRsvp.textContent = 'Por favor completa todos los campos.';
            mensajeRsvp.classList.add('error');
            return;
        }

        enviandoRsvp = true;

        const boton = formRsvp.querySelector('button');
        boton.disabled = true;
        boton.textContent = 'Enviando...';
        mensajeRsvp.textContent = '';
        mensajeRsvp.className = 'mensaje-rsvp';

        try {
            await fetch(URL_SCRIPT, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: JSON.stringify({ nombre, apellido, telefono, acompanantes }),
            });

            mensajeRsvp.textContent = `¡Gracias ${nombre}! Tu asistencia fue confirmada.`;
            mensajeRsvp.classList.add('exito');

            document.getElementById('modalGraciasTexto').textContent =
                `Gracias ${nombre}, tu asistencia fue confirmada con éxito.`;
            const modalGracias = new bootstrap.Modal(document.getElementById('modalGracias'));
            modalGracias.show();

            formRsvp.reset();

        } catch (error) {
            mensajeRsvp.textContent = 'Hubo un problema al enviar. Intenta de nuevo.';
            mensajeRsvp.classList.add('error');
            console.error(error);

        } finally {
            boton.disabled = false;
            boton.textContent = 'Confirmar asistencia';
            enviandoRsvp = false;
        }
    });

});