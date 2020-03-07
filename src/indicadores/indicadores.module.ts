import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndicadoresController } from './indicadores.controller';
import { IndicadoresService } from './indicadores.service';
import { Indicadores } from "../entities/Indicadores";

@Module({
  imports: [
    TypeOrmModule.forFeature([Indicadores])
  ],
  controllers: [IndicadoresController],
  providers: [IndicadoresService],
})
export class IndicadoresModule { }