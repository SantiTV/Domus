/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReseñaEntity } from '../reseña/reseña.entity/reseña.entity';
import { ReseñaService } from '../reseña/reseña.service';
import { AgendamientoEntity } from '../agendamiento/agendamiento.entity/agendamiento.entity';
import { ReseñaAgendamientoService } from './reseña-agendamiento.service';
import { ReseñaAgendamientoController } from './reseña-agendamiento.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ReseñaEntity, AgendamientoEntity])],
    providers: [ReseñaService, ReseñaAgendamientoService],
    controllers: [ReseñaAgendamientoController],
})
export class ReseñaAgendamientoModule {}
