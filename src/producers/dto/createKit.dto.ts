import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateKitDto {

  @IsString()
  idProducer: string;

  @IsString()
  kitName: string;

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

  @IsString()
  idKit: string;

  @IsNumber()
  typeTool: number;

}