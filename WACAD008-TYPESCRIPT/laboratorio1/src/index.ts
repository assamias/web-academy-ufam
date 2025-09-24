// Tipo Tupla de Lembrete
type Lembrete = [string, Date, Date | null, string | null];

let lembretes: Lembrete[] = [];

// Elementos do DOM
const tituloInput = document.getElementById("titulo") as HTMLInputElement;
const prazoInput = document.getElementById("prazo") as HTMLInputElement;
const descricaoInput = document.getElementById("descricao") as HTMLTextAreaElement;
const lista = document.getElementById("lista") as HTMLUListElement;
const btnAdicionar = document.getElementById("adicionar") as HTMLButtonElement;

// Renderizar lista
function renderizar(): void {
  lista.innerHTML = "";

  if (lembretes.length === 0) {
    lista.innerHTML = `<li class="list-group-item text-center">Nenhum lembrete cadastrado.</li>`;
    return;
  }

  lembretes.forEach((l, i) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center flex-wrap";
    li.innerHTML = `
      <div class="me-3">
        <strong>${l[0]}</strong><br>
        Inserido em: ${l[1].toLocaleDateString()}
        ${l[2] ? `<br>Prazo: ${l[2].toLocaleDateString()}` : ""}
        ${l[3] ? `<br>Descrição: ${l[3]}` : ""}
      </div>
      <div class="actions mt-2 mt-md-0">
        <button class="btn btn-sm btn-warning me-1" onclick="editar(${i})">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="deletar(${i})">Excluir</button>
      </div>
    `;
    lista.appendChild(li);
  });
}

// Criar lembrete
function criarLembrete(): void {
  const titulo = tituloInput.value.trim();
  const descricao = descricaoInput.value.trim();
  const prazo = prazoInput.value;

  if (!titulo) {
    alert("O título é obrigatório!");
    return;
  }

  let dataLimite: Date | null = prazo ? new Date(prazo) : null;
  const lembrete: Lembrete = [titulo, new Date(), dataLimite, descricao || null];
  lembretes.push(lembrete);

  tituloInput.value = "";
  descricaoInput.value = "";
  prazoInput.value = "";

  renderizar();
}

// Editar lembrete (com prompts)
(window as any).editar = (index: number): void => {
  const item = lembretes[index];
  if (!item) return;

  const novoTitulo = prompt("Novo título:", item[0]);
  const novaDescricao = prompt("Nova descrição:", item[3] || "");
  const novoPrazo = prompt("Nova data limite (YYYY-MM-DD):", item[2] ? item[2].toISOString().slice(0, 10) : "");

  if (novoTitulo && novoTitulo.trim() !== "") item[0] = novoTitulo.trim();
  if (novaDescricao && novaDescricao.trim() !== "") item[3] = novaDescricao.trim();
  if (novoPrazo && novoPrazo.trim() !== "") item[2] = new Date(novoPrazo);

  renderizar();
};

// Deletar lembrete (com confirm)
(window as any).deletar = (index: number): void => {
  const confirmar = confirm("Tem certeza que deseja excluir este lembrete?");
  if (!confirmar) return;

  lembretes.splice(index, 1);
  renderizar();
};

// Evento do botão "Adicionar"
btnAdicionar.addEventListener("click", criarLembrete);
