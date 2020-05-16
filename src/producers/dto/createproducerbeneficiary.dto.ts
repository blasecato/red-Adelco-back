import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateProducerBeneficiaryDto {

  @IsString()
  idProducer: string;

  @IsNumber()
  dni: number;

  @IsNumber()
  @IsOptional()
  idBeneficiary: number;

  @IsString()
  @IsOptional()
  fechaInicio: string;

  @IsString()
  @IsOptional()
  fechaFin: string;

  @IsString()
  @IsOptional()
  escuelaAgroforesteria: string;

  @IsString()
  @IsOptional()
  escuelaAgrosilvopastoril: string;

  @IsString()
  @IsOptional()
  escuelaAromaticas: string;

  @IsString()
  @IsOptional()
  escuelaPermacultura: string;

  @IsString()
  @IsOptional()
  escuelaSRCacao: string;

  @IsString()
  @IsOptional()
  escuelaSRPNMB: string;

  @IsString()
  @IsOptional()
  parcelaDemostrativa: string;

  @IsString()
  @IsOptional()
  cacaoPlanadas: string;

  @IsString()
  @IsOptional()
  canaPanelera: string;

  @IsString()
  @IsOptional()
  intercambioHuitora: string;

  @IsString()
  @IsOptional()
  giraPNMB: string;

  @IsString()
  @IsOptional()
  giraCacao: string;

  @IsString()
  @IsOptional()
  poscosechaCacao: string;

  @IsString()
  @IsOptional()
  transformacionPulpas: string;

  @IsString()
  @IsOptional()
  manejoEcosistemico: string;

  @IsString()
  @IsOptional()
  transformacionChocolate: string;

  @IsString()
  @IsOptional()
  certificadoOrganica: string;

  @IsString()
  @IsOptional()
  transformacionPNMB: string;

  @IsString()
  @IsOptional()
  fitosanitarioCultivos: string;

}