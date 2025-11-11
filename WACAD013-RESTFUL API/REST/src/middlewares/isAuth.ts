import { NextFunction, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { UserTypes } from "../userType/userTypes.constants";

export function isAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.uid) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: ReasonPhrases.UNAUTHORIZED,
      detail:
        "Acesso negado. Usuário não autenticado. Faça login para continuar.",
    });
  }

  next();
}
