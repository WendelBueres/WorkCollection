import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import listProjectsService from "../../services/projects/listProjects.services";

const listProjectsController = async (req: Request, res: Response) => {
  const listedProjects = await listProjectsService();

  return res.status(200).json(instanceToPlain(listedProjects));
};

export default listProjectsController;
