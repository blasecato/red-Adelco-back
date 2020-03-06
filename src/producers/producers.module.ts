import { Module } from '@nestjs/common';
import { ProducersController } from './producers.controller';
import { ProducersService } from './producers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducersRepository } from './producers.repository';
import { GeneroRepository } from '../gender/gender.repository';
import { RelationshipRepository } from '../relationship/relationship.repository';
import { GrupoEtnico } from '../entities/GrupoEtnico';
import { Cargo } from '../entities/Cargo';
import { Parentesco } from '../entities/Parentesco';
import { Discapacidad } from '../entities/Discapacidad';
import { Conflicto } from '../entities/Conflicto';
import { Organizacion } from '../entities/Organizacion';
import { CargoOrg } from '../entities/CargoOrg';
import { Cultivo } from '../entities/Cultivo';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProducersRepository, GeneroRepository, RelationshipRepository, GrupoEtnico, CargoOrg,
      Parentesco, Discapacidad, Conflicto, Organizacion, Cultivo
    ]),
  ],
  controllers: [ProducersController],
  providers: [ProducersService]
})
export class ProducersModule { }
