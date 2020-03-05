import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateCropDto {

    @IsNumber()
    hectareas: number;

    @IsString()
    fechaInicio: string;

    @IsNumber()
    @IsOptional()
    idLineaProductiva: number;

    @IsOptional()
    codigoProductor: string;

    @IsNumber()
    @IsOptional()
    idAcepta: number;

    @IsOptional()
    dniProductor: number;

    @IsNumber()
    @IsOptional()
    idMunicipio: number;

    @IsNumber()
    @IsOptional()
    idVereda: number;
}
