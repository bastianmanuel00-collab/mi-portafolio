const express = require('express');
const app = express();

app.disable('x-powered-by');
const PORT = 3000;

app.use(express.json());

let comentariosForo = [
    { seccion: "musica", autor: "Admin", texto: "¡Bienvenidos al tablón de música!" }
];

app.get('/api/comentarios', (req, res) => {
    res.json(comentariosForo);
});

app.post('/api/comentarios', (req, res) => {
    // ← FIX: límite de comentarios
    if (comentariosForo.length >= 100) {
        return res.status(429).json({ error: "Límite de comentarios alcanzado" });
    }

    // ← FIX: validar que no vengan vacíos
    if (!req.body.autor || !req.body.texto || !req.body.seccion) {
        return res.status(400).json({ error: "Faltan datos" });
    }

    // ← FIX: limitar largo del texto
    if (req.body.texto.length > 500) {
        return res.status(400).json({ error: "Comentario muy largo, máximo 500 caracteres" });
    }

    const nuevoComentario = {
        seccion: req.body.seccion,
        autor: req.body.autor.slice(0, 50), // máximo 50 caracteres
        texto: req.body.texto.slice(0, 500)
    };

    comentariosForo.push(nuevoComentario);
    res.status(201).json({ mensaje: "Comentario guardado con éxito", comentario: nuevoComentario });
});

app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo con éxito en http://localhost:${PORT}`);
});