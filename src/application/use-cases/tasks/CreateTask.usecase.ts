import { randomUUID } from "crypto";
import { Task } from "../../../domain/entities/Task";
import { TaskRepository } from "../../../domain/repositories/TaskRepository";

export class CreateTaskUseCase {
  constructor(private repo: TaskRepository) {}

  async execute(userId: string, title: string, description?: string) {
    const task = new Task(
      randomUUID(),
      userId,
      title,
      description,
      false,
      new Date(),
      true,
      null
    );

    return this.repo.create(task);
  }
}
