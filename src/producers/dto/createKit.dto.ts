import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateKitDto {

  @IsString()
  kitName: string;

  @IsString()
  idProducer: string;

  @IsNumber()
  @IsOptional()
  idTypeTool: number;

  @IsString()
  @IsOptional()
  imagenActa: string;

  @IsString()
  @IsOptional()
  toolDetail: string;

  @IsString()
  @IsOptional()
  toolName: string;

  @IsNumber()
  @IsOptional()
  toolPrice: number;

  @IsString()
  @IsOptional()
  toolMark: string;

}