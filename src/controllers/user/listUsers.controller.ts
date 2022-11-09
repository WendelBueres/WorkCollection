import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import listUsersServices from "../../services/users/listUsers.services";

const listUsersController = async (req: Request, res: Response) => {
  const users = await listUsersServices();
  return res.status(200).json(instanceToPlain(users));
};

export default listUsersController;
