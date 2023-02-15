import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Logger,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserDecorator } from '@core/config/decorators';
import { Payload } from '@core/interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, maxSizeFile } from '@core/helper';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    this.logger.log('Creating user');
    return this.usersService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@UserDecorator() user: Payload) {
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@UserDecorator() user: Payload, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(user, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  removeUser(@UserDecorator() user: Payload) {
    return this.usersService.removeUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload-photo')
  @UseInterceptors(FileInterceptor('file', { fileFilter: fileFilter }))
  userUploadPhoto(
    @UploadedFile() file: Express.Multer.File,
    @UserDecorator() user: Payload,
  ) {
    maxSizeFile(file);
    return this.usersService.userUploadPhoto(file, user);
  }
}
