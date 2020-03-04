import { Injectable } from '@nestjs/common';
import { OrganizationRepository } from './organization.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Organizacion } from 'src/entities/Organizacion';
import { Repository } from 'typeorm';
import { Municipio } from 'src/entities/Municipio';
import { UpdateOrganizationDto } from './dto/updateOrganization.dto';

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
}
