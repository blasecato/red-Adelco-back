import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Indicadores } from '../entities/Indicadores';
import { UpdateIndicatorDto } from './dto/updateIndicator.dto';

@Injectable()
export class IndicadoresService {
  constructor(
    @InjectRepository(Indicadores) private readonly indicadoresRepository: Repository<Indicadores>,
  ) { }

  async findAll(): Promise<Indicadores[]> {
    return await this.indicadoresRepository.find();
  }

  async getById() {
    return await this.indicadoresRepository.createQueryBuilder()
      .select(['Indicadores.id', 'Indicadores.descripcion', 'Indicadores.observacion', 'Indicadores.fuenteVerificacion'])
      .addSelect(['Objetivo.nombre'])
      .innerJoin('Indicadores.idObjetivo2', 'Objetivo')
      .getMany();
  }

  async updateIndicator(body: UpdateIndicatorDto) {
    const exist = await this.indicadoresRepository.findOne({ where: { id: body.id } })
    if (!exist)
      return { error: 'INDICATOR_NOT_EXIST', detail: '¡El indicador no existe!' }

    const response = await this.indicadoresRepository.update(body.id, body)

    if (!response)
      return { error: 'DATA_ENTERED_INCORRECTLY', detail: '¡Los datos se han ingresado incorrectamente!' }

    return { success: 'OK' }
  }

}