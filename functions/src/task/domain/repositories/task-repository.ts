import { Task } from "../entities/task-entity";

export interface ITaskRepository {
  create(task: Task): Promise<Task>;
  findByUser(userId: string): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
  update(id: string, updates: Partial<Task>): Promise<Task | null>;
  softDelete(id: string): Promise<void>;
}
