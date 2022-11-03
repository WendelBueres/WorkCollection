import { Request, Response } from "express";
import getUsersServices from "../../services/users/getUsers.services";

const getUsersController = async (req: Request, res: Response) => {
  const users = await getUsersServices();

  return res.status(200).json(users);
};

export default getUsersController;
