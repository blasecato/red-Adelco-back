import { Controller, Post, Body, Put, Get, Param, Query } from '@nestjs/common';
import { MunicipalityService } from './municipality.service';
import { CreateTownDto } from './dto/createTown.dto';
import { UpdateTownDto } from './dto/updateTown.dto';

@Controller('municipality')
export class MunicipalityController {

  constructor(private readonly municipalityService: MunicipalityService) { }

  @Post('create/town')
  async createTown(@Body() body: CreateTownDto) {
    return await this.municipalityService.createTown(body);
  }

  @Put('update/town')
  async updateTowb(@Body() body: UpdateTownDto) {
    return await this.municipalityService.updateTown(body);
  }

  @Get('get-all/town')
  async getAllTown(@Query('municipalityId') municipalityId: number) {
    return await this.municipalityService.getTownMunicipality(municipalityId)
  }

  @Get('quantity/Organizations-Municipality')
  async quantityOrganizationsMunicipality() {
    return await this.municipalityService.quantityOrganizationsMunicipality();
  }

}
