import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateProducerOrganizationDto {

  @IsNumber()
  @IsOptional()
  idOrganizacion: number;

  @IsNumber()
  @IsOptional()
  idProductor: number;
}