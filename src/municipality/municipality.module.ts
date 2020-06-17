import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MunicipalityController } from './municipality.controller';
import { MunicipalityService } from './municipality.service';
import { Municipio } from '../entities/Municipio';
import { Vereda } from '../entities/Vereda';

@Module({
  imports: [
    TypeOrmModule.forFeature([Municipio,Vereda])
  ],
  controllers: [MunicipalityController],
  providers: [MunicipalityService]
})
export class MunicipalityModule { }
