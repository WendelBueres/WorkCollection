import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import listUserService from "../../services/users/listuser.service";

const listUserController = async (req: Request, res: Response) => {
  const users = await listUserService();
  return res.json(instanceToPlain(users));
};

export default listUserController;