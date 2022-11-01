import { Request, Response } from "express";
import { IProject } from "../interfaces/projects";
import createProjectService from "../service/createProject.service";


const createProjectController = async(req: Request, res: Response) => {
    const data = await req.body
    const userId = req.user.id

    const createdProject = await createProjectService(data, userId)

    return res.status(201).json(createdProject)
}

export default createProjectController;