import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private readonly _authService: AuthService) { }

  @Post('/signup')
  async signup(@Body() signupUser) {
    return this._authService.signup(signupUser);
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    return this._authService.login(req.user);
  }
}