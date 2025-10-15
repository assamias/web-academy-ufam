import {
  criarCliente,
  listarClientes,
  buscarCliente,
  atualizarCliente,
  deletarCliente,
} from "./cliente";

async function main() {
  await criarCliente(); // Cria um novo cliente
  await listarClientes(); // Lista todos os clientes
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    const { prisma } = await import("./prismaClient");
    await prisma.$disconnect();
  });
