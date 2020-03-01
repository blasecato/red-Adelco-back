import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CropsRepository } from './crops.repository';
import { Productores } from 'src/entities/Productores';
import { Repository } from 'typeorm';

@Injectable()
export class CropsService {

  constructor(
    @InjectRepository(CropsRepository)
    private readonly _CropsRepository: CropsRepository,
    @InjectRepository(Productores)
    private readonly ProductoresRepository: Repository<Productores>,
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
    return await this.ProductoresRepository.find({})
  }

  async createCrop(crop) {
    this._CropsRepository.save(crop)
  }
}
