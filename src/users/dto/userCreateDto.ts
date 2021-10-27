import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty() username: string;
  @IsNotEmpty() password: string;
  @IsNotEmpty() @IsEmail() email: string;
  @IsNotEmpty() role?: string;
  @IsNotEmpty() status?: string;
  @IsNotEmpty() teams?: any;
}
