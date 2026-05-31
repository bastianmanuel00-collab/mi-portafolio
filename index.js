const formulario = document.getElementById('formulario-contacto');

formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    const nombreUsuario = document.getElementById('nombre').value;
    const emailUsuario = document.getElementById('email').value;
    const mensajeUsuario = document.getElementById('mensaje').value;

    const datosComentario = {
        seccion: "musica",
        autor: nombreUsuario,
        correo: emailUsuario,
        texto: mensajeUsuario
    };

    fetch('http://localhost:3000/api/comentarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosComentario)
    })
    .then(respuesta => respuesta.json())
    .then(data => {
        if (data.error) {
            alert("Error: " + data.error);
            return;
        }
        alert("¡Comentario enviado al foro con éxito!");
        formulario.reset();
        cargarComentarios();
    })
    .catch(error => {
        console.error("Hubo un error al conectar con el servidor:", error);
    });
});

function cargarComentarios() {
    document.querySelectorAll('.post.dinamico').forEach(p => p.remove());

    fetch('http://localhost:3000/api/comentarios')
        .then(respuesta => respuesta.json())
        .then(comentarios => {
            comentarios.forEach(comentario => {
                const tablonElemento = document.getElementById(comentario.seccion);

                if (tablonElemento) {
                    // ← FIX XSS: usamos textContent en vez de innerHTML
                    const nuevoPost = document.createElement('div');
                    nuevoPost.className = 'post dinamico';

                    const titulo = document.createElement('h3');
                    titulo.textContent = `👤 Autor: ${comentario.autor}`;

                    const texto = document.createElement('p');
                    const negrita = document.createElement('strong');
                    negrita.textContent = 'Comentario: ';
                    const contenido = document.createElement('span');
                    contenido.textContent = comentario.texto;
                    texto.appendChild(negrita);
                    texto.appendChild(contenido);

                    nuevoPost.appendChild(titulo);
                    nuevoPost.appendChild(texto);
                    tablonElemento.appendChild(nuevoPost);
                }
            });
        })
        .catch(error => console.error("Error al cargar comentarios:", error));
}

cargarComentarios();