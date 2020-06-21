import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateTypeToolDto {

  @IsString()
  @IsOptional()
  nombre: string;

  @IsString()
  @IsOptional()
  marca: string

  @IsNumber()
  @IsOptional()
  precio: number;

  @IsNumber()
  @IsOptional()
  id: number;

}