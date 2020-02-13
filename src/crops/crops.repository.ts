import { Repository, EntityRepository } from "typeorm";
import { Cultivo } from "src/entities/Cultivo";

@EntityRepository(Cultivo)
export class CropsRepository extends Repository<Cultivo>{ }