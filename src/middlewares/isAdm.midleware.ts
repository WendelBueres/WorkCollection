import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import jwt from "jsonwebtoken";

async function isAdmMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let token = req.headers.authorization;
  const { id } = req.params;

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

    if (req.user.isAdm === false) {
      if (id !== req.user.id) {
        throw new AppError("Unauthorized, you must have admin privileges", 403);
      }
    }

    next();
  });
}

export default isAdmMiddleware;
