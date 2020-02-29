import { Injectable, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCropDto } from './dto/createCrop.dto';
import { Cultivo } from '../entities/Cultivo';
import { Repository } from 'typeorm';
import { UpdateCropDto } from './dto/updateCrop.dto';

@Injectable()
export class CropsService {

  constructor(
    @InjectRepository(Cultivo) private readonly _CropsRepository: Repository<Cultivo>
  ) { }

  async getCropsProducer() {
    const cropsProducer = await this._CropsRepository.createQueryBuilder("crops")
      .select(["crops.id", "crops.dniProductor", "crops.hectareas"])
      .addSelect(["municipality.nombre", "sidewalk.nombre", "producer.nombres", "producer.apellidos", "lineProducer.nombre"])
      .innerJoin("crops.idMunicipio2", "municipality")
      .innerJoin("crops.idVereda2", "sidewalk")
      .innerJoin("crops.codigoProductor2", "producer")
      .innerJoin("crops.idLineaProductiva2", "lineProducer")
      .getMany()

    return cropsProducer
  }
  async createCrop(body: CreateCropDto) {
    try {
      await this._CropsRepository.save({
        idLineaProductiva2: { id: body.idLineaProductiva },
        idAcepta2: { id: body.idAcepta },
        idMunicipio2: { id: body.idMunicipio },
        idVereda2: { id: body.idVereda },
        hectareas: body.hectareas,
        fechaInicio: body.fechaInicio,
        codigoProductor: body.codigoProductor,
        dniProductor: body.dniProductor,
      })
      return { success: 'OK' }
    } catch (error) {
      return { error }
    }
  }

  async updateCrop(body: UpdateCropDto) {

    const exist = this._CropsRepository.findOne({ where: { id: body.idCrop } })
    if (!exist)
      return { error: 'CROP_NOT_EXIST', detail: 'El cultivo no existe' }

    try {
      await this._CropsRepository.update(body.idCrop, body)
      return { success: 'OK' }
    } catch (error) {
      return error;
    }

  }

}
