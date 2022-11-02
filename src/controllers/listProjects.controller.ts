import { Request, Response } from "express";
import listProjectsService from "../service/listProjects.service";

const listProjectsController = async(req: Request, res: Response) => {

    const listedProjects = listProjectsService()

    return res.status(200).json(listedProjects)
}

export default listProjectsController;