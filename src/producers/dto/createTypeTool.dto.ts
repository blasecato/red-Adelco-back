import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateTypeToolDto {

  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  marca: string

  @IsNumber()
  @IsOptional()
  precio: number;

}