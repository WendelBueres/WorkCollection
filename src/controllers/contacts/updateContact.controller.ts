import { Request, Response } from "express";
import updateContactService from "../../services/contacts/updateContact.services";

const updateContactController = async (req: Request, res: Response) => {
  const data = req.body;
  const { id } = req.params;

  const update = await updateContactService(data, id);

  return res.status(200).json(update);
};

export default updateContactController;
