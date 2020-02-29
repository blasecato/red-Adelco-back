import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateCropDto {

  @IsNumber()
  idCrop: number;

  @IsNumber()
  @IsOptional()
  hectareas: number;

  @IsString()
  @IsOptional()
  fechaInicio: string;

  @IsNumber()
  @IsOptional()
  idLineaProductiva: number;

  @IsString()
  @IsOptional()
  codigoProductor: string;

  @IsNumber()
  @IsOptional()
  idAcepta: number;

  @IsNumber()
  @IsOptional()
  dniProductor: number;

  @IsNumber()
  @IsOptional()
  idMunicipio: number;

  @IsNumber()
  @IsOptional()
  idVereda: number;
}
