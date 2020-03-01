import { Module } from '@nestjs/common';
import { CropsController } from './crops.controller';
import { CropsService } from './crops.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CropsRepository } from './crops.repository';
import { Cultivo } from '../entities/Cultivo';

@Module({
  imports: [
    TypeOrmModule.forFeature([CropsRepository, Cultivo]),
  ],
  controllers: [CropsController],
  providers: [CropsService]
})
export class CropsModule { }
