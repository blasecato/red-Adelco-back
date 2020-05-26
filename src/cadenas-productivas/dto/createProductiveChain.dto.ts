import { IsString, IsNumber, IsOptional } from "class-validator";

export class CreateProductiveChainDTO {

  @IsString()
  nombreC: string

  @IsString()
  nombreL: string

}