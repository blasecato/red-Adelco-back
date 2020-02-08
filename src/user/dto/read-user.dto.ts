import { IsString, IsNumber } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class ReadUserDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  readonly username: string;

  @Expose()
  @IsString()
  readonly email: string;

}