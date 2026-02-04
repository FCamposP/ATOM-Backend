import { ITaskRepository } from "../../domain/repositories/task-repository";
import { TaskFactory } from "../../factories/task.factory";
import { ITaskRequestDto } from "../dtos/task-request.dto";
import { ITaskResponseDto } from "../dtos/task-response.dto";
import { TaskMapper } from "../../infraestructure/mappers/task.mapper";

export class CreateTaskUseCase {
  constructor(private repo: ITaskRepository, private taskFactory: TaskFactory, private taskMapper: TaskMapper) { }
/**
 * Crea una nueva tarea y la asocia al usuario definido en userId
 * @param userId id de usuario al que se le añadirá una nueva tarea
 * @param taskCreateDto dto con datos de title y description para creación de nueva tarea
 * @returns dto de respuesta con datos de la nueva tarea creada
 */
  async execute(userId: string, taskCreateDto: ITaskRequestDto): Promise<ITaskResponseDto> {
    //convierte dto a entidad a persistir
    const task = this.taskFactory.create(userId, taskCreateDto.title, taskCreateDto.description);
    //persiste el registro
    const newTask = await this.repo.create(task);
    //mapea a dto a usuario final
    return this.taskMapper.toDTO(newTask);
  }
}
