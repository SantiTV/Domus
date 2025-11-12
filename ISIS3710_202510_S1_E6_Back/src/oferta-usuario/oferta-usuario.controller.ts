/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { OfertaUsuarioService } from './oferta-usuario.service';

@Controller('ofertas')
@UseInterceptors(BusinessErrorsInterceptor)
export class OfertaUsuarioController {
    constructor(private readonly ofertaUsuarioService: OfertaUsuarioService) {} 

    @Post(':idOferta/:idUsuario')
    async addUsuarioOferta(@Param('idOferta') idOferta: string, @Param('idUsuario') idUsuario: string) {
        return await this.ofertaUsuarioService.addUsuarioToOferta(idOferta, idUsuario);
    }

    @Get(':idOferta/:idUsuario')
    async findUsuarioByOfertaIdUsuarioId(@Param('idOferta') idOferta: string, @Param('idUsuario') idUsuario: string) {
        return await this.ofertaUsuarioService.findUsuarioByOfertaIdUsuarioId(idOferta, idUsuario);
    }

    @Delete(':idOferta/:idUsuario')
    @HttpCode(204)
    async deleteUsuarioOferta(@Param('idOferta') idOferta: string, @Param('idUsuario') idUsuario: string) {
        return await this.ofertaUsuarioService.deleteUsuarioFromOferta(idOferta, idUsuario);
    }

    @Get(':id')
    async findOfertasByUsuario(@Param('id') usuarioId: string) {
        return this.ofertaUsuarioService.findByUsuarioId(usuarioId);
        }

}
