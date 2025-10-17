declare const process: any;
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Funções auxiliares
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gerarCpf(): string {
  return Array.from({ length: 11 }, () => String(randomInt(0, 9))).join("");
}

function gerarCodigoBarras(): string {
  return String(randomInt(1000000000000, 9999999999999));
}

async function main() {
  console.log("Iniciando seed do banco de dados...");

  // ------------------- Criação de Categoria e Subcategorias -------------------
  const categoria = await prisma.categoria.create({
    data: {
      nome: "Importados (API)",
      subcategorias: {
        create: [
          { nome: "Eletrônicos" },
          { nome: "Beleza" },
          { nome: "Casa & Cozinha" },
        ],
      },
    },
    include: { subcategorias: true },
  });

  console.log(`Categoria criada: ${categoria.nome}`);

  // ------------------- Buscar Usuários Aleatórios (RandomUser API) -------------------
  console.log("Buscando clientes aleatórios...");
  const responseUsers = await fetch("https://randomuser.me/api/?results=3&nat=br");
  const usersData = (await responseUsers.json()) as any;

  for (const user of usersData.results) {
    const cliente = await prisma.cliente.create({
      data: {
        nome_completo: `${user.name.first} ${user.name.last}`,
        cpf: gerarCpf(),
        telefone: user.phone || "92999999999",
        email: user.email,
        data_nascimento: new Date(user.dob.date),
        enderecos: {
          create: {
            rua: user.location.street.name,
            numero: String(user.location.street.number),
            complemento: "Casa",
            cidade: user.location.city,
            estado: user.location.state.slice(0, 2),
            cep: String(user.location.postcode).replace(/\D/g, "").padEnd(8, "0"),
          },
        },
      },
      include: { enderecos: true },
    });
    console.log(`Cliente criado: ${cliente.nome_completo}`);
  }

  // ------------------- Buscar Produtos Aleatórios (DummyJSON API) -------------------
  console.log("Buscando produtos da API DummyJSON...");
  const respProdutos = await fetch("https://dummyjson.com/products?limit=5");
  const produtosData = (await respProdutos.json()) as any;

  const subcat = categoria.subcategorias[0]; // primeira subcategoria
  for (const p of produtosData.products) {
    await prisma.produto.create({
      data: {
        nome: p.title.substring(0, 100),
        marca: p.brand || "Fornecedor Web",
        preco_unitario: Number(p.price),
        quantidade: randomInt(1, 20),
        codigo_barras: gerarCodigoBarras(),
        subcategoria_id: subcat.id_subcategoria,
      },
    });
  }
  console.log(`${produtosData.products.length} produtos inseridos com sucesso!`);

  // ------------------- Criar Pedido Aleatório -------------------
  const cliente = await prisma.cliente.findFirst({ include: { enderecos: true } });
  const produtos = await prisma.produto.findMany({ take: 2 });

  if (cliente && produtos.length > 0) {
    const itens = produtos.map((p) => ({
      id_produto: p.id_produto,
      quantidade: randomInt(1, 3),
      preco: Number(p.preco_unitario),
    }));

    const total = itens.reduce(
      (acc, i) => acc + i.quantidade * Number(i.preco),
      0
    );

    const pedido = await prisma.pedido.create({
      data: {
        cliente_id: cliente.id_cliente,
        endereco_id: cliente.enderecos[0].id_endereco,
        data_hora: new Date(),
        forma_pagamento: "Pix",
        desconto: 0,
        total: total,
        status: "confirmado",
        itens: { create: itens },
      },
      include: { itens: true },
    });

    console.log(`Pedido criado com ID: ${pedido.id_pedido} (Total: R$${total.toFixed(2)})`);
  }

  console.log("Seed finalizado com sucesso!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Erro no seed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
