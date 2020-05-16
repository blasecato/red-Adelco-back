import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateAcceptDto {

  @IsNumber()
  idCrop: number;

  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  fechaAcepta: string;
}
