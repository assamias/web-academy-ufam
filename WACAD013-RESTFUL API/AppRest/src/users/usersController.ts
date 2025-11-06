import { Request, Response } from "express";
import { createUser, getUserByEmail } from "./usersService";
import { CreateUserDTO } from "./usersType";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const index = (req: Request, res: Response) => {
  res.send("Users controller funcionando!");
};

const read = (req: Request, res: Response) => {
  res.send("Users controller funcionando!");
};

const create = async (req: Request, res: Response) => {
  try {
    const user = req.body as CreateUserDTO;

    if (!(await getUserByEmail(user.email))) {
      const newUser = await createUser(user);
      res.status(StatusCodes.OK).json(newUser);
    } else {
      res.status(StatusCodes.CONFLICT).json(ReasonPhrases.CONFLICT);
    }
  } catch (error) {
    res.status(500).send("Erro ao criar usuário");
  }
};

const remove = (req: Request, res: Response) => {
  res.send("Users controller funcionando!");
};

const update = (req: Request, res: Response) => {
  res.send("Users controller funcionando!");
};

export default {
  index,
  read,
  create,
  remove,
  update,
};
