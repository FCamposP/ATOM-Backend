import {TaskRepository} from "../../../domain/repositories/TaskRepository";
import { TaskResponseDto } from "../../dtos/task-response.dto";
import { TaskMapper } from "../../mappers/task.mapper";

export class UpdateTaskUseCase {
  constructor(private repo: TaskRepository) {}

  async execute(taskId: string, userId: string, updates: any):Promise<TaskResponseDto|null> {
    const task = await this.repo.findById(taskId);

    if (!task || task.userId !== userId) return null;

    const updatedTask= await this.repo.update(taskId, updates);
    if(!updatedTask) return null;
    return TaskMapper.toDTO(updatedTask);
  }
}
