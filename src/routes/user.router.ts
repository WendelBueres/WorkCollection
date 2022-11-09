import { Router } from "express";
import createUserController from "../controllers/user/createUser.controller";
import deleteUserController from "../controllers/user/deleteUser.controller";
import listUsersController from "../controllers/user/listUsers.controller";
import listUsersByIdController from "../controllers/user/listUsersById.controller.";
import updateUserController from "../controllers/user/updateUser.controller";
import hasAuthMiddleware from "../middlewares/hasAuth.middleware";

const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get("", listUsersController);
userRoutes.get("/:id", listUsersByIdController);
userRoutes.patch("", hasAuthMiddleware, updateUserController);
userRoutes.delete("", hasAuthMiddleware, deleteUserController);

export default userRoutes;
