import { Module } from '@nestjs/common';
import { ProducersController } from './producers.controller';
import { ProducersService } from './producers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducersRepository } from './producers.repository';
import { GeneroRepository } from 'src/gender/gender.repository';
import { RelationshipRepository } from 'src/relationship/relationship.repository';
import { GrupoEtnico } from 'src/entities/GrupoEtnico';
import { Cargo } from 'src/entities/Cargo';
import { Parentesco } from 'src/entities/Parentesco';
import { Discapacidad } from 'src/entities/Discapacidad';
import { Conflicto } from 'src/entities/Conflicto';
import { Organizacion } from 'src/entities/Organizacion';
import { CargoOrg } from 'src/entities/CargoOrg';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProducersRepository,
      GeneroRepository,
      RelationshipRepository,
      GrupoEtnico,
      CargoOrg,
      Parentesco,
      Discapacidad,
      Conflicto,
      Organizacion
    ]),
  ],
  controllers: [ProducersController],
  providers: [ProducersService]
})
export class ProducersModule { }
