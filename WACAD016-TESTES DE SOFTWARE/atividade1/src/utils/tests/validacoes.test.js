const {
  primeiroNome,
  verificarDisponibilidadeEstoque,
  calcularPrecoTotal,
} = require("../validacoes");

describe("primeiroNome", () => {
  it("Deve retornar o primeiro nome quando o nome completo tiver mais de um nome", () => {
    const nomeCompleto = "João Silva";
    const resultado = primeiroNome(nomeCompleto);
    expect(resultado).toBe("João");
  });
  it("Deve retornar o próprio nome quando o nome completo tiver apenas um nome", () => {
    const nomeCompleto = "Maria";
    const resultado = primeiroNome(nomeCompleto);
    expect(resultado).toBe("Maria");
  });
});

describe("verificarDisponibilidadeEstoque", () => {
  it("Deve retornar true quando o produto estiver disponível em quantidade suficiente", () => {
    const tipoProduto = "laptop";
    const quantidade = 5;
    const resultado = verificarDisponibilidadeEstoque(tipoProduto, quantidade);
    expect(resultado).toBe(true);
  });
  it("Deve retornar false quando o produto não estiver disponível em quantidade suficiente", () => {
    const tipoProduto = "headphone";
    const quantidade = 10;
    const resultado = verificarDisponibilidadeEstoque(tipoProduto, quantidade);
    expect(resultado).toBe(false);
  });
  it("Deve retornar false quando o produto não estiver disponível no estoque", () => {
    const tipoProduto = "livro";
    const quantidade = 1;
    const resultado = verificarDisponibilidadeEstoque(tipoProduto, quantidade);
    expect(resultado).toBe(false);
  });
});

describe("calcularPrecoTotal", () => {
  it("Deve retornar o preço total correto para um array de produtos", () => {
    const produtos = [
      { nome: "Produto 1", preco: 10, quantidade: 2 },
      { nome: "Produto 2", preco: 15, quantidade: 2 },
      { nome: "Produto 3", preco: 20, quantidade: 1 },
    ];
    const resultado = calcularPrecoTotal(produtos);
    expect(resultado).toBe(70);
  });
});
