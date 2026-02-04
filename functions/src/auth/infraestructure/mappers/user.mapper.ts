import { User } from "../../domain/entities/user-entity";
import { IUserResponseDto } from "../../application/dtos/user-response.dto";

export class UserMapper {
  toDTO(user: User): IUserResponseDto {
    return {
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}
