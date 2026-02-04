import {Router} from "express";
import {validate} from "../middlewares/validate.middleware";
import {createTaskSchema, updateTaskSchema} from "../schemas/task.schema";
import {authMiddleware} from "../middlewares/auth.middleware";
import { TaskMapper } from "../../task/infraestructure/mappers/task.mapper";
import { TaskFactory } from "../../task/factories/task.factory";
import { FirestoreTaskRepository } from "../../task/infraestructure/persistence/firestore-task-repository";
import { TaskController } from "../controllers/task.controller";
import { CreateTaskUseCase } from "../../task/application/use-cases/create-task.usecase";
import { GetTasksByUserUseCase } from "../../task/application/use-cases/get-tasks-by-user.usecase";
import { GetTaskByIdUseCase } from "../../task/application/use-cases/get-task-by-id.usecase";
import { DeleteTaskUseCase } from "../../task/application/use-cases/delete-task.usecase";
import { UpdateTaskUseCase } from "../../task/application/use-cases/update-task.usecase";

const router = Router();

//dependencias
const repo = new FirestoreTaskRepository();
const taskFactory = new TaskFactory();
const taskMapper = new TaskMapper();

const taskController= new TaskController(
    new CreateTaskUseCase(repo,taskFactory,taskMapper),
    new GetTasksByUserUseCase(repo,taskMapper),
    new GetTaskByIdUseCase(repo),
    new UpdateTaskUseCase(repo,taskMapper),
    new DeleteTaskUseCase(repo)
);

//validación de token en cada una de las rutas de "tasks"
router.use(authMiddleware);

router.get("/", taskController.getTasks);
router.post("/", validate(createTaskSchema), taskController.createTask);
router.put("/:id", validate(updateTaskSchema), taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

export default router;
