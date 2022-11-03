import { Request, Response } from "express";
import listContactService from "../../services/contacts/listContact.services";

const listContactController = async (req: Request, res: Response) => {
  const listedContacts = listContactService();

  return res.status(200).json(listedContacts);
};

export default listContactController;
