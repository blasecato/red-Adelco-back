import { Controller, UseGuards, Post, Body, Get, Put, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { organizationService } from './organization.service';
import { UpdateOrganizationDto } from './dto/updateOrganization.dto';
import { CreateOrganizationDto } from './dto/createOrganizacion.dto';

@Controller('organization')
export class organizationController {

  constructor(private readonly _organizationService: organizationService) { }

  /* @UseGuards(AuthGuard('jwt')) */
  @Post('create')
  async createOrganization(@Body() body: CreateOrganizationDto) {
    return await this._organizationService.createOrganization(body);
  }

  @Put('update')
  async updateOrganization(@Body() body: UpdateOrganizationDto) {
    return await this._organizationService.updateOrganization(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getMunicipios')
  async getMunicipios() {
    return await this._organizationService.getMunicipio();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getOrganizacion() {
    return await this._organizationService.getOrganizacion();
  }

  @Get('count/persons-organization')
  async countPersonsOrganization(@Query('idOrganization') idOrganization: number) {
    return await this._organizationService.countPersonsOrganization(idOrganization);
  }

}
