/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
export class ReseñaDto {
    @IsString()
    @IsNotEmpty()
    comentario: string;

    @IsString()
    @IsNotEmpty()
    calificacion: number;

    @IsString()
    @IsNotEmpty()
    fechaReseña: Date;
}
