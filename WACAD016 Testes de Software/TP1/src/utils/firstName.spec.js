const { firstName } = require('./validacoes');

describe('Função: firstName', () => {
    it('deve retornar apenas o primeiro nome quando houver nome completo com múltiplos sobrenomes', () => {
        // bug 1 - função original usa lastIndexOf e retorna 'John Doe' em vez de 'John'
        const fullName = 'John Doe Etc';
        const result = firstName(fullName);

        expect(result).toBe('John');
    });

    it('deve retornar o próprio nome quando não houver espaços', () => {
        const fullName = 'John';
        const result = firstName(fullName);

        expect(result).toBe('John');
    });
});