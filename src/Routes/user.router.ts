import { Router } from "express";
import createUserController from "../controllers/user/createUser.controller";
import deleteUserController from "../controllers/user/deleteUser.controller";

const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get("");
userRoutes.patch("/:id");
userRoutes.delete("/:id", deleteUserController);

export default userRoutes;
