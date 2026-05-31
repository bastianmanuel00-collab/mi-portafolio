// 1. Buscamos el formulario en el HTML usando su ID
const formulario = document.getElementById('formulario-contacto');

// 2. Le decimos al formulario que escuche cuando alguien haga clic en "Enviar"
formulario.addEventListener('submit', function(event) {
    // Detiene el reinicio automático de la página que hace el navegador por defecto
    event.preventDefault();

    // 3. Capturamos los valores que escribió el usuario en las casillas
    const nombreUsuario = document.getElementById('nombre').value;
    const emailUsuario = document.getElementById('email').value;

    // 4. Mostramos una alerta emergente personalizada con sus datos
    alert("¡Muchas gracias por tu mensaje, " + nombreUsuario + "! Te responderé pronto a tu correo: " + emailUsuario);

    // 5. Limpiamos el formulario para que quede vacío otra vez
    formulario.reset();
});
