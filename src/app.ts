import "reflect-metadata";
import express from "express";
import "express-async-errors";
import userRoutes from "./routes/user.router";
import loginRoutes from "./routes/login.router";
import contactRoutes from "./routes/contact.router";
import projectRoutes from "./routes/project.router";
import { handleErrorMidleware } from "./middlewares/handleError.midleware";
const app = express();

app.use(express.json());
app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/projects", projectRoutes);
app.use("/categories", contactRoutes);
app.use(handleErrorMidleware);

export default app;
