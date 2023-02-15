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
import { Payload, Response } from '@core/interface';
import { generate } from 'generate-password';
import { transporter } from '@core/config';
import { AwsS3Service } from '../core/services';
import { fileNamer } from '../core/helper';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly awsS3Service: AwsS3Service,
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

  async updateUser(
    user: Payload,
    updateUserDto: UpdateUserDto,
  ): Promise<Response> {
    this.logger.log({ message: 'Update user', updateUserDto });
    try {
      const response = await this.userModel.findOneAndUpdate(
        { email: user.email },
        {
          firstName: updateUserDto.firstName,
          lastName: updateUserDto.lastName,
        },
      );

      console.log(response);
    } catch (error) {
      this.logger.error({ message: 'Error updating user', error });
      throw new InternalServerErrorException('Error updating user profile');
    }
    return { message: MSG_OK, info: 'user update profile successfuly' };
  }

  async findUserByEmail(email: string): Promise<User> {
    try {
      return this.userModel.findOne({ email });
    } catch (error) {
      this.logger.error({ message: 'Error finding user', error });
      throw new InternalServerErrorException('Error finding user');
    }
  }

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

      user.password = generatePassword;

      await this.updatePassword(user);

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

    return { message: MSG_OK, info: 'User account reset successfuly' };
  }

  // Awesome BackEnd
  async updatePassword(user: User): Promise<Response> {
    try {
      await this.userModel.findByIdAndUpdate(user._id, {
        password: generateHashPassword(user.password),
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

  async removeUser(user: Payload): Promise<Response> {
    try {
      await this.userModel.findOneAndRemove({ email: user.email });
    } catch (error) {
      this.logger.error({ message: 'Error removing user', error });
      throw new InternalServerErrorException('Error removing user');
    }

    return { message: MSG_OK, info: 'User removing successfuly' };
  }

  async userUploadPhoto(
    file: Express.Multer.File,
    user: Payload,
  ): Promise<Response> {
    this.logger.log({ message: 'Uploading photo', user });
    try {
      const { Location } = await this.awsS3Service.uploadFile(
        file.buffer,
        fileNamer(file, user.email),
      );

      await this.userModel.findOneAndUpdate(
        { email: user.email },
        {
          image: Location,
        },
      );
    } catch (error) {
      this.logger.error({ message: 'Error uploading image profile', error });
      throw new InternalServerErrorException('Error uploading image profile');
    }

    return { message: MSG_OK, info: 'Update Image Profile Successfully' };
  }
}
