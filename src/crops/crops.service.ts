import { Injectable, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCropDto } from './dto/updateCrop.dto';
import { CropsRepository } from './crops.repository';
import { Productores } from 'src/entities/Productores';
import { LineaProductiva } from 'src/entities/LineaProductiva';
import { Municipio } from 'src/entities/Municipio';

@Injectable()
export class CropsService {

  constructor(
    @InjectRepository(CropsRepository)
    private readonly _CropsRepository: CropsRepository,
    @InjectRepository(Productores)
    private readonly ProductoresRepository: Repository<Productores>,
    @InjectRepository(LineaProductiva)
    private readonly lineaProductivaRepository: Repository<LineaProductiva>,
    @InjectRepository(Municipio)
    private readonly municipioRepository: Repository<Municipio>,
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

  async geDateCrop() {
    const productores = await this.ProductoresRepository.find({})
    const linea = await this.lineaProductivaRepository.find({})
    const municipio = await this.municipioRepository.find({
      relations: ['veredas']
    })

    return { productores, linea, municipio }
  }

  async createCrop(crop) {
    return this._CropsRepository.save(crop)
  }

  async updateCrop(body: UpdateCropDto) {
    const exist = this._CropsRepository.findOne({ where: { id: body.idCrop } })
    if (!exist)
      return { error: 'CROP_NOT_EXIST', detail: 'El cultivo no existe' }

    try {
      await this._CropsRepository.update(body.idCrop, {
        hectareas: body.hectareas,
        fechaInicio: body.fechaInicio,
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
}
