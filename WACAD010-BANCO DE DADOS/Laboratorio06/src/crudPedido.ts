declare const process: any;
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Função auxiliar para gerar código de barras aleatório
function gerarCodigoBarras(): string {
  return String(Math.floor(1000000000000 + Math.random() * 9000000000000));
}

// --------------------------- CREATE ---------------------------
async function criarPedidoCompleto() {
  const cliente = await prisma.cliente.create({
    data: {
      nome_completo: "Cliente Teste Pedido",
      cpf: Array.from({ length: 11 }, () => Math.floor(Math.random() * 10)).join(""),
      telefone: "92999998888",
      email: `cliente${Math.floor(Math.random() * 1000)}@teste.com`,
      data_nascimento: new Date("1995-10-20"),
      enderecos: {
        create: {
          rua: "Rua São Jorge",
          numero: "25",
          complemento: "Casa",
          cidade: "Manaus",
          estado: "AM",
          cep: "69050020",
        },
      },
    },
    include: { enderecos: true },
  });

  const categoria = await prisma.categoria.create({
    data: {
      nome: "Eletrônicos",
      subcategorias: {
        create: [{ nome: "Periféricos" }],
      },
    },
    include: { subcategorias: true },
  });

  const subcategoria = categoria.subcategorias[0];

  const produto = await prisma.produto.create({
    data: {
      nome: "Mouse Gamer Logitech G Pro",
      marca: "Logitech",
      preco_unitario: 499.9,
      quantidade: 10,
      codigo_barras: gerarCodigoBarras(),
      subcategoria_id: subcategoria.id_subcategoria,
    },
  });

  const total = Number(produto.preco_unitario) * 2;

  const pedido = await prisma.pedido.create({
    data: {
      cliente_id: cliente.id_cliente,
      endereco_id: cliente.enderecos[0].id_endereco,
      data_hora: new Date(),
      forma_pagamento: "Cartão",
      desconto: 0,
      total: total,
      status: "em processamento",
      itens: {
        create: [
          {
            id_produto: produto.id_produto,
            quantidade: 2,
            preco: Number(produto.preco_unitario),
          },
        ],
      },
    },
    include: { itens: true },
  });

  console.log("Pedido criado com sucesso:");
  console.log({
    id: pedido.id_pedido,
    cliente: cliente.nome_completo,
    produto: produto.nome,
    total: `R$ ${total.toFixed(2)}`,
  });
}

// --------------------------- READ ---------------------------
async function listarPedidos() {
  const pedidos = await prisma.pedido.findMany({
    include: {
      cliente: true,
      endereco: true,
      itens: { include: { produto: true } },
    },
  });

  console.log("\n=== LISTA DE PEDIDOS ===");
  if (pedidos.length === 0) {
    console.log("Nenhum pedido encontrado.");
    return;
  }

  pedidos.forEach((p) => {
    console.log(`Pedido #${p.id_pedido} - Cliente: ${p.cliente.nome_completo}`);
    p.itens.forEach((i) => {
      console.log(
        `  Produto: ${i.produto.nome} | Qtd: ${i.quantidade} | Valor: R$${Number(
          i.preco
        ).toFixed(2)}`
      );
    });
    console.log(`  Total: R$${Number(p.total).toFixed(2)} | Status: ${p.status}\n`);
  });
}

// --------------------------- UPDATE ---------------------------
async function atualizarStatusPedido(id: number) {
  const existe = await prisma.pedido.findUnique({ where: { id_pedido: id } });

  if (!existe) {
    console.log(`Pedido ${id} não encontrado para atualização.`);
    return;
  }

  await prisma.pedido.update({
    where: { id_pedido: id },
    data: { status: "enviado" },
  });

  console.log(`Status do pedido ${id} atualizado para "enviado".`);
}

// --------------------------- DELETE ---------------------------
async function deletarPedido(id: number) {
  const existe = await prisma.pedido.findUnique({
    where: { id_pedido: id },
    include: { itens: true },
  });

  if (!existe) {
    console.log(`Pedido ${id} não encontrado para exclusão.`);
    return;
  }

  await prisma.itemPedido.deleteMany({ where: { id_pedido: id } });
  await prisma.pedido.delete({ where: { id_pedido: id } });

  console.log(`Pedido ${id} e seus itens foram excluídos com sucesso.`);
}

// --------------------------- EXECUÇÃO VIA ARGUMENTO ---------------------------
async function main() {
  console.log("=== CRUD DE PEDIDOS ===");
  const acao = process.argv[2]; // Argumento passado no terminal

  if (acao === "create") {
    await criarPedidoCompleto();
  } else if (acao === "read") {
    await listarPedidos();
  } else if (acao === "update") {
    const id = Number(process.argv[3]) || 1;
    await atualizarStatusPedido(id);
  } else if (acao === "delete") {
    const id = Number(process.argv[3]) || 1;
    await deletarPedido(id);
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
