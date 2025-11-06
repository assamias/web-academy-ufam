import { Request, Response } from "express";
import { AddPurchaseItem } from "./purchaseItens.types";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const list = (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json(req.session.cart);
};

const add = (req: Request, res: Response) => {
  const purchaseItem = req.body as AddPurchaseItem;

  req.session.cart?.push(purchaseItem);
  res.status(StatusCodes.OK).json(ReasonPhrases.OK);
};

export { add, list };
