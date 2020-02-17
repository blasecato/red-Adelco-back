import { Module } from '@nestjs/common';
import { organizationController } from './organization.controller';
import { organizationService } from './organization.service';
import { OrganizationRepository } from './organization.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrganizationRepository]),
  ],
  controllers: [organizationController],
  providers: [organizationService]
})
export class OrganizationModule { }
