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

  @IsString()
  @IsOptional()
  contacto: string;

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

  @IsNumber()
  @IsOptional()
  idIco:number;
}