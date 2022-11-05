import { Request, Response } from "express";
import deleteProjectService from "../../services/projects/deleteProject.services";

const deleteProjectController = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  const deleteProject = await deleteProjectService(id);

  return res.status(202).json({ message: "Successfully Deleted" });
};

export default deleteProjectController;
