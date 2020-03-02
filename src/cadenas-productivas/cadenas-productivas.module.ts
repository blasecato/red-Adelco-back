import { Module } from '@nestjs/common';
import { CadenasProductivasController } from './cadenas-productivas.controller';
import { CadenasProductivasService } from './cadenas-productivas.service';
import { LineaProductiva } from 'src/entities/LineaProductiva';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CadenaProductiva } from 'src/entities/CadenaProductiva';
import { Vereda } from 'src/entities/Vereda';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LineaProductiva,
      CadenaProductiva,
      Vereda
    ]),
  ],
  controllers: [CadenasProductivasController],
  providers: [CadenasProductivasService]
})
export class CadenasProductivasModule { }
