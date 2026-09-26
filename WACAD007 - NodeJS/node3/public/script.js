const input = document.getElementById("quantidade");
const botao = document.getElementById("gerar");
const resultado = document.getElementById("resultado");

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Praesent commodo cursus magna, vel scelerisque nisl consectetur et. 
Donec id elit non mi porta gravida at eget metus.`;

botao.addEventListener("click", () => {
    const quantidade = Number(input.value);

    resultado.innerHTML = "";

    for (let i = 0; i < quantidade; i++) {
        const paragrafo = document.createElement("p");
        paragrafo.textContent = lorem;
        resultado.appendChild(paragrafo);
    }
});