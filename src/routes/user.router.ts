import { Router } from "express";
import createUserController from "../controllers/user/createUser.controller";
import deleteUserController from "../controllers/user/deleteUser.controller";
import listUserController from "../controllers/user/listUser.Controller";
import updateUserController from "../controllers/user/updateUser.controller";

const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get("", listUserController);
userRoutes.patch("/:id", updateUserController);
userRoutes.delete("/:id", deleteUserController);

export default userRoutes;
