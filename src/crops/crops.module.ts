import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CropsController } from './crops.controller';
import { CropsService } from './crops.service';
import { Cultivo } from '../entities/Cultivo';
import { Municipio } from '../entities/Municipio';
import { Productores } from '../entities/Productores';
import { LineaProductiva } from '../entities/LineaProductiva';
import { Acepta } from '../entities/Acepta';
import { Finca } from '../entities/Finca';
import { Diagnostico } from '../entities/Diagnostico';
import { Vereda } from '../entities/Vereda';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cultivo, Productores, LineaProductiva, Municipio, Acepta, Finca, Diagnostico, Vereda]),
  ],
  controllers: [CropsController],
  providers: [CropsService]
})
export class CropsModule { }
