import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware";
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from "../controllers/task.controller";


const router = Router();

router.get("/", getTasks);
router.get("/:id", getTaskById);
router.post("/", validate(createTaskSchema), createTask);
router.put("/:id", validate(updateTaskSchema), updateTask);
router.delete("/:id", deleteTask);

router.use(authMiddleware);

export default router;
