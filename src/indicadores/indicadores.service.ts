import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Indicadores } from '../entities/Indicadores';
import { Objetivo } from '../entities/Objetivo';
import { UpdateIndicatorDto } from './dto/updateIndicator.dto';
import { CreateIndicatorDto } from './dto/createIndicadores.dto';
import { CreateObjetiveDto } from './dto/createObjective.dto';

@Injectable()
export class IndicadoresService {
  constructor(
    @InjectRepository(Indicadores) private readonly indicadoresRepository: Repository<Indicadores>,
    @InjectRepository(Objetivo) private readonly objectiveRepository: Repository<Objetivo>
  ) { }

  async findAll(): Promise<Indicadores[]> {
    return await this.indicadoresRepository.createQueryBuilder()
        .select(['Indicadores.id','Indicadores.descripcion','Indicadores.observacion','Indicadores.fuenteVerificacion'])
        .addSelect(['Objetivo.nombre'])
        .innerJoin('Indicadores.idObjetivo2' , 'Objetivo')
        .getMany();
  }

  async getById(indicadorId: number) {
    return await this.indicadoresRepository.findOne({ relations: ['idObjetivo2'], where: { id: indicadorId } });
  }

  async updateIndicator(body: UpdateIndicatorDto) {
    const exist = await this.indicadoresRepository.findOne({ where: { id: body.id } })
    if (!exist)
      return { error: 'INDICATOR_NOT_EXIST', detail: '¡El indicador no existe!' }

    const response = await this.indicadoresRepository.update(body.id,{ ...body})

    if (!response)
      return { error: 'DATA_ENTERED_INCORRECTLY', detail: '¡Los datos se han ingresado incorrectamente!' }

    return { success: 'OK' }
  }

  async createIndicator(body: CreateIndicatorDto) {
    const objective = await this.objectiveRepository.findOne({ where: { id: body.idObjetivo } })
    if (!objective)
      return { error: 'INDICATOR_NOT_EXIST', detail: '¡El indicador no existe!' }

    try {
      await this.indicadoresRepository.save({
        descripcion: body.descripcion,
        meta: body.meta,
        observacion: body.observacion,
        fuenteVerificacion: body.fuenteVerificacion,
        archivo: body.archivo,
        avances: body.avances,
        idObjetivo2: { id: objective.id }
      })
      return { success: 'OK' }
    } catch (error) {
      return { error }
    }
  }

  async createObjective(body: CreateObjetiveDto) {
    try {
      await this.objectiveRepository.save({ ...body })
      return { success: 'OK' }
    } catch (error) {
      return { error }
    }
  }

}