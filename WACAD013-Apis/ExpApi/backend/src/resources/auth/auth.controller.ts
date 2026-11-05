import type { Request, Response } from "express";
import type { LoginDto, SignupDto } from "./auth.types.js";
import { createUser, findByEmail } from "../user/user.service.js";
import { UserTypes } from "../userType/userType.constants.js";
import { authErrors } from "./auth.errors.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { checkCredentials } from "./auth.servise.js";

const signup = async (req: Request, res: Response) => {
  const data = req.body as SignupDto;
  try {
    if (await findByEmail(data.email)) {
      return res.status(StatusCodes.CONFLICT).send(ReasonPhrases.CONFLICT);
    }
    const user = await createUser({ ...data, userTypeId: UserTypes.CLIENT });
    res.status(StatusCodes.CREATED).json(user);
  } catch (err) {
    authErrors(err, res);
  }
};

const login = async (req: Request, res: Response) => {
  const data = req.body as LoginDto;
  try {
    const user = await checkCredentials(data);
    if (!user) {
      res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
    } else {
      req.session.userId = user.id;
      req.session.userTypeId = user.userTypeId;
      res.status(StatusCodes.OK).send(ReasonPhrases.OK);
    }
  } catch (err) {
    authErrors(err, res);
  }
};

const logout = async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
    res.clearCookie("sid");
    res.status(StatusCodes.NO_CONTENT).send(ReasonPhrases.NO_CONTENT);
  });
};

export default { signup, login, logout };
