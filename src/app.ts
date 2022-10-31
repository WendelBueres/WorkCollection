import "reflect-metadata";
import express from "express";
import "express-async-errors";
import userRoutes from "./Routes/user.router";
import loginRoutes from "./Routes/login.router";
import categoryRoutes from "./Routes/category.router";
import projectRoutes from "./Routes/project.router"
const app = express();

app.use(express.json());
app.use("/users", userRoutes)
app.use("/login", loginRoutes)
app.use("/projects", projectRoutes)
app.use("/categories", categoryRoutes)

export default app;
