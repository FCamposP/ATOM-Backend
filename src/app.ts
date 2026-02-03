import express from "express";
import cors from "cors";
import helmet from "helmet";

import authRoutes from "./presentation/routes/auth.routes";
import taskRoutes from "./presentation/routes/task.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.use(errorMiddleware);

export default app;
