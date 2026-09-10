// Esperamos a que todo el HTML esté cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    const sello = document.getElementById('sello');
    const carta = document.getElementById('carta');
    const invitacion = document.getElementById('invitacion');

    sello.addEventListener('click', () => {
        // 1. Animar el sello "rompiéndose"
        sello.classList.add('roto');

        // 2. Empezar a desvanecer la carta
        carta.classList.add('cerrando');

        // 3. Mostrar la invitación
        invitacion.classList.add('visible');

        // 4. Esperar a que termine la animación (0.8s) antes de eliminar
        //    la carta del todo, para que no estorbe
        setTimeout(() => {
            carta.style.display = 'none';
        }, 800);
    });

        // ===== FORMULARIO RSVP =====

    const URL_SCRIPT = 'https://script.google.com/macros/s/AKfycbz8C_rmtfn-2Q9NRt363q7vU-I3ceACKdj5RPwLo2s5-Ag1OzmcTuaGKCM09SeYYr8t/exec';

    const formRsvp = document.getElementById('form-rsvp');
    const mensajeRsvp = document.getElementById('mensaje-rsvp');

    formRsvp.addEventListener('submit', async (evento) => {
        // Evita que el formulario recargue la página (comportamiento por defecto de un <form>)
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
                mode: 'no-cors', // necesario para Apps Script; ver explicación abajo
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: JSON.stringify({ nombre, apellido }),
            });

            // Como 'no-cors' no nos deja leer la respuesta real,
            // asumimos éxito si fetch no lanzó un error de red
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

    // ===== COUNTDOWN =====

    // Fecha objetivo: 7 de abril de 2027, 3:00 PM
    // Ojo: en JS los meses van de 0 a 11, entonces abril = 3 (no 4)
    const fechaBoda = new Date(2027, 3, 7, 15, 0, 0);

    function actualizarCountdown() {
        const ahora = new Date();
        const diferencia = fechaBoda - ahora; // diferencia en milisegundos

        if (diferencia <= 0) {
            // Si ya llegó o pasó la fecha, mostramos ceros y paramos
            document.getElementById('dias').textContent = '00';
            document.getElementById('horas').textContent = '00';
            document.getElementById('minutos').textContent = '00';
            document.getElementById('segundos').textContent = '00';
            clearInterval(intervalo);
            return;
        }

        // Convertir milisegundos a días, horas, minutos, segundos
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        // Actualizar el HTML (con padStart para que siempre tenga 2 dígitos, ej "05" en vez de "5")
        document.getElementById('dias').textContent = String(dias).padStart(2, '0');
        document.getElementById('horas').textContent = String(horas).padStart(2, '0');
        document.getElementById('minutos').textContent = String(minutos).padStart(2, '0');
        document.getElementById('segundos').textContent = String(segundos).padStart(2, '0');
    }

    // Ejecutar una vez de inmediato (para no esperar 1 segundo al cargar)
    actualizarCountdown();

    // Y luego repetir cada 1000ms (1 segundo)
    const intervalo = setInterval(actualizarCountdown, 1000);

        // ===== SLIDESHOW DE FONDO =====

    const slides = document.querySelectorAll('.slide');
    let slideActual = 0;

    function siguienteSlide() {
        slides[slideActual].classList.remove('activa');
        slideActual = (slideActual + 1) % slides.length; // vuelve a 0 al llegar al final
        slides[slideActual].classList.add('activa');
    }

    setInterval(siguienteSlide, 4000); // cambia cada 4 segundos

        // ===== PARALLAX POLAROIDS =====

    const polaroids = document.querySelectorAll('.polaroid');
    const seccionHistoria = document.getElementById('historia');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const inicioSeccion = seccionHistoria.offsetTop;

        polaroids.forEach((polaroid) => {
            const velocidad = parseFloat(polaroid.dataset.velocidad);
            // Calculamos cuánto ha scrolleado el usuario DENTRO de esta sección
            const desplazamiento = (scrollY - inicioSeccion) * velocidad;
            polaroid.style.transform = `translateY(${desplazamiento}px) ${polaroid.classList.contains('polaroid-1') ? 'rotate(-8deg)' : 'rotate(6deg)'}`;
        });
    });
});

    