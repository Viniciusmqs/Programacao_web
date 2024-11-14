const express = require('express');
const app = express();
const produto = require('./util/produto');


app.get('/', function(req, res){
    res.send('hello world')
});

app.get('/adicionar/:id/:nome/:qtd', (req, res)=>{
    let id = req.params.id;
    let nome = req.params.nome;
    let qtd = req.params.qtd;
    let prod = produto.adicionar(id,nome,qtd)
    res.send(prod)
});

app.get('/listar', function(req, res){
    let id = req.params.id;
    res.send(produto.listar(id))
});

app.get('/remover/:id', function(req, res){
    let id = req.params.id;
    res.send(produto.remover(id))
});

app.get('/editar/:id/:qtd', function(req, res){
    let id = req.params.id;
    let qtd = req.params.qtd;
    res.send(produto.editar(id,qtd))
});

const PORT = 8080;
app.listen(PORT, function(){
    console.log('app rodando na porta ' + PORT);
});