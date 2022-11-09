import { Request, Response } from "express";
import { IProject } from "../../interfaces/projects";
import { instanceToPlain } from "class-transformer";
import createProjectService from "../../services/projects/createProject.services";

const createProjectController = async (req: Request, res: Response) => {
  const userId = req.user.id;

  const data: IProject = req.body;

  const createdProject = await createProjectService(data, userId);

  return res.status(201).json(instanceToPlain(createdProject));
};

export default createProjectController;
