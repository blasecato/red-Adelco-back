import { Repository, EntityRepository } from "typeorm";
import { Productores } from "src/entities/Productores";

@EntityRepository(Productores)
export class ProducersRepository extends Repository<Productores>{ }