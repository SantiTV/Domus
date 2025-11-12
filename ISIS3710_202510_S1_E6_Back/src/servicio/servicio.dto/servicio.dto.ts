/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class ServicioDTO {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  precioBase: number;

}
