import { Module } from '@nestjs/common';
import { organizationController } from './organization.controller';
import { organizationService } from './organization.service';
import { OrganizationRepository } from './organization.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Municipio } from '../entities/Municipio';
import { Productores } from '../entities/Productores';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrganizationRepository, Municipio, Productores]),
  ],
  controllers: [organizationController],
  providers: [organizationService]
})
export class OrganizationModule { }
