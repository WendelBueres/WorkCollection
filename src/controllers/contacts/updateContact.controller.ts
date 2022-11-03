import { Request, Response } from "express";
import { IContactRequest } from "../../interfaces/contact";
import updateContactService from "../../services/contacts/updateContact.services";

const updateContactController = async (req: Request, res: Response) => {
  const data: IContactRequest = req.body;
  const id: string = req.params.id;

  const update = await updateContactService(data, id);

  return res.status(200).json(update);
};

export default updateContactController;
