import { IsEmail, IsNotEmpty, IsString, Max } from 'class-validator';

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
}
