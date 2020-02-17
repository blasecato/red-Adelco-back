import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { organizationService } from './organization.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('organization')
export class organizationController {

  constructor(private readonly _organizationService: organizationService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async createOrganization(@Body() signupOrganization) {
    const producer = await this._organizationService.createOrganization(signupOrganization);
    return producer;
  }

}
