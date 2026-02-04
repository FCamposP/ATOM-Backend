import { ITaskRepository } from "../../domain/repositories/task-repository";

export class DeleteTaskUseCase {
  constructor(private repo: ITaskRepository) { }

  /**
   * Aplica softdelete a las tareas, solo se eliminan a nivel de sistema pero no en base de datos
   * @param taskId id de tarea a ser eliminada con softdelete
   * @param userId id del usuario para validar la pertenencia de la tarea a dicho usuario
   * @returns retorna true si el proceso fue exitoso
   */
  async execute(taskId: string, userId: string): Promise<boolean> {
    const task = await this.repo.findById(taskId);

    if (!task || task.userId !== userId) return false;

    await this.repo.softDelete(taskId);
    return true;
  }
}
