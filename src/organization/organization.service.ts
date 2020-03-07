import { Injectable } from '@nestjs/common';
import { OrganizationRepository } from './organization.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Organizacion } from 'src/entities/Organizacion';
import { Repository } from 'typeorm';
import { Municipio } from '../entities/Municipio';
import { Productores } from '../entities/Productores';
import { UpdateOrganizationDto } from './dto/updateOrganization.dto';

@Injectable()
export class organizationService {

  constructor(
    @InjectRepository(OrganizationRepository) private readonly _OrganizationRepository: OrganizationRepository,
    @InjectRepository(Municipio) private readonly _MunicipioRepository: Repository<Municipio>,
    @InjectRepository(Productores) private readonly producersRepository: Repository<Productores>
  ) { }

  async createOrganization(signupOrganization) {

    const { nombre, contacto, idVereda2, representante2, descripcion, temaCapacitacion, temaEmpresarial } = signupOrganization
    const newOrganization = await new Organizacion()
    newOrganization.nombre = nombre
    newOrganization.contacto = contacto
    newOrganization.idVereda2 = idVereda2
    newOrganization.representante2 = representante2
    newOrganization.descripcion = descripcion
    newOrganization.temaEmpresarial = temaEmpresarial
    newOrganization.temaCapacitacion = temaCapacitacion
    return await newOrganization.save()
  }

  async getMunicipio() {
    const municipios = await this._OrganizationRepository.find({
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
      .select('count(Productores.id)', 'countPersons')
      .innerJoin('Productores.idOrganizacion2', 'organizacion')
      .where('organizacion.id =:idOrganization', { idOrganization })
      .getRawOne()

    const countWoman = await this.producersRepository.createQueryBuilder()
      .select('count(Genero.id)', 'countWoman')
      .innerJoin('Productores.idOrganizacion2', 'organizacion')
      .innerJoin('Productores.idGenero2', 'Genero')
      .where('Genero.id=2 and organizacion.id =:idOrganization', { idOrganization })
      .getRawOne()

    const countMan = await this.producersRepository.createQueryBuilder()
      .select('count(Genero.id)', 'countMan')
      .innerJoin('Productores.idOrganizacion2', 'organizacion')
      .innerJoin('Productores.idGenero2', 'Genero')
      .where('Genero.id=1 and organizacion.id =:idOrganization', { idOrganization })
      .getRawOne()

    return { countPersons, countWoman, countMan }
  }

}
