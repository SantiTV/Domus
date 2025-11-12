/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class OfertaDto {


  @IsString() @IsNotEmpty()
  descripcion: string;

  @IsString() @IsNotEmpty()
  fechaDeseada: string;

  @IsString() @IsNotEmpty()
  horaDeseada: string;

  @IsString() @IsNotEmpty()
  estado: string;

  @IsString() @IsNotEmpty()
  ubicacionServicio: string;

  @IsString() @IsOptional()
  imagenUrl?: string;

  @IsUUID() @IsOptional()
  usuarioId: string;    

  @IsUUID() @IsOptional()
  servicioId: string;     
}
