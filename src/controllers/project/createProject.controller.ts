import { Request, Response } from "express";
import { IProject } from "../../interfaces/projects";
import createProjectService from "../../services/projects/createProject.services";

const createProjectController = async (req: Request, res: Response) => {
  const data: IProject = req.body;

  const createdProject = await createProjectService(data);

  return res.status(201).json(createdProject);
};

export default createProjectController;
