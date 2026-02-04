import {Response} from "express";
import {successResponse, errorResponse} from "../../shared/response-wrapper";
import {AuthRequest} from "../../middlewares/auth.middleware";
import {CreateTaskUseCase} from "../../application/use-cases/tasks/CreateTask.usecase";
import {GetTasksByUserUseCase} from "../../application/use-cases/tasks/GetTasksByUser.usecase";
import {UpdateTaskUseCase} from "../../application/use-cases/tasks/UpdateTask.usecase";
import {DeleteTaskUseCase} from "../../application/use-cases/tasks/DeleteTask.usecase";
import {asyncHandler} from "../../shared/async-handler";
import {FirestoreTaskRepository} from "../../infrastructure/repositories/FirestoreTaskRepository";
import {TaskCreateDto} from "../../application/dtos/task-create.dto";

const repo = new FirestoreTaskRepository();

const createTaskUC = new CreateTaskUseCase(repo);
const getTaskByUserIdsUC = new GetTasksByUserUseCase(repo);
const updateTaskUC = new UpdateTaskUseCase(repo);
const deleteTaskUC = new DeleteTaskUseCase(repo);

export const getTasks = asyncHandler(async (req: AuthRequest, res: Response) => {
  const tasks = await getTaskByUserIdsUC.execute(req.user?.userId ?? "");

  res.status(200).json(successResponse(200, tasks, "Tareas obtenidas"));
});

export const createTask = asyncHandler(async (req: AuthRequest, res: Response) => {
  const dto: TaskCreateDto = req.body;
  const task = await createTaskUC.execute(req.user?.userId ?? "", dto);

  if (!task) {
    return res.status(404).json(errorResponse(404, "No se encontraron tareas"));
  }

  return res.status(201).json(successResponse(200, task, "Tarea creada exitosamente"));
});

export const updateTask = asyncHandler(async (req: AuthRequest, res: Response) => {
  const taskId = req.params.id as string;

  // Validar que la task existe y es del usuario
  const existingTask = await getTaskByIdUC.execute(taskId, req.user?.userId ?? "");

  if (!existingTask) {
    return res.status(404).json(errorResponse(404, "La tarea no fue encontrada"));
  }

  const task = await updateTaskUC.execute(taskId, req.user?.userId ?? "", req.body);
  return res.status(200).json(successResponse(201, task, "Tarea actualizada exitosamente"));
});

export const deleteTask = asyncHandler(async (req: AuthRequest, res: Response) => {
  const taskId = req.params.id as string;

  // Validar que la task existe y es del usuario
  const existingTask = await getTaskByIdUC.execute(taskId, req.user?.userId ?? "");

  if (!existingTask) {
    return res.status(404).json(errorResponse(404, "La tarea no fue econtrada"));
  }

  const task = await deleteTaskUC.execute(taskId, req.user?.userId ?? "");
  return res.status(200).json(successResponse(201, task, "Tarea eliminada con exitosamente"));
});


