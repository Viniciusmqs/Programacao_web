const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'segredo',
  resave: false,
  saveUninitialized: true
}));

let usuarios = JSON.parse(fs.readFileSync('./data/usuarios.json', 'utf-8'));
let mensagens = []; // Array para armazenar as mensagens

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/cadastro', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'cadastro.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/mensagem', (req, res) => {
  if (req.session.usuario) {
    res.sendFile(path.join(__dirname, 'views', 'mensagem.html'));
  } else {
    res.redirect('/login');
  }
});

app.get('/mural', (req, res) => {
  if (req.session.usuario) {
    const html = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mural de Mensagens</title>
        <link rel="stylesheet" href="/public/styles.css">
      </head>
      <body>
        <h1>Mural de Mensagens</h1>
        <div id="mural-container">
          ${mensagens.length > 0 ? mensagens.map(msg => `
            <div class="mensagem">
              <h3>${msg.titulo}</h3>
              <p>${msg.conteudo}</p>
            </div>
          `).join('') : '<p>Nenhuma mensagem disponível</p>'}
        </div>
        <button onclick="window.location.href='/mensagem'">Voltar</button>
      </body>
      </html>
    `;
    res.send(html);
  } else {
    res.redirect('/login');
  }
});

app.post('/cadastro', (req, res) => {
  const { nome, senha } = req.body;
  const usuarioExiste = usuarios.find(u => u.nome === nome);
  if (!usuarioExiste) {
    usuarios.push({ nome, senha });
    fs.writeFileSync('./data/usuarios.json', JSON.stringify(usuarios, null, 2));
    res.redirect('/login');
  } else {
    res.send('Usuário já existe');
  }
});

app.post('/login', (req, res) => {
  const { nome, senha } = req.body;
  const usuario = usuarios.find(u => u.nome === nome && u.senha === senha);
  if (usuario) {
    req.session.usuario = usuario;
    res.redirect('/mensagem');
  } else {
    res.send('Login ou senha incorretos');
  }
});

app.post('/nova-mensagem', (req, res) => {
  const { titulo, conteudo } = req.body;
  mensagens.push({ titulo, conteudo });
  res.redirect('/mural');
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
