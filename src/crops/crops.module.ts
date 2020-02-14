import { Module } from '@nestjs/common';
import { CropsController } from './crops.controller';
import { CropsService } from './crops.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CropsRepository } from './crops.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CropsRepository]),
  ],
  controllers: [CropsController],
  providers: [CropsService]
})
export class CropsModule { }
