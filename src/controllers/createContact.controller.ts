import { Request, Response } from "express";
import { Contact } from "../entities/contact.entity";
import createContactService from "../service/createContact.service";

const createContactController = async (req: Request, res: Response) => {
  const contact: Contact = req.body;
  const createContact = await createContactService(contact);
  return res.status(201).json(createContact);
};

export default createContactController;
