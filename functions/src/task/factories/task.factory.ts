import {randomUUID} from "crypto";
import {Task} from "../domain/entities/task-entity";

export class TaskFactory {

  /**
   * Crea plantilla de objetos de ITask con datos provenientes de dto basico
   * @param userId 
   * @param title 
   * @param description 
   * @returns instancia de ITask a ser guardada en base de datos
   */
  create(userId: string, title: string, description?: string): Task {
    return {
      id: randomUUID(),
      userId,
      title,
      description: description ?? "",
      completed: false,
      createdAt: new Date(),

      // campos para softdelete
      isActive: true,
      deletedAt:null
    };
  }
}
