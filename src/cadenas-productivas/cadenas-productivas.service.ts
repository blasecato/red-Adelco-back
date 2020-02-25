import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LineaProductiva } from 'src/entities/LineaProductiva';

@Injectable()
export class CadenasProductivasService {

  constructor(
    @InjectRepository(LineaProductiva)
    private readonly LineaProductivaRepository: Repository<LineaProductiva>,
  ) { }

  async getAll() {
    return await this.LineaProductivaRepository.find({
      relations: ['idCadenaProductiva2']
    })
  }

}
