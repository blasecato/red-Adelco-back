import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndicadoresController } from './indicadores.controller';
import { IndicadoresService } from './indicadores.service';
import { Indicadores } from "../entities/Indicadores";
import { Objetivo } from '../entities/Objetivo';

@Module({
  imports: [
    TypeOrmModule.forFeature([Indicadores, Objetivo])
  ],
  controllers: [IndicadoresController],
  providers: [IndicadoresService],
})
export class IndicadoresModule { }