
import { Timestamp } from "firebase-admin/firestore";
import { db } from "../../../shared/infrastructure/database/firestore";
import { ITaskRepository } from "../../domain/repositories/task-repository";
import { Task } from "../../domain/entities/task-entity";

const tasksCollection = db.collection("tasks");

export class FirestoreTaskRepository implements ITaskRepository {

  /**
   * Obtiene el listado de actividades activas del usuario especificado
   * @param userId id de usuario para obtener todas sus actividades activas
   * @returns lista de Task provenientes de base de datos, ordenadas por fecha de creación
   */
  async findByUser(userId: string): Promise<Task[]> {
    const snapshot = await tasksCollection
      .where("userId", "==", userId)
      .where("isActive", "==", true)
      .orderBy("createdAt", "desc")
      .get();

    return snapshot.docs.map((doc) => {
      const data = doc.data() as any;

      //Se transforman los datos Timestamp manejados por Firestore a Date
      return {
        ...data,
        createdAt:
          data.createdAt instanceof Timestamp ?
            data.createdAt.toDate() :
            data.createdAt,

        deletedAt:
          data.deletedAt instanceof Timestamp ?
            data.deletedAt.toDate() :
            data.deletedAt,
      } as Task;
    });
  }

  async findById(id: string): Promise<Task | null> {
    const doc = await tasksCollection.doc(id).get();

    if (!doc.exists) return null;

    const data = doc.data() as any;

    //Se transforman los datos Timestamp manejados por Firestore a Date
    return {
      ...data,
      createdAt: data.createdAt instanceof Timestamp ?
        data.createdAt.toDate() :
        data.createdAt,
      deletedAt: data.deletedAt instanceof Timestamp ?
        data.deletedAt.toDate() :
        data.deletedAt,
    } as Task;
  }

  async create(task: Task): Promise<Task> {
    await tasksCollection.doc(task.id).set({...task});
    return task;
  }

  async update(id: string, updates: Partial<Task>): Promise<Task | null> {
    await tasksCollection.doc(id).update(updates);
    return this.findById(id);
  }

  async softDelete(id: string): Promise<void> {

    //se aplica eliminación de registros a nivel de sistema y no a nivel de base de datos
    await tasksCollection.doc(id).update({
      isActive: false,
      deletedAt: new Date(),
    });
  }
}
