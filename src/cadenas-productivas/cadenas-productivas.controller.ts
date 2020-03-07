import { Controller, UseGuards, Get, Post, Body } from '@nestjs/common';
import { CadenasProductivasService } from './cadenas-productivas.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('cadenas-productivas')
export class CadenasProductivasController {

  constructor(private readonly _cadenasProductivasService: CadenasProductivasService) { }

  //@UseGuards(AuthGuard('jwt'))
  @Get()
  async getProducersAll() {
    return await this._cadenasProductivasService.getAll();
  }

  @Get('line')
  async getLine() {
    return await this._cadenasProductivasService.getLine();
  }

  //@UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() cadena) {
    return await this._cadenasProductivasService.create(cadena);
  }

  @Post('line')
  async createline(@Body() line) {
    return await this._cadenasProductivasService.createline(line);
  }

  @Get('veredas')
  async getVereda() {
    return this._cadenasProductivasService.getVereda()
  }

  @Post('veredas')
  async createVereda(@Body() vereda) {
    return await this._cadenasProductivasService.createVereda(vereda);
  }
}
