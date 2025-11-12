/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgendamientoEntity } from '../agendamiento/agendamiento.entity/agendamiento.entity';
import { TrabajadorEntity } from '../trabajador/trabajador.entity';
import { UsuarioEntity } from '../usuario/usuario.entity/usuario.entity';
import { UsuarioService } from '../usuario/usuario.service';
import { UsuarioAgendamientoController } from './usuario-agendamiento.controller';
import { UsuarioAgendamientoService } from './usuario-agendamiento.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsuarioEntity,
      AgendamientoEntity,
      TrabajadorEntity,
    ]),
  ],
  providers: [UsuarioAgendamientoService, UsuarioService],
  controllers: [UsuarioAgendamientoController],
})
export class UsuarioAgendamientoModule {}
