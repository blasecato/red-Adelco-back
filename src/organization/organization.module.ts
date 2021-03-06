import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { organizationService } from './organization.service';
import { organizationController } from './organization.controller';
import { Organizacion } from '../entities/Organizacion';
import { Productores } from '../entities/Productores';
import { Municipio } from '../entities/Municipio';
import { ProductorOrganizacion } from '../entities/ProductorOrganizacion';

@Module({
  imports: [
    TypeOrmModule.forFeature([Organizacion,ProductorOrganizacion, Municipio, Productores]),
  ],
  controllers: [organizationController],
  providers: [organizationService]
})
export class OrganizationModule { }
