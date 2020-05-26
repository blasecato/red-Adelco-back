import { Injectable, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { UpdateCropDto } from './dto/updateCrop.dto';
import { CreateCropDto } from './dto/createCrop.dto';
import { Municipio } from '../entities/Municipio';
import { Productores } from '../entities/Productores';
import { Cultivo } from '../entities/Cultivo';
import { Acepta } from '../entities/Acepta';
import { LineaProductiva } from '../entities/LineaProductiva';
import { Finca } from '../entities/Finca';
import { Diagnostico } from '../entities/Diagnostico';
import { CreateAcceptDto } from './dto/createAccept.dto';
import { CreateDiagnosticDto } from './dto/createDiagnostic.dto';
import { Vereda } from '../entities/Vereda';

@Injectable()
export class CropsService {

  constructor(
    @InjectRepository(Cultivo) private readonly _CropsRepository: Repository<Cultivo>,
    @InjectRepository(Productores) private readonly ProductoresRepository: Repository<Productores>,
    @InjectRepository(LineaProductiva) private readonly lineaProductivaRepository: Repository<LineaProductiva>,
    @InjectRepository(Municipio) private readonly municipioRepository: Repository<Municipio>,
    @InjectRepository(Vereda) private readonly sidewalkRepository: Repository<Vereda>,
    @InjectRepository(Acepta) private readonly AceptaRepository: Repository<Acepta>,
    @InjectRepository(Finca) private readonly farmRepository: Repository<Finca>,
    @InjectRepository(Diagnostico) private readonly diagnosticRepository: Repository<Diagnostico>
  ) { }

  async getCropsProducer() {
    const cropsProducer = await this._CropsRepository.createQueryBuilder()
      .select(["Cultivo.id", "Cultivo.dniProductor", "Cultivo.hectareas", "Cultivo.posicionAcepta"])
      .addSelect(["municipality.nombre", "sidewalk.nombre", "producer.nombres", "producer.apellidos", "lineProducer.nombre"])
      .innerJoin("Cultivo.idMunicipio2", "municipality")
      .innerJoin("Cultivo.idVereda2", "sidewalk")
      .innerJoin("Cultivo.codigoProductor2", "producer")
      .innerJoin("Cultivo.idLineaProductiva2", "lineProducer")
      .getMany()

    return cropsProducer
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
    /*  const accept = await this.AceptaRepository.findOne({ where: { id: body.idAcepta } });
     const productiveLine = await this.lineaProductivaRepository.findOne({ where: { id: body.idLineaProductiva } });
     const municipality = await this.municipioRepository.findOne({ where: { id: body.idMunicipio } });
     const sidewalk = await this.sidewalkRepository.findOne({ where: { id: body.idVereda } });
     const productorId = await this.ProductoresRepository.findOne({ where: { id: body.codigoProductor } });
     const productorDni = await this.ProductoresRepository.findOne({ where: { dni: body.dniProductor } });
     
         if (!accept)
           return { error: 'ACCEPT_NOT_EXITS', detail: 'No existe ningun dato en la entidad acepta.' }
         else if (!productiveLine)
           return { error: 'PRODUCTIVE_LINE_NOT_EXITS', detail: 'No existe ningun registro de linea productiva.' }
         else if (!municipality)
           return { error: 'MUNICIPALITY_NOT_EXITS', detail: 'No existe ningun municipio.' }
         else if (!sidewalk)
           return { error: 'SIDEWALK_NOT_EXITS', detail: 'No existe ninguna vereda.' }
         else if (!productorId)
           return { error: 'ID_PRODUCTOR_NOT_EXITS', detail: 'No existe ningun productor con ese id.' }
         else if (!productorDni)
           return { error: 'DNI_PRODUCTOR_NOT_EXITS', detail: 'No existe ningun productor con ese dni.' }
         else */

    try {
      await this._CropsRepository.save({
        ...body
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
      .select(['Cultivo.hectareas', 'Cultivo.fechaInicio', 'Cultivo.posicionAcepta'])
      .innerJoinAndSelect('Cultivo.dniProductor2', 'Productor')
      .innerJoinAndSelect('Productor.idGenero2', 'Genero')
      .innerJoinAndSelect('Productor.idEtnia2', 'Etnia')
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
    const crop = await this._CropsRepository.findOne({
      select: ['id', 'posicionAcepta'],
      where: { id: body.idCultivo }
    })
    const farm = await this.farmRepository.findOne({
      select: ['id', 'nombre'],
      where: { id: body.idFinca }
    })

    /*   if (!farm) {
        return { error: 'FARM_NOT_EXIST', detail: 'La finca no se encuentra en la base de datos.' }
      } else  */

    if (!crop) {
      return { error: 'CROP_NOT_EXIST', detail: 'El cultivo no se encuentra en la base de datos.' }
    } else {
      try {
        await this.diagnosticRepository.save(body)
        return { success: 'OK' }
      } catch (error) {
        return { error }
      }
    }
  }

  async getCropsDiagnosticAll() {
    return await this._CropsRepository.find({
      join: {
        alias: 'crop',
        innerJoinAndSelect: {
          diagnosticos: "crop.diagnosticos"
        }
      }
    })
  }

}
