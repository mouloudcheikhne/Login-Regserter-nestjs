import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './DTO/loginDto';
import { RegesterDto } from './DTO/regesterDto';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
  constructor(private readonly userservice: UserService) {}
  /**
   *
   * @param data
   * @returns
   */
  @Post('login')
  Login(@Body() data: LoginDto) {
    return this.userservice.Login(data);
  }
  /**
   *
   * @param data
   * @returns
   */
  @Post('regester')
  Regester(@Body() data: RegesterDto) {
    return this.userservice.Regester(data);
  }
}
