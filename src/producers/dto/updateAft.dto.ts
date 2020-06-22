import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateAftDto {

  @IsNumber()
  id: number;

  @IsNumber()
  @IsOptional()
  idOrganizacion: number;

  @IsNumber()
  @IsOptional()
  valorAft: number;

  @IsString()
  @IsOptional()
  fechaEntrega: string;

  @IsString()
  @IsOptional()
  cuenta: string;

  @IsString()
  @IsOptional()
  tipoCuenta: string;

  @IsString()
  @IsOptional()
  banco: string;

  @IsString()
  @IsOptional()
  documento: string;

  @IsString()
  @IsOptional()
  matricula: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  avances: string;

  @IsNumber()
  producerDni: number;

  @IsNumber()
  @IsOptional()
  idMunicipio: number;

  @IsNumber()
  @IsOptional()
  dv: number;

  @IsString()
  @IsOptional()
  nit: string;

  @IsNumber()
  @IsOptional()
  idProductor: number;

}