import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LineaProductiva } from '../entities/LineaProductiva';
import { CadenaProductiva } from '../entities/CadenaProductiva';
import { Vereda } from '../entities/Vereda';
import { CreateProductiveChainDTO } from './dto/createProductiveChain.dto';

@Injectable()
export class CadenasProductivasService {

  constructor(
    @InjectRepository(LineaProductiva)
    private readonly LineaProductivaRepository: Repository<LineaProductiva>,
    @InjectRepository(CadenaProductiva)
    private readonly cadenaProductivaRepository: Repository<CadenaProductiva>,
    @InjectRepository(Vereda)
    private readonly VeredaRepository: Repository<Vereda>,
  ) { }

  async getAll() {
    return await this.cadenaProductivaRepository.find({
    })
  }

  async getLine() {
    return await this.LineaProductivaRepository.find({
      relations: ['idCadenaProductiva2']
    })
  }

  async create(body: CreateProductiveChainDTO) {
    try {
      const chain = await this.cadenaProductivaRepository.save({
        nombre: body.nombreC
      })

      await this.LineaProductivaRepository.save({
        nombre: body.nombreL, idCadenaProductiva2: { id: chain.id }
      })
      return { success: 'OK' }
    } catch (error) {
      return { error }
    }
  }

  async createline(line) {
    return await this.LineaProductivaRepository.save(line)
  }

  async getVereda() {
    return await this.VeredaRepository.find({
      relations: ['idMunicipio2']
    })
  }

  async createVereda(vereda) {
    return await this.VeredaRepository.save(vereda)
  }
}
