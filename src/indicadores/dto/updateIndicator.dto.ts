import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateIndicatorDto {

  @IsNumber()
  id: number;

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
}