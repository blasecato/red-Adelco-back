import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LineaProductiva } from 'src/entities/LineaProductiva';
import { CadenaProductiva } from 'src/entities/CadenaProductiva';
import { Vereda } from 'src/entities/Vereda';

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

  async create(cadena) {
    return await this.cadenaProductivaRepository.save(cadena)
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
