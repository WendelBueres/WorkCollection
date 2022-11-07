import { Router } from "express";
import createUserController from "../controllers/user/createUser.controller";
import deleteUserController from "../controllers/user/deleteUser.controller";
import getUsersController from "../controllers/user/getUsers.controller";
import getUsersByIdController from "../controllers/user/getUsersById.controller.";
import updateUserController from "../controllers/user/updateUser.controller";

const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get("", getUsersController);
userRoutes.get("/:id", getUsersByIdController);
userRoutes.patch("/:id", updateUserController);
userRoutes.delete("/:id", deleteUserController);

export default userRoutes;
