import { Module } from '@nestjs/common';
import { CropsController } from './crops.controller';
import { CropsService } from './crops.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CropsRepository } from './crops.repository';
import { Productores } from 'src/entities/Productores';

@Module({
  imports: [
    TypeOrmModule.forFeature([CropsRepository, Productores]),
  ],
  controllers: [CropsController],
  providers: [CropsService]
})
export class CropsModule { }
