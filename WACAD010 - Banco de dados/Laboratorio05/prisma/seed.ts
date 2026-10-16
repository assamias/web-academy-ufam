declare const process: any;
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
  console.log("Iniciando seed");

  // Cria Categoria e SubCategoria (necessárias para Produto)
  const categoria = await prisma.categoria.create({
    data: {
      nome: "Importados (API)",
      subcategorias: {
        create: [{ nome: "Produtos Web" }],
      },
    },
    include: { subcategorias: true },
  });
  const subcategoria = categoria.subcategorias[0];
  console.log(`Subcategoria criada: ${subcategoria.nome}`);

  // Buscar usuário da RandomUser API
  console.log("Buscando usuário");
  const userResp = await fetch("https://randomuser.me/api/");
  const userData = (await userResp.json()) as any;
  const user = userData.results[0];

  const cliente = await prisma.cliente.create({
    data: {
      nome_completo: `${user.name.first} ${user.name.last}`,
      cpf: Array.from({ length: 11 }, () => String(randomInt(0, 9))).join(""),
      telefone: user.phone || "92999999999",
      email: user.email,
      data_nascimento: new Date(user.dob.date),
      enderecos: {
        create: {
          rua: user.location.street.name,
          numero: String(user.location.street.number),
          complemento: "API",
          cidade: user.location.city,
          estado: user.location.state.slice(0, 2),
          cep: String(user.location.postcode).replace(/\D/g, "").padEnd(8, "0"),
        },
      },
    },
    include: { enderecos: true },
  });
  console.log(`Cliente criado: ${cliente.nome_completo}`);

  // Buscar produtos DummyJSON
  console.log("Buscando produtos");
  const respProdutos = await fetch("https://dummyjson.com/products?limit=2");
  const produtosData = (await respProdutos.json()) as any;
  const produtosApi = produtosData.products;

  const produtosCriados = [];
  for (const p of produtosApi) {
    const produto = await prisma.produto.create({
      data: {
        nome: p.title.substring(0, 100),
        marca: p.brand || "Fornecedor Web",
        preco_unitario: parseFloat(p.price),
        quantidade: randomInt(1, 10),
        subcategoria_id: subcategoria.id_subcategoria,
        codigo_barras: `${randomInt(1000000000000, 9999999999999)}`,
      },
    });
    produtosCriados.push(produto);
  }
  console.log(`produtos inseridos.`);

  // Criar pedido e itens
  const endereco = cliente.enderecos[0];
  const itens = produtosCriados.map((p) => ({
    id_produto: p.id_produto,
    quantidade: randomInt(1, 3),
    preco: p.preco_unitario,
  }));

  const total = itens.reduce(
    (acc, item) => acc + Number(item.preco) * item.quantidade,
    0
  );

  const pedido = await prisma.pedido.create({
    data: {
      cliente_id: cliente.id_cliente,
      endereco_id: endereco.id_endereco,
      data_hora: new Date(),
      forma_pagamento: "Pix",
      desconto: 0.0,
      total,
      status: "confirmado",
      itens: { create: itens },
    },
    include: { itens: true },
  });

  console.log(`Pedido criado: ${pedido.id_pedido}`);
  console.log("Seed finalizado com sucesso!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error("Erro no seed:", e);
    prisma.$disconnect();
    process.exit(1);
  });
