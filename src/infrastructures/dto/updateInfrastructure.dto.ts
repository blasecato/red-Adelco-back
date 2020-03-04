import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateInfrastructureDto {

  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion: string;

  @IsString()
  @IsOptional()
  planos: string;

  @IsString()
  @IsOptional()
  direccion: string;

  @IsString()
  @IsOptional()
  responsable: string;

  @IsString()
  @IsOptional()
  covertura: string;

  @IsNumber()
  @IsOptional()
  idTipoObra: number;

  @IsNumber()
  @IsOptional()
  idVereda: number;

}