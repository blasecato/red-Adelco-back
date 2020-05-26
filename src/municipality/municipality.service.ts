import { Injectable, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vereda } from '../entities/Vereda';
import { Municipio } from '../entities/Municipio';
import { CreateTownDto } from './dto/createTown.dto';
import { UpdateTownDto } from './dto/updateTown.dto';

@Injectable()
export class MunicipalityService {

  constructor(
    @InjectRepository(Municipio) private readonly municipalityRepository: Repository<Municipio>,
    @InjectRepository(Vereda) private readonly townRepository: Repository<Vereda>
  ) { }

  async createTown(body: CreateTownDto) {
    try {
      await this.townRepository.save(body)
      return { success: 'OK' }
    } catch (error) {
      if (error.code = 'ER_NO_REFERENCED_ROW_2')
        return { error: 'NOT_EXIST_MUNICIPALITY', detail: 'El municipio no existe!' }

      return { error }
    }
  }

  async createMunicipality(body: CreateTownDto) {
    try {
      await this.municipalityRepository.save(body)
      return { success: 'OK' }
    } catch (error) {
      return { error }
    }
  }
  async updateTown(body: UpdateTownDto) {
    const exist = await this.townRepository.findOne({ select: ["nombre"], where: { id: body.id } })
    if (!exist)
      return { error: 'TOWN_NOT_EXIST', detail: 'La vereda no existe' }

    await this.townRepository.update(body.id, body)

    return { success: 'OK' }
  }
  async getTownMunicipality(idMunicipio: number) {
    return await this.municipalityRepository.find({ relations: ["veredas"], where: { id: idMunicipio } })
  }

  async getMunicipalityByTown(idTown: number) {
    return await this.municipalityRepository.createQueryBuilder()
      .select(['Municipio.nombre'])
      .innerJoin('Municipio.veredas', 'vereda')
      .where('vereda.id=:idTown', { idTown })
      .getOne()
  }
  async quantityOrganizationsMunicipality() {
    return await this.municipalityRepository.createQueryBuilder()
      .select(['Municipio.nombre'])
      .addSelect('count(Organizacion.id)', 'countOrganizacion')
      .addSelect(['Organizacion.nombre', 'Organizacion.descripcion', 'Organizacion.contacto', 'Organizacion.temaCapacitacion', 'Organizacion.temaEmpresarial'])
      .leftJoin('Municipio.veredas', 'Vereda')
      .leftJoin('Vereda.organizacions', 'Organizacion')
      .groupBy('Organizacion.id')
      .getRawMany();
  }
}
