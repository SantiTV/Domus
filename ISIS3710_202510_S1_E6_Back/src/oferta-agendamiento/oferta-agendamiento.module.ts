/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfertaEntity } from '../oferta/oferta.entity/oferta.entity';
import { OfertaService } from '../oferta/oferta.service';
import { AgendamientoEntity } from '../agendamiento/agendamiento.entity/agendamiento.entity';
import { OfertaAgendamientoService } from './oferta-agendamiento.service';
import { OfertaAgendamientoController } from './oferta-agendamiento.controller';

@Module({
    imports: [TypeOrmModule.forFeature([OfertaEntity, AgendamientoEntity])],
    providers: [OfertaService, OfertaAgendamientoService],
    controllers: [OfertaAgendamientoController],
})
export class OfertaAgendamientoModule {}
