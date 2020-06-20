import { IsNotEmpty, IsString, IsEmail, Length, IsNumber, IsOptional } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  nombres: string;

  @IsString()
  apellidos: string;

  @IsOptional()
  @IsNumber()
  idGenero: number;

  @IsString()
  telefono: string;

  @IsNumber()
  @IsOptional()
  edad: number;

  @IsNumber()
  @IsOptional()
  idParentesco: number;

  @IsNumber()
  @IsOptional()
  idConflicto: number;

  @IsNumber()
  @IsOptional()
  idEtnia: number;

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

  @IsString()
  @IsOptional()
  rol: string;
}