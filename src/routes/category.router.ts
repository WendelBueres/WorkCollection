import { Router } from "express";
import deleteContactController from "../controllers/contacts/deleteContect.controller";
import listContactController from "../controllers/contacts/listContact.controller";
import createContactService from "../services/contacts/createContact.services";

const categoryRoutes = Router();

categoryRoutes.post("", createContactService);
categoryRoutes.get("", listContactController);
categoryRoutes.patch("/:id");
categoryRoutes.delete("/:id", deleteContactController);

export default categoryRoutes;
