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
      .innerJoinAndSelect("", "")
  }
}
