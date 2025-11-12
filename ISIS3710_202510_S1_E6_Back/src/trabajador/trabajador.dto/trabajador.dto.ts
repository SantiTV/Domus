/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
import { UsuarioDto } from '../../usuario/usuario.dto/usuario.dto';
export class TrabajadorDto extends UsuarioDto {
  @IsString()
  @IsNotEmpty()
  readonly especialidad: string;

  @IsString()
  @IsNotEmpty()
  readonly hojaDeVida: string;
}
