import jwt from "jsonwebtoken";
import { UserRepository } from "../../../domain/repositories/UserRepository";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret";

export class LoginUseCase {
  constructor(private userRepo: UserRepository) {}
  async execute(email: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) return null;
    return jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
  }
}
