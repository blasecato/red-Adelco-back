import { Controller, UseGuards, Post, Body, Get } from '@nestjs/common';
import { InfrastructuresService } from './infrastructures.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('infrastructures')
export class InfrastructuresController {

  constructor(private readonly InfrastructuresService: InfrastructuresService) { }

  //@UseGuards(AuthGuard('jwt'))
  @Post()
  async createInfrastructure(@Body() infrastructure) {
    return this.InfrastructuresService.createInfrastructure(infrastructure);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getInfraestructura() {
    return this.InfrastructuresService.getInfraestructura();
  }

  @Get('DateInfra')
  async getDateInfra() {
    return await this.InfrastructuresService.getDateInfra()
  }
}
