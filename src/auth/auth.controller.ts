import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserDecorator } from '../core/config/decorators';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@UserDecorator() user: User) {
    return this.authService.generateToken(user);
  }

  @Get('forgot-password/:email')
  forgotPassword(@Param('email') email: string) {
    return { email };
  }
}
