const express = require('express');
const app = express();

app.disable('x-powered-by');
const PORT = 3000;

app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});