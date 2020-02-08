import { Controller, Post, UsePipes, ValidationPipe, Body, Request, UseGuards, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

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