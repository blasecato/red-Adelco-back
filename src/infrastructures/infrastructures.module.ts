import { Module } from '@nestjs/common';
import { InfrastructuresController } from './infrastructures.controller';
import { InfrastructuresService } from './infrastructures.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Infraestructura } from 'src/entities/Infraestructura';

@Module({
  imports: [
    TypeOrmModule.forFeature([Infraestructura]),
  ],
  controllers: [InfrastructuresController],
  providers: [InfrastructuresService]
})
export class InfrastructuresModule { }
