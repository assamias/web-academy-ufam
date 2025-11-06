import { Request, Response, NextFunction } from "express";
import { UserTypes } from "../userType/userTypes.constants";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.session.uid || req.session.userTypeId !== UserTypes.ADMIN) {
    res.status(StatusCodes.FORBIDDEN).json(ReasonPhrases.FORBIDDEN);
  } else {
    next();
  }
}

export default isAdmin;
