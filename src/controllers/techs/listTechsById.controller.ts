import { Request, Response } from "express";
import listTechsByIdServices from "../../services/techs/listTechById.services";
import listTechsService from "../../services/techs/listTechs.service";

const listTechsByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tech = await listTechsByIdServices(id);

  return res.status(200).json(tech);
};

export default listTechsByIdController;
