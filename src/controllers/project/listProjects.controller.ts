import { Request, Response } from "express";
import listProjectsService from "../../services/projects/listProjects.services";

const listProjectsController = async (req: Request, res: Response) => {
  const listedProjects = listProjectsService();

  return res.status(200).json(listedProjects);
};

export default listProjectsController;
