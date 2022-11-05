import { Request, Response } from "express";
import updateProjectService from "../../services/projects/updateProject.services";

const updateProjectController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const projectInfo = req.body;
  const update = await updateProjectService(id, projectInfo);
  return res.status(204).json(update);
};

export default updateProjectController;
