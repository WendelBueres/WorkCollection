import { Request, Response } from "express";
import deleteContactService from "../service/deleteContact.service";


const deleteContactController = async(req: Request, res: Response) => {

    const id = req.params.id

    await deleteContactService(id)    
    
    return res.status(204).json({message: "User deleted"})
}

export default deleteContactController;