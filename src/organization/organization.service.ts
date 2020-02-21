import { Injectable } from '@nestjs/common';
import { OrganizationRepository } from './organization.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Organizacion } from 'src/entities/Organizacion';
import { Repository } from 'typeorm';
import { Municipio } from 'src/entities/Municipio';

@Injectable()
export class organizationService {

  constructor(
    @InjectRepository(OrganizationRepository)
    private readonly _OrganizationRepository: OrganizationRepository,
    @InjectRepository(Municipio)
    private readonly _MunicipioRepository: Repository<Municipio>,
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
    const municipios = await this._MunicipioRepository.find({
      relations: ['veredas']
    })
    return municipios
  }
}
