import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { LoginDto } from './DTO/loginDto';
import { RegesterDto } from './DTO/regesterDto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    private readonly jwtservice: JwtService,
  ) {}
  /**
   *
   * @param data
   * @returns
   */
  async Login(data: LoginDto) {
    const { password, email } = data;
    const foundUser = await this.userRepo.findOne({ where: { email } });
    if (!foundUser) throw new BadRequestException('invalid email or password');

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) throw new BadRequestException('invalid email or password');
    const payload: { id: number } = { id: foundUser.id };
    const accessToken = await this.jwtservice.signAsync(payload);
    return { accessToken, user: foundUser };
  }
  /**
   *
   * @param data
   * @returns
   */
  Regester(data: RegesterDto) {
    const { name, email, password } = data;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = this.userRepo.create({ name, email, password: hash });

    return this.userRepo.save(newUser);
  }
}
