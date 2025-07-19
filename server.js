const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
const port = 3000;


// Tornar a pasta 'view' pública
app.use(express.static(path.join(__dirname, 'view')));

// Tornar a pasta 'arquivos' pública para acesso aos arquivos
app.use('/arquivos', express.static(path.join(__dirname, 'arquivos')));

// Rota principal para servir index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'index.html'));
});




// Rotas para manipular preparations usando o controller
const { listarPreparations, adicionarPreparation, removerPreparationController } = require('./controller/controller');
app.get('/api/preparations', listarPreparations);
app.post('/api/preparations', adicionarPreparation);
app.delete('/api/preparations', removerPreparationController);

// Iniciar servidor 
app.listen(port, () => {
  console.log(`Servidor rodando em: http://localhost:${port}`);
});

