import { Router } from "express";
import createProjectController from "../controllers/project/createProject.controller";
import deleteProjectController from "../controllers/project/deleteProject.controller";
import listProjectsController from "../controllers/project/listProjects.controller";
import updateProjectController from "../controllers/project/updateProject.controller";
import hasAuthMiddleware from "../middlewares/hasAuth.middleware";

const projectRoutes = Router();

projectRoutes.post("", hasAuthMiddleware, createProjectController);
projectRoutes.get("", listProjectsController);
projectRoutes.patch("/:id", hasAuthMiddleware, updateProjectController);
projectRoutes.delete("/:id", hasAuthMiddleware, deleteProjectController);

export default projectRoutes;
