import { Controller, Get, Post, Put, Body, Query } from "@nestjs/common";
import { IndicadoresService } from "./indicadores.service";
import { UpdateIndicatorDto } from "./dto/updateIndicator.dto";
import { CreateIndicatorDto } from "./dto/createIndicadores.dto";
import { CreateObjetiveDto } from "./dto/createObjective.dto";


@Controller('indicadores')
export class IndicadoresController {

  constructor(private readonly indicadoresService: IndicadoresService) { }

  /*   @UseGuards(AuthGuard('jwt'))
    @Get()
    findOne(): Promise<Indicadores[]> {
      return this.indicadoresService.getById();
    } */

  @Post('create')
  async createIndicator(@Body() body: CreateIndicatorDto) {
    return await this.indicadoresService.createIndicator(body);
  }

  @Post('create/objective')
  async createObjective(@Body() body: CreateObjetiveDto) {
    return await this.indicadoresService.createObjective(body);
  }

  @Put('update')
  async updateIndicator(@Body() body: UpdateIndicatorDto) {
    return await this.indicadoresService.updateIndicator(body);
  }

  @Get('get-all')
  async getAll() {
    return await this.indicadoresService.findAll();
  }

  @Get('get-by')
  async getById(@Query('indicadorid') indicadorId: number) {
    return await this.indicadoresService.getById(indicadorId);
  }

}