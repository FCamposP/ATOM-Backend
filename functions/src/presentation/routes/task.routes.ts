import {Router} from "express";
import {validate} from "../../middlewares/validate.middleware";
import {createTaskSchema, updateTaskSchema} from "../schemas/task.schema";
import {authMiddleware} from "../../middlewares/auth.middleware";
import {createTask, deleteTask,  getTasks, updateTask} from "../controllers/task.controller";

const router = Router();
router.use(authMiddleware);

router.get("/", getTasks);
router.post("/", validate(createTaskSchema), createTask);
router.put("/:id", validate(updateTaskSchema), updateTask);
router.delete("/:id", deleteTask);

export default router;
