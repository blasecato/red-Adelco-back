import { Repository, EntityRepository } from "typeorm";
import { Parentesco } from "src/entities/Parentesco";

@EntityRepository(Parentesco)
export class RelationshipRepository extends Repository<Parentesco>{ }