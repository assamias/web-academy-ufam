declare const process: any;
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Criação de Categoria e Subcategorias
  const categoria = await prisma.categoria.create({
    data: {
      nome: "Eletrônicos",
      subcategorias: {
        create: [
          { nome: "Celulares" },
          { nome: "Notebooks" },
        ],
      },
    },
    include: { subcategorias: true },
  });
  console.log("Categoria criada:", categoria);

  // Criação de Produto
  const produto = await prisma.produto.create({
    data: {
      nome: "Notebook Acer Aspire 5",
      marca: "Acer",
      preco_unitario: 2999.99,
      quantidade: 15,
      codigo_barras: "7891234567890",
      subcategoria_id: categoria.subcategorias[1].id_subcategoria,
      numerosSerie: {
        create: [
          { numero_serie: "NBACER001" },
          { numero_serie: "NBACER002" },
        ],
      },
    },
    include: { numerosSerie: true },
  });
  console.log("Produto criado:", produto);

  // Criação de Cliente
  const cliente = await prisma.cliente.create({
    data: {
      nome_completo: "Alexandre Samias",
      cpf: "12345678901",
      telefone: "92988887777",
      email: "alexandre@loja.com",
      data_nascimento: new Date("1998-05-22"),
      enderecos: {
        create: [
          {
            rua: "Av. Constantino Nery",
            numero: "999",
            complemento: "Apto 404",
            cidade: "Manaus",
            estado: "AM",
            cep: "69000000",
          },
        ],
      },
    },
    include: { enderecos: true },
  });
  console.log("Cliente criado:", cliente);

  // Criação de Pedido e Itens
  const pedido = await prisma.pedido.create({
    data: {
      cliente_id: cliente.id_cliente,
      endereco_id: cliente.enderecos[0].id_endereco,
      data_hora: new Date(),
      forma_pagamento: "Pix",
      total: 2999.99,
      desconto: 100.00,
      status: "confirmado",
      itens: {
        create: [
          {
            id_produto: produto.id_produto,
            quantidade: 1,
            preco: 2999.99,
          },
        ],
      },
      historicos: {
        create: [
          { status: "em processamento" },
          { status: "confirmado" },
        ],
      },
    },
    include: { itens: true, historicos: true },
  });

  console.log("Pedido criado:", pedido);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Erro:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
