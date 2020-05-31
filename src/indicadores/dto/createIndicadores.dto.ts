import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateIndicatorDto {

  @IsString()
  @IsOptional()
  descripcion: string;

  @IsNumber()
  @IsOptional()
  meta: number;

  @IsString()
  @IsOptional()
  observacion: string;

  @IsString()
  @IsOptional()
  fuenteVerificacion: string;

  @IsString()
  @IsOptional()
  archivo: string;

  @IsString()
  @IsOptional()
  avances: string;

  @IsNumber()
  @IsOptional()
  idObjetivo: number;

}