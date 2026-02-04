import {TaskRepository} from "../../../domain/repositories/TaskRepository";

export class UpdateTaskUseCase {
  constructor(private repo: TaskRepository) {}

  async execute(taskId: string, userId: string, updates: any) {
    const task = await this.repo.findById(taskId);

    if (!task || task.userId !== userId) return null;

    return this.repo.update(taskId, updates);
  }
}
