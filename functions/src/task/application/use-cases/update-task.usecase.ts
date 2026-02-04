import { ITaskRepository } from "../../domain/repositories/task-repository";
import { ITaskResponseDto } from "../dtos/task-response.dto";
import { TaskMapper } from "../../infraestructure/mappers/task.mapper";

export class UpdateTaskUseCase {
  constructor(private repo: ITaskRepository, private taskMapper: TaskMapper) {}

  /**
   * Actualiza los campos editables permitidos al usuario
   * @param taskId id de tarea a ser actualizada
   * @param userId id de usuario para verificar pertenencia de la tarea a actualizar a dicho usuario
   * @param updates dto con los datos de la tarea a actualizar
   * @returns la tarea actualizada
   */
  async execute(taskId: string, userId: string, updates: ITaskResponseDto):Promise<ITaskResponseDto|null> {
    const task = await this.repo.findById(taskId);

    if (!task || task.userId !== userId) return null;

    const updatedTask= await this.repo.update(taskId, updates);
    if(!updatedTask) return null;
    return this.taskMapper.toDTO(updatedTask);
  }
}
