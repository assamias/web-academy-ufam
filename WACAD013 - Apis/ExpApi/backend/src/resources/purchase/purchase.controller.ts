import type { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { createPurchase } from "./purchase.service.js";
import type { AddToCartDto } from "./purchase.types.js";

export const addToCart = async (req: Request, res: Response) => {
  const { productId, quantity } = req.body as AddToCartDto;

  try {
    if (!req.session.cart) {
      req.session.cart = [];
    }

    const itemIndex = req.session.cart.findIndex(
      (item) => item.productId === productId,
    );

    if (itemIndex > -1) {
      // Usamos o '!' ou verificação direta para garantir ao TS que o item existe nesse índice
      const item = req.session.cart[itemIndex];
      if (item) {
        item.quantity += quantity;
      }
    } else {
      req.session.cart.push({ productId, quantity });
    }

    res.status(StatusCodes.OK).json({
      msg: "Produto adicionado ao carrinho",
      cart: req.session.cart,
    });
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

export const getCart = async (req: Request, res: Response) => {
  try {
    const cart = req.session.cart || [];
    res.status(StatusCodes.OK).json(cart);
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

export const checkout = async (req: Request, res: Response) => {
  const userId = req.session.userId;
  const cart = req.session.cart;

  try {
    if (!cart || cart.length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "O carrinho está vazio" });
    }

    const purchase = await createPurchase(userId as string, cart);

    // Esvazia o carrinho após a compra ser salva no banco
    req.session.cart = [];

    res.status(StatusCodes.CREATED).json(purchase);
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};
