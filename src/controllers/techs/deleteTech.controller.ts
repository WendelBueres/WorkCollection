import { Request, Response } from "express";
import deleteTechService from "../../services/techs/deleteTech.service";


const deleteTechController = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  await deleteTechService(id);

  return res.status(204).json({ message: "Successfully Deleted" });
};

export default deleteTechController;
