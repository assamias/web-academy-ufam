import type { NextFunction, Request, Response } from "express";
import { UserTypes } from "../resources/userType/userType.constants.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session.userTypeId && req.session.userTypeId === UserTypes.ADMIN)
    next();
  else res.status(StatusCodes.FORBIDDEN).send(ReasonPhrases.FORBIDDEN);
}

export default isAdmin;
