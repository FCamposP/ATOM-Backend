import { randomUUID } from "crypto";
import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../../domain/repositories/UserRepository";

export class RegisterUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(email: string) {
    const existing = await this.userRepo.findByEmail(email);

    if (existing) throw new Error("Email already registered");

    const user = new User(
      randomUUID(),
      email,
      '',
      new Date()
    );

    return this.userRepo.create(user);
  }
}
