import "reflect-metadata";
import express from "express";
import "express-async-errors";
import { handleErrorMidleware } from "./middlewares/handleError.midleware";

const app = express();

app.use(express.json());
app.use(handleErrorMidleware);

export default app;
