import { Controller, UseGuards, Post, Body, Get, Put } from '@nestjs/common';
import { organizationService } from './organization.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateOrganizationDto } from './dto/updateOrganization.dto';

@Controller('organization')
export class organizationController {

  constructor(private readonly _organizationService: organizationService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async createOrganization(@Body() signupOrganization) {
    const organization = await this._organizationService.createOrganization(signupOrganization);
    return organization;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getMunicipios')
  async getMunicipios() {
    const municipios = await this._organizationService.getMunicipio();
    return municipios;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getOrganizacion() {
    return await this._organizationService.getOrganizacion();
  }

  @Put('update')
  async updateOrganization(@Body() body: UpdateOrganizationDto) {
    return await this._organizationService.updateOrganization(body);
  }

}
