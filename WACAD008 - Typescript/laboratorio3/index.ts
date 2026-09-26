// Interface genérica de Produto
interface Produto {
  modelo: string;
  fabricante: string;
  valor: number;
  detalhes(): string;
}

// Classes específicas
class TV implements Produto {
  constructor(
    public modelo: string,
    public fabricante: string,
    public valor: number,
    public resolucao: string,
    public polegadas: number
  ) {}

  detalhes(): string {
    return `${this.resolucao}, ${this.polegadas}"`;
  }
}

class Celular implements Produto {
  constructor(
    public modelo: string,
    public fabricante: string,
    public valor: number,
    public memoria: string
  ) {}

  detalhes(): string {
    return `${this.memoria} de memória`;
  }
}

class Bicicleta implements Produto {
  constructor(
    public modelo: string,
    public fabricante: string,
    public valor: number,
    public aro: number
  ) {}

  detalhes(): string {
    return `Aro ${this.aro}`;
  }
}

// Classe genérica Carrinho
class Carrinho<T extends Produto> {
  private produtos: T[] = [];

  adicionar(produto: T) {
    this.produtos.push(produto);
    this.atualizar();
  }

  remover(index: number) {
    this.produtos.splice(index, 1);
    this.atualizar();
  }

  getNumProdutos(): number {
    return this.produtos.length;
  }

  getValorTotal(): number {
    return this.produtos.reduce((s, p) => s + p.valor, 0);
  }

  atualizar() {
    const tabela = document.getElementById("tabelaCarrinho") as HTMLElement;
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

    (document.getElementById("numProdutos") as HTMLElement).innerText = this.getNumProdutos().toString();
    (document.getElementById("valorTotal") as HTMLElement).innerText = this.getValorTotal().toFixed(2);
  }
}

// Instância global
const carrinho = new Carrinho<Produto>();

// Manipulação do formulário
const form = document.getElementById("formProduto") as HTMLFormElement;
const extraCampos = document.getElementById("extraCampos") as HTMLElement;

function atualizarCamposExtras(tipo: string) {
  if (tipo === "tv") {
    extraCampos.innerHTML = `
      <label>Resolução: <input type="text" id="resolucao" required></label>
      <label>Polegadas: <input type="number" id="polegadas" required></label>
    `;
  } else if (tipo === "celular") {
    extraCampos.innerHTML = `
      <label>Memória: <input type="text" id="memoria" required></label>
    `;
  } else if (tipo === "bicicleta") {
    extraCampos.innerHTML = `
      <label>Aro: <input type="number" id="aro" required></label>
    `;
  }
}

// Atualizar campos ao trocar tipo
(document.getElementById("tipo") as HTMLSelectElement).addEventListener("change", e => {
  atualizarCamposExtras((e.target as HTMLSelectElement).value);
});

// Inicializa com TV
atualizarCamposExtras("tv");

// Submissão do formulário
form.addEventListener("submit", e => {
  e.preventDefault();

  const tipo = (document.getElementById("tipo") as HTMLSelectElement).value;
  const modelo = (document.getElementById("modelo") as HTMLInputElement).value;
  const fabricante = (document.getElementById("fabricante") as HTMLInputElement).value;
  const valor = parseFloat((document.getElementById("valor") as HTMLInputElement).value);

  let produto: Produto;

  if (tipo === "tv") {
    const resolucao = (document.getElementById("resolucao") as HTMLInputElement).value;
    const polegadas = parseInt((document.getElementById("polegadas") as HTMLInputElement).value);
    produto = new TV(modelo, fabricante, valor, resolucao, polegadas);
  } else if (tipo === "celular") {
    const memoria = (document.getElementById("memoria") as HTMLInputElement).value;
    produto = new Celular(modelo, fabricante, valor, memoria);
  } else {
    const aro = parseInt((document.getElementById("aro") as HTMLInputElement).value);
    produto = new Bicicleta(modelo, fabricante, valor, aro);
  }

  carrinho.adicionar(produto);
  form.reset();
  atualizarCamposExtras(tipo);
});

// Função global de remover
(window as any).remover = (i: number) => carrinho.remover(i);
