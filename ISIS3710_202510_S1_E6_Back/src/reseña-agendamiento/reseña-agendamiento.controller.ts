/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { ReseñaAgendamientoService } from './reseña-agendamiento.service';


@Controller('resenias')
@UseInterceptors(BusinessErrorsInterceptor)
export class ReseñaAgendamientoController {
    constructor(private readonly reseñaAgendamientoService: ReseñaAgendamientoService) {}

    @Post(':idReseña/agendamientos/:idAgendamiento')
    async addAgendamientoReseña(@Param('idReseña') idReseña: string, @Param('idAgendamiento') idAgendamiento: string) {
        return await this.reseñaAgendamientoService.addAgendamientoToReseña(idReseña, idAgendamiento);
    }

    @Get(':idReseña/agendamientos/:idAgendamiento')
    async findAgendamientoByReseñaIdAgendamientoId(@Param('idReseña') idReseña: string, @Param('idAgendamiento') idAgendamiento: string) {
        return await this.reseñaAgendamientoService.findAgendamientoByReseñaIdAgendamientoId(idReseña, idAgendamiento);
    }

    @Get(':idReseña')
    async findAgendamientoByReseñaId(@Param('idReseña') idReseña: string) {
        return await this.reseñaAgendamientoService.findAgendamientoByReseñaId(idReseña);
    }

    @Delete(':idReseña/agendamientos/:idAgendamiento')
    @HttpCode(204)
    async deleteAgendamientoReseña(@Param('idReseña') idReseña: string, @Param('idAgendamiento') idAgendamiento: string) {
        return await this.reseñaAgendamientoService.deleteAgendamientoFromReseña(idReseña, idAgendamiento);
    }


}
