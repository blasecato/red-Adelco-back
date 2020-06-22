import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCropDto } from './dto/updateCrop.dto';
import { CreateCropDto } from './dto/createCrop.dto';
import { Municipio } from '../entities/Municipio';
import { Productores } from '../entities/Productores';
import { Cultivo } from '../entities/Cultivo';
import { Acepta } from '../entities/Acepta';
import { LineaProductiva } from '../entities/LineaProductiva';
import { Diagnostico } from '../entities/Diagnostico';
import { CreateAcceptDto } from './dto/createAccept.dto';
import { CreateDiagnosticDto } from './dto/createDiagnostic.dto';

@Injectable()
export class CropsService {

  constructor(
    @InjectRepository(Cultivo) private readonly _CropsRepository: Repository<Cultivo>,
    @InjectRepository(Productores) private readonly ProductoresRepository: Repository<Productores>,
    @InjectRepository(LineaProductiva) private readonly lineaProductivaRepository: Repository<LineaProductiva>,
    @InjectRepository(Municipio) private readonly municipioRepository: Repository<Municipio>,
    @InjectRepository(Acepta) private readonly AceptaRepository: Repository<Acepta>,
    @InjectRepository(Diagnostico) private readonly diagnosticRepository: Repository<Diagnostico>
  ) { }

  async getCropsProducer() {
    return await this._CropsRepository.createQueryBuilder()
      .leftJoinAndSelect("Cultivo.idMunicipio2", "municipality")
      .leftJoinAndSelect("Cultivo.idVereda2", "sidewalk")
      .leftJoinAndSelect("Cultivo.codigoProductor2", "producer")
      .leftJoinAndSelect("Cultivo.idLineaProductiva2", "lineProducer")
      .getMany()
  }

  async getAllCrops() {
    return await this._CropsRepository.find({});
  }

  async geDateCrop() {
    const productores = await this.ProductoresRepository.find({})
    const linea = await this.lineaProductivaRepository.find({})
    const municipio = await this.municipioRepository.find({
      relations: ['veredas']
    })

    return { productores, linea, municipio }
  }

  async createCrop(body: CreateCropDto) {
    try {
      await this._CropsRepository.save({
        hectareas: body.hectareas,
        fechaInicio: body.fechaInicio,
        trabajoPrincipal: body.trabajoPrincipal,
        entidadPerteneciente: body.entidadPerteneciente,
        posicionAcepta: body.posicionAcepta,
        idLineaProductiva2: { id: body.idLineaProductiva },
        codigoProductor2: { id: body.codigoProductor },
        idAcepta2: { id: body.idAcepta },
        dniProductor2: { dni: body.dniProductor },
        idMunicipio2: { id: body.idMunicipio },
        idVereda2: { id: body.idVereda }
      })

      return { success: 'OK' }
    } catch (error) {
      return { error }
    }
  }

  async updateCrop(body: UpdateCropDto) {
    const exist = await this._CropsRepository.findOne({ where: { id: body.idCrop } })
    if (!exist)
      return { error: 'CROP_NOT_EXIST', detail: 'El cultivo no existe' }

    try {
      await this._CropsRepository.update(body.idCrop, {
        hectareas: body.hectareas,
        fechaInicio: body.fechaInicio,
        posicionAcepta: body.posicionAcepta,
        entidadPerteneciente: body.entidadPerteneciente,
        trabajoPrincipal: body.trabajoPrincipal,
        idLineaProductiva2: { id: body.idLineaProductiva },
        codigoProductor2: { id: body.codigoProductor },
        idAcepta2: { id: body.idAcepta },
        dniProductor2: { id: body.dniProductor },
        idMunicipio2: { id: body.idMunicipio },
        idVereda2: { id: body.idVereda },
      })
      return { success: 'OK' }
    } catch (error) {
      return error;
    }
  }

  async getCountCropsLineProducter(productivelineId: number) {
    const countCrop = await this._CropsRepository.createQueryBuilder()
      .select('count(Cultivo.id)', 'countCrops')
      .innerJoin('Cultivo.idLineaProductiva2', 'LineaProductiva')
      .where('LineaProductiva.id=:productivelineId', { productivelineId })
      .getRawOne()

    const dataCrops = await this._CropsRepository.createQueryBuilder()
      .select(['Cultivo.hectareas', 'Cultivo.fechaInicio', 'Cultivo.posicionAcepta',
        'Cultivo.entidadPerteneciente', 'Cultivo.trabajoPrincipal'])
      .innerJoinAndSelect('Cultivo.dniProductor2', 'Productor')
      .innerJoinAndSelect('Productor.idGenero', 'Genero')
      .innerJoinAndSelect('Productor.idEtnia', 'Etnia')
      .innerJoinAndSelect('Cultivo.idLineaProductiva2', 'LineaProductiva')
      .innerJoinAndSelect('Cultivo.idMunicipio2', 'Municipio')
      .innerJoinAndSelect('Municipio.veredas', 'Vereda')
      .where('LineaProductiva.id=:productivelineId', { productivelineId })
      .getMany()

    return { countCrop, dataCrops }
  }

  async createAccept(body: CreateAcceptDto) {
    /*  const crop = await this._CropsRepository.findOne({ select: ['id'], where: { id: body.idCrop } })
     if (!crop)
       return { error: 'CROP_NOT_EXIST', detail: 'El cultivo no existe.' } */

    try {
      const accept = await this.AceptaRepository.save({ ...body })
      /*  await this._CropsRepository.update(crop.id, { idAcepta2: { id: accept.id } }) */

      return { success: 'OK' }
    } catch (error) {
      return { error }
    }
  }

  async createDiagnostic(body: CreateDiagnosticDto) {
    const crop = await this._CropsRepository.findOne({ where: { id: body.idCultivo } });

    if (!crop)
      return { error: 'CROP_NOT_EXIST', detail: 'El cultivo no se encuentra en la base de datos.' }

    try {
      const diagnostic = await this.diagnosticRepository.save({
        nombre: body.nombre,
        fecha: body.fecha,
        horaInicio: body.horaInicio,
        horaFin: body.horaFin,
        imagen: body.imagen
      });

      await this.diagnosticRepository.update(diagnostic.id, {
        cultivos: { id: crop.id },
        fincas: { id: body.idFinca }
      })

      return { success: 'OK' }
    } catch (error) {
      return { error }
    }
  }

  async getCropsDiagnosticAll() {
    return await this.diagnosticRepository.createQueryBuilder()
      .innerJoinAndSelect('Diagnostico.cultivos', 'cultivos')
      .getMany()
  }
}
