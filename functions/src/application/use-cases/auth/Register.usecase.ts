import {UserRepository} from "../../../domain/repositories/UserRepository";
import {UserResponseDto} from "../../dtos/user-response.dto";
import {UserFactory} from "../../../domain/factories/user.factory";
import {UserMapper} from "../../mappers/user.mapper";

export class RegisterUseCase {
  constructor(private userRepo: UserRepository) { }
  async execute(email: string): Promise<UserResponseDto> {
    const existing = await this.userRepo.findByEmail(email);
    if (existing) throw new Error("Email already registered");
    const user = UserFactory.create(email);
    const newUser = await this.userRepo.create(user);
    return UserMapper.toDTO(newUser);
  }
}
