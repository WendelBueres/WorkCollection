import { Request, Response } from "express";
import deleteTechService from "../../services/techs/deleteTech.services";

const deleteTechController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const { id: userId } = req.user;

  await deleteTechService(id, userId);

  return res.status(204).json({ message: "Successfully Deleted" });
};

export default deleteTechController;
