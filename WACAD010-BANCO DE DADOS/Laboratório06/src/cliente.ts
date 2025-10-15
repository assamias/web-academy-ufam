import { prisma } from "./prismaClient";

export async function criarCliente() {
  const novo = await prisma.cliente.create({
    data: {
      nome_completo: "Canoa Furada da Silva Souza",
      cpf: "98765432100",
      celular: "9998887766",
      email: "bomba@gmail.com",
      data_nascimento: new Date("1990/06/15"),
    },
  });
  console.log("Cliente criado:", novo);
}

export async function listarClientes() {
  const lista = await prisma.cliente.findMany();
  console.log("Lista de clientes:");
  console.table(lista);
}

export async function buscarCliente(id: number) {
  const cliente = await prisma.cliente.findUnique({
    where: { id_cliente: id },
  });
  console.log(cliente ?? "Cliente não encontrado");
}

export async function atualizarCliente(id: number) {
  const atualizado = await prisma.cliente.update({
    where: { id_cliente: id },
    data: {
      nome_completo: "Linday Lohan da Silva Souza",
      celular: "11988887777",
    },
  });
  console.log("Cliente atualizado:", atualizado);
}

export async function deletarCliente(id: number) {
  await prisma.cliente.delete({ where: { id_cliente: id } });
  console.log("Cliente deletado com sucesso!");
}
