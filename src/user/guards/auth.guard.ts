import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGard implements CanActivate {
  constructor(
    private readonly jwtservice: JwtService,
    private readonly config: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext) {
    // throw new Error('Method not implemented.');
    // console.log(context.switchToHttp().getRequest().headers);
    const request: Request = context.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    console.log(token);
    if (token && type == 'Bearer') {
      try {
        const payload: { id: number } = await this.jwtservice.verifyAsync(
          token,
          {
            secret: this.config.get<string>('JWT_SCREATE'),
          },
        );
        request['user'] = payload;
      } catch (err) {
        throw new UnauthorizedException('forbeden');
        console.log(err);
        return false;
      }
    } else {
      throw new UnauthorizedException('acces denied,no token');
      return false;
    }
    return true;
    // return false;
  }
}
