/**
 * Obtém o primeiro nome a partir de uma string contendo o nome completo.
 *
 * @param {string} nomeCompleto - Nome completo informado pelo usuário, separado por espaços.
 * @returns {string} - Retorna somente o primeiro nome ou o nome completo caso não exista separação.
 */
function primeiroNome(nomeCompleto) {
  // Usando indexOf para localizar o primeiro espaço
  const espacoEmBranco = nomeCompleto.indexOf(" ");

  if (espacoEmBranco === -1) return nomeCompleto;
  else return nomeCompleto.slice(0, espacoEmBranco);
}

/**
 * Avalia se existe estoque suficiente para um produto específico, considerando o tipo e a quantidade solicitada.
 *
 * @param {string} tipoProduto - Categoria do produto que será consultado no estoque.
 * @param {number} quantidade - Quantidade desejada para validação.
 * @returns {boolean} - Retorna true caso a quantidade esteja disponível, caso contrário retorna false.
 */
function verificarDisponibilidadeEstoque(tipoProduto, quantidade) {
  const estoque = {
    laptop: 10,
    smartphone: 20,
    headphone: 5,
    tablet: 15,
    livro: 0,
  };

  const estoqueDisponivel = estoque[tipoProduto];

  // Confirma se o estoque atual suporta a quantidade requisitada
  if (estoqueDisponivel >= quantidade) return true;
  else return false;
}

/**
 * Soma o valor total de um conjunto de produtos em um carrinho de compras.
 *
 * @param {Array} produtos - Lista de objetos contendo preço e quantidade de cada item.
 * @returns {number} - Valor total resultante da multiplicação de preço x quantidade de cada elemento.
 *
 * Exemplo:
 * [
 *   { nome: 'Produto 1', preco: 10, quantidade: 2 },
 *   { nome: 'Produto 2', preco: 15, quantidade: 2 },
 *   { nome: 'Produto 3', preco: 20, quantidade: 1 }
 * ]
 */
function calcularPrecoTotal(produtos) {
  let total = 0;
  for (let i = 0; i < produtos.length; i++) {
    // Cálculo corrigido: preço multiplicado pela quantidade
    total += produtos[i].preco * produtos[i].quantidade;
  }
  return total;
}

module.exports = {
  primeiroNome,
  verificarDisponibilidadeEstoque,
  calcularPrecoTotal,
};
