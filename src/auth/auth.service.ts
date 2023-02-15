import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload, Response } from '@core/interface';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { compare } from 'bcryptjs';
import { ChangePasswordDto } from './dto/change-password.dto';
import { MSG_OK } from '@core/constant';

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

  async validateEmailWithPassword(
    email: string,
    password: string,
  ): Promise<User> {
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

  forgotPassword(email: string): Promise<Response> {
    return this.userService.resetUser(email);
  }

  findOne(email: string) {
    return this.userService.findUserByEmail(email);
  }

  async changePassword(
    userPayload: Payload,
    { oldPassword, newPassword }: ChangePasswordDto,
  ) : Promise<Response> {
    this.logger.log({ message: 'Change password user', userPayload });
    const user = await this.userService.findUserByEmail(userPayload.email);

    const matchPassword = await compare(oldPassword, user.password);

    if (!matchPassword) {
      throw new BadRequestException('User not matching old password');
    }

    user.password = newPassword;
    await this.userService.updatePassword(user);

    return { message: MSG_OK, info: 'Change password Successfully' };
  }
}
