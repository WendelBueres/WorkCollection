import { Request, Response } from "express";
import listTechsService from "../../services/techs/listTechs.services";

const listTechsController = async (req: Request, res: Response) => {
  const listedTechs = await listTechsService();

  return res.status(200).json(listedTechs);
};

export default listTechsController;
