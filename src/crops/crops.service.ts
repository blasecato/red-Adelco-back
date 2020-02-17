import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CropsRepository } from './crops.repository';

@Injectable()
export class CropsService {

  constructor(
    @InjectRepository(CropsRepository)
    private readonly _CropsRepository: CropsRepository,
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
}
