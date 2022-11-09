import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import listUsersByIdServices from "../../services/users/listUsersById.services";

const listUsersByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await listUsersByIdServices(id);
  return res.status(200).json(instanceToPlain(user));
};

export default listUsersByIdController;
