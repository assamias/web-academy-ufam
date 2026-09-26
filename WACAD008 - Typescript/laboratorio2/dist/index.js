var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Classe Aluno
class Aluno {
    constructor(id, nome, idade, altura, peso) {
        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.altura = altura;
        this.peso = peso;
    }
}
// Classe Turma
class Turma {
    constructor() {
        this.alunos = [];
    }
    adicionar(aluno) {
        this.alunos.push(aluno);
        this.atualizar();
    }
    editar(alunoEditado) {
        this.alunos = this.alunos.map(a => a.id === alunoEditado.id ? alunoEditado : a);
        this.atualizar();
    }
    remover(id) {
        this.alunos = this.alunos.filter(a => a.id !== id);
        this.atualizar();
    }
    getNumAlunos() {
        return this.alunos.length;
    }
    getMediaIdades() {
        if (this.alunos.length === 0)
            return 0;
        let soma = this.alunos.reduce((s, a) => s + a.idade, 0);
        return soma / this.alunos.length;
    }
    getMediaAlturas() {
        if (this.alunos.length === 0)
            return 0;
        let soma = this.alunos.reduce((s, a) => s + a.altura, 0);
        return soma / this.alunos.length;
    }
    getMediaPesos() {
        if (this.alunos.length === 0)
            return 0;
        let soma = this.alunos.reduce((s, a) => s + a.peso, 0);
        return soma / this.alunos.length;
    }
    atualizar() {
        let tabela = document.getElementById("tabelaAlunos");
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
        document.getElementById("numAlunos").innerText = this.getNumAlunos().toString();
        document.getElementById("mediaIdades").innerText = this.getMediaIdades().toFixed(1);
        document.getElementById("mediaAlturas").innerText = this.getMediaAlturas().toFixed(1);
        document.getElementById("mediaPesos").innerText = this.getMediaPesos().toFixed(1);
    }
    getAlunos() {
        return this.alunos;
    }
}
// Criando turma
let turma = new Turma();
let contadorId = 1;
// Formulário manual
const form = document.getElementById("formAluno");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    let idInput = document.getElementById("alunoId");
    let nomeInput = document.getElementById("nome");
    let idadeInput = document.getElementById("idade");
    let alturaInput = document.getElementById("altura");
    let pesoInput = document.getElementById("peso");
    let id = idInput.value ? parseInt(idInput.value) : contadorId++;
    let novoAluno = new Aluno(id, nomeInput.value, parseInt(idadeInput.value), parseFloat(alturaInput.value), parseFloat(pesoInput.value));
    if (idInput.value) {
        turma.editar(novoAluno);
    }
    else {
        turma.adicionar(novoAluno);
    }
    form.reset();
    idInput.value = "";
});
// Funções globais (precisam estar no window)
window.editar = function (id) {
    let aluno = turma.getAlunos().find(a => a.id === id);
    if (!aluno)
        return;
    document.getElementById("alunoId").value = aluno.id.toString();
    document.getElementById("nome").value = aluno.nome;
    document.getElementById("idade").value = aluno.idade.toString();
    document.getElementById("altura").value = aluno.altura.toString();
    document.getElementById("peso").value = aluno.peso.toString();
};
window.remover = function (id) {
    turma.remover(id);
};
// --------- DESAFIO: gerar alunos automáticos ----------
window.addEventListener("DOMContentLoaded", () => {
    const btnGerar = document.getElementById("btnGerar");
    btnGerar.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
        try {
            let resposta = yield fetch("https://randomuser.me/api/?results=3&nat=br");
            let dados = yield resposta.json();
            dados.results.forEach((pessoa) => {
                let nome = pessoa.name.first + " " + pessoa.name.last;
                let idade = pessoa.dob.age;
                let altura = 150 + Math.floor(Math.random() * 50); // 150 a 200 cm
                let peso = 50 + Math.floor(Math.random() * 50); // 50 a 100 kg
                let aluno = new Aluno(contadorId++, nome, idade, altura, peso);
                turma.adicionar(aluno);
            });
        }
        catch (e) {
            alert("Erro ao gerar alunos: " + e);
        }
    }));
});
