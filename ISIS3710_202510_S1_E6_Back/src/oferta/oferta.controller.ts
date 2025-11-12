/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { OfertaService } from './oferta.service';
import { OfertaEntity } from './oferta.entity/oferta.entity';
import { plainToInstance } from 'class-transformer';
import { OfertaDto } from './oferta.dto/oferta.dto';
import { ServicioService } from 'src/servicio/servicio.service';
import { UsuarioService } from 'src/usuario/usuario.service';

@Controller('ofertas')
@UseInterceptors(BusinessErrorsInterceptor)
export class OfertaController {
    constructor(
        private readonly ofertaService: OfertaService,
        private readonly usuarioService: UsuarioService,
        private readonly servicioService: ServicioService,
    ) {}

    @Get()
    async findAll() {
        return await this.ofertaService.findAll();
    }

    @Get('disponibles')
    async findAllDisponibles() {
        return await this.ofertaService.findAllDisponibles();
    }


    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.ofertaService.findOne(id);
    }

    @Post()
    async create(@Body() ofertaDto: OfertaDto) {
        const oferta = plainToInstance(OfertaEntity, ofertaDto);
        oferta.usuario = await this.usuarioService.findOneUsuario(ofertaDto.usuarioId);
        oferta.servicio = await this.servicioService.findOneServicio(ofertaDto.servicioId);
        return await this.ofertaService.create(oferta);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() ofertaDto: OfertaDto) {
        const oferta: OfertaEntity = plainToInstance(OfertaEntity, ofertaDto);
        return await this.ofertaService.update(id, oferta);
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id: string) {
        return await this.ofertaService.delete(id);
    }


}
