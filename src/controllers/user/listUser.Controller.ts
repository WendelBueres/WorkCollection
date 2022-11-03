import { Request, Response } from "express";
import listUserService from "../../services/users/listUser.services";

const listUserController = async (req: Request, res: Response) => {
    const listUser = await listUserService();
    return res.status(200).json(listUser);
};

export default listUserController;