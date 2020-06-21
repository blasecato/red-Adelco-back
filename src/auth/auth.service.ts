import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signUp.dto';
import { User } from '../entities/User';
import { Productores } from '../entities/Productores';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

  constructor(
    @Inject('CryptoService') private readonly cryptoService,
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Productores) private readonly producerRepository: Repository<Productores>
  ) { }

  async getStructureToken(email: string) {
    return await this.producerRepository.createQueryBuilder("producer")
      .select(['producer.id', 'producer.nombres', 'producer.apellidos', 'producer.dni',
        'producer.edad', 'producer.telefono', 'producer.telefono', 'producer.telefono',
        'producer.telefono', 'producer.telefono', 'producer.telefono'])
      .addSelect(['User.id', 'User.email', 'User.state', 'User.rol'])
      .innerJoin('producer.user', 'User')
      .leftJoinAndSelect("producer.idGenero", "gender")
      .leftJoinAndSelect("producer.idEtnia", "etnia")
      .where("producer.state = 'active' and User.state = 'active' and User.email = :email", { email },)
      .getOne();
  }

  async login(body: LoginDto) {
    const user = await this.userRepository.findOne({
      select: ['email', 'state'],
      where: {email:body.email},
    });

    if (!user)
      return {
        error: 'USER_NOT_EXIST',
        detail: 'Tu correo electronico o contraseña no son válidos.',
      };
    else if (user.state === 'inactive')
      return { error: 'USER_INACTIVE', detail: 'Usuario inactivo.' };

    return await this.getStructureToken(user.email);
  }

  async signUp(body: SignUpDto) {
    body.password = this.cryptoService.encrypt(body.password);

    const validateUser = await this.userRepository.findOne({
      where: { email: body.email, state: 'active' }
    });
    const validateProducer = await this.producerRepository.findOne({
      where: { dni: body.dni, state: 'active' },
    });

    if (validateUser) {
      return {
        error: 'EMAIL_IN_USE',
        detail: 'Ese correo electronico ya está siendo utilizado.',
      };
    } else if (validateProducer) {
      return {
        error: 'IDENTIFICATION_CARD_IN_USE',
        detail: 'La cédula de ciudadanía ya está siendo utilizada.',
      };
    } else {
      try {
        const producer = await this.producerRepository.save({
          id: body.id,
          nombres: body.nombres,
          apellidos: body.apellidos,
          dni:body.dni,
          edad: body.edad,
          telefono: body.telefono,
          idGenero: { id: body.idGenero },
          idParentesco: { id: body.idParentesco }
        });

        await this.userRepository.save({
          email: body.email,
          password: body.password,
          rol: body.rol,
          dniProducer: { dni: producer.dni }
        });

        return { success: 'OK' };
      } catch (error) {
        return { error };
      }
    }
  }

  async validateUser(token: string): Promise<any> {
    let payload: any = this.jwtService.decode(token);
    if (payload) {
      const user = await this.userRepository.findOne({
        select: ["id", "email"],
        relations: ["dniProducer"],
        where: { email: payload.user.email }
      })

      return { ...user };
    }

    return false;
  }

}
