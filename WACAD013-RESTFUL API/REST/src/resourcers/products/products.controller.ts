//responder as requisições do cliente
import { Request, Response } from "express";
//import productsService from "./products.service";
import { CreateProductDTO } from "./products.types";
import {
  createProduct,
  getAllProducts,
  getProduct,
  productAlreadyExists,
  updateProduct,
  deleteProduct,
} from "./products.service";

const index = async (req: Request, res: Response) => {
  /*
    #swagger.sumary = "Lista todos os produtos"

    #swagger.response[200] = {
      description: "Retorna um array de produtos"
      schema: {
        type: "array",
        itens: {
          $ref: '#/definitions/Product'
        }
      }
    }
    #swagger.response[500] = {
      description: "Erro no servidor"
    }
    
  */
  try {
    const products = await getAllProducts();
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar produtos." });
  }
};

const read = async (req: Request, res: Response) => {
  /*
    #swagger.sumary = "Lê um produto do bd"
    #swagger.parameters['id'] = {
      description: "O id de um produto cadastrado"
    }

    #swagger.response[200] = {
      description: "retorno do produto"
      schema: {$ref: '#/definitions/Product'}
    }
    
    #swagger.response[400] = {
      description: "O produto já existe"
    }
    
    #swagger.response[500] = {
      description: "Erro no servidor"
    }

  */
  try {
    const id = req.params.id as string;
    const product = await getProduct(id);

    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado." });
    } else {
      return res.json(product);
    }
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar produto." });
  }
};

const create = async (req: Request, res: Response) => {
  /*
    #swagger.sumary = 'Criar um novo produto'
    #swagger.parameters['body'] = {
      in: 'body',
      schema: {$ref: '#/definitions/CreateProductDTO'}
    }
    
    #swagger.response[201] = {
      description: "O produto foi criado com sucesso"
      schema: {$ref: '#/definitions/Product'}
    }
    #swagger.response[409] = {
      description: "O produto já existe"
    }
    #swagger.response[500] = {
      description: "Erro no servidor"
    }

  */
  try {
    const product: CreateProductDTO = req.body;

    if (await productAlreadyExists(product.name)) {
      return res.status(409).json({ message: "Produto já existe." });
    } else {
      const newProduct = await createProduct(product);
      res.status(201).json(newProduct);
    }
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar produto." });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const data: Partial<CreateProductDTO> = req.body;

    const product = await getProduct(id);
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    const updatedProduct = await updateProduct(id, data);
    return res.json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao atualizar produto." });
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const product = await getProduct(id);
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    await deleteProduct(id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Erro ao deletar produto." });
  }
};

export default { index, read, create, update, remove };
