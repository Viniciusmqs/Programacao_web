const express = require('express');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const SECRET = 'meusegredo'; // Segredo do JWT
const USUARIOS_FILE = path.join(__dirname, 'data', 'usuarios.json');


// Configuração
app.use(bodyParser.json());
app.use(express.static('public'));

// Funções utilitárias
const carregarUsuarios = () => {
    if (!fs.existsSync(USUARIOS_FILE)) {
        fs.writeFileSync(USUARIOS_FILE, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(USUARIOS_FILE, 'utf-8'));
};

const salvarUsuarios = (usuarios) => {
    fs.writeFileSync(USUARIOS_FILE, JSON.stringify(usuarios, null, 4));
};

// Middleware para autenticação
function autenticar(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send('Token não fornecido.');

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(403).send('Token inválido.');
        req.usuario = decoded;
        next();
    });
}

// Rotas de API
app.post('/cadastro', (req, res) => {
    const { nome, senha } = req.body;
    const usuarios = carregarUsuarios();

    if (usuarios.find(u => u.nome === nome)) {
        return res.status(400).send('Usuário já existe.');
    }

    usuarios.push({ nome, senha });
    salvarUsuarios(usuarios);
    res.send('Usuário cadastrado com sucesso.');
});

app.post('/login', (req, res) => {
    const { nome, senha } = req.body;
    const usuarios = carregarUsuarios();

    const usuario = usuarios.find(u => u.nome === nome && u.senha === senha);
    if (!usuario) return res.status(401).send('Credenciais inválidas.');

    const token = jwt.sign({ nome }, SECRET, { expiresIn: '1h' });
    res.json({ token });
});

const mensagens = []; // Simula mensagens no servidor

app.get('/api/mensagens', autenticar, (req, res) => {
    res.json(mensagens);
});

app.post('/api/mensagens', autenticar, (req, res) => {
    const { conteudo } = req.body;
    if (!conteudo) return res.status(400).send('Conteúdo não pode ser vazio.');

    mensagens.push({
        autor: req.usuario.nome,
        conteudo,
        data: new Date()
    });
    res.send('Mensagem adicionada com sucesso.');
});

// Rotas de páginas HTML
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/cadastro', (req, res) => res.sendFile(path.join(__dirname, 'views', 'cadastro.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'views', 'login.html')));
app.get('/mensagem', (req, res) => res.sendFile(path.join(__dirname, 'views', 'mensagem.html')));
app.get('/mural', (req, res) => res.sendFile(path.join(__dirname, 'views', 'mural.html')));

// Iniciar servidor
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
