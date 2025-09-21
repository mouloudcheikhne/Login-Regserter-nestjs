import { IsEmail, IsNotEmpty, IsString, Max } from 'class-validator';
import { UserType } from '../decorateur/user-role-decoreteur';

export class RegesterDto {
  @IsNotEmpty()
  @IsString()
  @Max(30)
  name: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  role: UserType;
}
