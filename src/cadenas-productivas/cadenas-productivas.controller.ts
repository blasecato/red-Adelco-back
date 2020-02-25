import { Controller, UseGuards, Get } from '@nestjs/common';
import { CadenasProductivasService } from './cadenas-productivas.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('cadenas-productivas')
export class CadenasProductivasController {

  constructor(private readonly _cadenasProductivasService: CadenasProductivasService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getProducersAll() {
    return await this._cadenasProductivasService.getAll();
  }

}
