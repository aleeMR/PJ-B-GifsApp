import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MSG_OK, MAIL_RESET_USER } from '@core/constant';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { generateHashPassword } from '@core/util';
import { Response } from '@core/interface';
import { generate } from 'generate-password';
import { transporter } from '@core/config';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<Response> {
    try {
      const hashPassword = generateHashPassword(createUserDto.password);
      const createUser = new this.userModel({
        ...createUserDto,
        password: hashPassword,
      });
      await createUser.save();
    } catch (error) {
      this.logger.error({ message: 'Error creating user', error });
      throw new InternalServerErrorException('Error creating user');
    }

    return { message: MSG_OK, info: 'User created successfully' };
  }

  findAll() {
    return `This action returns all users`;
  }

  async findUserByEmail(email: string): Promise<User> {
    try {
      return this.userModel.findOne({ email });
    } catch (error) {
      this.logger.error({ message: 'Error finding user', error });
      throw new InternalServerErrorException('Error finding user');
    }
  }


  //TODO: Explain why this function
  async resetUser(email: string) {
    const user = await this.findUserByEmail(email);

    if (!user) {
      this.logger.warn(`user not found: ${email}`);
      throw new NotFoundException('User not found');
    }

    let generatePassword: string;

    try {
      generatePassword = generate({
        length: 10,
        numbers: true,
        symbols: '(_)$°@*-+',
      });

      await transporter.sendMail({
        from: 'BackEnd GifApplication By Amincia',
        to: email,
        subject: 'Reseteo del usuario',
        html: MAIL_RESET_USER(email, generatePassword),
      });
    } catch (error) {
      this.logger.error({ message: 'Error sending email', error });
      throw new InternalServerErrorException('Error sending reset mail');
    }
  }

  async updatePassword(user: User) {
    try {
      await this.userModel.findByIdAndUpdate(user._id, {
        password: user.password,
      });
    } catch (error) {
      this.logger.error({
        message: `Error updating password ${user.email}`,
        error,
      });
      throw new InternalServerErrorException('Error updating password');
    }

    return { message: MSG_OK, info: 'Password updated successfully' };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
