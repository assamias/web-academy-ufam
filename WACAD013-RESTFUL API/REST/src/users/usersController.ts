import { Request, Response } from "express";
import {
  createUser,
  getUserByEmail,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "./usersService";
import { CreateUserDTO, UpdateUserDTO } from "./usersType";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const index = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    // 200 OK: Retorna a lista de usuários
    return res.status(StatusCodes.OK).json(users);
  } catch (error) {
    console.error("Erro ao listar todos os usuários:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

const read = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "ID do usuário não fornecido na URL.",
    });
  }
  try {
    const user = await getUserById(id);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    }
    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    console.error(`Erro ao buscar usuário ${id}:`, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
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
    console.error("ERRO CRÍTICO no createUser:", error);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
      detail: "Erro ao criar usuário. Verifique os logs do servidor.",
    });
  }
};

const remove = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "ID do usuário não fornecido na URL.",
    });
  }
  try {
    await deleteUser(id);
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    console.error(`Erro ao excluir usuário ${id}:`, error);

    // 💡 Trata erro específico do Prisma para 'registro não encontrado'
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Usuário não encontrado para exclusão." });
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

const update = async (req: Request, res: Response) => {
  const id = req.params.id;
  const dataToUpdate = req.body as UpdateUserDTO;

  if (!id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "ID do usuário não fornecido na URL.",
    });
  }
  try {
    const updatedUser = await updateUser(id, dataToUpdate);
    return res.status(StatusCodes.OK).json(updatedUser);
  } catch (error) {
    console.error(`Erro ao atualizar usuário ${id}:`, error);

    // 💡 Trata erro específico do Prisma para 'registro não encontrado'
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Usuário não encontrado para atualização." });
    }
    // Trata erro de conflito (ex: tentar mudar para um e-mail já existente - P2002)
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: "E-mail já cadastrado." });
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

export default {
  index,
  read,
  create,
  remove,
  update,
};
