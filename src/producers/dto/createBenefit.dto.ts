import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateBeneficiaryDto {

  @IsString()
  @IsOptional()
  nombre: string;
  
  @IsNumber()
  @IsOptional()
  idTipoBeneficio: number;  
  
  @IsNumber()
  @IsOptional()
  intencidad: number;

  @IsNumber()
  @IsOptional()
  idBeneficio: number;

}