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