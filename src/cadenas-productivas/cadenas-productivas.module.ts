import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CadenasProductivasController } from './cadenas-productivas.controller';
import { CadenasProductivasService } from './cadenas-productivas.service';
import { Vereda } from '../entities/Vereda';
import { LineaProductiva } from '../entities/LineaProductiva';
import { CadenaProductiva } from '../entities/CadenaProductiva';

@Module({
  imports: [
    TypeOrmModule.forFeature([LineaProductiva,CadenaProductiva,Vereda]),
  ],
  controllers: [CadenasProductivasController],
  providers: [CadenasProductivasService]
})
export class CadenasProductivasModule { }
