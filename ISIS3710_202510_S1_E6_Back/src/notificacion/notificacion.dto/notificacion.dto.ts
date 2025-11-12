/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import {IsDate, IsNotEmpty, IsString} from 'class-validator';
export class NotificacionDto {
    @IsString()
    @IsNotEmpty()
    titulo: string;

    @IsString()
    @IsNotEmpty()
    mensaje: string;

    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    fechaNotificacion: Date;

}
