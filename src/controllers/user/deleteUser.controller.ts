import { Request, Response } from "express";
import deleteUserService from "../../services/user/deleteUser.service";

const deleteUserController = async (req: Request, res: Response) => {
    const id: string = req.params.id
    const deleteUser = await deleteUserService(id);
    return res.status(204).json(deleteUser);
};

export default deleteUserController;