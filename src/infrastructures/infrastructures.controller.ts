import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { InfrastructuresService } from './infrastructures.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('infrastructures')
export class InfrastructuresController {

  constructor(private readonly InfrastructuresService: InfrastructuresService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createInfrastructure(@Body() infrastructure) {
    return this.InfrastructuresService.createInfrastructure(infrastructure);
  }

}
