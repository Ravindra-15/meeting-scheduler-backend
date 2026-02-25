import express from "express";
import routes from "./routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());

app.use(routes);   

app.use(errorHandler);   //error middleware

export default app;