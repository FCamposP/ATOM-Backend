import {TaskRepository} from "../../../domain/repositories/TaskRepository";
import {TaskResponseDto} from "../../dtos/task-response.dto";
import {TaskMapper} from "../../mappers/task.mapper";


export class GetTasksByUserUseCase {
  constructor(private repo: TaskRepository) {}

  async execute(userId: string): Promise<TaskResponseDto[]> {
    const tasks = await this.repo.findByUser(userId);
    return TaskMapper.toDTOList(tasks);
  }
}
