import type { Request, Response } from "express";
import type { ChangeLangDto } from "./language.type.js";
import { StatusCodes } from "http-status-codes";

const changeLang = (req: Request, res: Response) => {
  const { lang } = req.body as ChangeLangDto;
  res.cookie("lang", lang).status(StatusCodes.OK).json({ lang });
};

export default { changeLang };
