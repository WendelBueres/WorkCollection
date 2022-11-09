import { Request, Response } from "express";
import createTechService from "../../services/techs/createTech.services";

const createTechController = async (req: Request, res: Response) => {
  const data = await req.body;

  const userId = req.user.id;

  const createdTech = await createTechService(data, userId);

  return res.status(201).json(createdTech);
};

export default createTechController;
