import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class LoginDto {

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  password: string;
}