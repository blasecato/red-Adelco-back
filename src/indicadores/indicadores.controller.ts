import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from "@nestjs/common";
import { Indicadores } from "../entities/Indicadores";
import { IndicadoresService } from "./indicadores.service";
import { AuthGuard } from "@nestjs/passport";


@Controller('indicadores')
export class IndicadoresController {

  constructor(private readonly indicadoresService: IndicadoresService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findOne(): Promise<Indicadores[]> {
    return this.indicadoresService.getById();
  }
}