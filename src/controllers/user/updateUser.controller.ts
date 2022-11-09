import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import updateUserService from "../../services/users/updateUser.services";

const updateUserController = async (req: Request, res: Response) => {
  const data = req.body;
  const { id } = req.user;
  const update = await updateUserService(data, id);
  return res.status(200).json(instanceToPlain(update));
};

export default updateUserController;
