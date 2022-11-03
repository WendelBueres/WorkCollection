import { Request, Response } from "express";
import deleteContactService from "../../services/contacts/deleteContact.services";

const deleteContactController = async (req: Request, res: Response) => {
  const id = req.params.id;

  const deleteContact = await deleteContactService(id);

  return res.status(204).json(deleteContact);
};

export default deleteContactController;
