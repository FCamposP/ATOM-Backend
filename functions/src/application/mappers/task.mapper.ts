
import {ITask} from "../../domain/entities/Task";
import {TaskResponseDto} from "../dtos/task-response.dto";

export class TaskMapper {
  static toDTO(task: ITask): TaskResponseDto {
    return {
      id: task.id,
      title: task.title,
      description: task.description ?? "",
      completed: task.completed,
      createdAt: task.createdAt,
    };
  }

  static toDTOList(tasks: ITask[]): TaskResponseDto[] {
    return tasks.map(TaskMapper.toDTO);
  }
}
