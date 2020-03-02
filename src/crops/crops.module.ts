import { Module } from '@nestjs/common';
import { CropsController } from './crops.controller';
import { CropsService } from './crops.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CropsRepository } from './crops.repository';
import { Productores } from 'src/entities/Productores';
import { LineaProductiva } from 'src/entities/LineaProductiva';
import { Municipio } from 'src/entities/Municipio';

@Module({
  imports: [
    TypeOrmModule.forFeature([CropsRepository, Productores, LineaProductiva, Municipio]),
  ],
  controllers: [CropsController],
  providers: [CropsService]
})
export class CropsModule { }
