import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Vereda } from '../entities/Vereda';
import { Municipio } from '../entities/Municipio';
import { Infraestructura } from '../entities/Infraestructura';
import { InfrastructuresService } from './infrastructures.service';
import { InfrastructuresController } from './infrastructures.controller';
import { TipoInfraestructura } from '../entities/TipoInfraestructura';

@Module({
  imports: [
    TypeOrmModule.forFeature([Infraestructura, TipoInfraestructura, Vereda, Municipio]),
  ],
  controllers: [InfrastructuresController],
  providers: [InfrastructuresService]
})
export class InfrastructuresModule { }
