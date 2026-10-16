declare const process: any;
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Função auxiliar para gerar código de barras aleatório
function gerarCodigoBarras(): string {
  return String(Math.floor(1000000000000 + Math.random() * 9000000000000));
}

// --------------------------- CREATE ---------------------------
async function criarProduto() {
  // Cria categoria e subcategoria antes do produto
  const categoria = await prisma.categoria.create({
    data: { nome: "Equipamentos" },
  });

  const subcategoria = await prisma.subCategoria.create({
    data: {
      nome: "Periféricos",
      categoria_id: categoria.id_categoria,
    },
  });

  // Agora cria o produto vinculado à subcategoria
  const novoProduto = await prisma.produto.create({
    data: {
      nome: "Teclado Mecânico Redragon Kumara",
      marca: "Redragon",
      preco_unitario: 299.9,
      quantidade: 15,
      codigo_barras: gerarCodigoBarras(),
      subcategoria_id: subcategoria.id_subcategoria,
    },
  });

  console.log("Produto criado com sucesso:", novoProduto);
  return novoProduto;
}

// --------------------------- READ ---------------------------
async function listarProdutos() {
  const produtos = await prisma.produto.findMany({
    include: { subcategoria: true },
  });

  console.log("\n=== LISTA DE PRODUTOS ===");
  if (produtos.length === 0) {
    console.log("Nenhum produto encontrado.");
    return;
  }

  console.table(
    produtos.map((p) => ({
      id: p.id_produto,
      nome: p.nome,
      marca: p.marca,
      preco: p.preco_unitario,
      quantidade: p.quantidade,
      subcategoria: p.subcategoria?.nome || "Sem subcategoria",
    }))
  );
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

// --------------------------- EXECUÇÃO VIA ARGUMENTO ---------------------------
async function main() {
  console.log("=== CRUD DE PRODUTOS ===");
  const acao = process.argv[2]; // argumento do terminal (create, read, update, delete)

  if (acao === "create") {
    await criarProduto();
  } else if (acao === "read") {
    await listarProdutos();
  } else if (acao === "update") {
    const id = Number(process.argv[3]) || 1;
    await atualizarProduto(id);
  } else if (acao === "delete") {
    const id = Number(process.argv[3]) || 1;
    await deletarProduto(id);
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
