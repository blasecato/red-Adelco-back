import { Module } from '@nestjs/common';
import { InfrastructuresController } from './infrastructures.controller';
import { InfrastructuresService } from './infrastructures.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Infraestructura } from 'src/entities/Infraestructura';
import { TipoInfraestructura } from 'src/entities/TipoInfraestructura';
import { Vereda } from 'src/entities/Vereda';
import { Municipio } from 'src/entities/Municipio';

@Module({
  imports: [
    TypeOrmModule.forFeature([Infraestructura, TipoInfraestructura, Vereda, Municipio]),
  ],
  controllers: [InfrastructuresController],
  providers: [InfrastructuresService]
})
export class InfrastructuresModule { }
