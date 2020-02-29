import { Repository, EntityRepository } from 'typeorm';
import { Cultivo } from '../entities/Cultivo';

@EntityRepository(Cultivo)
export class CropsRepository extends Repository<Cultivo>{ }