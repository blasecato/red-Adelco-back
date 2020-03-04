import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateOrganizationDto {

  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion: string;

  @IsNumber()
  @IsOptional()
  contacto: number;

  @IsString()
  @IsOptional()
  temaCapacitacion: string;

  @IsString()
  @IsOptional()
  temaEmpresarial: string;

  @IsNumber()
  @IsOptional()
  idVereda: number;

  @IsNumber()
  @IsOptional()
  representante: number;

  @IsNumber()
  @IsOptional()
  socio: number;
}