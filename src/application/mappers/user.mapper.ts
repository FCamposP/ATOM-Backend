
import { IUser } from "../../domain/entities/User";
import { UserResponseDto } from "../dtos/user-response.dto";

export class UserMapper {
  static toDTO(user: IUser): UserResponseDto {
    return {
      email:user.email,
      createdAt: user.createdAt
    };
  }

}
