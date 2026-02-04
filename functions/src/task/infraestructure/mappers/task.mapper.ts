import { Task } from "../../domain/entities/task-entity";
import { ITaskResponseDto } from "../../application/dtos/task-response.dto";

export class TaskMapper {
  toDTO(task: Task): ITaskResponseDto {
    return {
      id: task.id,
      title: task.title,
      description: task.description ?? "",
      completed: task.completed,
      createdAt: task.createdAt,
    };
  }

  toDTOList(tasks: Task[]): ITaskResponseDto[] {
    return tasks.map(this.toDTO);
  }
}
