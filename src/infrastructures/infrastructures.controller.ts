import { Controller, Post, Body, Get, Put, Query } from '@nestjs/common';
import { InfrastructuresService } from './infrastructures.service';
import { UpdateInfrastructureDto } from './dto/updateInfrastructure.dto';

@Controller('infrastructures')
export class InfrastructuresController {

  constructor(private readonly InfrastructuresService: InfrastructuresService) { }

  @Post('create')
  async createInfrastructure(@Body() infrastructure) {
    return this.InfrastructuresService.createInfrastructure(infrastructure);
  }

  @Get()
  async getInfraestructura() {
    return this.InfrastructuresService.getInfraestructura();
  }

  @Get('dateinfra')
  async getDateInfra() {
    return await this.InfrastructuresService.getDateInfra()
  }

  @Get('get/by')
  async getById(@Query('id') idInfrastructure: number) {
    return await this.InfrastructuresService.getById(idInfrastructure)
  }

  @Put('update')
  async updateInfrastructure(@Body() body: UpdateInfrastructureDto) {
    return await this.InfrastructuresService.updateInfrastructure(body);
  }
}
