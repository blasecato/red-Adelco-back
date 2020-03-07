import { IsNumber, IsString } from 'class-validator';

export class CreateTownDto {

  @IsString()
  nombre: string;

  @IsNumber()
  idMunicipio: number;

}
