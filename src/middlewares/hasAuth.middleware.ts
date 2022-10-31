import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import jwt from "jsonwebtoken";

async function hasAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError("Missing authorization headers");
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded: any) => {
    if (error) {
      throw new AppError("Unauthorized", 403);
    }

    req.user = {
      id: decoded.sub,
      isAdm: decoded.isAdm,
    };

    next();
  });
}

export default hasAuthMiddleware;
