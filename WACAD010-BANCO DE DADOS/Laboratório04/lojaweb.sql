CREATE DATABASE LojaWeb;
USE LojaWeb;

CREATE TABLE Cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(150) NOT NULL,
    cpf CHAR(11) UNIQUE NOT NULL,
    celular VARCHAR(15) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    data_nascimento DATE NOT NULL
);

CREATE TABLE Endereco (
    id_endereco INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    rua VARCHAR(150) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    complemento VARCHAR(50),
    cidade VARCHAR(100) NOT NULL,
    estado CHAR(2) NOT NULL,
    cep CHAR(8) NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente)
);

CREATE TABLE Categoria (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nome_categoria VARCHAR(100) NOT NULL
);

CREATE TABLE SubCategoria (
    id_subcategoria INT AUTO_INCREMENT PRIMARY KEY,
    id_categoria INT NOT NULL,
    nome_subcategoria VARCHAR(100) NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES Categoria(id_categoria)
);

CREATE TABLE Produto (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    id_subcategoria INT NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    fabricante VARCHAR(100) NOT NULL,
    preco_base DECIMAL(10,2) NOT NULL,
    quantidade INT NOT NULL,
    FOREIGN KEY (id_subcategoria) REFERENCES SubCategoria(id_subcategoria)
);

CREATE TABLE NumeroSerie (
    id_numserie INT AUTO_INCREMENT PRIMARY KEY,
    id_produto INT NOT NULL,
    numero_serie VARCHAR(100) UNIQUE NOT NULL,
    FOREIGN KEY (id_produto) REFERENCES Produto(id_produto)
);

CREATE TABLE Compra (
    id_compra INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_endereco INT NOT NULL,
    data_hora DATETIME NOT NULL,
    desconto DECIMAL(5,2) DEFAULT 0.00,
    forma_pagamento VARCHAR(50) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente),
    FOREIGN KEY (id_endereco) REFERENCES Endereco(id_endereco)
);

CREATE TABLE ItensCompra (
    id_compra INT NOT NULL,
    id_produto INT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (id_compra, id_produto),
    FOREIGN KEY (id_compra) REFERENCES Compra(id_compra),
    FOREIGN KEY (id_produto) REFERENCES Produto(id_produto)
);
