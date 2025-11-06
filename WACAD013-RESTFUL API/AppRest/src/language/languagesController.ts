import { Request, Response } from "express";
import { ReasonPhrases } from "http-status-codes";

const changeLanguage = (req: Request, res: Response) => {
  const { lang } = req.body;
  res.cookie("lang", lang).json(lang);
};

const deleteLanguage = (req: Request, res: Response) => {
  res.clearCookie("lang").json(ReasonPhrases.OK);
};

export default { changeLanguage, deleteLanguage };
