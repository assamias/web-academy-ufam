// ==== Tipos Tupla ====
type Lembrete = [string, Date, Date | null, string | null];

// ==== Estado + Storage ====
let lembretes: Lembrete[] = [];
const STORAGE_KEY = "lembretes_v1";

// Serializa Date -> string ISO
function salvarNoStorage() {
  const plain: [string, string, string | null, string | null][] = lembretes.map(
    ([titulo, criadoEm, prazo, descricao]) => [
      titulo,
      criadoEm.toISOString(),
      prazo ? prazo.toISOString() : null,
      descricao ?? null
    ]
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plain));
}

// Reconstrói string ISO -> Date
function carregarDoStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const arr = JSON.parse(raw) as [string, string, string | null, string | null][];
    lembretes = arr.map(([t, criadoISO, prazoISO, desc]) => [
      t,
      new Date(criadoISO),
      prazoISO ? new Date(prazoISO) : null,
      desc ?? null
    ]);
  } catch {
    lembretes = [];
  }
}

// ==== Utils ====

// aceita "" | "YYYY-MM-DD" | "YYYY-MM-DDTHH:mm" | "YYYY-MM-DD HH:mm"
function parseDateOrNull(input: string): Date | null {
  if (!input || !input.trim()) return null;
  const norm = input.trim().includes(" ")
    ? input.trim().replace(" ", "T")
    : input.trim();
  const d = new Date(norm);
  return isNaN(d.getTime()) ? null : d;
}

// pt-BR -> Date (DD/MM/AAAA HH:mm). Também aceita só DD/MM/AAAA.
function parsePtBrDateTime(input: string): Date | null {
  if (!input || !input.trim()) return null;
  const s = input.trim();
  if (!s.includes("/")) return null; // não é pt-BR

  const [datePart, timePart] = s.split(" ");
  const [dd, mm, yyyy] = datePart.split("/").map(Number);
  const [hh, mi] = (timePart ?? "00:00").split(":").map(Number);

  const d = new Date(yyyy, (mm || 1) - 1, dd || 1, hh || 0, mi || 0);
  return isNaN(d.getTime()) ? null : d;
}

// tenta pt-BR primeiro; se não der, tenta ISO/datetime-local
function parseFromAnyInput(input: string): Date | null {
  return parsePtBrDateTime(input) ?? parseDateOrNull(input);
}

function two(n: number) {
  return String(n).padStart(2, "0");
}

// formata Date -> "DD/MM/AAAA HH:mm"
function formatPtBrDateTime(d: Date): string {
  return `${two(d.getDate())}/${two(d.getMonth() + 1)}/${d.getFullYear()} ${two(d.getHours())}:${two(d.getMinutes())}`;
}

/** Exibe data+hora usando locale pt-BR para a lista */
function formatDateTimeForList(d: Date): string {
  const data = d.toLocaleDateString("pt-BR");
  const hora = d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  return `${data} ${hora}`;
}

// ==== DOM ====
const tituloInput = document.getElementById("titulo") as HTMLInputElement;
const prazoInput = document.getElementById("prazo") as HTMLInputElement; 
const descricaoInput = document.getElementById("descricao") as HTMLTextAreaElement;
const lista = document.getElementById("lista") as HTMLUListElement;
const btnAdicionar = document.getElementById("adicionar") as HTMLButtonElement;

// ==== UI ====
function renderizar(): void {
  lista.innerHTML = "";

  if (lembretes.length === 0) {
    const li = document.createElement("li");
    li.className = "list-group-item text-center";
    li.textContent = "Nenhum lembrete cadastrado.";
    lista.appendChild(li);
    return;
  }

  lembretes.forEach((l, i) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-start flex-wrap gap-2";

    const inseridoEm = formatDateTimeForList(l[1]);               // DATA + HORA
    const prazoFmt   = l[2] ? formatDateTimeForList(l[2]) : null; // DATA + HORA

    const info = document.createElement("div");
    info.innerHTML = `
      <strong>${l[0]}</strong><br>
      Inserido em: ${inseridoEm}
      ${prazoFmt ? `<br>Prazo: ${prazoFmt}` : ""}
      ${l[3] ? `<br>Descrição: ${l[3]}` : ""}
    `;

    const actions = document.createElement("div");
    actions.className = "actions d-flex gap-2";
    const btnEdit = document.createElement("button");
    btnEdit.className = "btn btn-sm btn-warning";
    btnEdit.textContent = "Editar";
    btnEdit.onclick = () => editar(i);

    const btnDel = document.createElement("button");
    btnDel.className = "btn btn-sm btn-danger";
    btnDel.textContent = "Excluir";
    btnDel.onclick = () => deletar(i);

    actions.append(btnEdit, btnDel);
    li.append(info, actions);
    lista.appendChild(li);
  });
}

function criarLembrete(): void {
  const titulo = tituloInput.value.trim();
  const descricao = descricaoInput.value.trim();
  const prazoStr = prazoInput.value;

  if (!titulo) {
    alert("O título é obrigatório!");
    return;
  }

  const dataLimite = parseFromAnyInput(prazoStr);
  const novo: Lembrete = [titulo, new Date(), dataLimite, descricao || null];
  lembretes.push(novo);

  salvarNoStorage();
  renderizar();

  // limpar campos
  tituloInput.value = "";
  prazoInput.value = "";
  descricaoInput.value = "";
}

function editar(index: number): void {
  const item = lembretes[index];
  if (!item) return;

  const novoTitulo = prompt("Novo título:", item[0]) ?? "";
  const novaDescricao = prompt("Nova descrição:", item[3] || "") ?? "";
  const prazoSug = item[2] ? formatPtBrDateTime(item[2]) : "";
  const novoPrazoStr = prompt(
    "Nova data limite (DD/MM/AAAA HH:mm):",
    prazoSug
  ) ?? "";

  if (novoTitulo.trim() !== "") item[0] = novoTitulo.trim();
  item[3] = novaDescricao.trim() !== "" ? novaDescricao.trim() : null;

  item[2] = parseFromAnyInput(novoPrazoStr);

  salvarNoStorage();
  renderizar();
}

function deletar(index: number): void {
  const ok = confirm("Tem certeza que deseja excluir este lembrete?");
  if (!ok) return;
  lembretes.splice(index, 1);
  salvarNoStorage();
  renderizar();
}

// Expor globalmente para os botões criados dinamicamente
(Object.assign(window as any, { editar, deletar }));

// ==== Inicialização ====
document.addEventListener("DOMContentLoaded", () => {
  carregarDoStorage();
  renderizar();
});

btnAdicionar.addEventListener("click", criarLembrete);
