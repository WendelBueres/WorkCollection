import { Request, Response } from "express";
import listContactService from "../service/listContact.service";


const listContactController = async(req: Request, res: Response) => {

    const listedContacts = listContactService()

    return res.status(200).json(listedContacts)
}

export default listContactController;