import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateObjetiveDto {

  @IsString()
  @IsOptional()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion: string;

}