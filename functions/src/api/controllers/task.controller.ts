import { Response } from "express";
import { successResponse, errorResponse } from "../../shared/response-wrapper";
import { AuthRequest } from "../middlewares/auth.middleware";
import { CreateTaskUseCase } from "../../task/application/use-cases/create-task.usecase";
import { GetTasksByUserUseCase } from "../../task/application/use-cases/get-tasks-by-user.usecase";
import { UpdateTaskUseCase } from "../../task/application/use-cases/update-task.usecase";
import { DeleteTaskUseCase } from "../../task/application/use-cases/delete-task.usecase";
import { asyncHandler } from "../../shared/async-handler";
import { ITaskRequestDto } from "../../task/application/dtos/task-request.dto";
import { GetTaskByIdUseCase } from "../../task/application/use-cases/get-task-by-id.usecase";
import { ITaskResponseDto } from "../../task/application/dtos/task-response.dto";
import { HttpStatus } from "../../shared/enums/http-statuses";


export class TaskController {
  constructor(
    private readonly createTaskUC: CreateTaskUseCase,
    private readonly getTaskByUserIdsUC: GetTasksByUserUseCase,
    private readonly getTaskByIdUC: GetTaskByIdUseCase,
    private readonly updateTaskUC: UpdateTaskUseCase,
    private readonly deleteTaskUC: DeleteTaskUseCase
  ) {
  }

  getTasks = asyncHandler(async (req: AuthRequest, res: Response) => {
    const tasks = await this.getTaskByUserIdsUC.execute(req.user?.userId ?? "");

    res.status(HttpStatus.OK).json(successResponse(HttpStatus.OK, tasks, "Tareas obtenidas"));
  });

  createTask = asyncHandler(async (req: AuthRequest, res: Response) => {
    const dto: ITaskRequestDto = req.body;
    const task = await this.createTaskUC.execute(req.user?.userId ?? "", dto);

    if (!task) {
      return res.status(HttpStatus.NOT_FOUND).json(errorResponse(HttpStatus.NOT_FOUND, "No se encontraron tareas"));
    }

    return res.status(HttpStatus.CREATED).json(successResponse(HttpStatus.CREATED, task, "Tarea creada exitosamente"));
  });

  updateTask = asyncHandler(async (req: AuthRequest, res: Response) => {
    const taskId = req.params.id as string;
    const dto: ITaskResponseDto = req.body;

    // Validar que la task existe y es del usuario
    const existingTask = await this.getTaskByIdUC.execute(taskId, req.user?.userId ?? "");

    if (!existingTask) {
      return res.status(HttpStatus.NOT_FOUND).json(errorResponse(HttpStatus.NOT_FOUND, "La tarea no fue encontrada"));
    }

    const task = await this.updateTaskUC.execute(taskId, req.user?.userId ?? "", dto);
    return res.status(HttpStatus.OK).json(successResponse(HttpStatus.OK, task, "Tarea actualizada exitosamente"));
  });

  deleteTask = asyncHandler(async (req: AuthRequest, res: Response) => {
    const taskId = req.params.id as string;

    // Validar que la task existe y es del usuario
    const existingTask = await this.getTaskByIdUC.execute(taskId, req.user?.userId ?? "");

    if (!existingTask) {
      return res.status(HttpStatus.NOT_FOUND).json(errorResponse(HttpStatus.NOT_FOUND, "La tarea no fue econtrada"));
    }

    const task = await this.deleteTaskUC.execute(taskId, req.user?.userId ?? "");
    return res.status(HttpStatus.OK).json(successResponse(HttpStatus.OK, task, "Tarea eliminada con exitosamente"));
  });


}