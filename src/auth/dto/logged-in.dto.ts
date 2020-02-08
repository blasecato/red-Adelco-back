import { IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LoggedInDto {
  @Expose()
  @IsString()
  token: string;
}