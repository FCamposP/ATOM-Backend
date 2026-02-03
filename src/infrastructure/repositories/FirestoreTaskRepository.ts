import { db } from "../database/firestore";
import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repositories/TaskRepository";

export class FirestoreTaskRepository implements TaskRepository {
    private collection = db.collection("tasks");

    async create(task: Task): Promise<Task> {
        await this.collection.doc(task.id).set({ ...task });
        return task;
    }

    async findByUser(userId: string): Promise<Task[]> {
        const snapshot = await this.collection
            .where("userId", "==", userId)
            .where("isActive", "==", true)
            .get();

        return snapshot.docs.map((doc) => doc.data() as Task);
    }

    async findById(id: string): Promise<Task | null> {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists) return null;

        const task = doc.data() as Task;

        if (!task.isActive) return null;

        return task;
    }

    async update(id: string, updates: Partial<Task>) {
        await this.collection.doc(id).update(updates);
        return this.findById(id);
    }

    async softDelete(id: string) {
        await this.collection.doc(id).update({
            isActive: false,
            deletedAt: new Date()
        });
    }
}
