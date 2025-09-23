const readline = require("readline-sync"); // use require com module: commonjs

// Tipo Tupla de Lembrete
type Lembrete = [string, Date, Date | null, string?];

// Lista de lembretes
let lembretes: Lembrete[] = [];

// Autenticação simples
const usuarioPadrao = "alexandre";
const senhaPadrao = "1234";

function autenticar(): boolean {
    console.log("===== LOGIN =====");
    const usuario = readline.question("Usuario: ");
    const senha = readline.question("Senha: ", { hideEchoBack: true });

    if (usuario === usuarioPadrao && senha === senhaPadrao) {
        console.log("\n Login realizado com sucesso!\n");
        return true;
    } else {
        console.log("\n Usuario ou senha incorretos!\n");
        return false;
    }
}


// Funções CRUD
function criarLembrete(): void {
    console.log("\n=== Criar Lembrete ===");
    const titulo = readline.question("Titulo: ");
    const descricao = readline.question("Descricao (opcional): ");
    const prazo = readline.question("Data limite (YYYY-MM-DD) (opcional): ");

    let dataLimite: Date | null = null;
    if (prazo.trim() !== "") {
        dataLimite = new Date(prazo);
    }

    const lembrete: Lembrete = [titulo, new Date(), dataLimite, descricao || undefined];
    lembretes.push(lembrete);

    console.log("Lembrete criado com sucesso!\n");
}

function listarLembretes(): void {
    console.log("\n=== Lista de Lembretes ===");
    if (lembretes.length === 0) {
        console.log("Nenhum lembrete cadastrado.\n");
        return;
    }
    lembretes.forEach((l, i) => {
        console.log(`${i + 1}. ${l[0]} (inserido em: ${l[1].toLocaleString()})`);
        if (l[2]) console.log(`Prazo: ${l[2]?.toLocaleDateString()}`);
        if (l[3]) console.log(`Descricao: ${l[3]}`);
    });
    console.log();
}

function editarLembrete(): void {
  listarLembretes();
  const index = readline.questionInt("Digite o numero do lembrete para editar: ") - 1;

  // valida o indice e obtém o item de forma "segura" para o TS
  const item = lembretes[index];
  if (!item) {
    console.log("Indice invalido!\n");
    return;
  }

  const novoTitulo = readline.question("Novo titulo (deixe vazio para manter): ");
  const novaDescricao = readline.question("Nova descricao (opcional): ");
  const novoPrazo = readline.question("Nova data limite (YYYY-MM-DD) (opcional): ");

  if (novoTitulo.trim() !== "") {
    item[0] = novoTitulo;
  }

  if (novaDescricao.trim() !== "") {
    item[3] = novaDescricao;
  }

  if (novoPrazo.trim() !== "") {
    item[2] = new Date(novoPrazo);
  }

  console.log("Lembrete atualizado!\n");
}


function deletarLembrete(): void {
    listarLembretes();
    const index = readline.questionInt("Digite o numero do lembrete para deletar: ") - 1;

    if (index < 0 || index >= lembretes.length) {
        console.log("Indice invalido!\n");
        return;
    }

    lembretes.splice(index, 1);
    console.log("🗑️ Lembrete deletado!\n");
}


// Menu principal
function menu(): void {
    let opcao: number;

    do {
        console.log("=== MENU ===");
        console.log("1 - Criar lembrete");
        console.log("2 - Listar lembretes");
        console.log("3 - Editar lembrete");
        console.log("4 - Deletar lembrete");
        console.log("0 - Sair");

        opcao = readline.questionInt("Escolha uma opcao: ");

        switch (opcao) {
            case 1: criarLembrete(); break;
            case 2: listarLembretes(); break;
            case 3: editarLembrete(); break;
            case 4: deletarLembrete(); break;
            case 0: console.log("Saindo..."); break;
            default: console.log("Opcao invalida!\n");
        }

    } while (opcao !== 0);
}


// Programa Principal
if (autenticar()) {
    menu();
}
