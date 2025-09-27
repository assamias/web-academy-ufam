// Classe Aluno
class Aluno {
  constructor(
    public id: number,
    public nome: string,
    public idade: number,
    public altura: number,
    public peso: number
  ) {}
}

// Classe Turma
class Turma {
  private alunos: Aluno[] = [];

  adicionar(aluno: Aluno) {
    this.alunos.push(aluno);
    this.atualizar();
  }

  editar(alunoEditado: Aluno) {
    this.alunos = this.alunos.map(a => a.id === alunoEditado.id ? alunoEditado : a);
    this.atualizar();
  }

  remover(id: number) {
    this.alunos = this.alunos.filter(a => a.id !== id);
    this.atualizar();
  }

  getNumAlunos(): number {
    return this.alunos.length;
  }

  getMediaIdades(): number {
    if (this.alunos.length === 0) return 0;
    let soma = this.alunos.reduce((s, a) => s + a.idade, 0);
    return soma / this.alunos.length;
  }

  getMediaAlturas(): number {
    if (this.alunos.length === 0) return 0;
    let soma = this.alunos.reduce((s, a) => s + a.altura, 0);
    return soma / this.alunos.length;
  }

  getMediaPesos(): number {
    if (this.alunos.length === 0) return 0;
    let soma = this.alunos.reduce((s, a) => s + a.peso, 0);
    return soma / this.alunos.length;
  }

  atualizar() {
    let tabela = document.getElementById("tabelaAlunos") as HTMLElement;
    tabela.innerHTML = "";

    this.alunos.forEach(aluno => {
      let linha = document.createElement("tr");
      linha.innerHTML = `
        <td>${aluno.nome}</td>
        <td>${aluno.idade}</td>
        <td>${aluno.altura}</td>
        <td>${aluno.peso}</td>
        <td>
          <button onclick="editar(${aluno.id})">Editar</button>
          <button onclick="remover(${aluno.id})">Remover</button>
        </td>
      `;
      tabela.appendChild(linha);
    });

    (document.getElementById("numAlunos") as HTMLElement).innerText = this.getNumAlunos().toString();
    (document.getElementById("mediaIdades") as HTMLElement).innerText = this.getMediaIdades().toFixed(1);
    (document.getElementById("mediaAlturas") as HTMLElement).innerText = this.getMediaAlturas().toFixed(1);
    (document.getElementById("mediaPesos") as HTMLElement).innerText = this.getMediaPesos().toFixed(1);
  }

  getAlunos(): Aluno[] {
    return this.alunos;
  }
}

// Criando turma
let turma = new Turma();
let contadorId = 1;

// Formulário manual
const form = document.getElementById("formAluno") as HTMLFormElement;
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let idInput = document.getElementById("alunoId") as HTMLInputElement;
  let nomeInput = document.getElementById("nome") as HTMLInputElement;
  let idadeInput = document.getElementById("idade") as HTMLInputElement;
  let alturaInput = document.getElementById("altura") as HTMLInputElement;
  let pesoInput = document.getElementById("peso") as HTMLInputElement;

  let id = idInput.value ? parseInt(idInput.value) : contadorId++;

  let novoAluno = new Aluno(
    id,
    nomeInput.value,
    parseInt(idadeInput.value),
    parseFloat(alturaInput.value),
    parseFloat(pesoInput.value)
  );

  if (idInput.value) {
    turma.editar(novoAluno);
  } else {
    turma.adicionar(novoAluno);
  }

  form.reset();
  idInput.value = "";
});

// Funções globais (precisam estar no window)
(window as any).editar = function (id: number) {
  let aluno = turma.getAlunos().find(a => a.id === id);
  if (!aluno) return;

  (document.getElementById("alunoId") as HTMLInputElement).value = aluno.id.toString();
  (document.getElementById("nome") as HTMLInputElement).value = aluno.nome;
  (document.getElementById("idade") as HTMLInputElement).value = aluno.idade.toString();
  (document.getElementById("altura") as HTMLInputElement).value = aluno.altura.toString();
  (document.getElementById("peso") as HTMLInputElement).value = aluno.peso.toString();
};

(window as any).remover = function (id: number) {
  turma.remover(id);
};

// --------- DESAFIO: gerar alunos automáticos ----------
window.addEventListener("DOMContentLoaded", () => {
  const btnGerar = document.getElementById("btnGerar") as HTMLButtonElement;

  btnGerar.addEventListener("click", async () => {
    try {
      let resposta = await fetch("https://randomuser.me/api/?results=3&nat=br");
      let dados = await resposta.json();

      dados.results.forEach((pessoa: any) => {
        let nome = pessoa.name.first + " " + pessoa.name.last;
        let idade = pessoa.dob.age;
        let altura = 150 + Math.floor(Math.random() * 50); // 150 a 200 cm
        let peso = 50 + Math.floor(Math.random() * 50);   // 50 a 100 kg

        let aluno = new Aluno(contadorId++, nome, idade, altura, peso);
        turma.adicionar(aluno);
      });
    } catch (e) {
      alert("Erro ao gerar alunos: " + e);
    }
  });
});
