import { IsEmail, IsEnum, IsPhoneNumber, IsString } from 'class-validator';
import { Role } from '../user.model/role.enum';

export class UserDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  passwordHash: string;
  @IsPhoneNumber()
  phone: string;
  @IsEnum(Role)
  role: string;
}
