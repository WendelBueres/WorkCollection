import { Router } from "express";
import deleteContactController from "../controllers/contacts/deleteContact.controller";
import listContactController from "../controllers/contacts/listContact.controller";
import updateContactController from "../controllers/contacts/updateContact.controller";
import hasAuthMiddleware from "../middlewares/hasAuth.middleware";

const contactRoutes = Router();

contactRoutes.get("", listContactController);
contactRoutes.patch("", hasAuthMiddleware, updateContactController);
contactRoutes.delete("", hasAuthMiddleware, deleteContactController);
contactRoutes.delete("/:contact", hasAuthMiddleware, deleteContactController);

export default contactRoutes;
