import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateDiagnosticDto {
  @IsString()
  @IsOptional()
  nombre: string;

  @IsString()
  @IsOptional()
  fecha: string;

  @IsString()
  @IsOptional()
  horaInicio: string;

  @IsString()
  @IsOptional()
  horaFin: string;

  @IsString()
  @IsOptional()
  imagen: string;

  @IsNumber()
  idCultivo: number;

  @IsNumber()
  @IsOptional()
  idFinca: number;
}
