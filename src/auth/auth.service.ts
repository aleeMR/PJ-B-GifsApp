import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from '@core/interface';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  generateToken(user: User) {
    const payload: Payload = {
      userId: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
    };

    return {
      payload,
      token: this.jwtService.sign(payload),
    };
  }

  async validateEmailWithPassword(email: string, password: string): Promise<User> {
    this.logger.log('validation user');
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      this.logger.warn(`login failed user ${email}`);
      return null;
    }

    const matchPassword: boolean = await compare(password, user.password);
    if (matchPassword && user) {
      this.logger.log(`Login sucess user : ${email}`);
      return user;
    }

    return null;
  }


  forgotPassword(email: string){
    
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(email: string) {
    return this.userService.findUserByEmail(email);
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
