/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { OfertaAgendamientoService } from './oferta-agendamiento.service';

@Controller('ofertas')
@UseInterceptors(BusinessErrorsInterceptor)
export class OfertaAgendamientoController {
    constructor(private readonly ofertaAgendamientoService: OfertaAgendamientoService) {}

    @Post(':idOferta/:idAgendamiento')
    async addAgendamientoOferta(@Param('idOferta') idOferta: string, @Param('idAgendamiento') idAgendamiento: string) {
        return await this.ofertaAgendamientoService.addAgendamientoToOferta(idOferta, idAgendamiento);
    }

    @Get(':idOferta/:idAgendamiento')
    async findAgendamientoByOfertaIdAgendamientoId(@Param('idOferta') idOferta: string, @Param('idAgendamiento') idAgendamiento: string) {
        return await this.ofertaAgendamientoService.findAgendamientoByOfertaIdAgendamientoId(idOferta, idAgendamiento);
    }

    @Get(':idOferta')
    async findAgendamientoByOfertaId(@Param('idOferta') idOferta: string) {
        return await this.ofertaAgendamientoService.findAgendamientoByOfertaId(idOferta);
    }

    @Delete(':idOferta/:idAgendamiento')
    @HttpCode(204)
    async deleteAgendamientoOferta(@Param('idOferta') idOferta: string, @Param('idAgendamiento') idAgendamiento: string) {
        return await this.ofertaAgendamientoService.deleteAgendamientoFromOferta(idOferta, idAgendamiento);
    }
}
