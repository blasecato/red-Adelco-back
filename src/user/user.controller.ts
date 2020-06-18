import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

  constructor(private readonly _userService: UserService) { }

  @Get('/getId/:id')
  async getUser(@Param('id') id: number) {
    const user = await this._userService.get(id);
    return user;
  }

  @Get('get-all')
  async getUsers() {
    return await this._userService.getAll();
  }
}
