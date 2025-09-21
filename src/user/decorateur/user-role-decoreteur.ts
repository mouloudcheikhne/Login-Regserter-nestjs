import { SetMetadata } from '@nestjs/common';
export enum UserType {
  ADMIN = 'admin',
  USER = 'user',
}
export const Roles = (...roles: UserType[]) => SetMetadata('roles', roles);
