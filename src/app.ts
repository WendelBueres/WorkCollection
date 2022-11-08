import "reflect-metadata";
import express from "express";
import "express-async-errors";
import userRoutes from "./routes/user.router";
import loginRoutes from "./routes/login.router";
import contactRoutes from "./routes/contact.router";
import projectRoutes from "./routes/project.router";
import technologiesRouter from "./routes/technologies.router";
import { handleErrorMidleware } from "./middlewares/handleError.midleware";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";
const app = express();

app.use(express.json());
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/projects", projectRoutes);
app.use("/contacts", contactRoutes);
app.use("/technologies", technologiesRouter);
app.use(handleErrorMidleware);

export default app;
