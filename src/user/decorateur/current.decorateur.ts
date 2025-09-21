import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from '../user.controller';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): JwtPayload | undefined => {
    const req: Request & { user: JwtPayload } = context
      .switchToHttp()
      .getRequest();
    return req.user;
  },
);
