import { IsNumber, IsString } from 'class-validator';

export class CreateCropDto {

    @IsNumber()
    hectareas: number;

    @IsString()
    fechaInicio: string;

    @IsNumber()
    idLineaProductiva: number;

    @IsString()
    codigoProductor: string;

    @IsNumber()
    idAcepta: number;

    @IsNumber()
    dniProductor: number;

    @IsNumber()
    idMunicipio: number;

    @IsNumber()
    idVereda: number;
}
