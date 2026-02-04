import {randomUUID} from "crypto";
import { User } from "../entities/user-entity";

export class UserFactory {
  /**
   * Crea plantilla de objetos de IUser con el campo email
   * @param email 
   * @returns instancia de IUser a ser guardada en base de datos
   */
  create(email: string): User {
    return {
      id: randomUUID(),
      email: email,
      createdAt: new Date(),
    };
  }
}
