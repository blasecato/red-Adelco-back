import { Controller, Get, Param, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

  constructor(private readonly _userService: UserService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get('/getId/:id')
  async getUser(@Param('id') id: number) {
    const user = await this._userService.get(id);
    return user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('get-all')
  async getUsers() {
    return await this._userService.getAll();
  }
}
