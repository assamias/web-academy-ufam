declare const process: any;
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// --------------------------- CREATE ---------------------------
async function criarProduto() {
  const novoProduto = await prisma.produto.create({
    data: {
      nome: "Teclado Mecânico Redragon Kumara",
      marca: "Redragon",
      preco_unitario: 299.9,
      quantidade: 15,
      codigo_barras: "992222414122",
      subcategoria_id: 1 // deve existir uma subcategoria com id=1
    },
  });
  console.log("Produto criado:", novoProduto);
  return novoProduto;
}

// --------------------------- READ ---------------------------
async function listarProdutos() {
  const produtos = await prisma.produto.findMany({
    include: { subcategoria: true },
  });
  console.log("Lista de produtos:", produtos);
  return produtos;
}

// --------------------------- UPDATE ---------------------------
async function atualizarProduto(id: number) {
  const existe = await prisma.produto.findUnique({
    where: { id_produto: id },
  });

  if (!existe) {
    console.log(`Nenhum produto com ID ${id} encontrado para atualizar.`);
    return null;
  }

  const produtoAtualizado = await prisma.produto.update({
    where: { id_produto: id },
    data: {
      preco_unitario: 279.9,
      quantidade: 20,
    },
  });
  console.log("Produto atualizado:", produtoAtualizado);
  return produtoAtualizado;
}

// --------------------------- DELETE ---------------------------
async function deletarProduto(id: number) {
  const existe = await prisma.produto.findUnique({
    where: { id_produto: id },
  });

  if (!existe) {
    console.log(`Nenhum produto com ID ${id} encontrado para exclusão.`);
    return;
  }

  await prisma.produto.delete({
    where: { id_produto: id },
  });
  console.log(`Produto com ID ${id} deletado com sucesso.`);
}

// --------------------------- EXECUÇÃO ---------------------------
async function main() {
  console.log("=== CRUD DE PRODUTOS ===");

  const novo = await criarProduto();

  await listarProdutos();

  if (novo) {
    await atualizarProduto(novo.id_produto);
  }

  await listarProdutos();

  if (novo) {
    await deletarProduto(novo.id_produto);
  }

  await listarProdutos();
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
