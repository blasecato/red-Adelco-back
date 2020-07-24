import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Municipio } from '../entities/Municipio';
import { Productores } from '../entities/Productores';
import { UpdateOrganizationDto } from './dto/updateOrganization.dto';
import { CreateOrganizationDto } from './dto/createOrganizacion.dto';
import { Organizacion } from '../entities/Organizacion';
import { RemoveOrganizationProducersDto } from './dto/removeOrganizationProducers.dto';
import { ProductorOrganizacion } from '../entities/ProductorOrganizacion';
import { CreateProducerOrganizationDto } from './dto/createProducerOrganization.dto';

@Injectable()
export class organizationService {

  constructor(
    @InjectRepository(Organizacion) private readonly _OrganizationRepository: Repository<Organizacion>,
    @InjectRepository(Municipio) private readonly _MunicipioRepository: Repository<Municipio>,
    @InjectRepository(Productores) private readonly producersRepository: Repository<Productores>,
    @InjectRepository(ProductorOrganizacion) private readonly ProductorOrganizacionRepository: Repository<ProductorOrganizacion>,
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

  getFindUsers(id) {
    return this.ProductorOrganizacionRepository.createQueryBuilder("productor_organizacion")
    .select("productor_organizacion.id", "id")
    .addSelect("estado", "estado")
    .addSelect("fk_organizacion", "fk_organizacion")
    .addSelect("fk_productor", "fk_productor")
    .leftJoinAndSelect("productor_organizacion.idOrganizacion", "organizacion")
    .where("fk_productor = :ids", { ids: id })
    .andWhere("estado = :activo" , { activo: "activo" } )
    .execute();
  }
  

  async getOrganizacion() {
    return await this._OrganizationRepository.createQueryBuilder("organization")
      .leftJoinAndSelect("organization.idVereda2", "vereda")
      .leftJoinAndSelect("organization.representante2", "representante")
      .leftJoinAndSelect("vereda.idMunicipio2", "municipio")
      .getMany()
  }

  async getByIdOrganization(idOrganization: number) {
    const organization = await this._OrganizationRepository.findOne({
      relations: ['afts', 'socio2', 'idVereda2', 'representante2', 'idIco2', 'productoresOrganizaciones',
        'productoresOrganizaciones.dniProductor'], where: { id: idOrganization }
    });

    if (!organization)
      return { error: 'ORGANIZATION_NOT_EXIST', detail: 'La organizacion no existe' };

    return organization;
  }

  async getPrododucerOrganization() {
    return await this._OrganizationRepository.createQueryBuilder()
      .innerJoinAndSelect('Organizacion.productoresOrganizaciones', 'productoresOrganizaciones')
      .innerJoinAndSelect('productoresOrganizaciones.dniProductor', 'productor')
      .where("productoresOrganizaciones.estado='activo'")
      .getMany();
  }

  async updateOrganization(body: UpdateOrganizationDto) {
    const exist = await this._OrganizationRepository.findOne({ select: ["nombre"], where: { id: body.id } })
    if (!exist)
      return { error: 'ORGANIZATION_NOT_EXIST', detail: '¡La Organización no existe!' }

    await this._OrganizationRepository.update(body.id, body)

    return { success: 'OK' }
  }

  async removeOrganizationProductor(body: RemoveOrganizationProducersDto) {
    const exist = await this.ProductorOrganizacionRepository.findOne({ where: { id: body.id } })
    const organization = await this._OrganizationRepository.findOne({ where: { id: body.idOrganizacion } })
    const producer = await this.producersRepository.findOne({ where: { dni: body.dniProductor } })

    if (!exist)
      return { error: 'PRODUCTOR_ORGANIZATION_NOT_EXIST', detail: '¡No hay productores registrados en organizaciones!' }
    if (!organization)
      return { error: 'ORGANIZATION_NOT_EXIST', detail: '¡La Organización no existe!' }
    if (!producer)
      return { error: 'PRODUCER_NOT_EXIST', detail: '¡El Productor no existe!' }

    await this.ProductorOrganizacionRepository.update(exist.id, { estado: body.estado });

    return { success: 'OK' }
  }

  async createProducerOrganization(body: CreateProducerOrganizationDto) {
    const organization = await this._OrganizationRepository.findOne({ where: { id: body.idOrganizacion } });
    const producer = await this.producersRepository.findOne({ where: { dni: body.dniProductor } });

    if (!organization)
      return { error: 'ORGANIZATION_NOT_EXIST', detail: '¡La Organización no existe!' }
    if (!producer)
      return { error: 'PRODUCER_NOT_EXIST', detail: '¡El Productor no existe!' }

    try {
      await this.ProductorOrganizacionRepository.save({
        dniProductor: { dni: producer.dni }, idOrganizacion: { id: organization.id }
      });
      return { success: 'OK' }
    } catch (error) {
      return { error }
    }
  }

  async countPersonsOrganization(idOrganization: number) {
    const countProducers = await this.ProductorOrganizacionRepository.createQueryBuilder()
      .select('count(Productores.id)', 'countProducers')
      .innerJoin('ProductorOrganizacion.dniProductor', 'Productores')
      .innerJoin('ProductorOrganizacion.idOrganizacion', 'Organizacion')
      .where("Organizacion.id =:idOrganization AND ProductorOrganizacion.estado='activo'", { idOrganization })
      .getRawOne();

    const dataProducers = await this.ProductorOrganizacionRepository.createQueryBuilder()
      .innerJoinAndSelect('ProductorOrganizacion.idOrganizacion', 'Organizacion')
      .innerJoinAndSelect('ProductorOrganizacion.dniProductor', 'Productores')
      .innerJoinAndSelect('Productores.idGenero', 'Genero')
      .where("Organizacion.id =:idOrganization AND ProductorOrganizacion.estado='activo'", { idOrganization })
      .orderBy('ProductorOrganizacion.id','ASC')
      .getMany();

    const countWoman = await this.ProductorOrganizacionRepository.createQueryBuilder()
      .select('count(Genero.id)', 'countWoman')
      .innerJoin('ProductorOrganizacion.idOrganizacion', 'Organizacion')
      .innerJoin('ProductorOrganizacion.dniProductor', 'Productores')
      .innerJoin('Productores.idGenero', 'Genero')
      .where("Genero.key='woman' AND Organizacion.id =:idOrganization AND ProductorOrganizacion.estado='activo'", { idOrganization })
      .execute();

    const dataWoman = await this.ProductorOrganizacionRepository.createQueryBuilder()
      .innerJoinAndSelect('ProductorOrganizacion.idOrganizacion', 'Organizacion')
      .innerJoinAndSelect('ProductorOrganizacion.dniProductor', 'Productores')
      .innerJoinAndSelect('Productores.idGenero', 'Genero')
      .where("Genero.key='woman' AND Organizacion.id =:idOrganization AND ProductorOrganizacion.estado='activo'", { idOrganization })
      .orderBy('ProductorOrganizacion.id','ASC')
      .getMany();

    const dataMan = await this.ProductorOrganizacionRepository.createQueryBuilder()
      .innerJoinAndSelect('ProductorOrganizacion.idOrganizacion', 'Organizacion')
      .innerJoinAndSelect('ProductorOrganizacion.dniProductor', 'Productores')
      .innerJoinAndSelect('Productores.idGenero', 'Genero')
      .where("Genero.key='man' AND Organizacion.id =:idOrganization AND ProductorOrganizacion.estado='activo'", { idOrganization })
      .orderBy('ProductorOrganizacion.id','ASC')
      .getMany();

    const countMan = await await this.ProductorOrganizacionRepository.createQueryBuilder()
      .select('count(Genero.id)', 'countMan')
      .innerJoin('ProductorOrganizacion.idOrganizacion', 'Organizacion')
      .innerJoin('ProductorOrganizacion.dniProductor', 'Productores')
      .innerJoin('Productores.idGenero', 'Genero')
      .where("Genero.key='man' AND Organizacion.id =:idOrganization AND ProductorOrganizacion.estado='activo'", { idOrganization })
      .getRawOne();

    return { countProducers, countWoman, countMan, dataProducers, dataWoman, dataMan }
  }

}
