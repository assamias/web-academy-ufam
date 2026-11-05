import type { Request, Response } from "express";
import type { CreateUserDto } from "./user.types.js";
import {
  createUser,
  getUser,
  getUsers,
  findByEmail,
  updateUser,
  deleteUser,
} from "./user.service.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { userErrors } from "./user.errors.js";

const index = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();

    res.status(StatusCodes.OK).json(users);
  } catch (err) {
    userErrors(err, res);
  }
};

const create = async (req: Request, res: Response) => {
  const data = req.body as CreateUserDto;
  try {
    if (await findByEmail(data.email)) {
      return res.status(StatusCodes.CONFLICT).send(ReasonPhrases.CONFLICT);
    }
    const user = await createUser(data);
    res.status(StatusCodes.CREATED).json(user);
  } catch (err) {
    userErrors(err, res);
  }
};

const read = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  try {
    const user = await getUser(id);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    }

    res.status(StatusCodes.OK).json(user);
  } catch (err) {
    userErrors(err, res);
  }
};

const update = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const data = req.body as CreateUserDto;

  try {
    const user = await updateUser(id, data);

    res.status(StatusCodes.OK).json(user);
  } catch (err) {
    userErrors(err, res);
  }
};

const remove = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  try {
    await deleteUser(id);

    res.status(StatusCodes.NO_CONTENT).send();
  } catch (err) {
    userErrors(err, res);
  }
};

export default {
  index,
  create,
  read,
  update,
  remove,
};
