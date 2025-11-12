/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validateUser(correo: string, password: string): Promise<any> {
    const user = await this.usuarioService.findByCorreo(correo);
    if (user && user.contraseña === password) {
      const { contraseña, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.correo,
      sub: user.idUsuario,
      roles: user.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
      idUsuario: user.idUsuario,
      nombre: user.nombre,
    };
  }
}
