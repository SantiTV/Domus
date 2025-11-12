/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ReseñaService } from './reseña.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { ReseñaDto } from './reseña.dto/reseña.dto';
import { ReseñaEntity } from './reseña.entity/reseña.entity';
import { plainToInstance } from 'class-transformer';

@Controller('resenias')
@UseInterceptors(BusinessErrorsInterceptor)
export class ReseñaController {
    constructor(private readonly reseñaService: ReseñaService) {}

    @Get()
    async findAll() {
        return await this.reseñaService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.reseñaService.findOne(id);
    }

    @Post()
    async create(@Body() reseñaDto: ReseñaDto) {
        const reseña: ReseñaEntity = plainToInstance(ReseñaEntity, reseñaDto);
        return await this.reseñaService.create(reseña);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() reseñaDto: ReseñaDto) {
        const reseña: ReseñaEntity = plainToInstance(ReseñaEntity, reseñaDto);
        return await this.reseñaService.update(id, reseña);
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id: string) {
        return await this.reseñaService.delete(id);
    }

}
