import { Controller, Get , Post , Put , Delete ,Body } from "@nestjs/common";
import { Indicadores } from "../entities/Indicadores";
import { IndicadoresService } from "./indicadores.service";


@Controller('indicadores')
export class IndicadoresController {

    constructor(private readonly indicadoresService: IndicadoresService){}

    // @Get()
    // getIndicadores(): string {
    //     return 'hola'
    // }
    // sirve
     @Get()
     findAll(): Promise<Indicadores[]>{
          return this.indicadoresService.findAll();
     }
}