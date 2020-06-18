import { Controller, Post, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private readonly _authService: AuthService) { }

  @Post('/signup')
  async signup(@Body() signupUser) {
    return this._authService.signup(signupUser);
  }

  @Post('/login')
  async login(@Request() req) {
    return this._authService.login(req.user);
  }
}