import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateProducerDto {

  @IsString()
  @IsOptional()
  id: string;

  @IsNumber()
  dni: number;

  @IsString()
  @IsOptional()
  nombres: string;

  @IsString()
  @IsOptional()
  apellidos: string;

  @IsNumber()
  @IsOptional()
  edad: number;

  @IsString()
  @IsOptional()
  telefono: string;

  @IsNumber()
  @IsOptional()
  idGenero: number;

  @IsString()
  @IsOptional()
  idProductor: string;

  @IsNumber()
  @IsOptional()
  idConflicto: number;

  @IsNumber()
  @IsOptional()
  idFinca: number;

  @IsNumber()
  @IsOptional()
  idParentesco: number;

  @IsNumber()
  @IsOptional()
  idDiscapacitado: number;

  @IsNumber()
  @IsOptional()
  idZona: number;

  @IsNumber()
  @IsOptional()
  idCargoOrg: number;

  @IsString()
  @IsOptional()
  state: string;

}