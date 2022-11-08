import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import getUsersByIdServices from "../../services/users/getUsersById.services";

const getUsersByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await getUsersByIdServices(id);
  return res.status(200).json(instanceToPlain(user));
};

export default getUsersByIdController;
