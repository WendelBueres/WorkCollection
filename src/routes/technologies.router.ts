import { Router } from "express";
import createTechController from "../controllers/techs/createTechController";
import deleteTechController from "../controllers/techs/deleteTech.controller";
import listTechsController from "../controllers/techs/listTechs.controller";
import listTechsByIdController from "../controllers/techs/listTechsById.controller";
import updateTechController from "../controllers/techs/updateTech.controller";
import hasAuthMiddleware from "../middlewares/hasAuth.middleware";

const technologiesRouter = Router();

technologiesRouter.post("", hasAuthMiddleware, createTechController);
technologiesRouter.get("", listTechsController);
technologiesRouter.patch("/:id", updateTechController);
technologiesRouter.get("/:id", listTechsByIdController);
technologiesRouter.delete("/:id", deleteTechController);

export default technologiesRouter;
