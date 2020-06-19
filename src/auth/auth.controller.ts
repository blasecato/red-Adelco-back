import { Controller, Post, Body, Request, UseGuards, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signUp.dto';

@Controller('auth')
export class AuthController {

  constructor(
    @Inject('CryptoService') private readonly cryptoService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) { }

  @Post('signup')
  async signUp2(@Body() body: SignUpDto) {
    const response = await this.authService.signUp(body);

    if (response.error) return { response };

    return response;
  }

  @Post('login')
  async login2(@Body() body: LoginDto) {
    body.password = this.cryptoService.encrypt(body.password);

    let response: any = await this.authService.login(body);

    if (response.error) throw new UnauthorizedException(response);

    return { success: 'OK', payload: this.jwtService.sign({ ...response }) };
  }

}