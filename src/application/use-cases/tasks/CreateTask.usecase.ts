import { TaskRepository } from "../../../domain/repositories/TaskRepository";
import { TaskFactory } from "../../../domain/factories/task.factory";
import { TaskCreateDto } from "../../dtos/task-create.dto";

export class CreateTaskUseCase {
  constructor(private repo: TaskRepository) { }

  async execute(userId: string, taskCreateDto: TaskCreateDto) {
    const task = TaskFactory.create(userId, taskCreateDto.title, taskCreateDto.description);
    return this.repo.create(task);
  }
}
