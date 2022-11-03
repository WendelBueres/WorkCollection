import { Router } from "express";
import deleteContactController from "../controllers/contacts/deleteContect.controller";
import createProjectController from "../controllers/project/createProject.controller";
import listProjectsController from "../controllers/project/listProjects.controller";
import updateProjectController from "../controllers/project/updateProject.controller";

const projectRoutes = Router();

projectRoutes.post("", createProjectController);
projectRoutes.get("", listProjectsController);
projectRoutes.patch("/:id", updateProjectController);
projectRoutes.delete("/:id", deleteContactController);

export default projectRoutes;
