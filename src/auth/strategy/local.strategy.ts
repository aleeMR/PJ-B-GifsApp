import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from '../../users/entities/user.entity';
import { AuthService } from '../auth.service';

// Local Strategy is for a login a user
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    this.logger.log(`validate user: ${email}`);
  
    return this.authService.validateEmailWithPassword(email, password);
  }
}
