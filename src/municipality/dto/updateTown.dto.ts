import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateTownDto {

  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  nombre: string;

  @IsNumber()
  @IsOptional()
  idMunicipio: number;

}
