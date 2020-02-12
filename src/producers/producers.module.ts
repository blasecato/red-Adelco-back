import { Module } from '@nestjs/common';
import { ProducersController } from './producers.controller';
import { ProducersService } from './producers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducersRepository } from './producers.repository';
import { GeneroRepository } from 'src/gender/gender.repository';
import { RelationshipRepository } from 'src/relationship/relationship.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProducersRepository, GeneroRepository, RelationshipRepository]),
  ],
  controllers: [ProducersController],
  providers: [ProducersService]
})
export class ProducersModule { }
