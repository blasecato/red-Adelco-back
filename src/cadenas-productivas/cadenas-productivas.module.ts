import { Module } from '@nestjs/common';
import { CadenasProductivasController } from './cadenas-productivas.controller';
import { CadenasProductivasService } from './cadenas-productivas.service';
import { LineaProductiva } from 'src/entities/LineaProductiva';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LineaProductiva
    ]),
  ],
  controllers: [CadenasProductivasController],
  providers: [CadenasProductivasService]
})
export class CadenasProductivasModule { }
