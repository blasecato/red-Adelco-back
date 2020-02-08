import { Controller, Get, Param, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {

  constructor(private readonly _userService: UserService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get('/getId/:id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this._userService.get(id);
    return user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUsers() {
    const users = await this._userService.getAll();
    return users;
  }

}
