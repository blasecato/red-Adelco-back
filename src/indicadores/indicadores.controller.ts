import { Controller, Get , Post , Put , Delete ,Body, Param } from "@nestjs/common";
import { Indicadores } from "../entities/Indicadores";
import { IndicadoresService } from "./indicadores.service";


@Controller('indicadores')
export class IndicadoresController {

    constructor(private readonly indicadoresService: IndicadoresService){}

    
     @Get()
     findAll(): Promise<Indicadores[]>{
          return this.indicadoresService.findAll();
     }

     // @Get()
     // findOne(@Param('id') id):Promise<Indicadores>{
     //     return this.indicadoresService.getById();
     // }
}