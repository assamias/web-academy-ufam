const { calculateTotalPrice } = require('./validacoes');

describe('Função: calculateTotalPrice', () => {
    it('deve calcular o preço total considerando a quantidade de cada produto', () => {
        const products = [
            { name: 'Product 1', price: 10, quantity: 2 }, // Total: 20
            { name: 'Product 2', price: 15, quantity: 2 }, // Total: 30
            { name: 'Product 3', price: 20, quantity: 1 }, // Total: 20
        ];

        // bug 1 - função sobrescreve o valor total com '=' em vez de somar com '+='
        // bug 2 - função ignora a propriedade 'quantity' dos produtos
        const total = calculateTotalPrice(products);

        expect(total).toBe(70);
    });

    it('deve retornar 0 quando a lista de produtos estiver vazia', () => {
        const total = calculateTotalPrice([]);
        expect(total).toBe(0);
    });
});