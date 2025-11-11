import { Request, Response } from "express";
import { AddPurchaseItem, CartItem } from "./purchaseItens.types";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import {
  getProductPriceAndStock,
  createPurchaseAndItems,
} from "../purchaseItem/purchaseItem.service";

const list = (req: Request, res: Response) => {
  const cart = req.session.cart || [];
  res.status(StatusCodes.OK).json(cart);
};

const add = async (req: Request, res: Response) => {
  const { productId, quantity } = req.body as AddPurchaseItem;

  if (!productId || typeof quantity !== "number" || quantity <= 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      detail: "ID do produto e quantidade são obrigatórios e válidos.",
    });
  }
  if (!req.session.cart) {
    req.session.cart = [];
  }

  try {
    const productInfo = await getProductPriceAndStock(productId);

    if (!productInfo) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ detail: "Produto não encontrado." });
    }
    if (productInfo.stock < quantity) {
      return res.status(StatusCodes.CONFLICT).json({
        detail: `Estoque insuficiente. Disponível: ${productInfo.stock}`,
      });
    }

    const newItem: CartItem = {
      productId,
      quantity,
      price: productInfo.price,
    };

    const existingItemIndex = req.session.cart.findIndex(
      (item) => item.productId === productId
    );

    if (existingItemIndex > -1) {
      req.session.cart[existingItemIndex]!.quantity += quantity;
    } else {
      req.session.cart.push(newItem);
    }

    res.status(StatusCodes.OK).json({
      message: "Produto adicionado ao carrinho.",
      cart: req.session.cart,
    });
  } catch (error) {
    console.error("Erro ao adicionar item ao carrinho:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};
const checkout = async (req: Request, res: Response) => {
  const userId = req.session.uid;

  if (!req.session.cart || req.session.cart.length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ detail: "O carrinho de compras está vazio." });
  }

  try {
    const purchase = await createPurchaseAndItems(
      userId as string,
      req.session.cart
    );

    req.session.cart = [];

    return res.status(StatusCodes.CREATED).json({
      message: "Compra concluída com sucesso.",
      purchaseId: purchase.id,
    });
  } catch (error) {
    console.error("Erro ao finalizar a compra:", error);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

export { add, list, checkout };
