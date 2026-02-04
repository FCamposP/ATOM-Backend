import { TaskRepository } from "../../../domain/repositories/TaskRepository";

export class DeleteTaskUseCase {
  constructor(private repo: TaskRepository) { }

  async execute(taskId: string, userId: string): Promise<boolean> {
    const task = await this.repo.findById(taskId);

    if (!task || task.userId !== userId) return false;

    await this.repo.softDelete(taskId);
    return true;
  }
}
