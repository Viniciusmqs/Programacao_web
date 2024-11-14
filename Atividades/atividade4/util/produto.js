let estoque = [];

function adicionar(id, nome, qtd){
    const novoProduto = {id, nome,qtd: Number(qtd)};

    estoque.push(novoProduto)
    return `Produto ${nome} adicionado!`
}

function listar(){
    return estoque.map(produto => `Id: ${produto.id}, Nome ${produto.nome}, Quantidade: ${produto.qtd}`);
}

function remover(id) {
    const produto = estoque.find(produto => produto.id === id);
    
    if (produto) {
        estoque = estoque.filter(produto => produto.id !== id);
        return `Produto ${produto.nome} removido!`;
    }
}

function editar(id, qtd){
    const produto = estoque.find(produto => produto.id === id);

    produto.qtd = Number(qtd);
    return `Quantidade de ${produto.nome} att para ${produto.qtd}`
}


module.exports ={
    adicionar,
    listar,
    remover,
    editar
}