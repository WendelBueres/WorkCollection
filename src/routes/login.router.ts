import { Router } from "express";
import createSessionController from "../controllers/session/createSession.controller";

const loginRoutes = Router();

loginRoutes.post("", createSessionController);

export default loginRoutes;
