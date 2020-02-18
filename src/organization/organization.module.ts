import { Module } from '@nestjs/common';
import { organizationController } from './organization.controller';
import { organizationService } from './organization.service';
import { OrganizationRepository } from './organization.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Municipio } from 'src/entities/Municipio';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrganizationRepository, Municipio]),
  ],
  controllers: [organizationController],
  providers: [organizationService]
})
export class OrganizationModule { }
