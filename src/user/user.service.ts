import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { LoginDto } from './DTO/loginDto';
import { RegesterDto } from './DTO/regesterDto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
interface JwtPayload {
  id: number;

  // autres champs selon ton JWT
}
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
  async Regester(data: RegesterDto) {
    const { name, email, password, role } = data;
    const foundUser = await this.userRepo.findOne({ where: { email } });
    console.log(foundUser);
    if (foundUser) throw new BadRequestException('invalid email or password');
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = this.userRepo.create({ name, email, password: hash, role });

    return this.userRepo.save(newUser);
  }

  async getCurentUser(user: JwtPayload) {
    const { id } = user;
    const foundUser = await this.userRepo.findOne({ where: { id } });
    return foundUser;
  }
  getAll() {
    return this.userRepo.find();
  }
}
