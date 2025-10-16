
-- LABORATÓRIO 01 - Sistema de Loja Web
-- Autor: Alexandre Samias


-- -----------------------------------------------------------------------------
-- USUÁRIOS E ENDEREÇOS
-- -----------------------------------------------------------------------------
CREATE TABLE usuario (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  nome_completo   VARCHAR(120) NOT NULL,
  cpf             CHAR(11) NOT NULL,
  telefone        VARCHAR(20) NOT NULL,
  email           VARCHAR(120) NOT NULL,
  data_nascimento DATE NOT NULL,
  data_cadastro   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status          ENUM('ATIVO','INATIVO') DEFAULT 'ATIVO',
  UNIQUE KEY uk_usuario_cpf (cpf),
  UNIQUE KEY uk_usuario_email (email)
);

CREATE TABLE endereco (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  usuario_id  BIGINT NOT NULL,
  apelido     VARCHAR(60),
  logradouro  VARCHAR(120) NOT NULL,
  numero      VARCHAR(10),
  complemento VARCHAR(60),
  bairro      VARCHAR(80),
  cidade      VARCHAR(80),
  estado      CHAR(2),
  cep         VARCHAR(10),
  pais        VARCHAR(60) DEFAULT 'Brasil',
  FOREIGN KEY (usuario_id) REFERENCES usuario(id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- -----------------------------------------------------------------------------
-- CATEGORIAS E FORNECEDORES
-- -----------------------------------------------------------------------------
CREATE TABLE categoria (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(80) NOT NULL,
  categoria_superior_id BIGINT NULL,
  UNIQUE KEY uk_categoria_nome (nome, categoria_superior_id),
  FOREIGN KEY (categoria_superior_id) REFERENCES categoria(id)
    ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE fornecedor (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(120) NOT NULL,
  cnpj CHAR(14),
  contato VARCHAR(120),
  site VARCHAR(200),
  UNIQUE KEY uk_fornecedor_nome (nome)
);

-- -----------------------------------------------------------------------------
-- ITENS DE CATÁLOGO E SÉRIES
-- -----------------------------------------------------------------------------
CREATE TABLE item_catalogo (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  nome                VARCHAR(120) NOT NULL,
  fornecedor_id       BIGINT NOT NULL,
  categoria_id        BIGINT NOT NULL,
  preco_base          DECIMAL(10,2) NOT NULL CHECK (preco_base >= 0),
  quantidade_estoque  INT NOT NULL DEFAULT 0 CHECK (quantidade_estoque >= 0),
  peso_gramas         INT DEFAULT 0,
  imposto_percentual  DECIMAL(5,2) DEFAULT 0,
  possui_numero_serie BOOLEAN DEFAULT 0,
  descricao           TEXT,
  FOREIGN KEY (fornecedor_id) REFERENCES fornecedor(id)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (categoria_id) REFERENCES categoria(id)
    ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE numero_serie_item (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  item_id BIGINT NOT NULL,
  numero_serie VARCHAR(100) NOT NULL,
  disponivel BOOLEAN DEFAULT 1,
  UNIQUE KEY uk_item_serie (item_id, numero_serie),
  FOREIGN KEY (item_id) REFERENCES item_catalogo(id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- -----------------------------------------------------------------------------
-- PEDIDOS E DETALHES
-- -----------------------------------------------------------------------------
CREATE TABLE pedido (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  usuario_id BIGINT NOT NULL,
  endereco_entrega_id BIGINT NOT NULL,
  data_hora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  desconto DECIMAL(10,2) DEFAULT 0 CHECK (desconto >= 0),
  forma_pagamento ENUM('PIX','CREDITO','DEBITO','BOLETO','DINHEIRO') NOT NULL,
  status_pedido ENUM('PENDENTE','ENVIADO','ENTREGUE','CANCELADO') DEFAULT 'PENDENTE',
  valor_total DECIMAL(12,2) NOT NULL CHECK (valor_total >= 0),
  FOREIGN KEY (usuario_id) REFERENCES usuario(id)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (endereco_entrega_id) REFERENCES endereco(id)
    ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE detalhe_pedido (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  pedido_id BIGINT NOT NULL,
  item_id BIGINT NOT NULL,
  serie_item_id BIGINT NULL,
  quantidade INT NOT NULL DEFAULT 1 CHECK (quantidade > 0),
  preco_unitario DECIMAL(10,2) NOT NULL CHECK (preco_unitario >= 0),
  FOREIGN KEY (pedido_id) REFERENCES pedido(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (item_id) REFERENCES item_catalogo(id)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (serie_item_id) REFERENCES numero_serie_item(id)
    ON DELETE SET NULL ON UPDATE CASCADE,
  UNIQUE KEY uk_detalhe_serie (serie_item_id),
  CHECK (serie_item_id IS NULL OR quantidade = 1)
);

-- -----------------------------------------------------------------------------
-- TRIGGER DE VALIDAÇÃO DE SÉRIES
-- -----------------------------------------------------------------------------
DELIMITER $$
CREATE TRIGGER trg_validar_serie_item
BEFORE INSERT ON detalhe_pedido
FOR EACH ROW
BEGIN
  IF NEW.serie_item_id IS NOT NULL THEN
    IF (SELECT disponivel FROM numero_serie_item WHERE id = NEW.serie_item_id) = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Número de série indisponível para venda';
    END IF;
    IF (SELECT item_id FROM numero_serie_item WHERE id = NEW.serie_item_id) <> NEW.item_id THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Número de série não corresponde ao item informado';
    END IF;
  END IF;
END$$
DELIMITER ;