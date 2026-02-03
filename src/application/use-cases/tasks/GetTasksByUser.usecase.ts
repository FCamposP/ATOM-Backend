import { TaskRepository } from "../../../domain/repositories/TaskRepository";

export class GetTasksByUserUseCase {
  constructor(private repo: TaskRepository) {}

  async execute(userId: string) {
    return this.repo.findByUser(userId);
  }
}
