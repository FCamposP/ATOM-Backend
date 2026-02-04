import { IUser } from "../entities/User";

export interface UserRepository {
  create(user: IUser): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
}