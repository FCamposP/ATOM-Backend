import {db} from "../database/firestore";
import {IUser} from "../../domain/entities/User";
import {UserRepository} from "../../domain/repositories/UserRepository";

export class FirestoreUserRepository implements UserRepository {
  private collection = db.collection("users");

  async create(user: IUser): Promise<IUser> {
    await this.collection.doc(user.id).set({...user});
    return user;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const snapshot = await this.collection
      .where("email", "==", email)
      .limit(1)
      .get();

    if (snapshot.empty) return null;

    return snapshot.docs[0].data() as IUser;
  }
}
