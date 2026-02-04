import { IUserRepository } from "../../domain/repositories/user-repository";
import { UserFactory } from "../../domain/factories/user.factory";
import { UserMapper } from "../../infraestructure/mappers/user.mapper";
import { IUserResponseDto } from "../dtos/user-response.dto";

export class AuthRegisterUseCase {
  constructor(private userRepo: IUserRepository, private userFactory: UserFactory, private userMapper:UserMapper) { }

  /**
   * Crea un nuevo usuario a partir de un email
   * @param email correo a ser registrado para nuevo usuario
   * @returns dto de usuario creado
   */
  async execute(email: string): Promise<IUserResponseDto> {
    const existing = await this.userRepo.findByEmail(email);
    if (existing) throw new Error("Email already registered");
    const user = this.userFactory.create(email);
    const newUser = await this.userRepo.create(user);
    return this.userMapper.toDTO(newUser);
  }
}
