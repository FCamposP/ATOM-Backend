import { ITaskRepository } from "../../domain/repositories/task-repository";
import { ITaskResponseDto } from "../dtos/task-response.dto";
import { TaskMapper } from "../../infraestructure/mappers/task.mapper";

export class GetTasksByUserUseCase {
  constructor(private repo: ITaskRepository, private taskMapper: TaskMapper) {}

  /**
   * Obtiene lista de dto de actividades creadas por un usuario especificado
   * @param userId id de usuario para obtener todas sus actividades activas
   * @returns lista de dtos de actividades activas pertenecientes al usuario indicado
   */
  async execute(userId: string): Promise<ITaskResponseDto[]> {
    const tasks = await this.repo.findByUser(userId);
    return this.taskMapper.toDTOList(tasks);
  }
}
