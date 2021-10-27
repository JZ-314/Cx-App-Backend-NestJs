import { User } from '../users/entity/userEntity';
import { UserDto } from '../users/dto/userDto';

export const toUserDto = (data: User): UserDto => {
  const { id, username, email, role, status } = data;
  const userDto: UserDto = { id, username, email, role, status };
  return userDto;
};
