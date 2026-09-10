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

    // ===== FORMULARIO RSVP =====
    const URL_SCRIPT = 'https://script.google.com/macros/s/AKfycbz8C_rmtfn-2Q9NRt363q7vU-I3ceACKdj5RPwLo2s5-Ag1OzmcTuaGKCM09SeYYr8t/exec';

    const formRsvp = document.getElementById('form-rsvp');
    const mensajeRsvp = document.getElementById('mensaje-rsvp');

    formRsvp.addEventListener('submit', async (evento) => {
        evento.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const apellido = document.getElementById('apellido').value.trim();

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
                body: JSON.stringify({ nombre, apellido }),
            });

            mensajeRsvp.textContent = `¡Gracias ${nombre}! Tu asistencia fue confirmada.`;
            mensajeRsvp.classList.add('exito');
            formRsvp.reset();

        } catch (error) {
            mensajeRsvp.textContent = 'Hubo un problema al enviar. Intenta de nuevo.';
            mensajeRsvp.classList.add('error');
            console.error(error);

        } finally {
            boton.disabled = false;
            boton.textContent = 'Confirmar asistencia';
        }
    });

});