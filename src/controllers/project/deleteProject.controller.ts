import { Request, Response } from "express";
import deleteProjectService from "../../services/projects/deleteProject.services";

const deleteProjectController = async (req: Request, res: Response) => {
  const userId = req.user.id;

  const id: string = req.params.id;

  await deleteProjectService(id, userId);

  return res.status(204).json({ message: "Successfully Deleted" });
};

export default deleteProjectController;
