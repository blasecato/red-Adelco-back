import { Repository, EntityRepository } from "typeorm";
import { Organizacion } from "src/entities/Organizacion";

@EntityRepository(Organizacion)
export class OrganizationRepository extends Repository<Organizacion>{ }