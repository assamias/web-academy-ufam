import cookieParser from "cookie-parser";
import { LanguageTypes } from "../language/languageConstants";
import { NextFunction } from "express";
import { Request, Response } from "express";

function createLanguage() {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!("lang" in req.cookies)) {
      res.cookie("lang", LanguageTypes.PT);
    }
    next();
  };
}

export default createLanguage;
