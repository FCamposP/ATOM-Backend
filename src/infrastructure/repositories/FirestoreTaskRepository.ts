
import { Timestamp } from "firebase-admin/firestore";
import { db } from "../database/firestore";
import { ITask } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repositories/TaskRepository";

const tasksCollection = db.collection("tasks");

export class FirestoreTaskRepository implements TaskRepository {
    async findByUser(userId: string): Promise<ITask[]> {
        const snapshot = await tasksCollection
            .where("userId", "==", userId)
            .where("isActive", "==", true)
            .orderBy("createdAt","desc")
            .get();

        return snapshot.docs.map((doc) => {
            const data = doc.data() as any;

            return {
                ...data,
                createdAt:
                    data.createdAt instanceof Timestamp
                        ? data.createdAt.toDate()
                        : data.createdAt,

                deletedAt:
                    data.deletedAt instanceof Timestamp
                        ? data.deletedAt.toDate()
                        : data.deletedAt,
            } as ITask;
        });
    }

    async findById(id: string): Promise<ITask | null> {
        const doc = await tasksCollection.doc(id).get();

        if (!doc.exists) return null;

        const data = doc.data() as any;

        return {
            ...data,
            createdAt: data.createdAt.toDate(),
            deletedAt: data.deletedAt?.toDate() ?? null,
        } as ITask;
    }

    async create(task: ITask): Promise<ITask> {
        await tasksCollection.doc(task.id).set(task);
        return task;
    }

    async update(id: string, updates: Partial<ITask>): Promise<ITask | null> {
        await tasksCollection.doc(id).update(updates);
        return this.findById(id);
    }

    async softDelete(id: string): Promise<void> {
        await tasksCollection.doc(id).update({
            isActive: false,
            deletedAt: new Date(),
        });
    }
}
