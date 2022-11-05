import { Request, Response } from "express";
import deleteContactService from "../../services/contacts/deleteContact.services";

const deleteContactController = async (req: Request, res: Response) => {
  const { id, contact } = req.params;

  await deleteContactService(id, contact);

  return res.status(204).send();
};

export default deleteContactController;
