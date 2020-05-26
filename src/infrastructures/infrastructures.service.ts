import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Infraestructura } from '../entities/Infraestructura';
import { Repository } from 'typeorm';
import { TipoInfraestructura } from '../entities/TipoInfraestructura';
import { Vereda } from '../entities/Vereda';
import { Municipio } from '../entities/Municipio';
import { UpdateInfrastructureDto } from './dto/updateInfrastructure.dto';

@Injectable()
export class InfrastructuresService {

  constructor(
    @InjectRepository(Infraestructura)
    private readonly infraestructuraRepository: Repository<Infraestructura>,
    @InjectRepository(TipoInfraestructura)
    private readonly TipoInfraestructuraRepository: Repository<TipoInfraestructura>,
    @InjectRepository(Vereda)
    private readonly VeredaRepository: Repository<Vereda>,
    @InjectRepository(Municipio)
    private readonly municipioRepository: Repository<Municipio>
  ) { }

  async createInfrastructure(infraestructura) {
    const { covertura, descripcion, direccion, idTypeInfraestructura, idVereda,idTipoObra2, nombre, planos, responsable } = infraestructura

    const typeInfraestructura = await this.TipoInfraestructuraRepository.findOne({
      where: { id: idTypeInfraestructura }
    })

    const vereda = await this.VeredaRepository.findOne({
      where: { id: idVereda }
    })

    const newInfraestructura = new Infraestructura();
    newInfraestructura.covertura = covertura;
    newInfraestructura.descripcion = descripcion;
    newInfraestructura.direccion = direccion;
    newInfraestructura.idTipoObra2 = typeInfraestructura;
    newInfraestructura.idVereda2 = vereda;
    newInfraestructura.nombre = nombre;
    newInfraestructura.planos = planos;
    newInfraestructura.responsable = responsable;

    return await newInfraestructura.save()
  }

  async getInfraestructura() {
    return await this.infraestructuraRepository.createQueryBuilder("infraestructura")
      .leftJoinAndSelect("infraestructura.idVereda2", "vereda")
      .leftJoinAndSelect("vereda.idMunicipio2", "municipio")
      .getMany()
  }

  async getDateInfra() {
    const municipio = await this.municipioRepository.find({
      relations: ['veredas']
    })

    const typeInfraestructura = await this.TipoInfraestructuraRepository.find({})

    return { municipio, typeInfraestructura }
  }

  async updateInfrastructure(body: UpdateInfrastructureDto) {
    const exist = await this.infraestructuraRepository.findOne({ select: ["nombre"], where: { id: body.id } })
    if (!exist)
      return { error: 'INFRASTRUCTURE_NOT_EXIST', detail: '¡La Infrastructura no existe!' }

    const response = await this.infraestructuraRepository.update(body.id, body)

    if (!response)
      return { error: 'DATA_ENTERED_INCORRECTLY', detail: '¡Los datos se han ingresado incorrectamente!' }

    return { success: 'OK' }
  }
}