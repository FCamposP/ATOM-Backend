import { TaskRepository } from "../../../domain/repositories/TaskRepository";
import { TaskFactory } from "../../../domain/factories/task.factory";
import { TaskCreateDto } from "../../dtos/task-create.dto";
import { TaskMapper } from "../../mappers/task.mapper";
import { TaskResponseDto } from "../../dtos/task-response.dto";

export class CreateTaskUseCase {
  constructor(private repo: TaskRepository) { }

  async execute(userId: string, taskCreateDto: TaskCreateDto): Promise<TaskResponseDto> {
    const task = TaskFactory.create(userId, taskCreateDto.title, taskCreateDto.description);
    const newTask = await this.repo.create(task);
    return TaskMapper.toDTO(newTask);
  }
}
