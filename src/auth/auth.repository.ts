import { UserLogin } from '../entities/UserLogin';
import { Repository, EntityRepository } from 'typeorm';
import { genSalt, hash } from 'bcryptjs';

@EntityRepository(UserLogin)
export class AuthRepository extends Repository<UserLogin> {

  async signup(signupUser) {
    const { user, password, cargo, dni, nombre } = signupUser;
    const newuser = new UserLogin();
    newuser.dni = dni;
    newuser.nombre = nombre;
    newuser.user = user;
    newuser.cargo = cargo;
    const salt = await genSalt(10);
    newuser.password = await hash(password, salt);

    return await newuser.save();

  }

}