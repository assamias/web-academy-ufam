
//Extrai o primeiro nome de uma string de nome completo

function firstName(fullName) {
  // Correção - Usar indexOf para pegar a primeira ocorrência de espaço
  const whitespace = fullName.indexOf(" ");

  if (whitespace === -1) return fullName;
  else return fullName.slice(0, whitespace);
}

//Verifica a disponibilidade do produto em estoque com base no tipo e na qtd desejada
function checkStockAvailability(productType, quantity) {
  const stock = {
    laptop: 10,
    smartphone: 20,
    headphone: 5,
    tablet: 15,
    book: 0,
  };

  const availableStock = stock[productType];

  // Correção- Validar se o produto existe e se o estoque supre a quantidade solicitada
  if (availableStock === undefined || availableStock < quantity) {
    return false;
  }
  return true;
}

//Calcula o preço total de um array de produtos em uma aplicação
function calculateTotalPrice(products) {
  let total = 0;
  for (let i = 0; i < products.length; i++) {
    // COrreção: Usa '+=' para acumular e multiplicar preço pela quantidade
    total += products[i].price * products[i].quantity;
  }
  return total;
}

module.exports = {
  firstName,
  checkStockAvailability,
  calculateTotalPrice,
};