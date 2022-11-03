import { Request, Response } from "express";
import createProjectService from "../../services/contacts/createProject.services";

const createProjectController = async (req: Request, res: Response) => {
  const data = req.body;
  const userId = req.user.id;

  const createdProject = await createProjectService(data, userId);

  return res.status(201).json(createdProject);
};

export default createProjectController;
