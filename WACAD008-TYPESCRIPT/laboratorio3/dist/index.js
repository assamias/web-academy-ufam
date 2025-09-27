// Classes específicas
class TV {
    constructor(modelo, fabricante, valor, resolucao, polegadas) {
        this.modelo = modelo;
        this.fabricante = fabricante;
        this.valor = valor;
        this.resolucao = resolucao;
        this.polegadas = polegadas;
    }
    detalhes() {
        return `${this.resolucao}, ${this.polegadas}"`;
    }
}
class Celular {
    constructor(modelo, fabricante, valor, memoria) {
        this.modelo = modelo;
        this.fabricante = fabricante;
        this.valor = valor;
        this.memoria = memoria;
    }
    detalhes() {
        return `${this.memoria} de memória`;
    }
}
class Bicicleta {
    constructor(modelo, fabricante, valor, aro) {
        this.modelo = modelo;
        this.fabricante = fabricante;
        this.valor = valor;
        this.aro = aro;
    }
    detalhes() {
        return `Aro ${this.aro}`;
    }
}
// Classe genérica Carrinho
class Carrinho {
    constructor() {
        this.produtos = [];
    }
    adicionar(produto) {
        this.produtos.push(produto);
        this.atualizar();
    }
    remover(index) {
        this.produtos.splice(index, 1);
        this.atualizar();
    }
    getNumProdutos() {
        return this.produtos.length;
    }
    getValorTotal() {
        return this.produtos.reduce((s, p) => s + p.valor, 0);
    }
    atualizar() {
        const tabela = document.getElementById("tabelaCarrinho");
        tabela.innerHTML = "";
        this.produtos.forEach((p, i) => {
            const linha = document.createElement("tr");
            linha.innerHTML = `
        <td>${p.constructor.name}</td>
        <td>${p.modelo}</td>
        <td>${p.fabricante}</td>
        <td>${p.detalhes()}</td>
        <td>R$ ${p.valor.toFixed(2)}</td>
        <td><button onclick="remover(${i})">Remover</button></td>
      `;
            tabela.appendChild(linha);
        });
        document.getElementById("numProdutos").innerText = this.getNumProdutos().toString();
        document.getElementById("valorTotal").innerText = this.getValorTotal().toFixed(2);
    }
}
// Instância global
const carrinho = new Carrinho();
// Manipulação do formulário
const form = document.getElementById("formProduto");
const extraCampos = document.getElementById("extraCampos");
function atualizarCamposExtras(tipo) {
    if (tipo === "tv") {
        extraCampos.innerHTML = `
      <label>Resolução: <input type="text" id="resolucao" required></label>
      <label>Polegadas: <input type="number" id="polegadas" required></label>
    `;
    }
    else if (tipo === "celular") {
        extraCampos.innerHTML = `
      <label>Memória: <input type="text" id="memoria" required></label>
    `;
    }
    else if (tipo === "bicicleta") {
        extraCampos.innerHTML = `
      <label>Aro: <input type="number" id="aro" required></label>
    `;
    }
}
// Atualizar campos ao trocar tipo
document.getElementById("tipo").addEventListener("change", e => {
    atualizarCamposExtras(e.target.value);
});
// Inicializa com TV
atualizarCamposExtras("tv");
// Submissão do formulário
form.addEventListener("submit", e => {
    e.preventDefault();
    const tipo = document.getElementById("tipo").value;
    const modelo = document.getElementById("modelo").value;
    const fabricante = document.getElementById("fabricante").value;
    const valor = parseFloat(document.getElementById("valor").value);
    let produto;
    if (tipo === "tv") {
        const resolucao = document.getElementById("resolucao").value;
        const polegadas = parseInt(document.getElementById("polegadas").value);
        produto = new TV(modelo, fabricante, valor, resolucao, polegadas);
    }
    else if (tipo === "celular") {
        const memoria = document.getElementById("memoria").value;
        produto = new Celular(modelo, fabricante, valor, memoria);
    }
    else {
        const aro = parseInt(document.getElementById("aro").value);
        produto = new Bicicleta(modelo, fabricante, valor, aro);
    }
    carrinho.adicionar(produto);
    form.reset();
    atualizarCamposExtras(tipo);
});
// Função global de remover
window.remover = (i) => carrinho.remover(i);
