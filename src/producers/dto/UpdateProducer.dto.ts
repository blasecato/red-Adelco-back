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
  entidad: string;

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

  @IsNumber()
  @IsOptional()
  idBeneficio2: number;

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