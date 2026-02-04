import { db } from "../../../shared/infrastructure/database/firestore";
import { User } from "../../domain/entities/user-entity";
import { IUserRepository } from "../../domain/repositories/user-repository";

export class FirestoreUserRepository implements IUserRepository {
  private collection = db.collection("users");

  async create(user: User): Promise<User> {
    await this.collection.doc(user.id).set({...user});
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const snapshot = await this.collection
      .where("email", "==", email)
      .limit(1)
      .get();

    if (snapshot.empty) return null;

    return snapshot.docs[0].data() as User;
  }
}
