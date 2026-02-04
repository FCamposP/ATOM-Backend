import { randomUUID } from "crypto";
import { IUser } from "../entities/User";

export class UserFactory {
    static create(email: string): IUser {
        return {
            id: randomUUID(),
            email: email,
            createdAt: new Date()
        };
    }
}