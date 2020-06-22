import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducersController } from './producers.controller';
import { ProducersService } from './producers.service';
import { GrupoEtnico } from '../entities/GrupoEtnico';
import { Parentesco } from '../entities/Parentesco';
import { Discapacidad } from '../entities/Discapacidad';
import { Conflicto } from '../entities/Conflicto';
import { Organizacion } from '../entities/Organizacion';
import { CargoOrg } from '../entities/CargoOrg';
import { Cultivo } from '../entities/Cultivo';
import { Kit } from '../entities/Kit';
import { Aft } from '../entities/Aft';
import { KitUser } from '../entities/KitUser';
import { Herramienta } from '../entities/Herramienta';
import { TipoHerramienta } from '../entities/TipoHerramienta';
import { Productores } from '../entities/Productores';
import { KitHerramienta } from '../entities/KitHerramienta';
import { ProductoresBeneficio } from '../entities/ProductoresBeneficio';
import { Genero } from '../entities/Genero';
import { Beneficio } from '../entities/Beneficio';


@Module({
  imports: [
    TypeOrmModule.forFeature([Parentesco, GrupoEtnico, CargoOrg, Parentesco,
      Discapacidad, Conflicto, Organizacion, Cultivo, ProductoresBeneficio, Kit, Herramienta,
      TipoHerramienta, KitHerramienta, KitUser, Aft, Productores,Genero, Beneficio
    ]),
  ],
  controllers: [ProducersController],
  providers: [ProducersService]
})
export class ProducersModule { }
