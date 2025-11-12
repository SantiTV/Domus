/* eslint-disable prettier/prettier */
import {IsOptional, IsUUID} from 'class-validator';
export class AgendamientoDto {

    @IsOptional()
    @IsUUID()
    usuarioId: string;
    
    @IsOptional()
    @IsUUID()
    ofertaId: string;

    @IsOptional()
    @IsUUID()
    reseniaId: string;

    @IsOptional()
    @IsUUID()
    trabajadorId: string;

}
