/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgendamientoEntity } from '../agendamiento/agendamiento.entity/agendamiento.entity';
import { TrabajadorEntity } from '../trabajador/trabajador.entity';
import { TrabajadorAgendamientoController } from './trabajador-agendamiento.controller';
import { TrabajadorAgendamientoService } from './trabajador-agendamiento.service';

@Module({
  imports: [TypeOrmModule.forFeature([TrabajadorEntity, AgendamientoEntity])],
  providers: [TrabajadorAgendamientoService],
  controllers: [TrabajadorAgendamientoController], //TrabajadorService <- Aqui va el servicio del trabajador
})
export class TrabajadorAgendamientoModule {}
