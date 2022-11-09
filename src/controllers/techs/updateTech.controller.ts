import { Request, Response } from "express";
import updateTechService from "../../services/techs/updateTech.services";

const updateTechController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const updated = await updateTechService(id, data);
  return res.status(200).json(updated);
};

export default updateTechController;
