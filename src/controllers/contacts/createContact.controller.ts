import { Request, Response } from "express";
import { Contact } from "../../entities/contact.entity";
import createContactService from "../../services/contacts/createContact.services";

const createContactController = async (req: Request, res: Response) => {
  const contact: Contact = req.body;
  console.log("CreateContactController ", contact);
  const createContact = await createContactService(contact);
  return res.status(201).json(createContact);
};

export default createContactController;
