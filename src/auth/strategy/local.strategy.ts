import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, BadRequestException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'user',
      passwordField: 'password',
    });
  }

  async validate(user: string, password: string): Promise<any> {

    const userValidate = await this.authService.validateUser(user, password)

    if (!userValidate) throw new BadRequestException("invalid password")

    return userValidate;
  }


}