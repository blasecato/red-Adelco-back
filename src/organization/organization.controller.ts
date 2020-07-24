import { Controller, Post, Body, Get,Param, Put, Query } from '@nestjs/common';
import { organizationService } from './organization.service';
import { UpdateOrganizationDto } from './dto/updateOrganization.dto';
import { CreateOrganizationDto } from './dto/createOrganizacion.dto';
import { RemoveOrganizationProducersDto } from './dto/removeOrganizationProducers.dto';
import { CreateProducerOrganizationDto } from './dto/createProducerOrganization.dto';
import { ProductorOrganizacion } from "../entities/ProductorOrganizacion";

@Controller('organization')
export class organizationController {

  constructor(private readonly _organizationService: organizationService) { }

  @Post('create')
  async createOrganization(@Body() body: CreateOrganizationDto) {
    return await this._organizationService.createOrganization(body);
  }

  @Put('update')
  async updateOrganization(@Body() body: UpdateOrganizationDto) {
    return await this._organizationService.updateOrganization(body);
  }

  @Put('remove/organization-producer')
  async removeOrganizationProductor(@Body() body: RemoveOrganizationProducersDto) {
    return await this._organizationService.removeOrganizationProductor(body);
  }

  @Post('create/producer-organization')
  async createProducerOrganization(@Body() body: CreateProducerOrganizationDto) {
    return await this._organizationService.createProducerOrganization(body);
  }

  @Get('getMunicipios')
  async getMunicipios() {
    return await this._organizationService.getMunicipio();
  }

  @Get('getDeleteUserOrg/:id')
  findUsers(@Param('id') id):Promise<ProductorOrganizacion>{
    return this._organizationService.getFindUsers(id);
  }

  @Get()
  async getOrganizacion() {
    return await this._organizationService.getOrganizacion();
  }

  @Get('get/by')
  async getByIdOrganization(@Query('id') idOrganization: number) {
    return await this._organizationService.getByIdOrganization(idOrganization);
  }

  @Get('get/producer-organization')
  async getPrododucerOrganization() {
    return await this._organizationService.getPrododucerOrganization();
  }

  @Get('count/persons-organization')
  async countPersonsOrganization(@Query('id') idOrganization: number) {
    return await this._organizationService.countPersonsOrganization(idOrganization);
  }

}
