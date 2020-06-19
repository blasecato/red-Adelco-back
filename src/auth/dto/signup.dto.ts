import { IsNotEmpty, IsString, IsEmail, Length, IsNumber, IsOptional } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  @IsOptional()
  nombres: string;

  @IsString()
  @IsOptional()
  apellidos: string;

  @IsString()
  @IsOptional()
  idGenero: string;

  @IsString()
  @IsOptional()
  telefono: string;

  @IsString()
  @IsOptional()
  edad: string;

  @IsString()
  @IsNumber()
  @IsOptional()
  idParentesco: string;

  @IsString()
  @IsNumber()
  @IsOptional()
  idConflicto: string;

  @IsString()
  @IsNumber()
  @IsOptional()
  idEtnia: string;

  @IsNotEmpty()
  @IsNumber()
  dni: number;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  password: string;
}