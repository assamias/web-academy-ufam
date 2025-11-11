import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../users/usersService";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { SignUp, Login } from "./auth.types";
import { UserTypes } from "../userType/userTypes.constants";
import { checkCredentials } from "./auth.service";

const signup = async (req: Request, res: Response) => {
  try {
    const user = req.body as SignUp;

    if (!(await getUserByEmail(user.email))) {
      const newUser = await createUser({
        ...user,
        userTypeId: UserTypes.CLIENT,
      });
      res.status(StatusCodes.CREATED).json(newUser);
    } else {
      res.status(StatusCodes.CONFLICT).json(ReasonPhrases.CONFLICT);
    }
  } catch (e) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};
const login = async (req: Request, res: Response) => {
  try {
    const credentials = req.body as Login;
    const user = await checkCredentials(credentials);

    if (!user) {
      res.status(StatusCodes.UNAUTHORIZED).json(ReasonPhrases.UNAUTHORIZED);
    } else {
      req.session.uid = user.id;
      req.session.userTypeId = user.userTypeId;

      res.status(StatusCodes.OK).json(ReasonPhrases.OK);
    }
  } catch (e) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};
const logout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Erro ao destruir a sessão:", err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        detail: "Falha ao finalizar a sessão.",
      });
    }
    res.clearCookie("connect.sid");

    return res.status(StatusCodes.NO_CONTENT).send();
  });
};

export default { signup, login, logout };
