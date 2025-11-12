/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { UpdateTrabajador } from '../trabajador/trabajador.dto/update-trabajador/update-trabajador';
import { AuthService } from './../auth/auth.service';
import { UsuarioDto } from './usuario.dto/usuario.dto';
import { UsuarioEntity } from './usuario.entity/usuario.entity';
import { UsuarioService } from './usuario.service';

@Controller('usuarios')
@UseInterceptors(BusinessErrorsInterceptor)
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    AuthService: AuthService,
  ) {}

  @Get('perfil')
  @UseGuards(JwtAuthGuard)
  getPerfil(@Request() req) {
    return this.usuarioService.findOneUsuario(req.user.idUsuario);
  }

  @Get()
  async findAll() {
    return await this.usuarioService.findAllUsuarios();
  }

  @Get(':usuarioId')
  async findOne(@Param('usuarioId') usuarioId: string) {
    return await this.usuarioService.findOneUsuario(usuarioId);
  }

  @Post()
  async create(@Body() usuarioDto: UsuarioDto) {
    const usuario: UsuarioEntity = plainToInstance(UsuarioEntity, usuarioDto);
    return await this.usuarioService.createUsuario(usuario);
  }

  @Put(':usuarioId')
  async update(
    @Param('usuarioId') idUsuario: string,
    @Body() usuarioDto: UsuarioDto,
  ) {
    console.log('Roles recibidos en update:', usuarioDto.roles);
    const usuario: UsuarioEntity = plainToInstance(UsuarioEntity, usuarioDto);
    return await this.usuarioService.updateUsuario(idUsuario, usuario);
  }

  @Delete(':usuarioId')
  @HttpCode(204)
  async delete(@Param('usuarioId') usuarioId: string) {
    return await this.usuarioService.deleteUsuario(usuarioId);
  }

  @Put(':id/convertir-a-trabajador')
  async convertirATrabajador(
    @Param('id') id: string,
    @Body() dto: UpdateTrabajador,
  ) {
    return await this.usuarioService.completarDatosTrabajador(id, dto);
  }
}
