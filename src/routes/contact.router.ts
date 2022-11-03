import { Router } from "express";
import deleteContactController from "../controllers/contacts/deleteContect.controller";
import listContactController from "../controllers/contacts/listContact.controller";
import updateContactController from "../controllers/contacts/updateContact.controller";
import createContactService from "../services/contacts/createContact.services";

const contactRoutes = Router();

contactRoutes.post("", createContactService);
contactRoutes.get("", listContactController);
contactRoutes.patch("/:id", updateContactController);
contactRoutes.delete("/:id", deleteContactController);

export default contactRoutes;
