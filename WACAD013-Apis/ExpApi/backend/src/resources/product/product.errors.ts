import { PrismaClientValidationError } from "@prisma/client/runtime/client";
import type { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { PrismaClientKnownRequestError } from "../../generated/prisma/internal/prismaNamespace.js";

export function productErrors(err: any, res: Response) {
  if (err instanceof PrismaClientValidationError) {
    res.status(StatusCodes.BAD_GATEWAY).json({
      error: "Validation Error",
      message: "The data provided is invalid. ",
    });
  } else if (err instanceof PrismaClientKnownRequestError) {
    res.status(StatusCodes.BAD_GATEWAY).json({
      error: "Database Error",
      message: err.message,
    });
  } else {
    res.status(500).json({
      error: "Internal Server Error",
      message: "Something went wrong. Please try again later.",
    });
  }
}
