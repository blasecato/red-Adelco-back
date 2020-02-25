import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
    private readonly _jwtService: JwtService,
    private readonly _userService: UserService
  ) { }

  async validateUser(user: string, password: string) {
    const userValidate = await this._userService.findOne(user);
    const isMatch = await compare(password, userValidate.password);

    if (userValidate && isMatch) {
      const { password, ...result } = userValidate;
      return result;
    }

    return null;
  }

  async login(user: any) {

    const payload: IJwtPayload = {
      user: user.user,
      dni: user.dni,
      cargo: user.cargo
    };

    const token = this._jwtService.sign(payload);
    return { token };
  }

  async signup(signupUser) {

    const { user, dni } = signupUser;

    const userExists = await this._authRepository.findOne({
      where: [{ user }, { dni }],
    });

    if (userExists) throw new ConflictException('email or dni already exists');

    const userselect = await this._authRepository.signup(signupUser);

    const payload: IJwtPayload = {
      user: userselect.user,
      dni: userselect.dni,
      cargo: userselect.cargo
    };

    const token = this._jwtService.sign(payload);
    return { token };
  }
}