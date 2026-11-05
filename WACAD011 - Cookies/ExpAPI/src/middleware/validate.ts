import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { Schema } from "joi";

function validate(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json(error);
    }
    next();
  };
}

export default validate;
