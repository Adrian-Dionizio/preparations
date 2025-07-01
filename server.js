const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Tornar a pasta 'view' pública
app.use(express.static(path.join(__dirname, 'view')));

// Rota principal para servir index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em: http://localhost:${port}`);
});

