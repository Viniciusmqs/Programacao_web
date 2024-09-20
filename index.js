const lc = require('./letter_case/letter_case')

// Importa o pacote express
const express = require('express');

// Cria um novo express app
const app = express();

const PORT = 8080;
app.listen(PORT, ()=> {
    console.log(`Servidor rodando na porta ${PORT}`);
});