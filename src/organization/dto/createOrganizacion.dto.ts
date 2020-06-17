import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateOrganizationDto {

  @IsString()
  @IsOptional()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion: string;

  @IsNumber()
  @IsOptional()
  contacto: string;

  @IsString()
  @IsOptional()
  temaCapacitacion: string;

  @IsString()
  @IsOptional()
  focalizacion: string;

  @IsString()
  @IsOptional()
  aplicacionICO: string;

  @IsString()
  @IsOptional()
  diagnosticoICO: string;

  @IsString()
  @IsOptional()
  tipoAft: string;

  @IsString()
  @IsOptional()
  participacionMesaMujerGenero: string;

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