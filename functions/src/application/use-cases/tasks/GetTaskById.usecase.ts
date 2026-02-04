import { ITask } from "../../../domain/entities/Task";
import { TaskRepository } from "../../../domain/repositories/TaskRepository";

export class GetTaskByIdUseCase {
  constructor(private repo: TaskRepository) { }

  async execute(taskId: string, userId: string): Promise<ITask | null> {
    const task = await this.repo.findById(taskId);

    if (!task || task.userId !== userId) return null;

    return task;
  }
}
