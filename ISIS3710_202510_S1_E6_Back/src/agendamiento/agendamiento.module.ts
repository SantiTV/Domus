/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AgendamientoService } from './agendamiento.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgendamientoEntity } from './agendamiento.entity/agendamiento.entity';
import { AgendamientoController } from './agendamiento.controller';
import { UsuarioService } from 'src/usuario/usuario.service';
import { OfertaService } from 'src/oferta/oferta.service';
import { TrabajadorService } from 'src/trabajador/trabajador.service';
import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';
import { OfertaEntity } from 'src/oferta/oferta.entity/oferta.entity';
import { TrabajadorEntity } from 'src/trabajador/trabajador.entity';

@Module({
  providers: [AgendamientoService,UsuarioService, OfertaService, TrabajadorService],
  imports: [TypeOrmModule.forFeature([AgendamientoEntity,UsuarioEntity,OfertaEntity,TrabajadorEntity])],
  controllers: [AgendamientoController],
})
export class AgendamientoModule {}
