import { IsNumber } from 'class-validator';

export class CreateProducerOrganizationDto {

  @IsNumber()
  idOrganizacion: number;

  @IsNumber()
  dniProductor: number;
}