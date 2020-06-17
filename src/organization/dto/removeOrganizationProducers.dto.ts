import { IsNumber, IsString, IsOptional } from 'class-validator';

export class RemoveOrganizationProducersDto {

    @IsNumber()
    id: number;

    @IsString()
    @IsOptional()
    estado: string;

    @IsNumber()
    @IsOptional()
    idOrganizacion: number;

    @IsNumber()
    @IsOptional()
    dniProductor: number;
}