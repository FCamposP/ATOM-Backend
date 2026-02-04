import express from "express";
import cors from "cors";
import helmet from "helmet";

import authRoutes from "./api/routes/auth.routes";
import taskRoutes from "./api/routes/task.routes";
import { errorMiddleware } from "./api/middlewares/error.middleware";

const app = express();

app.use(errorMiddleware);
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);


export default app;
