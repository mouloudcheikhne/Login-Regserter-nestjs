import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { UserType } from '../decorateur/user-role-decoreteur';
import { UserService } from '../user.service';
import { JwtPayload } from '../user.controller';
@Injectable()
export class RolesGard implements CanActivate {
  constructor(
    private readonly jwtservice: JwtService,
    private readonly config: ConfigService,
    private readonly reflector: Reflector,
    private readonly userservice: UserService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const roles: UserType[] = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles || roles.length === 0) {
      return false;
    }
    // throw new Error('Method not implemented.');
    // console.log(context.switchToHttp().getRequest().headers);
    const request: Request = context.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    // console.log(token);
    if (token && type == 'Bearer') {
      try {
        const payload: JwtPayload = await this.jwtservice.verifyAsync(token, {
          secret: this.config.get<string>('JWT_SCREATE'),
        });
        const user = await this.userservice.getCurentUser(payload);
        if (!user) throw new UnauthorizedException('forbeden');
        if (roles.includes(user.role)) {
          request['user'] = payload;
          return true;
        }
      } catch (err) {
        throw new UnauthorizedException('forbeden');
        console.log(err);
        return false;
      }
    } else {
      throw new UnauthorizedException('acces denied,no token');
    }
    return true;
    // return false;
  }
}
