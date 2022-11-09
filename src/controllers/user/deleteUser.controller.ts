import { Request, Response } from "express";
import deleteUserService from "../../services/users/deleteUser.services";

const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.user;
  const deleteUser = await deleteUserService(id);
  return res.status(204).json(deleteUser);
};

export default deleteUserController;
