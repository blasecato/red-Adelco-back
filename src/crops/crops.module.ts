import { Module } from '@nestjs/common';
import { CropsController } from './crops.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CropsService } from './crops.service';
import { Cultivo } from '../entities/Cultivo';
import { Municipio } from '../entities/Municipio';
import { Productores } from '../entities/Productores';
import { LineaProductiva } from '../entities/LineaProductiva';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cultivo, Productores, LineaProductiva, Municipio]),
  ],
  controllers: [CropsController],
  providers: [CropsService]
})
export class CropsModule { }
