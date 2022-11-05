import { Router } from "express";
import deleteContactController from "../controllers/contacts/deleteContact.controller";
import listContactController from "../controllers/contacts/listContact.controller";
import updateContactController from "../controllers/contacts/updateContact.controller";

const contactRoutes = Router();

contactRoutes.get("", listContactController);
contactRoutes.patch("/:id", updateContactController);
contactRoutes.delete("/:id", deleteContactController);
contactRoutes.delete("/:id/:contact", deleteContactController);

export default contactRoutes;
