import { Repository, EntityRepository } from "typeorm";
import { UserLogin } from "../entities/UserLogin";

@EntityRepository(UserLogin)
export class UserRepository extends Repository<UserLogin>{ }