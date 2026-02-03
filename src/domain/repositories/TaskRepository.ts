import { Task } from "../entities/Task";

export interface TaskRepository {
  create(task: Task): Promise<Task>;
  findByUser(userId: string): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
  update(id: string, updates: Partial<Task>): Promise<Task | null>;
  softDelete(id: string): Promise<void>;
}