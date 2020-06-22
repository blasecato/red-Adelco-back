import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CropsController } from './crops.controller';
import { CropsService } from './crops.service';
import { Cultivo } from '../entities/Cultivo';
import { Municipio } from '../entities/Municipio';
import { Productores } from '../entities/Productores';
import { LineaProductiva } from '../entities/LineaProductiva';
import { Diagnostico } from '../entities/Diagnostico';
import { Acepta } from '../entities/Acepta';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cultivo, Productores, LineaProductiva, Municipio, Acepta, Diagnostico]),
  ],
  controllers: [CropsController],
  providers: [CropsService]
})
export class CropsModule { }
