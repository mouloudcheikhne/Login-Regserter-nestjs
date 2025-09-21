import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserType } from './decorateur/user-role-decoreteur';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.USER,
  })
  role: UserType;
}
