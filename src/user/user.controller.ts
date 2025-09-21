import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LoginDto } from './DTO/loginDto';
import { RegesterDto } from './DTO/regesterDto';
import { UserService } from './user.service';
import { AuthGard } from './guards/auth.guard';
import { CurrentUser } from './decorateur/current.decorateur';
import { Roles, UserType } from './decorateur/user-role-decoreteur';
import { RolesGard } from './guards/auth.role-gusrd';
export interface JwtPayload {
  id: number;

  // autres champs selon ton JWT
}
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
  @Get('curent-user')
  @UseGuards(AuthGard)
  getCurrentUser(@CurrentUser() user: JwtPayload) {
    return this.userservice.getCurentUser(user);
  }
  @Get('all')
  @Roles(UserType.ADMIN)
  @UseGuards(RolesGard)
  getALL() {
    return this.userservice.getAll();
  }
}
