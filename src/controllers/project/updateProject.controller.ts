import { Request, Response } from "express";
import updateProjectService from "../../services/projects/updateProject.services";

const updateProjectController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const userId = req.user.id;
  const projectInfo = req.body;
  const update = await updateProjectService(id, userId, projectInfo);
  return res.status(200).json(update);
};

export default updateProjectController;
