import { Repository, EntityRepository } from "typeorm";
import { Genero } from "src/entities/Genero";

@EntityRepository(Genero)
export class GeneroRepository extends Repository<Genero>{ }