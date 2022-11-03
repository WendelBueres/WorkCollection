import { Request, Response } from "express";
import createSessionServices from "../../services/session/createSession.services";

const createSessionController = async (req: Request, res: Response) => {
  const data = req.body;
  const login = await createSessionServices(data);

  return res.status(200).json(login);
};

export default createSessionController;
