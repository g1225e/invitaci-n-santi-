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