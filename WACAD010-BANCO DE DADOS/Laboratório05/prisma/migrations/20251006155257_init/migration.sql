-- CreateTable
CREATE TABLE `Cliente` (
    `id_cliente` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_completo` VARCHAR(150) NOT NULL,
    `cpf` CHAR(11) NOT NULL,
    `celular` VARCHAR(15) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `data_nascimento` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Cliente_cpf_key`(`cpf`),
    UNIQUE INDEX `Cliente_email_key`(`email`),
    PRIMARY KEY (`id_cliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Endereco` (
    `id_endereco` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cliente` INTEGER NOT NULL,
    `rua` VARCHAR(150) NOT NULL,
    `numero` VARCHAR(10) NOT NULL,
    `complemento` VARCHAR(50) NULL,
    `cidade` VARCHAR(100) NOT NULL,
    `estado` CHAR(2) NOT NULL,
    `cep` CHAR(8) NOT NULL,

    PRIMARY KEY (`id_endereco`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `id_categoria` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_categoria` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id_categoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubCategoria` (
    `id_subcategoria` INTEGER NOT NULL AUTO_INCREMENT,
    `id_categoria` INTEGER NOT NULL,
    `nome_subcategoria` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id_subcategoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produto` (
    `id_produto` INTEGER NOT NULL AUTO_INCREMENT,
    `id_subcategoria` INTEGER NOT NULL,
    `modelo` VARCHAR(100) NOT NULL,
    `fabricante` VARCHAR(100) NOT NULL,
    `preco_base` DECIMAL(10, 2) NOT NULL,
    `quantidade` INTEGER NOT NULL,

    PRIMARY KEY (`id_produto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NumeroSerie` (
    `id_numserie` INTEGER NOT NULL AUTO_INCREMENT,
    `id_produto` INTEGER NOT NULL,
    `numero_serie` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `NumeroSerie_numero_serie_key`(`numero_serie`),
    PRIMARY KEY (`id_numserie`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Compra` (
    `id_compra` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cliente` INTEGER NOT NULL,
    `id_endereco` INTEGER NOT NULL,
    `data_hora` DATETIME(3) NOT NULL,
    `desconto` DECIMAL(5, 2) NULL DEFAULT 0.00,
    `forma_pagamento` VARCHAR(50) NOT NULL,
    `total` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id_compra`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItensCompra` (
    `id_compra` INTEGER NOT NULL,
    `id_produto` INTEGER NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `preco_unitario` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id_compra`, `id_produto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `Endereco_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `Cliente`(`id_cliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubCategoria` ADD CONSTRAINT `SubCategoria_id_categoria_fkey` FOREIGN KEY (`id_categoria`) REFERENCES `Categoria`(`id_categoria`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_id_subcategoria_fkey` FOREIGN KEY (`id_subcategoria`) REFERENCES `SubCategoria`(`id_subcategoria`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NumeroSerie` ADD CONSTRAINT `NumeroSerie_id_produto_fkey` FOREIGN KEY (`id_produto`) REFERENCES `Produto`(`id_produto`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Compra` ADD CONSTRAINT `Compra_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `Cliente`(`id_cliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Compra` ADD CONSTRAINT `Compra_id_endereco_fkey` FOREIGN KEY (`id_endereco`) REFERENCES `Endereco`(`id_endereco`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItensCompra` ADD CONSTRAINT `ItensCompra_id_compra_fkey` FOREIGN KEY (`id_compra`) REFERENCES `Compra`(`id_compra`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItensCompra` ADD CONSTRAINT `ItensCompra_id_produto_fkey` FOREIGN KEY (`id_produto`) REFERENCES `Produto`(`id_produto`) ON DELETE RESTRICT ON UPDATE CASCADE;
