import {ITask} from "../entities/Task";

export interface TaskRepository {
  create(task: ITask): Promise<ITask>;
  findByUser(userId: string): Promise<ITask[]>;
  findById(id: string): Promise<ITask | null>;
  update(id: string, updates: Partial<ITask>): Promise<ITask | null>;
  softDelete(id: string): Promise<void>;
}
