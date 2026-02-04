import jwt from "jsonwebtoken";
import {IUserRepository} from "../../domain/repositories/user-repository";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret";

export class AuthLoginUseCase {
  constructor(private userRepo: IUserRepository) {}

  /**
   * Verifica existencia de email y genera un token válido con duración de 1 h
   * @param email correo de usuario a autenticarse
   * @returns token válido para usuario
   */
  async execute(email: string):Promise<string> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) return "";
    return jwt.sign(
      {userId: user.id, email: user.email},
      JWT_SECRET,
      {expiresIn: "1h"}
    );
  }
}
