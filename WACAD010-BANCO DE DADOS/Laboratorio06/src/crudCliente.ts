declare const process: any;
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// --------------------------- UTIL ---------------------------
function gerarCpf(): string {
  return Array.from({ length: 11 }, () => Math.floor(Math.random() * 10)).join("");
}

// --------------------------- CREATE ---------------------------
async function criarCliente() {
  const novoCliente = await prisma.cliente.create({
    data: {
      nome_completo: "Alexandre Samias",
      cpf: gerarCpf(),
      telefone: "92999999999",
      email: `alexandre${Math.floor(Math.random() * 1000)}@teste.com`,
      data_nascimento: new Date("1998-05-12"),
      enderecos: {
        create: {
          rua: "Av. Djalma Batista",
          numero: "123",
          complemento: "Bloco B",
          cidade: "Manaus",
          estado: "AM",
          cep: "69050020",
        },
      },
    },
    include: { enderecos: true },
  });

  console.log("Cliente criado com sucesso:", novoCliente);
  return novoCliente;
}

// --------------------------- READ ---------------------------
async function listarClientes() {
  const clientes = await prisma.cliente.findMany({
    include: { enderecos: true },
  });

  console.log("\n=== LISTA DE CLIENTES ===");
  if (clientes.length === 0) {
    console.log("Nenhum cliente encontrado.");
    return;
  }

  console.table(
    clientes.map((c) => ({
      id: c.id_cliente,
      nome: c.nome_completo,
      email: c.email,
      cpf: c.cpf,
      cidade: c.enderecos[0]?.cidade || "Sem endereço",
    }))
  );
}

// --------------------------- UPDATE ---------------------------
async function atualizarCliente(id: number) {
  const existe = await prisma.cliente.findUnique({
    where: { id_cliente: id },
  });

  if (!existe) {
    console.log(`Nenhum cliente com ID ${id} encontrado para atualização.`);
    return null;
  }

  const atualizado = await prisma.cliente.update({
    where: { id_cliente: id },
    data: {
      telefone: "92988887777",
      nome_completo: "Alexandre Samias (Atualizado)",
    },
  });

  console.log("Cliente atualizado:", atualizado);
  return atualizado;
}

// --------------------------- DELETE ---------------------------
async function deletarCliente(id: number) {
  const existe = await prisma.cliente.findUnique({
    where: { id_cliente: id },
    include: { enderecos: true },
  });

  if (!existe) {
    console.log(`Nenhum cliente com ID ${id} encontrado para exclusão.`);
    return;
  }

  console.log(`Removendo dados vinculados ao cliente ${id}...`);

  // 🔹 Excluir pedidos e dependências antes
  const pedidos = await prisma.pedido.findMany({
    where: { cliente_id: id },
    include: { itens: true, historicos: true },
  });

  for (const pedido of pedidos) {
    await prisma.itemPedido.deleteMany({ where: { id_pedido: pedido.id_pedido } });
    await prisma.historicoPedido.deleteMany({ where: { pedido_id: pedido.id_pedido } });
    await prisma.pedido.delete({ where: { id_pedido: pedido.id_pedido } });
  }

  // 🔹 Excluir endereços vinculados
  await prisma.endereco.deleteMany({
    where: { cliente_id: id },
  });

  // 🔹 Excluir cliente
  await prisma.cliente.delete({
    where: { id_cliente: id },
  });

  console.log(`Cliente ${id} e todos os dados relacionados foram excluídos com sucesso.`);
}

// --------------------------- EXECUÇÃO VIA ARGUMENTO ---------------------------
async function main() {
  console.log("=== CRUD DE CLIENTES ===");
  const acao = process.argv[2]; // argumento do terminal (create, read, update, delete)

  if (acao === "create") {
    await criarCliente();
  } else if (acao === "read") {
    await listarClientes();
  } else if (acao === "update") {
    const id = Number(process.argv[3]) || 1;
    await atualizarCliente(id);
  } else if (acao === "delete") {
    const id = Number(process.argv[3]) || 1;
    await deletarCliente(id);
  } else {
    console.log("Use um dos comandos: create | read | update | delete");
  }
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error("Erro:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
