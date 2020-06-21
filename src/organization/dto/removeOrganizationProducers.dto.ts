import { IsNumber, IsString, IsOptional } from 'class-validator';

export class RemoveOrganizationProducersDto {

    @IsNumber()
    id: number;

    @IsString()
    estado: string;

    @IsNumber()
    idOrganizacion: number;

    @IsNumber()
    dniProductor: number;
}