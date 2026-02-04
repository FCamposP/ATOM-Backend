import { randomUUID } from "crypto";
import { ITask } from "../entities/Task";

export class TaskFactory {
  static create(userId: string, title: string, description?: string): ITask {
    return {
      id: randomUUID(),
      userId,
      title,
      description: description ?? "",
      completed: false,
      createdAt: new Date(),
    
      //campos para softdelete
      isActive: true,
     
    };
  }
}
