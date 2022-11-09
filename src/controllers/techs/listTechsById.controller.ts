import { Request, Response } from "express";
import listTechsByIdServices from "../../services/techs/listTechById.services";

const listTechsByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tech = await listTechsByIdServices(id);

  return res.status(200).json(tech);
};

export default listTechsByIdController;
