import { Task } from "../../domain/entities/task-entity";
import { ITaskRepository } from "../../domain/repositories/task-repository";


export class GetTaskByIdUseCase {
  constructor(private repo: ITaskRepository) { }

  /**
   * Verifica la existencia de una actividad y devuelve su detalle
   * @param taskId id de tarea a verificar su existencia y obtener su detalle
   * @param userId id de usuario para verificar la pertenencia de la actividad a dicho usuario
   * @returns retorna la tarea encontrada
   */
  async execute(taskId: string, userId: string): Promise<Task | null> {
    const task = await this.repo.findById(taskId);

    if (!task || task.userId !== userId) return null;

    return task;
  }
}
