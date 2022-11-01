import { Request, Response } from "express";
import createProjectService from "../services/createdProject.service";


const createProjectController = (req: Request, res: Response) => {
    const data = req.body;
    const userId = req.user.id;

    const createdProject = createProjectService(data, userId);

    return res.status(201).json(createdProject);
}

export default createProjectController;