import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Municipio } from '../entities/Municipio';
import { Productores } from '../entities/Productores';
import { UpdateOrganizationDto } from './dto/updateOrganization.dto';
import { CreateOrganizationDto } from './dto/createOrganizacion.dto';
import { Organizacion } from '../entities/Organizacion';

@Injectable()
export class organizationService {

  constructor(
    @InjectRepository(Organizacion) private readonly _OrganizationRepository: Repository<Organizacion>,
    @InjectRepository(Municipio) private readonly _MunicipioRepository: Repository<Municipio>,
    @InjectRepository(Productores) private readonly producersRepository: Repository<Productores>
  ) { }

  async createOrganization(body: CreateOrganizationDto) {
    try {
      await this._OrganizationRepository.save({ ...body });

      return { success: 'OK' }
    } catch (error) {
      return { error }
    }
  }

  async getMunicipio() {
    const municipios = await this._MunicipioRepository.find({
      relations: ['veredas']
    })
    return municipios
  }

  async getOrganizacion() {
    return await this._OrganizationRepository.createQueryBuilder("organization")
      .leftJoinAndSelect("organization.idVereda2", "vereda")
      .leftJoinAndSelect("organization.representante2", "representante")
      .leftJoinAndSelect("vereda.idMunicipio2", "municipio")
      .getMany()
  }

  async updateOrganization(body: UpdateOrganizationDto) {
    const exist = await this._OrganizationRepository.findOne({ select: ["nombre"], where: { id: body.id } })
    if (!exist)
      return { error: 'ORGANIZATION_NOT_EXIST', detail: '¡La Organización no existe!' }

    await this._OrganizationRepository.update(body.id, body)

    return { success: 'OK' }
  }

  async countPersonsOrganization(idOrganization: number) {
    const countPersons = await this.producersRepository.createQueryBuilder()
      .select('count(Productores.id)', 'countPeople')
      .innerJoin('Productores.idOrganizacion2', 'organizacion')
      .where('organizacion.id =:idOrganization', { idOrganization })
      .getRawOne()

    const datePersons = await this.producersRepository.createQueryBuilder()
      .select(['Productores.nombres', 'Productores.apellidos', 'Productores.dni', 'Productores.edad', 'Productores.telefono'])
      .innerJoin('Productores.idOrganizacion2', 'organizacion')
      .where('organizacion.id =:idOrganization', { idOrganization })
      .getManyAndCount()

    const countWoman = await this.producersRepository.createQueryBuilder()
      .select('count(Genero.id)', 'countWoman')
      .innerJoin('Productores.idOrganizacion2', 'organizacion')
      .innerJoin('Productores.idGenero2', 'Genero')
      .where('Genero.id=2 and organizacion.id =:idOrganization', { idOrganization })
      .getRawOne()



    const dateWoman = await this.producersRepository.createQueryBuilder()
      .select(['Productores.nombres', 'Productores.apellidos', 'Productores.dni', 'Productores.edad', 'Productores.telefono'])
      .innerJoin('Productores.idOrganizacion2', 'organizacion')
      .innerJoin('Productores.idGenero2', 'Genero')
      .where('Genero.id=2 and organizacion.id =:idOrganization', { idOrganization })
      .getManyAndCount()

    const dateMan = await this.producersRepository.createQueryBuilder()
      .select(['Productores.nombres', 'Productores.apellidos', 'Productores.dni', 'Productores.edad', 'Productores.telefono'])
      .innerJoin('Productores.idOrganizacion2', 'organizacion')
      .innerJoin('Productores.idGenero2', 'Genero')
      .where('Genero.id=1 and organizacion.id =:idOrganization', { idOrganization })
      .getManyAndCount()

    const countMan = await this.producersRepository.createQueryBuilder()
      .select('count(Genero.id)', 'countMan')
      .innerJoin('Productores.idOrganizacion2', 'organizacion')
      .innerJoin('Productores.idGenero2', 'Genero')
      .where('Genero.id=1 and organizacion.id =:idOrganization', { idOrganization })
      .getRawOne()

    return { countPersons, datePersons, countWoman, dateWoman, countMan, dateMan }
  }

}
