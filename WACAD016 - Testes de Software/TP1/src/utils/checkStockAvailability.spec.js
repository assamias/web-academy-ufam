const { checkStockAvailability } = require('./validacoes');

describe('Função: checkStockAvailability', () => {
    it('deve retornar true se a quantidade desejada estiver disponível no estoque', () => {
        const result = checkStockAvailability('laptop', 5);
        expect(result).toBe(true);
    });

    it('deve retornar false se a quantidade desejada for MAIOR do que o estoque disponível', () => {
        // bug 1 - função ignorava a quantidade e retorna true se o estoque for maior que 0
        const result = checkStockAvailability('headphone', 10); // só existem 5 em estoque
        expect(result).toBe(false);
    });

    it('deve retornar false para produtos sem estoque (quantidade zero)', () => {
        const result = checkStockAvailability('book', 1);
        expect(result).toBe(false);
    });

    it('deve retornar false caso o produto informado não exista no estoque', () => {
        // bug 2 - função não valida a existência do produto no estoque
        const result = checkStockAvailability('geladeira', 1);
        expect(result).toBe(false);
    });
});